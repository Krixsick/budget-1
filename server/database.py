from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import certifi
from dotenv import load_dotenv
import os
load_dotenv()
password = os.getenv("MONGODB_PASSWORD")
# MongoDB connection
uri = f"mongodb+srv://linusgao123_db_user:{password}@budget-1.xppznsk.mongodb.net/?retryWrites=true&w=majority&appName=budget-1"
client = MongoClient(uri, server_api=ServerApi('1'), tlsCAFile=certifi.where())

# Database and collection
db = client.budget_db
transactions_collection = db.transactions

def get_database():
    return db

def get_transactions_collection():
    return transactions_collection