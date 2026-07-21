from sqlalchemy.orm import Session
from app import models, schemas


def get_shipments(db: Session):
    return db.query(models.Shipment).all()


def get_shipment(db: Session, shipment_id: int):
    return db.query(models.Shipment).filter(
        models.Shipment.shipment_id == shipment_id
    ).first()


def create_shipment(db: Session, shipment: schemas.ShipmentCreate):
    db_shipment = models.Shipment(**shipment.model_dump())
    db.add(db_shipment)
    db.commit()
    db.refresh(db_shipment)
    return db_shipment


def update_shipment(
    db: Session,
    shipment_id: int,
    shipment: schemas.ShipmentUpdate
):
    db_shipment = get_shipment(db, shipment_id)

    if db_shipment:
        for key, value in shipment.model_dump().items():
            setattr(db_shipment, key, value)

        db.commit()
        db.refresh(db_shipment)

    return db_shipment


def delete_shipment(db: Session, shipment_id: int):
    db_shipment = get_shipment(db, shipment_id)

    if db_shipment:
        db.delete(db_shipment)
        db.commit()

    return db_shipment