# 🌾 Smart Farming AI

An intelligent farming assistant that helps farmers make better decisions using **Machine Learning & AI**.

🚀 This project provides:

* 🌱 Crop Recommendation based on soil & weather
* 📸 Plant Disease Detection using Deep Learning
* 🌦️ Real-time Weather Integration
* 📊 Interactive Analytics Dashboard

---

## 🔥 Features

### 🌾 Crop Recommendation

* Input: N, P, K, temperature, humidity, pH, rainfall
* Output: Best crop suggestion using ML model

### 📸 Disease Detection

* Upload or capture plant image
* AI detects disease with confidence %
* Provides:

  * Description
  * Suitable climate
  * Treatment

### 🌦️ Weather Auto-Fill

* Uses geolocation
* Fetches live weather data

### 📊 Dashboard

* Nutrient visualization (Bar + Pie charts)
* Temperature trends
* Prediction confidence UI

---

## 🧠 Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Recharts
* Framer Motion

### Backend

* Flask
* TensorFlow / Keras
* Scikit-learn (joblib model)

### APIs

* OpenWeather API

---

## 📁 Project Structure

```
smart-farming/
│
├── frontend/          # React App
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── saved_model/
│   │   └── crop_model.pkl
│   ├── disease_model/
│   │   └── plant_model.h5
│
└── README.md
```

---

## ⚙️ Installation (Local Setup)

### 🔹 Clone Repository

```
git clone https://github.com/your-username/smart-farming.git
cd smart-farming
```

---

### 🔹 Backend Setup

```
cd backend
python -m venv venv
venv\Scripts\activate   # Windows

pip install -r requirements.txt
python app.py
```

Backend runs on:

```
http://127.0.0.1:5000
```

---

### 🔹 Frontend Setup

```
cd frontend
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

## 🌐 Environment Variables

Create `.env` in frontend:

```
REACT_APP_API_URL=http://127.0.0.1:5000
REACT_APP_WEATHER_KEY=your_openweather_api_key
```

---

## 🚀 Deployment

### Backend

* Deploy on Render
* Add:

```
web: gunicorn app:app
```

---

### Frontend

* Deploy on Vercel
* Add environment variables in dashboard

---

## 📸 Screenshots (Add your images here)

* Home Page
* Dashboard
* Disease Detection

---

## 🎯 Future Improvements

* 🔐 User Authentication
* ☁️ Cloud Database (MongoDB)
* 📱 Mobile Responsive UI
* 📡 Real-time updates using WebSockets
* 🌍 Multi-language support

---

## 🤝 Contributing

Contributions are welcome!

```
Fork → Create Branch → Commit → Push → Pull Request
```

---

## 📜 License

This project is open-source and free to use.

---

## 👨‍💻 Author

**Dhruv Gosavi**
Aspiring AI & Full Stack Developer 🚀

---

## ⭐ Support

If you like this project:

👉 Star ⭐ the repository
👉 Share with others

---

## 💡 Tagline

> “Empowering farmers with AI-driven insights for smarter agriculture.” 🌱
