# 🚀 Microservices Order System
**Next.js + FastAPI + Redis + PostgreSQL + SMTP Workers**

A modern full-stack microservices architecture demonstrating asynchronous task processing, background workers, and automated styled email reporting.

---

## 🏗 System Architecture & Data Flow
This project follows a decoupled microservice pattern to ensure high performance and scalability:

1.  **Frontend (Next.js)**: The user interface where orders are placed. It communicates with the Gateway API.
2.  **Gateway (FastAPI)**: Acts as the entry point. It receives order data and instantly pushes it into a **Redis Queue** (`orders_queue`) to avoid blocking the user.
3.  **Worker-Writer (Python)**: A background service that listens to Redis. It validates the data and writes the order details into **PostgreSQL**. Once saved, it triggers the next step by pushing to the `email_queue`.
4.  **Worker-Sender (Python)**: A dedicated service for notifications. It picks up tasks from Redis, generates a Pinterest-style HTML receipt, and sends it via **SMTP**.



---

## 🛠 Tech Stack
- **Frontend**: React 18, Next.js 14 (App Router), TailwindCSS, Framer Motion (Animations).
- **Backend API**: FastAPI (Python), Pydantic.
- **Message Broker**: Redis.
- **Database**: PostgreSQL.
- **Background Tasks**: Python workers (Psycopg2, Redis-py, Smtplib).
- **Infrastructure**: Docker & Docker Compose.

---

## ⚙️ Setup & Configuration

### 1. Environment Variables (.env)
Create a `.env` file in the root directory. **Never commit this file to Git.**

```env
# Email Credentials
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-16-digit-app-password

# Database Configuration
DB_USER=admin
DB_PASSWORD=password
DB_NAME=orders_db
DB_HOST=db

# Redis
REDIS_HOST=redis
```

### 2. How to get the Google App Password
Standard passwords will not work due to Google's security layers.

Go to your Google Account > Security.

Enable 2-Step Verification.

Search for "App Passwords" in the settings search bar.

Create a new app (Name it Store-Worker).

Copy the 16-character code. Use this as your EMAIL_HOST_PASSWORD.

---

## 🖥️ Local Development (Running the Project)
First-time Launch
Use Docker Compose to build and start all services simultaneously:

Bash
docker-compose up --build
Accessing the services:
Frontend: http://localhost:3000

Gateway API: http://localhost:8000

Database (Postgres): Internal port 5432

Hard Reset (Wipe Database)
If you change the DB schema in your workers and need to reset the tables:

Bash
```
docker-compose down -v
docker-compose up --build
```
---
## 💡 Technical Implementation Details 
Proper Prop Handling in Next.js
To ensure the UI updates correctly (e.g., clearing the cart after checkout), always use Destructuring in your component arguments. This prevents naming conflicts and ensures TypeScript recognizes the functions:

### TypeScript
```
// Correct way to define props
export default function CartComponent({ items, onRemove, onClear }: Props) {
  // Now onClear() is available directly in your handleCheckout function
}
```
Next.js vs FastAPI Data Alignment
To prevent "Field Not Found" errors, ensure your Frontend JSON keys match your Backend Pydantic models exactly.

Frontend: customer_name, customer_surname

FastAPI: class Order(BaseModel): customer_name: str...

Docker Folder Structure
Ensure each worker has its own Dockerfile inside its directory:

/worker-writer/Dockerfile -> Needs libpq-dev for Postgres.

/worker-sender/Dockerfile -> Needs only redis library.

---
# 📤 Deployment Checklist (GitHub)
.gitignore: Ensure node_modules, .next, __pycache__, and .env are listed.


Check Commands: Ensure your docker-compose.yml uses the correct file names (e.g., worker_writer.py vs worker-writer.py).


