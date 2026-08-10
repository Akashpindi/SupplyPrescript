
import streamlit as st
import pandas as pd
import joblib

st.write("App started succesfully!")

model = joblib.load("models/shipment_delay_model.pkl")
st.write("Model loaded!")

label_encoders = joblib.load("models/label_encoders.pkl")
st.write("Encoders loadedd")

# App title
st.set_page_config(page_title="Shipment Delay Prediction", page_icon="📦")

st.title("📦 Shipment Delay Prediction App")
st.write("Enter shipment details to predict whether the shipment will be delayed.")

# User Inputs
product_type = st.selectbox("Product Type", ["skincare", "haircare", "cosmetics"])

price = st.number_input("Price", min_value=0.0, value=50.0)

availability = st.number_input("Availability", min_value=0, value=100)

products_sold = st.number_input("Number of Products Sold", min_value=0, value=50)

revenue = st.number_input("Revenue Generated", min_value=0.0, value=1000.0)

customer = st.selectbox("Customer Demographics", ["Male", "Female"])

stock = st.number_input("Stock Levels", min_value=0, value=150)

lead_times = st.number_input("Lead Times", min_value=0, value=5)

order_qty = st.number_input("Order Quantities", min_value=0, value=50)

shipping_time = st.number_input("Shipping Times", min_value=0, value=4)

carrier = st.selectbox(
    "Shipping Carrier",
    label_encoders["Shipping carriers"].classes_
)

shipping_cost = st.number_input("Shipping Costs", min_value=0.0, value=200.0)

location = st.selectbox(
    "Location",
    label_encoders["Location"].classes_
)

lead_time = st.number_input("Lead Time", min_value=0, value=5)

production = st.number_input("Production Volumes", min_value=0, value=300)

manufacturing_lead = st.number_input(
    "Manufacturing Lead Time",
    min_value=0,
    value=10
)

manufacturing_cost = st.number_input(
    "Manufacturing Costs",
    min_value=0.0,
    value=500.0
)

inspection = st.selectbox(
    "Inspection Results",
    label_encoders["Inspection results"].classes_
)

defect_rate = st.number_input(
    "Defect Rates",
    min_value=0.0,
    value=2.5
)

transport = st.selectbox(
    "Transportation Mode",
    label_encoders["Transportation modes"].classes_
)

route = st.selectbox(
    "Route",
    label_encoders["Routes"].classes_
)

cost = st.number_input("Costs", min_value=0.0, value=1000.0)

# Prediction Button
if st.button("Predict Shipment Delay"):

    input_data = pd.DataFrame({
        "Product type": [product_type],
        "Price": [price],
        "Availability": [availability],
        "Number of products sold": [products_sold],
        "Revenue generated": [revenue],
        "Customer demographics": [customer],
        "Stock levels": [stock],
        "Lead times": [lead_times],
        "Order quantities": [order_qty],
        "Shipping times": [shipping_time],
        "Shipping carriers": [carrier],
        "Shipping costs": [shipping_cost],
        "Location": [location],
        "Lead time": [lead_time],
        "Production volumes": [production],
        "Manufacturing lead time": [manufacturing_lead],
        "Manufacturing costs": [manufacturing_cost],
        "Inspection results": [inspection],
        "Defect rates": [defect_rate],
        "Transportation modes": [transport],
        "Routes": [route],
        "Costs": [cost]
    })

    categorical_columns = [
        "Product type",
        "Customer demographics",
        "Shipping carriers",
        "Location",
        "Inspection results",
        "Transportation modes",
        "Routes"
    ]

    for col in categorical_columns:
        input_data[col] = label_encoders[col].transform(input_data[col])

    prediction = model.predict(input_data)
    probability = model.predict_proba(input_data)

    st.subheader("Prediction Result")

    if prediction[0] == 1:
        st.error("🚚 Shipment will be Delayed")
    else:
        st.success("✅ Shipment will NOT be Delayed")

    st.write(f"**Delay Probability:** {probability[0][1]:.2%}")
    st.write(f"**No Delay Probability:** {probability[0][0]:.2%}")