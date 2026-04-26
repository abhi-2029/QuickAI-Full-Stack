# 🚀 QuickAI – Full Stack AI Web App

QuickAI is a full-stack AI-powered web application that allows users to generate content instantly using artificial intelligence.

Users can:
- ✍️ Generate articles  
- 📝 Create blog titles  
- 🖼️ Generate images  
- 🔐 Sign in securely using authentication  

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- Clerk Authentication

### Backend
- Node.js
- Express.js
- Groq API (AI text generation)
- Clipdrop API (Image generation)

### Database & Cloud
- Neon PostgreSQL (Database)
- Cloudinary (Image storage)

### Deployment
- Render (Backend + Frontend)

---

## 📁 Project Structure


---

## 📁 Project Structure

```
QuickAI-Full-Stack/
│
├── client/ # Frontend (React + Vite)
│ ├── src/
│ ├── package.json
│
├── server/ # Backend (Node.js + Express)
│ ├── controllers/
│ ├── routes/
│ ├── db.js
│ ├── server.js
│
├── README.md
```

---


---

## ⚙️ Features

- ✅ AI Article Generator  
- ✅ Blog Title Generator  
- ✅ AI Image Generator  
- ✅ Secure Authentication (Clerk)  
- ✅ Database integration (Neon PostgreSQL)  
- ✅ Cloud image storage (Cloudinary)  
- ✅ Fully deployed full-stack application  

---

## 🚀 Getting Started (Local Setup)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/abhi-2029/QuickAI-Full-Stack.git
cd QuickAI-Full-Stack
```

---

### 2️⃣ Setup Backend

```bash
cd server
npm install
npm run server
```

---

### 3️⃣ Setup Frontend

```bash
cd client
npm install
npm run dev
```

---

### 4️⃣ Environment Variables

Create a `.env` file in root:
Backend (server/.env)

```
DATABASE_URL=your_neon_db_url
CLERK_SECRET_KEY=your_clerk_secret
GROQ_API_KEY=your_groq_key
CLIPDROP_API_KEY=your_clipdrop_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_secret
```
Create a `.env` file in root:
Frontend (client/.env)
```
VITE_BASE_URL=your_backend_url
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
---
```
### 5️⃣ Run Project
```
* Frontend → http://localhost:5173
* Backend → http://localhost:3000 (if using local server)
---
```

## 🌍 Deployment (Render)

Backend Deployment
```
Create Web Service
Root Directory → server
Build Command → npm install
Start Command → node server.js
Add all backend environment variables
```
Frontend Deployment
```
Create Static Site
Root Directory → client
Build Command → npm install && npm run build
Publish Directory → dist
Add frontend environment variables
```


## 🔗 API Routes
```

| Route                    | Description          |
| ------------------------ | -------------------- |
| `/api/ai/article`        | Generate article     |
| `/api/ai/blog-title`     | Generate blog titles |
| `/api/ai/generate-image` | Generate image       |
```

## 🧠 Key Learnings
```
#Full-stack development using React and Node.js
#Integration of multiple AI APIs
#Authentication and user management
#Database handling with PostgreSQL
#Real-world deployment using Render
```

🎯 Future Improvements
```
Add more AI tools
Improve UI/UX
Add user history tracking
Optimize performance
```
---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Abhishek Ranjan**

* GitHub: [Github](https://github.com/abhi-2029)
* LinkedIn: [Linkedin](https://www.linkedin.com/in/abhishekranjan20/)

---

⭐ If you like this project, give it a star!
