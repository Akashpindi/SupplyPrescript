-- =====================================
-- SupplyPrescript Sample Queries
-- =====================================

-- View all shipments
SELECT * FROM shipments;

-- View delivered shipments
SELECT *
FROM shipments
WHERE shipment_status = 'Delivered';

-- Count total shipments
SELECT COUNT(*) AS total_shipments
FROM shipments;

-- Show shipments ordered by shipment date
SELECT *
FROM shipments
ORDER BY shipment_date;

-- View delayed shipments

SELECT *
FROM shipments
WHERE shipment_status = 'Delayed';