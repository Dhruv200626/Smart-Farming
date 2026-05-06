from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

app = Flask(__name__)
CORS(app)

# -----------------------------
# PATH FIX (IMPORTANT)
# -----------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# -----------------------------
# LOAD MODELS
# -----------------------------
crop_model_path = os.path.join(BASE_DIR, "saved_model", "crop_model.pkl")
disease_model_path = os.path.join(BASE_DIR, "disease_model", "plant_model.h5")

model = joblib.load(crop_model_path)
disease_model = load_model(disease_model_path)

# -----------------------------
# HOME
# -----------------------------
@app.route('/')
def home():
    return "🌾 Smart Farming API Running!"

# -----------------------------
# 🌾 CROP PREDICTION
# -----------------------------
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json

        features = [
            data['N'],
            data['P'],
            data['K'],
            data['temperature'],
            data['humidity'],
            data['ph'],
            data['rainfall']
        ]

        prediction = model.predict([features])

        return jsonify({
            "recommended_crop": prediction[0]
        })

    except Exception as e:
        return jsonify({"error": str(e)})

# -----------------------------
# 📸 DISEASE DETECTION
# -----------------------------
@app.route('/predict-disease', methods=['POST'])
def predict_disease():
    try:
        file = request.files.get('file')

        if not file:
            return jsonify({"error": "No file uploaded"})

        # TEMP FILE
        filepath = os.path.join(BASE_DIR, "temp.jpg")
        file.save(filepath)

        # IMAGE PROCESS
        img = image.load_img(filepath, target_size=(224, 224))
        img_array = image.img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        prediction = disease_model.predict(img_array)

        classes = [
            "Potato Early Blight",
            "Potato Late Blight",
            "Healthy"
        ]

        result = classes[np.argmax(prediction)]
        confidence = float(np.max(prediction)) * 100

        # CLEAN TEMP FILE ✅
        os.remove(filepath)

        info = {
            "Potato Early Blight": {
                "description": "Fungal disease causing brown spots",
                "climate": "Warm & humid",
                "treatment": "Use fungicide spray"
            },
            "Potato Late Blight": {
                "description": "Serious disease causing leaf decay",
                "climate": "Cool & wet",
                "treatment": "Remove infected plants"
            },
            "Healthy": {
                "description": "Plant is healthy 🌱",
                "climate": "Normal conditions",
                "treatment": "No action needed"
            }
        }

        return jsonify({
            "disease": result,
            "confidence": round(confidence, 2),
            "description": info[result]["description"],
            "climate": info[result]["climate"],
            "treatment": info[result]["treatment"]
        })

    except Exception as e:
        return jsonify({"error": str(e)})

# -----------------------------
# RUN (FOR LOCAL ONLY)
# -----------------------------
if __name__ == '__main__':
    app.run()