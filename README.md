```
██╗    ██╗███████╗██████╗ ██████╗  ██████╗  ██████╗ ██╗  ██╗
██║    ██║██╔════╝██╔══██╗██╔══██╗██╔═══██╗██╔═══██╗██║ ██╔╝
██║ █╗ ██║█████╗  ██████╔╝██████╔╝██║   ██║██║   ██║█████╔╝ 
██║███╗██║██╔══╝  ██╔══██╗██╔══██╗██║   ██║██║   ██║██╔═██╗ 
╚███╔███╔╝███████╗██████╔╝██████╔╝╚██████╔╝╚██████╔╝██║  ██╗
 ╚══╝╚══╝ ╚══════╝╚═════╝ ╚═════╝  ╚═════╝  ╚═════╝ ╚═╝  ╚═╝
                                                       
                    WebBook
        A Secure MERN Stack Bookmark Manager
```

**WebBook** is a full-stack **bookmark management application** built with the **MERN stack**.  
It provides a **production-grade authentication system**, secure session handling, email verification, password recovery, Google OAuth, and a powerful **searchable & tag-based bookmark system**, all wrapped in a clean, minimal, modern UI.

This project was built as a **practice + portfolio project**, following real-world architecture, security standards, and deployment workflows.

---

## ✨ Features

### 🔐 Authentication & Security
- Email & password authentication
- Google OAuth login (Passport.js)
- Email verification on signup
- Resend verification email
- Forgot password & reset password flow
- Set password for Google-authenticated users
- JWT-based authentication
- HTTP-only, secure cookies
- URL-based JWT verification for email actions
- Rate limiting to prevent brute-force attacks
- Fully protected backend & frontend routes
- Input validation on all routes

---

### 🔖 Bookmark Management
- Create, read, update, delete bookmarks
- Bookmark fields:
  - Title
  - Description
  - URL
  - Tags
- User-specific bookmarks (foreign key relationship)
- Secure, protected bookmark APIs

---

### 🔍 Search & Tags
- Search bookmarks by **title**
- Search bookmarks by **tags**
- Combined search logic for fast filtering
- Tag-based organization for better bookmark management

---

### 📧 Email System
- **Development**: Nodemailer
- **Production**: Resend email service
- Custom domain-based email sending
- Verification emails
- Password reset emails
- Resend verification flow
- Dedicated **success** and **expired** email pages

---

### 🎨 Frontend Experience
- Minimal, modern UI
- Clean branding & logos
- Toast notifications
- Modals for user feedback
- React Hook Form for form management
- Context API as a single source of truth for authentication
- Custom hooks for bookmark CRUD operations
- API abstraction layer for data fetching
- Fully protected frontend routing

---

### 🚀 Production & Deployment
- Backend deployed on **Render**
- Frontend deployed on **Render**
- Environment-based configuration
- HTTPS-only authentication
- Secure cookies in production
- Production-ready security & branding standards

---

## 🛠️ Tech Stack

### Frontend
- React
- Context API
- React Router
- React Hook Form
- Toast notifications
- UI & icon libraries

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Passport.js (Google OAuth)
- Nodemailer (development)
- Resend (production)
- Rate limiting & request validation

---

## 📂 Project Structure

```txt
webbook/
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Bookmark.js
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── api/
│   │   ├── components/
│   │   └── pages/
│   └── package.json
│
└── README.md
```

---

## 🎥 App Preview



---

## 🌐 Live Demo

🔗 Live Application

https://webbook-yuv.onrender.com

---

## 🎯 Purpose

WebBook was built as a real-world MERN stack practice project to demonstrate:

- Secure authentication & authorization
- Email-based verification workflows
- OAuth integration
- RESTful API design
- Production-ready backend architecture
- Clean, scalable frontend state management
- Deployment and environment configuration

This is a project I’m confidently proud to showcase on my CV.

## 👨‍💻 Author

Yuvraj Singh

GitHub: https://github.com/18yuv