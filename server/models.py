from pydantic import BaseModel, Field

class Transaction(BaseModel):
    category: str = Field(...)
    amount: float = Field(...)
    type: str = Field(...) 
    month: str = Field(...)

class TransactionResponse(BaseModel):
    id: str
    category: str
    amount: float
    type: str
    month: str