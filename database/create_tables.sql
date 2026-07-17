-- ===========================================
-- SupplyPrescript Database Tables
-- ===========================================

CREATE TABLE shipments (

    shipment_id SERIAL PRIMARY KEY,

    product_name VARCHAR(100) NOT NULL,

    supplier_name VARCHAR(100),

    warehouse VARCHAR(100),

    destination VARCHAR(100),

    transport_partner VARCHAR(100),

    shipment_date DATE,

    expected_delivery DATE,

    actual_delivery DATE,

    shipment_cost DECIMAL(10,2),

    shipment_status VARCHAR(50)

);

CREATE TABLE predictions (

    prediction_id SERIAL PRIMARY KEY,

    shipment_id INT REFERENCES shipments(shipment_id),

    delay_probability DECIMAL(5,2),

    predicted_delay BOOLEAN,

    model_version VARCHAR(20),

    prediction_time TIMESTAMP

);

CREATE TABLE recommendations (

    recommendation_id SERIAL PRIMARY KEY,

    prediction_id INT REFERENCES predictions(prediction_id),

    recommendation TEXT,

    estimated_cost DECIMAL(10,2),

    expected_improvement VARCHAR(50)

);

CREATE TABLE decisions (

    decision_id SERIAL PRIMARY KEY,

    recommendation_id INT REFERENCES recommendations(recommendation_id),

    selected_by VARCHAR(100),

    decision_date TIMESTAMP

);

CREATE TABLE feedback (

    feedback_id SERIAL PRIMARY KEY,

    decision_id INT REFERENCES decisions(decision_id),

    successful BOOLEAN,

    actual_delay INT,

    remarks TEXT

);