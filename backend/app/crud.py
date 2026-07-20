from sqlalchemy.orm import Session
from app.models import Shipment


def get_shipments(db: Session):
    return db.query(Shipment).all()