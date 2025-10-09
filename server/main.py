from fastapi import FastAPI
from database import client
from routes import transactions
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(title="Budget API", version="1.0.0")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(transactions.router)

@app.on_event("startup")
async def startup_db_client():
    try:
        client.admin.command('ping')
        print("✅ Successfully connected to MongoDB!")
    except Exception as e:
        print(f"❌ MongoDB connection error: {e}")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

@app.get("/")
async def root():
    return {
        "message": "Budget API is running!",
        "endpoints": {
            "add_transaction": "POST /transactions/add",
            "all_transactions": "GET /transactions/all",
            "expenses": "GET /transactions/expenses",
            "income": "GET /transactions/income",
            "summary": "GET /transactions/summary",
            "clear": "DELETE /transactions/clear"
        }
    }