from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud, schemas

app = FastAPI(title="SupplyPrescript API")


@app.get("/")
def home():
    return {"message": "SupplyPrescript API Running"}


@app.get("/shipments", response_model=list[schemas.Shipment])
def get_shipments(
    status: str = None,
    supplier: str = None,
    destination: str = None,
    product: str = None,
    db: Session = Depends(get_db),
):
    return crud.get_shipments(
        db,
        status=status,
        supplier=supplier,
        destination=destination,
        product=product
    )

@app.get("/shipments/{shipment_id}", response_model=schemas.Shipment)
def get_shipment(
    shipment_id: int,
    db: Session = Depends(get_db)
):
    return crud.get_shipment(db, shipment_id)


@app.post("/shipments", response_model=schemas.Shipment)
def create_shipment(
    shipment: schemas.ShipmentCreate,
    db: Session = Depends(get_db)
):
    return crud.create_shipment(db, shipment)


@app.put("/shipments/{shipment_id}", response_model=schemas.Shipment)
def update_shipment(
    shipment_id: int,
    shipment: schemas.ShipmentUpdate,
    db: Session = Depends(get_db)
):
    return crud.update_shipment(db, shipment_id, shipment)


@app.delete("/shipments/{shipment_id}")
def delete_shipment(
    shipment_id: int,
    db: Session = Depends(get_db)
):
    crud.delete_shipment(db, shipment_id)
    return {"message": "Shipment deleted successfully"}