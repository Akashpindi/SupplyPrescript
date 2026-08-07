from sqlalchemy.orm import Session
from app import models, schemas
from sqlalchemy import func, or_


def get_shipments(
    db: Session,
    status: str = None,
    supplier: str = None,
    warehouse: str = None,
    transport_partner: str = None,
    destination: str = None,
    product: str = None,
    search: str = None,
    skip: int = 0,
    limit: int = 10,
    sort_by: str = None,
    order: str = "asc",
    start_date: str = None,
    end_date: str = None,
    expected_delivery: str = None,
    actual_delivery: str = None,
    min_cost: float = None,
    max_cost: float = None,
):
    query = db.query(models.Shipment)

    if status:
        query = query.filter(models.Shipment.shipment_status == status)

    if supplier:
        query = query.filter(models.Shipment.supplier_name == supplier)

    if warehouse:
        query = query.filter(
            models.Shipment.warehouse == warehouse
        )

    if transport_partner:
        query = query.filter(
            models.Shipment.transport_partner == transport_partner
        )

    if destination:
        query = query.filter(models.Shipment.destination == destination)
    
    if product:
        query = query.filter(
            models.Shipment.product_name.ilike(f"%{product}%")
    )

    if search:
        query = query.filter(
            or_(
                models.Shipment.product_name.ilike(f"%{search}%"),
                models.Shipment.supplier_name.ilike(f"%{search}%"),
                models.Shipment.warehouse.ilike(f"%{search}%"),
                models.Shipment.destination.ilike(f"%{search}%"),
                models.Shipment.transport_partner.ilike(f"%{search}%")
            )
        )

    if start_date:
        query = query.filter(
            models.Shipment.shipment_date >= start_date
        )

    if end_date:
        query = query.filter(
            models.Shipment.shipment_date <= end_date
        )

    if expected_delivery:
        query = query.filter(
            models.Shipment.expected_delivery == expected_delivery
        )

    if actual_delivery:
        query = query.filter(
            models.Shipment.actual_delivery == actual_delivery
        )

    if min_cost is not None:
        query = query.filter(
            models.Shipment.shipment_cost >= min_cost
        )

    if max_cost is not None:
        query = query.filter(
            models.Shipment.shipment_cost <= max_cost
        )

    if sort_by:
        if hasattr(models.Shipment, sort_by):
            column = getattr(models.Shipment, sort_by)

            if order.lower() == "desc":
                query = query.order_by(column.desc())
            else:
                query = query.order_by(column.asc())

    total = query.count()

    shipments = query.offset(skip).limit(limit).all()

    return {
        "total": total,
        "skip": skip,
        "limit": limit,
        "count": len(shipments),
        "data": shipments
    }


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

def get_shipment_stats(db: Session):
    total = db.query(models.Shipment).count()

    delivered = db.query(models.Shipment).filter(
        models.Shipment.shipment_status == "Delivered"
    ).count()

    in_transit = db.query(models.Shipment).filter(
        models.Shipment.shipment_status == "In Transit"
    ).count()

    pending = db.query(models.Shipment).filter(
        models.Shipment.shipment_status == "Pending"
    ).count()

    return {
        "total_shipments": total,
        "delivered": delivered,
        "in_transit": in_transit,
        "pending": pending,
    }