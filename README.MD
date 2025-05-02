
# 🚗 Uber-like Backend Service (NestJS, Redis, Kafka)

This is a backend-first project designed to simulate a simplified Uber-like ride-sharing service. It will be built using **NestJS** and integrates **Redis**, **Kafka**, and other backend technologies to explore real-world patterns like microservices, pub/sub, caching, and real-time updates.

---

## 📚 Tech Stack

- **NestJS** – Scalable Node.js framework
- **Kafka** – Event-driven communication (ride requests, notifications)
- **Redis** – Real-time location caching, session storage
- **PostgreSQL** – Relational database for user/ride data
- **Docker** – Containerized development environment
- **WebSocket (optional)** – Real-time notifications

---

## 🚀 Features

- Rider/Driver authentication with JWT
- Role-based user access (Rider, Driver)
- Ride lifecycle: \`requested → accepted → in_progress → completed\`
- Kafka-powered ride event streaming
- Redis for temporary location caching
- Real-time location tracking (WebSockets or polling)
- Docker setup for Kafka, Redis, PostgreSQL

---

## 🐳 Run with Docker

\`\`\`bash
docker-compose up -d
\`\`\`

---

## 🧪 API Testing

Use Postman or Insomnia to test routes like:
- \`POST /auth/signup\`
- \`POST /rides/request\`
- \`POST /drivers/:id/location\`

---

## 📦 Future Enhancements

- Google Maps integration
- Real payment mock flow
- Admin dashboard
- In-app chat (via Kafka/WebSocket)

---

## 📄 License

MIT – Feel free to use, improve, and share!
