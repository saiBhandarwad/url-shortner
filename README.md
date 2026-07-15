# 🚀 LinkLane - URL Shortener

LinkLane is a modern full-stack URL Shortener built using the MERN Stack. It allows users to shorten long URLs, manage their links, track analytics, and securely authenticate using JWT-based authentication with refresh token rotation.

> A production-inspired backend architecture with secure authentication, REST APIs, and a modern React frontend.

---

## 📸 Screenshots

> Add screenshots after deployment.

| Home | Dashboard |
|------|-----------|
| ![Home](./docs/home.png) | ![Dashboard](./docs/dashboard.png) |

---

# ✨ Features

## Authentication

- User Signup
- User Login
- Secure Password Hashing (bcrypt)
- JWT Authentication
- Access Token
- Refresh Token
- Refresh Token Rotation
- HttpOnly Cookies
- Protected Routes
- Logout
- Token Expiry Handling

---

## URL Shortener

- Create Short URLs
- Custom Short Codes
- Redirect to Original URL
- Copy Short URL
- Delete URLs
- Update URLs
- URL Validation

---

## Dashboard

- User Profile
- Manage URLs
- Search URLs
- Pagination
- Statistics

---

## Analytics

- Total Clicks
- Link Visits
- Creation Date
- Click History
- Device Information *(Coming Soon)*
- Browser Information *(Coming Soon)*
- Country Analytics *(Coming Soon)*

---

## Frontend

- Modern UI
- Responsive Design
- React Router
- Protected Pages
- Dark Theme
- Beautiful Animations
- Axios API Integration

---

## Backend

- MVC Architecture
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cookie Authentication
- Refresh Token Rotation
- Middleware
- REST APIs
- Environment Variables
- Error Handling

---

# 🛠 Tech Stack

## Frontend

- React
- React Router
- Axios
- Tailwind CSS / Material UI *(Choose one)*
- React Icons
- Framer Motion

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Cookie Parser
- dotenv

---

## Tools

- Git
- GitHub
- VS Code
- Postman

---

# 📁 Project Structure

```
LinkLane
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── src
│   │
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   ├── app.js
│   └── server.js
│
│   ├── package.json
│   └── .env.example
│
├── README.md
└── .gitignore
```

---

# 🔐 Authentication Flow

```
Signup/Login

↓

Generate Access Token (5 min)

↓

Generate Refresh Token (7 Days)

↓

Store Refresh Token in MongoDB

↓

Store Refresh Token in HttpOnly Cookie

↓

Client sends Access Token

↓

Access Token expires

↓

Frontend automatically calls /refresh

↓

Refresh Token verified

↓

Generate New Access Token

↓

Rotate Refresh Token

↓

Continue Session
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/LinkLane.git
```

```
cd LinkLane
```

---

## Install Frontend

```bash
cd client
npm install
```

---

## Install Backend

```bash
cd ../server
npm install
```

---

# ⚙ Backend Environment Variables

Create a `.env` file inside the **server** directory.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

ACCESS_SECRET_KEY=your_access_secret

REFRESH_SECRET_KEY=your_refresh_secret

CLIENT_URL=http://localhost:5173
```

---

# ▶ Run Frontend

```bash
cd client
npm run dev
```

---

# ▶ Run Backend

```bash
cd server
npm run dev
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/auth/signup | Register User |
| POST | /api/auth/login | Login User |
| POST | /api/auth/refresh | Refresh Access Token |
| POST | /api/auth/logout | Logout |

---

## URLs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/url | Create Short URL |
| GET | /api/url | Get User URLs |
| GET | /:shortCode | Redirect URL |
| PATCH | /api/url/:id | Update URL |
| DELETE | /api/url/:id | Delete URL |

---

# 🔒 Security Features

- Password Hashing
- JWT Authentication
- Refresh Token Rotation
- HttpOnly Cookies
- Secure Cookies
- Environment Variables
- Protected Routes
- Token Expiration
- MongoDB Validation

---

# 🚧 Future Improvements

- QR Code Generation
- Email Verification
- Forgot Password
- Reset Password
- OAuth Login (Google/GitHub)
- Rate Limiting
- Redis Caching
- Docker
- Swagger Documentation
- AWS Deployment
- Cloudinary
- Link Expiration
- Custom Domains
- Link Password Protection
- Admin Dashboard

---

# 🧪 Testing

Coming Soon

- Unit Testing
- Integration Testing

---

# 👨‍💻 Author

**SaiParsad Bhandarwad**

- GitHub: https://github.com/saiBhandarwad
- LinkedIn: https://www.linkedin.com/in/sai-bhandarwad-494483217

---

# ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.

---

# 📜 License

This project is licensed under the MIT License.
