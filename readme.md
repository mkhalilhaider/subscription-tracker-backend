# 📬 Subscription Tracker Backend

A backend API to manage users and their subscription reminders using Node.js, Express, MongoDB, JWT, Arcjet and Upstash Workflows.

---

## 🚀 Tech Stack

- Node.js + Express  
- MongoDB (Mongoose)  
- JWT (Authentication)  
- bcryptjs (Password hashing)  
- Arcjet (Bot detection & Rate limiting)  
- Nodemailer (Emails)  
- Upstash Workflows (Automated reminders)  
- dotenv, cookie-parser, dayjs  

---

## 🛠️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/subscription-tracker-backend.git
cd subscription-tracker-backend
npm install
```

### Setup Environment Variables
```bash
# PORT
PORT=5500
SERVER_URL="http://localhost:5500"

# ENVIRONMENT
NODE_ENV=development

# DATABASE
DB_URI=

# JWT AUTH
JWT_SECRET=
JWT_EXPIRES_IN="1d"

# ARCJET
ARCJET_KEY=
ARCJET_ENV="development"

# UPSTASH
QSTASH_URL=http://127.0.0.1:8080
QSTASH_TOKEN=

# NODEMAILER
EMAIL_PASSWORD=
```
### Run the server
```
npm run dev
```
---

## 🔐 Features

- ✅ JWT-based authentication (Signup & Signin)
- ✅ Password hashing with bcryptjs
- ✅ Middleware to protect routes
- ✅ Arcjet integration for bot protection & rate limiting
- ✅ Email reminders using Upstash Workflows
- ⚠️ Subscription route in progress
- ⚙️ Custom error handling middleware

---

## 🧪 API Testing

Use Postman or ThunderClient to test endpoints.
Attach token in the Authorization header:
```bash
Authorization: Bearer <your_token>
```

---

## 🧠 Known Issues / TODOs

- Add input validation for subscription routes
- Secure admin-only routes (all users, all subs)
- Add delete/edit subscription routes
- Add test coverage (optional)

---

## 📚 Credits

This backend project was built by closely following a tutorial by [adrianhajdin](https://github.com/adrianhajdin).  
Currently matches the tutorial structure — planning to expand it with additional features and personal improvements soon.

---

## 🤝 Connect with Me

I'm always open to discussions, collaborations, and learning from others. **Let's connect!**

- [![LinkedIn](https://img.shields.io/badge/-LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mkhalilhaider/)
- [![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/mkhalilhaider)