# 🚀 LinkLane — Scalable URL Shortener

LinkLane is a full-stack URL shortener built with **React, Node.js, Express.js, and MongoDB**.

The project started as a traditional MERN application and is being evolved into a **production-oriented, scalable backend system** with secure authentication, caching, distributed rate limiting, asynchronous analytics processing, containerization, and AWS infrastructure.

> **Goal:** Build a URL-shortening system that demonstrates not only application development, but also backend engineering, scalability, security, cloud architecture, and system-design concepts.

---

## 🏗️ Architecture

### Current Architecture

```text
┌─────────────────┐
│   React Client  │
│     Vercel      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Node.js/Express │
│      API        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    MongoDB      │
└─────────────────┘
```

### Target Production Architecture

The project is being evolved toward a horizontally scalable architecture:

```text
                         ┌─────────────────┐
                         │   React Client  │
                         │     Vercel      │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │  API Gateway    │
                         │ API Management   │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │       ALB       │
                         │ Load Balancer   │
                         └────────┬────────┘
                                  │
                     ┌────────────┴────────────┐
                     ▼                         ▼
              ┌─────────────┐           ┌─────────────┐
              │ Node API #1 │           │ Node API #2 │
              │    EC2      │           │    EC2      │
              └──────┬──────┘           └──────┬──────┘
                     │                         │
                     └──────────┬──────────────┘
                                ▼
                         ┌─────────────┐
                         │    Redis    │
                         │             │
                         │   Cache     │
                         │ Rate Limit  │
                         └──────┬──────┘
                                │
                                ▼
                         ┌─────────────┐
                         │   MongoDB   │
                         └─────────────┘

                     Analytics Pipeline
                              │
                              ▼
                            SQS
                              │
                              ▼
                           Lambda
                         /        \
                        ▼          ▼
                    MongoDB       S3

                         CloudWatch
```

> The AWS architecture above represents the target production architecture. Individual components will be marked as implemented as the project evolves.

---

# ✨ Features

## 🔐 Authentication

* User Signup
* User Login
* Secure password hashing using bcrypt
* JWT authentication
* Short-lived access tokens
* Refresh tokens
* Refresh token rotation
* HttpOnly cookies
* Protected routes
* Logout
* Token expiration handling
* Automatic access-token refresh

### Authentication Flow

```text
Login
  │
  ▼
Generate Access Token
  │
  ├──────────────► Client
  │
  ▼
Generate Refresh Token
  │
  ▼
Store Refresh Token
  │
  ▼
HttpOnly Cookie
```

When the access token expires:

```text
Client
  │
  ▼
API request
  │
  ▼
401 Unauthorized
  │
  ▼
/api/auth/refresh
  │
  ▼
Verify Refresh Token
  │
  ▼
Rotate Refresh Token
  │
  ▼
Generate New Access Token
  │
  ▼
Retry Original Request
```

---

# 🔗 URL Shortener

* Create short URLs
* Custom short codes
* Redirect to original URLs
* Copy short URLs
* Update URLs
* Delete URLs
* URL validation
* Protected URL management

Example:

```text
Long URL

https://example.com/very/long/path/to/some/resource

             ↓

Short URL

https://linklane.com/aB72x
```

---

# 📊 Dashboard

* User profile
* Manage URLs
* Search URLs
* Pagination
* URL statistics
* Click statistics
* Link management

---

# 📈 Analytics

Current analytics include:

* Total clicks
* Link visits
* Creation date
* Click history

Planned analytics:

* Device information
* Browser information
* Operating system
* Country analytics
* Referrer analytics
* Daily click statistics
* Weekly/monthly statistics
* Most popular links
* Analytics export

---

# ⚡ Planned Scalability Architecture

LinkLane is being designed around several important backend engineering principles.

## 1. Redis Caching

Frequently accessed short URLs can generate a large number of database reads.

Instead of querying MongoDB for every redirect:

```text
GET /aB72x
      │
      ▼
    Redis
      │
      ├── Cache Hit ─────► Redirect
      │
      └── Cache Miss
              │
              ▼
           MongoDB
              │
              ▼
        Store in Redis
              │
              ▼
           Redirect
```

The cache will use the short code as the key.

Example:

```text
url:aB72x → https://example.com/...
```

This reduces repeated database reads for frequently accessed links.

---

# 🚦 Distributed Rate Limiting

Rate limiting will protect the API from:

* Abuse
* Brute-force requests
* Excessive URL creation
* Automated traffic
* Accidental traffic spikes

Redis will be used as the shared rate-limit store.

```text
                 ┌─────────────┐
Request ────────►│   Node #1   │
                 └──────┬──────┘
                        │
                        ▼
                   ┌─────────┐
                   │  Redis  │
                   └─────────┘
                        ▲
                        │
                 ┌──────┴──────┐
Request ────────►│   Node #2   │
                 └─────────────┘
```

