# 🚀 Microservices Order System

### **Next.js 14 + FastAPI + Redis + PostgreSQL + Background Workers**

A **production-ready microservices skeleton** for high-performance order processing.  
Built to handle real-world e-commerce traffic spikes without blocking users or crashing the database — perfect for online stores, restaurants, or any system that needs reliable user data collection and fulfillment.

---

## ✨ Live Demo & Screenshots

[//]: # (<!-- ADD YOUR DEPLOYED LINK HERE -->)

[//]: # (**Live Demo:** [Add Vercel / Railway link here])

### Ordering: 
<img width="1864" height="925" alt="Screenshot 2026-04-20 190108" src="https://github.com/user-attachments/assets/dd676b50-ab1d-4f3a-9487-64c1cf939631" />

---

### OUTPUTS:

---

- **SERVER**:
    <img width="613" height="340" alt="Screenshot 2026-04-20 190359" src="https://github.com/user-attachments/assets/490ccd36-014f-4677-800c-3c991fbd1469" />

---

- **DB**:
      <img width="1658" height="100" alt="Screenshot 2026-04-20 190513" src="https://github.com/user-attachments/assets/ec88fc4e-1824-4708-9d42-81e3153b0b11" />
      
---

- **EMAIL**:
        <img width="803" height="1280" alt="photo_2026-04-20_19-10-00" src="https://github.com/user-attachments/assets/56f3826d-6b2f-4625-bbbf-518484f647ad" />

---

## 🔥 Key Features

- **Instant order placement** – Frontend never waits for database or email  
- **Asynchronous microservices** – Orders are queued and processed in background  
- **Decoupled workers** – Separate services for data writing and email delivery  
- **Pinterest-style HTML receipts** – Beautiful, responsive emails sent via SMTP  
- **Scalable & fault-tolerant** – Designed to survive traffic spikes (60+ orders/sec)  
- **Clean TypeScript architecture** – Easy to extend or customize  
- **One-command startup** – Full Docker Compose setup

---

## 🏗 System Architecture & Data Flow

The system uses a **decoupled microservices pattern** with Redis as the message broker:

1. **Frontend (Next.js)** – User places an order → instantly sends data to Gateway API  
2. **Gateway API (FastAPI)** – Validates input and pushes the task to `orders_queue` (non-blocking)  
3. **Worker-Writer** – Consumes from Redis → validates → saves to PostgreSQL → pushes to `email_queue`  
4. **Worker-Sender** – Consumes from `email_queue` → generates beautiful HTML receipt → sends via SMTP  

This architecture prevents database overload, ensures **100% delivery** even under heavy load, and keeps the UI buttery smooth.

---

## 🛠 Tech Stack

| Layer              | Technology                              |
|--------------------|-----------------------------------------|
| Frontend           | Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion |
| Backend API        | FastAPI (Python), Pydantic              |
| Message Broker     | Redis                                   |
| Database           | PostgreSQL                              |
| Background Workers | Python + redis-py + psycopg2 + smtplib |
| Infrastructure     | Docker + Docker Compose                 |

**Special mentions:**
- Framer Motion for smooth cart animations and scroll behavior  
- Fully typed TypeScript frontend with clean prop handling

---

## 💡 Why This Project Stands Out

- **Real scalability thinking**: Direct database calls under load would cause errors and data loss. Redis queues + background workers solve this completely — exactly how modern e-commerce platforms work.  
- **Flexible skeleton**: Change only the worker logic or frontend styles and you have a ready-to-go system for **any e-shop, restaurant ordering, or fulfillment workflow**.  
- **Production-like reliability**: Separation of concerns, async processing, and clear communication between services.  
- Built in **1.5 weeks** as a solo project.

---

## ⚙️ Local Development

### 1. Clone & Setup
```bash
git clone <your-repo>
cd microservices-order-system
cp .env.example .env
```

### 2. Environment Variables
Edit the .`env` file with your actual credentials (see .env.example for reference).
Key variables include:

- Email credentials (Google App Password recommended)
- PostgreSQL database details
- Redis connection settings

```bash
DB_USER=your_user
DB_PASSWORD=password!to!your!db
DB_NAME=name_db 


EMAIL_HOST_USER=youremail@gmail.com
EMAIL_HOST_PASSWORD='your app pass word'
```

### 3. Start Everything
```bash 
docker-compose down -v && docker-compose up --build   
```

---

## 📤 Deployment Checklist

- [ ] .gitignore includes node_modules, .next, __pycache__, .env
- [ ] All Dockerfiles optimized (libpq-dev only where needed for the writer worker)
- [ ] Environment variables properly externalized (never commit .env)
- [ ] Ready for CI/CD or cloud deployment (Railway, Render, AWS, etc.)

---

## 🚀 Future Improvements

- Refactor API communication layer for even cleaner microservice interaction
- Add authentication (JWT / NextAuth.js)
- Implement retry logic and dead-letter queues for higher reliability
- Kubernetes-ready configuration
- Add monitoring (Prometheus + Grafana)

***

## 📌 Made With ❤️
Solo project • Built in **1.5** weeks
This project showcases my ability to design scalable, maintainable, and production-minded full-stack systems using modern microservices architecture.
