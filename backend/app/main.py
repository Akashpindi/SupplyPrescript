from fastapi import FastAPI

app = FastAPI(
    title="SupplyPrescript API",
    version="1.0.0"
)

@app.get("/")
def home():
    return {
        "message": "Welcome to SupplyPrescript API",
        "status": "Running Successfully"
    }

@app.get("/health")
def health():
    return {
        "status": "Healthy"
    }