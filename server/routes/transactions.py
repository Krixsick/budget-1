from fastapi import APIRouter, HTTPException
from models import Transaction, TransactionResponse
from database import get_transactions_collection

router = APIRouter(prefix="/transactions", tags=["transactions"])
collection = get_transactions_collection()

@router.post("/add")
async def add_transaction(transaction: Transaction):
    """Add a new transaction (expense or income)"""
    try:
        result = collection.insert_one(transaction.dict())
        return {
            "message": "Transaction added successfully!",
            "id": str(result.inserted_id),
            "transaction": transaction.dict()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/all")
async def get_all_transactions():
    """Get all transactions"""
    try:
        transactions = []
        for doc in collection.find():
            transactions.append({
                "id": str(doc["_id"]),
                "category": doc.get("category", ""),
                "amount": doc.get("amount", 0),
                "type": doc.get("type", "expense")
            })
        return {"count": len(transactions), "transactions": transactions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/expenses")
async def get_expenses():
    """Get all expenses"""
    try:
        transactions = []
        for doc in collection.find({"type": "expense"}):
            transactions.append({
                "id": str(doc["_id"]),
                "category": doc.get("category", ""),
                "amount": doc.get("amount", 0),
                "type": "expense"
            })
        total = sum(t["amount"] for t in transactions)
        return {
            "count": len(transactions),
            "total": total,
            "expenses": transactions
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/income")
async def get_income():
    """Get all income"""
    try:
        transactions = []
        for doc in collection.find({"type": "income"}):
            transactions.append({
                "id": str(doc["_id"]),
                "category": doc.get("category", ""),
                "amount": doc.get("amount", 0),
                "type": "income"
            })
        total = sum(t["amount"] for t in transactions)
        return {
            "count": len(transactions),
            "total": total,
            "income": transactions
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/summary")
async def get_summary():
    """Get budget summary"""
    try:
        expenses = list(collection.find({"type": "expense"}))
        income = list(collection.find({"type": "income"}))
        
        total_expenses = sum(doc.get("amount", 0) for doc in expenses)
        total_income = sum(doc.get("amount", 0) for doc in income)
        balance = total_income - total_expenses
        
        return {
            "total_income": total_income,
            "total_expenses": total_expenses,
            "balance": balance,
            "transactions": {
                "income_count": len(income),
                "expense_count": len(expenses)
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/clear")
async def clear_transactions():
    """Clear all transactions (for testing)"""
    try:
        result = collection.delete_many({})
        return {"message": f"Deleted {result.deleted_count} transactions"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))