Using Redis makes rate limiting consistent across multiple application instances.

---

# 📈 Horizontal Scaling

The Node.js API is being designed to remain stateless so multiple instances can run simultaneously.

```text
                 ┌──────────────┐
                 │ Load Balancer│
                 └───────┬──────┘
                         │
                ┌────────┴────────┐
                ▼                 ▼
          ┌──────────┐      ┌──────────┐
          │ Node #1  │      │ Node #2  │
          └──────────┘      └──────────┘
```

Shared state such as:

* Authentication/session-related data
* Cache
* Rate-limit counters

should not depend on a single Node.js process.

This allows additional instances to be added as traffic increases.

---

# ☁️ AWS Architecture

The production architecture is designed to demonstrate practical AWS concepts.

## API Gateway

API Gateway will act as an API-management layer for:

* API entry point
* Request routing
* Throttling
* API versioning
* API monitoring

```text
Client
  │
  ▼
API Gateway
  │
  ▼
Application Load Balancer
```

---

## Application Load Balancer

ALB distributes requests between multiple Node.js instances.

```text
                 ALB
              /       \
             ▼         ▼
        Node API #1  Node API #2
```

This enables:

* Horizontal scaling
* Health checks
* Fault tolerance
* Traffic distribution

---

## EC2

Node.js API instances can run on EC2.

Example:

```text
EC2 #1
Node.js + Express

EC2 #2
Node.js + Express
```

Additional instances can be added as traffic grows.

---

# 📨 Asynchronous Analytics Processing

Analytics processing should not unnecessarily slow down URL redirects.

Instead of doing all analytics work synchronously:

```text
User
 │
 ▼
Redirect API
 │
 ├────► Analytics Processing
 │
 ▼
Redirect
```

The target architecture uses asynchronous processing:

```text
User
 │
 ▼
Node API
 │
 ├──────────────► Redirect immediately
 │
 └──────────────► SQS
                     │
                     ▼
                  Lambda
                     │
                     ▼
                  MongoDB
```

Example event:

```json
{
  "shortCode": "aB72x",
  "timestamp": "2026-10-07T10:30:00Z",
  "userAgent": "...",
  "referrer": "..."
}
```

This separates the user-facing redirect operation from analytics processing.

---

# λ AWS Lambda

Lambda will be used for event-driven/background workloads rather than replacing the main Express API.

Potential workloads:

* Analytics event processing
* Analytics aggregation
* Report generation
* Scheduled cleanup
* Expired-link processing

Example:

```text
SQS
 │
 ▼
Lambda
 │
 ├── Process click event
 ├── Update analytics
 └── Store result
```

---

# 🪣 Amazon S3

S3 will be used for object storage rather than primary application data.

Potential use cases:

* QR code images
* Analytics CSV exports
* Generated reports
* Application-generated files

Example:

```text
Analytics Export
      │
      ▼
    Lambda
      │
      ▼
      S3
      │
      ▼
 Download
```

---

# 📊 Monitoring

CloudWatch will be used for production monitoring.

Potential metrics:

* Request count
* API latency
* 4xx responses
* 5xx responses
* EC2 health
* Lambda execution
* Rate-limit violations
* Application logs
* Cache hit/miss statistics

---

# 🧠 Backend Engineering Concepts

LinkLane is being developed to demonstrate practical understanding of:

* REST API design
* JWT authentication
* Refresh-token rotation
* HttpOnly cookies
* Stateless authentication
* Middleware
* Centralized error handling
* Service-layer architecture
* Repository pattern
* Input validation
* Rate limiting
* Distributed caching
* Cache-aside pattern
* Horizontal scaling
* Load balancing
* Health checks
* Asynchronous processing
* Event-driven architecture
* Database indexing
* API throttling
* Idempotency
* Background jobs
* Observability

---

# 🛠️ Tech Stack

## Frontend

* React
* React Router
* Axios
* Material UI
* React Icons
* Framer Motion

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Cookie Parser
* dotenv

## Planned Infrastructure

* Redis
* Docker
* AWS EC2
* AWS Application Load Balancer
* AWS API Gateway
* AWS SQS
* AWS Lambda
* AWS S3
* AWS CloudWatch

## Development Tools

* Git
* GitHub
* VS Code
* Postman

---

# 📁 Project Structure

