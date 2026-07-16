# SupplyPrescript ER Diagram

```
Shipments
----------
shipment_id (PK)
product_name
warehouse
destination
transport_partner
shipment_date
expected_delivery
actual_delivery
shipment_status
      │
      │ 1 : N
      ▼
Predictions
------------
prediction_id (PK)
shipment_id (FK)
delay_probability
predicted_delay
model_version
prediction_time
      │
      │ 1 : N
      ▼
Recommendations
----------------
recommendation_id (PK)
prediction_id (FK)
recommendation
estimated_cost
expected_improvement
      │
      │ 1 : 1
      ▼
Decisions
----------
decision_id (PK)
recommendation_id (FK)
selected_by
decision_date
      │
      │ 1 : 1
      ▼
Feedback
---------
feedback_id (PK)
decision_id (FK)
successful
actual_delay
remarks
```

## Relationships

- Shipments → Predictions (1:N)
- Predictions → Recommendations (1:N)
- Recommendations → Decisions (1:1)
- Decisions → Feedback (1:1)