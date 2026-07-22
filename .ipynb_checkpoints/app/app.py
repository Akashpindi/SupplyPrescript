import os

print("Current Working Directory:", os.getcwd())
print("App File Location:", os.path.abspath(__file__))
import streamlit as st
import pandas as pd
import joblib

# Load trained model
import os
import joblib

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "..", "shipment_delay_model.pkl")

print("MODEL_PATH:", MODEL_PATH)
print("Exists:", os.path.exists(MODEL_PATH))

model = joblib.load(MODEL_PATH)


# Page configuration
st.set_page_config(page_title="Shipment Delay Prediction", layout="centered")

# App title
st.title("📦 Shipment Delay Prediction App")
st.write("Enter shipment details to predict whether the shipment will be delayed.")

# Input fields
price = st.number_input("Price", min_value=0.0, value=50.0)
availability = st.number_input("Availability", min_value=0, value=100)
products_sold = st.number_input("Number of Products Sold", min_value=0, value=50)
revenue_generated = st.number_input("Revenue Generated", min_value=0.0, value=1000.0)
stock_levels = st.number_input("Stock Levels", min_value=0, value=150)
lead_times = st.number_input("Lead Times", min_value=0, value=5)
order_quantities = st.number_input("Order Quantities", min_value=0, value=50)
shipping_times = st.number_input("Shipping Times", min_value=0, value=4)
shipping_costs = st.number_input("Shipping Costs", min_value=0.0, value=200.0)
production_volumes = st.number_input("Production Volumes", min_value=0, value=300)
manufacturing_lead_time = st.number_input("Manufacturing Lead Time", min_value=0, value=10)
manufacturing_costs = st.number_input("Manufacturing Costs", min_value=0.0, value=500.0)
defect_rates = st.number_input("Defect Rates", min_value=0.0, value=2.5)
costs = st.number_input("Costs", min_value=0.0, value=1000.0)

# Predict button
if st.button("Predict"):

    # Create input DataFrame
    input_data = pd.DataFrame({
        "Price": [price],
        "Availability": [availability],
        "Number of products sold": [products_sold],
        "Revenue generated": [revenue_generated],
        "Stock levels": [stock_levels],
        "Lead times": [lead_times],
        "Order quantities": [order_quantities],
        "Shipping times": [shipping_times],
        "Shipping costs": [shipping_costs],
        "Production volumes": [production_volumes],
        "Manufacturing lead time": [manufacturing_lead_time],
        "Manufacturing costs": [manufacturing_costs],
        "Defect rates": [defect_rates],
        "Costs": [costs]
    })

    # Make prediction
    prediction = model.predict(input_data)[0]

    st.subheader("Prediction Result")

    if prediction == 1:
        st.error("⚠️ Shipment is likely to be Delayed.")
    else:
        st.success("✅ Shipment is likely to be On Time.")