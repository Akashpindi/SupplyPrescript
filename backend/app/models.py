from sqlalchemy import Column, Integer, String, Date, DECIMAL
from app.database import Base


class Shipment(Base):
    __tablename__ = "shipments"

    shipment_id = Column(Integer, primary_key=True, index=True)
    product_name = Column(String(100), nullable=False)
    supplier_name = Column(String(100))
    warehouse = Column(String(100))
    destination = Column(String(100))
    transport_partner = Column(String(100))
    shipment_date = Column(Date)
    expected_delivery = Column(Date)
    actual_delivery = Column(Date)
    shipment_cost = Column(DECIMAL(10, 2))
    shipment_status = Column(String(50))