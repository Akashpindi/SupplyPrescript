import streamlit as st
import joblib
import os

st.set_page_config(page_title="Shipment Delay Prediction")

st.title("📦 Shipment Delay Prediction")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "models", "shipment_delay_model.pkl")

st.write("Model Path:", MODEL_PATH)
st.write("Model Exists:", os.path.exists(MODEL_PATH))

try:
    model = joblib.load(MODEL_PATH)
    st.success("✅ Model Loaded Successfully")
except Exception as e:
    st.error("❌ Failed to load model")
    st.exception(e)