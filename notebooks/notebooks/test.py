import joblib

label_encoders = joblib.load("models/label_encoders.pkl")

print(label_encoders.keys())