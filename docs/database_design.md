# SupplyPrescript Database Design

## Main Entities

1. Shipments
2. Predictions
3. Recommendations
4. Decisions
5. Feedback

## Workflow

Shipment
    ↓
Prediction
    ↓
Recommendation
    ↓
Decision
    ↓
Feedback

This database supports the complete closed-loop prescriptive analytics workflow.

## Table 1 : Shipments

| Column | Data Type | Description |
|---------|-----------|-------------|
| shipment_id | SERIAL (PK) | Unique shipment ID |
| product_name | VARCHAR(100) | Product Name |
| warehouse | VARCHAR(100) | Source Warehouse |
| destination | VARCHAR(100) | Delivery Location |
| transport_partner | VARCHAR(100) | Logistics Company |
| shipment_date | DATE | Shipment Date |
| expected_delivery | DATE | Expected Delivery Date |
| actual_delivery | DATE | Actual Delivery Date |
| shipment_status | VARCHAR(50) | Current Shipment Status |

## Table 2 : Predictions

| Column | Data Type | Description |
|---------|-----------|-------------|
| prediction_id | SERIAL (PK) | Prediction ID |
| shipment_id | INT (FK) | Shipment Reference |
| delay_probability | DECIMAL(5,2) | Delay Probability |
| predicted_delay | BOOLEAN | Delay Prediction |
| model_version | VARCHAR(20) | ML Model Version |
| prediction_time | TIMESTAMP | Prediction Time |

## Table 3 : Recommendations

| Column | Data Type | Description |
|---------|-----------|-------------|
| recommendation_id | SERIAL (PK) | Recommendation ID |
| prediction_id | INT (FK) | Prediction Reference |
| recommendation | TEXT | Suggested Action |
| estimated_cost | DECIMAL(10,2) | Estimated Cost |
| expected_improvement | VARCHAR(50) | Expected Improvement |

## Table 4 : Decisions

| Column | Data Type | Description |
|---------|-----------|-------------|
| decision_id | SERIAL (PK) | Decision ID |
| recommendation_id | INT (FK) | Recommendation Reference |
| selected_by | VARCHAR(100) | Manager Name |
| decision_date | TIMESTAMP | Decision Time |

## Table 5 : Feedback

| Column | Data Type | Description |
|---------|-----------|-------------|
| feedback_id | SERIAL (PK) | Feedback ID |
| decision_id | INT (FK) | Decision Reference |
| successful | BOOLEAN | Success Status |
| actual_delay | INT | Delay in Hours |
| remarks | TEXT | Comments |