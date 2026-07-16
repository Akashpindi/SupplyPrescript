-- SupplyPrescript Tables

-- Table: Shipments

CREATE TABLE shipments (

    shipment_id SERIAL PRIMARY KEY,

    product_name VARCHAR(100),

    warehouse VARCHAR(100),

    destination VARCHAR(100),

    transport_partner VARCHAR(100),

    shipment_date DATE,

    expected_delivery DATE,

    actual_delivery DATE,

    shipment_status VARCHAR(50)

);