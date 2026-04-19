import asyncio
import os
import json
import time

import psycopg2
from redis import Redis

# Loading .env variables
redis_h = os.getenv("REDIS_HOST", "localhost")
redis_p = os.getenv("REDIS_PORT", "6379")

# Connecting to Redis queue
r = Redis(host=redis_h, port=int(redis_p), decode_responses=True)

# DB-Connecting function
def db_connect():
    return psycopg2.connect(
        host=os.getenv("DB_HOST", "db"),
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD")
    )

print("--- CHECKOUT PRINTER READY ---", flush=True)

while True:
    # Enetering an queue
    task = r.brpop("orders_queue")

    if task:
        data = json.loads(task[1])

        try:
            items_string = ", ".join([f"{i['name']} (x{i['qty']})" for i in data['items']])

            print("\n" + "=" * 30, flush=True)
            print(f"NEW ORDER: {data['order_number']}", flush=True)
            print("-" * 30, flush=True)
            print(f"Customer_email: {data['customer_email']}", flush=True)
            print(f"Customer_Name: {data['customer_name']}", flush=True)
            print(f"Customer_Surname: {data['customer_surname']}", flush=True)
            print(f"Address:  {data['address']}", flush=True)
            print("-" * 30, flush=True)

            for item in data['items']:
                line = f"{item['name'][:18]:<20} x{item['qty']} {item['price']:>6}$"
                print(line, flush=True)

            print("-" * 30, flush=True)
            print(f"TOTAL: {data['total_price']:>21}$", flush=True)
            print("=" * 30 + "\n", flush=True)

            print(f"ORDER: {data['order_number']} saved to DB", flush=True)

            conn = db_connect()
            cursor = conn.cursor()

            cursor.execute("""
                CREATE TABLE IF NOT EXISTS orders (
                    id SERIAL PRIMARY KEY,
                    order_number TEXT NOT NULL UNIQUE,
                    name TEXT NOT NULL,
                    surname TEXT NOT NULL,
                    email TEXT NOT NULL,
                    address TEXT NOT NULL,
                    total_price FLOAT NOT NULL,
                    items_list TEXT NOT NULL,
                    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                )
            """)

            cursor.execute("INSERT INTO orders (order_number, name, surname, email, address, total_price, items_list) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                            (data.get('order_number'),
                                data.get('customer_name'),
                                data.get('customer_surname'),
                                data.get('customer_email'),
                                data.get('address'),
                                data.get('total_price'),
                                items_string
                                )
                           )

            conn.commit()
            cursor.close()
            conn.close()

            r.lpush("email_queue", json.dumps(data))

        except Exception as e:
            print(f"Error: {e}", flush=True)
