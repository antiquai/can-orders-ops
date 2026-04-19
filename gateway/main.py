from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from redis import Redis
import json
from pydantic import BaseModel
from typing import List
import os


redis_h = os.getenv("REDIS_HOST", "localhost")
redis_p = os.getenv("REDIS_PORT", "6379")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

r = Redis(host=redis_h, port=int(redis_p), decode_responses=True)

class CartItem(BaseModel):
    name: str
    price: float
    qty: int

class Order(BaseModel):
    customer_name: str
    customer_surname: str
    customer_email: str
    address: str
    items: List[CartItem]
    total_price: float



@app.post("/buy/{item_id}")
async def buy_item(item_id: int, order: Order):
    # Generating Orders-number
    order_num = r.incr("order_counter")

    payload = order.dict()
    # Formate
    payload["order_number"] = f"ORD-{order_num:03d}"  

    r.lpush("orders_queue", json.dumps(payload))
    return {"status": "sent", "order_id": payload["order_number"]}