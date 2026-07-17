-- Sample Shipment Data

INSERT INTO shipments
(product_name, supplier_name, warehouse, destination,
transport_partner, shipment_date, expected_delivery,
actual_delivery, shipment_cost, shipment_status)

VALUES

('Laptop','Dell','Hyderabad','Chennai',
'DHL','2026-07-18','2026-07-20',
'2026-07-21',5000.00,'Delivered');