from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud, schemas

app = FastAPI(title="SupplyPrescript API")


@app.get("/")
def home():
    return {"message": "SupplyPrescript API Running"}


@app.get("/shipments", response_model=list[schemas.Shipment])
def get_shipments(db: Session = Depends(get_db)):
    return crud.get_shipments(db)