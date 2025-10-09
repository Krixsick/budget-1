from fastapi import APIRouter, HTTPException, Query
from models import Transaction, TransactionResponse
from database import get_transactions_collection
from bson import ObjectId

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
async def get_all_transactions(month: str = Query(None)):
    """Get all transactions, optionally filtered by month"""
    try:
        query = {"month": month} if month else {}
        transactions = []
        for doc in collection.find(query):
            transactions.append({
                "id": str(doc["_id"]),
                "category": doc.get("category", ""),
                "amount": doc.get("amount", 0),
                "type": doc.get("type", "expense"),
                "month": doc.get("month", "")
            })
        return {"count": len(transactions), "transactions": transactions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/expenses")
async def get_expenses(month: str = Query(None)):
    """Get all expenses, optionally filtered by month"""
    try:
        query = {"type": "expense"}
        if month:
            query["month"] = month
            
        transactions = []
        for doc in collection.find(query):
            transactions.append({
                "id": str(doc["_id"]),
                "category": doc.get("category", ""),
                "amount": doc.get("amount", 0),
                "type": "expense",
                "month": doc.get("month", "")
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
async def get_income(month: str = Query(None)):
    """Get all income, optionally filtered by month"""
    try:
        query = {"type": "income"}
        if month:
            query["month"] = month
            
        transactions = []
        for doc in collection.find(query):
            transactions.append({
                "id": str(doc["_id"]),
                "category": doc.get("category", ""),
                "amount": doc.get("amount", 0),
                "type": "income",
                "month": doc.get("month", "")
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
async def get_summary(month: str = Query(None)):
    """Get budget summary, optionally filtered by month"""
    try:
        expense_query = {"type": "expense"}
        income_query = {"type": "income"}
        
        if month:
            expense_query["month"] = month
            income_query["month"] = month
        
        expenses = list(collection.find(expense_query))
        income = list(collection.find(income_query))
        
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
async def clear_transactions(month: str = Query(None)):
    """Clear all transactions or transactions for a specific month"""
    try:
        query = {"month": month} if month else {}
        result = collection.delete_many(query)
        
        if month:
            return {"message": f"Deleted {result.deleted_count} transactions for {month}"}
        else:
            return {"message": f"Deleted all {result.deleted_count} transactions"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{transaction_id}")
async def delete_transaction(transaction_id: str):
    """Delete a specific transaction by ID"""
    try:
        result = collection.delete_one({"_id": ObjectId(transaction_id)})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Transaction not found")
            
        return {"message": "Transaction deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))