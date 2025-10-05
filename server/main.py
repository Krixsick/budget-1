import os
from fastapi import FastAPI
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import certifi
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()
password = os.getenv("MONGODB_PASSWORD")
uri = f"mongodb+srv://linusgao123_db_user:{password}@budget-1.xppznsk.mongodb.net/?retryWrites=true&w=majority&appName=budget-1"

client = MongoClient(uri, server_api=ServerApi('1'), tlsCAFile=certifi.where())

@app.on_event("startup")
async def startup_db_client():
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

@app.get("/")
async def root():
    return {"message": "Hello World"}