```text
LinkLane
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middlewares
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   └── utils
│   │
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── README.md
└── .gitignore
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint            | Description          |
| ------ | ------------------- | -------------------- |
| POST   | `/api/auth/signup`  | Register user        |
| POST   | `/api/auth/login`   | Login user           |
| POST   | `/api/auth/refresh` | Refresh access token |
| POST   | `/api/auth/logout`  | Logout               |

## URLs

| Method | Endpoint       | Description              |
| ------ | -------------- | ------------------------ |
| POST   | `/api/url`     | Create short URL         |
| GET    | `/api/url`     | Get user URLs            |
| GET    | `/:shortCode`  | Redirect to original URL |
| PATCH  | `/api/url/:id` | Update URL               |
| DELETE | `/api/url/:id` | Delete URL               |

---

# 🔒 Security

Current security mechanisms:

* Password hashing
* JWT authentication
* Short-lived access tokens
* Refresh-token rotation
* HttpOnly cookies
* Secure cookies
* Protected routes
* Token expiration
* Environment variables
* MongoDB validation

Planned improvements:

* Redis-backed rate limiting
* Request validation
* Security headers
* CORS hardening
* API throttling
* Abuse prevention
* Audit logging

---

# 🐳 Docker

The backend will be containerized to make the application easier to deploy consistently across environments.

Target architecture:

```text
Docker Image
     │
     ▼
Node.js + Express
     │
     ├── Local development
     ├── EC2
     └── Multiple containers
```

Multiple containers can then be placed behind a load balancer.

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/saiBhandarwad/url-shortner.git
cd url-shortner
```

## Install Frontend

```bash
cd client
npm install
```

## Install Backend

```bash
cd ../server
npm install
```

---

# ⚙️ Environment Variables

Create a `.env` file inside the `server` directory.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

ACCESS_SECRET_KEY=your_access_secret

REFRESH_SECRET_KEY=your_refresh_secret

CLIENT_URL=http://localhost:5173
```

Additional environment variables will be introduced as Redis and AWS infrastructure are implemented.

---

# ▶️ Run Frontend

```bash
cd client
npm run dev
```

# ▶️ Run Backend

```bash
cd server
npm run dev
```

---

# 🧪 Testing

Planned testing layers:

* Unit tests
* API integration tests
* Authentication tests
* Rate-limit tests
* Cache tests
* Load tests
* End-to-end tests

---

# 📌 Development Roadmap

### Phase 1 — Backend Improvements

* [ ] Input validation
* [ ] Service/repository separation
* [ ] Centralized error handling
* [ ] API documentation
* [ ] Health-check endpoint
* [ ] Database indexes

### Phase 2 — Performance

* [ ] Redis caching
* [ ] Cache invalidation strategy
* [ ] Distributed rate limiting
* [ ] Performance testing

### Phase 3 — Containerization

* [ ] Dockerfile
* [ ] Docker Compose
* [ ] Containerized MongoDB/Redis for local development
* [ ] Multi-instance Node.js deployment

### Phase 4 — AWS

* [ ] EC2 deployment
* [ ] Application Load Balancer
* [ ] API Gateway
* [ ] CloudWatch monitoring
* [ ] S3 integration

### Phase 5 — Event-Driven Architecture

* [ ] SQS analytics events
* [ ] Lambda consumer
* [ ] Asynchronous click processing
* [ ] Analytics aggregation
* [ ] S3 analytics exports

### Phase 6 — Advanced Features

* [ ] QR code generation
* [ ] Email verification
* [ ] Forgot/reset password
* [ ] OAuth login
* [ ] Link expiration
* [ ] Password-protected links
* [ ] Custom domains
* [ ] Admin dashboard

---

# 🎯 Interview Engineering Scenarios

LinkLane is designed to provide practical discussion around real-world backend scenarios.

### What happens if traffic suddenly increases?

Use:

```text
Load Balancer
      ↓
Multiple Node instances
      ↓
Redis
      ↓
MongoDB
```

### What happens if the same URL is requested thousands of times?

Use Redis caching to avoid repeatedly querying MongoDB.

### What happens if multiple servers need the same rate-limit counter?

Use Redis instead of process-local memory.

### What happens if analytics processing is slow?

Move analytics processing to an asynchronous SQS + Lambda workflow.

### What happens if one backend instance fails?

The load balancer can stop sending traffic to the unhealthy instance.

### Why not store everything in Node.js memory?

Because memory is local to one process and does not work reliably when the application is horizontally scaled.

### Why use Lambda?

For event-driven/background workloads where maintaining a continuously running server is unnecessary.

### Why use S3?

For durable object storage such as generated reports, QR codes, and exported analytics.

---

# 👨‍💻 Author

**SaiParsad Bhandarwad**

GitHub: [saiBhandarwad](https://github.com/saiBhandarwad)

LinkedIn: [Sai Bhandarwad](https://www.linkedin.com/in/sai-bhandarwad-494483217)

---

# ⭐ Support

If you find LinkLane useful, consider giving the repository a ⭐.

---

# 📜 License

This project is licensed under the MIT License.
