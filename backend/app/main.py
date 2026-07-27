from fastapi import FastAPI, Depends, HTTPException
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
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db),
):
    return crud.get_shipments(
        db,
        status=status,
        supplier=supplier,
        destination=destination,
        product=product,
        skip=skip,
        limit=limit
    )

@app.get("/shipments/stats")
def shipment_stats(
    db: Session = Depends(get_db)
):
    return crud.get_shipment_stats(db)

@app.get("/shipments/{shipment_id}", response_model=schemas.Shipment)
def get_shipment(
    shipment_id: int,
    db: Session = Depends(get_db)
):
    shipment = crud.get_shipment(db, shipment_id)

    if shipment is None:
        raise HTTPException(
            status_code=404,
            detail="Shipment not found"
        )

    return shipment


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
    updated_shipment = crud.update_shipment(
        db=db,
        shipment_id=shipment_id,
        shipment=shipment
    )

    if updated_shipment is None:
        raise HTTPException(
            status_code=404,
            detail="Shipment not found"
        )

    return updated_shipment


@app.delete("/shipments/{shipment_id}")
def delete_shipment(
    shipment_id: int,
    db: Session = Depends(get_db)
):
    deleted_shipment = crud.delete_shipment(
        db=db,
        shipment_id=shipment_id
    )

    if deleted_shipment is None:
        raise HTTPException(
            status_code=404,
            detail="Shipment not found"
        )

    return {"message": "Shipment deleted successfully"}