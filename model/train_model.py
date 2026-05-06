import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
import joblib

# Load dataset
data = pd.read_csv('../data/crop_data.csv')

# Features & target
X = data.drop('label', axis=1)
y = data['label']

# Better split (IMPORTANT)
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.3,
    random_state=42,
    stratify=y
)

# Train model
model = RandomForestClassifier(
    n_estimators=300,
    max_depth=12,
    random_state=42
)

model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)

# Accuracy
accuracy = model.score(X_test, y_test)

print(f"\nModel Accuracy: {accuracy*100:.2f}%")
print("\nDetailed Report:\n")
print(classification_report(y_test, y_pred, zero_division=0))

# Save model
joblib.dump(model, '../saved_model/crop_model.pkl')

print("\nModel saved successfully!")