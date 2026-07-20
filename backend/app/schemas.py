from datetime import date
from decimal import Decimal

from pydantic import BaseModel


class Shipment(BaseModel):
    shipment_id: int
    product_name: str
    supplier_name: str | None = None
    warehouse: str | None = None
    destination: str | None = None
    transport_partner: str | None = None
    shipment_date: date | None = None
    expected_delivery: date | None = None
    actual_delivery: date | None = None
    shipment_cost: Decimal | None = None
    shipment_status: str | None = None

    class Config:
        from_attributes = True