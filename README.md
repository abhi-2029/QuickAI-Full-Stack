# 🚀 QuickAI – Full Stack AI Web App

QuickAI is a full-stack AI-powered web application that allows users to:

* ✍️ Generate articles
* 📝 Create blog titles
* 🖼️ Generate images
* 🔐 Authenticate users (Clerk)

Built with a modern stack and deployed on **Vercel**.

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios
* Clerk Authentication

### Backend (Serverless on Vercel)

* Node.js
* Groq API (AI text generation)
* Serverless Functions (`/api`)

---

## 📁 Project Structure

```
QuickAI/
│
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   ├── package.json
│
├── api/                    # Backend (Vercel serverless)
│   └── ai/
│       ├── article.js
│       ├── blog-title.js
│       └── generate-image.js
│
├── package.json            # Backend dependencies
└── README.md
```

---

## ⚙️ Features

* ✅ AI Article Generator
* ✅ Blog Title Generator
* ✅ Image Generator
* ✅ Authentication with Clerk
* ✅ Fully deployed on Vercel

---

## 🚀 Getting Started (Local Setup)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/quickai.git
cd quickai
```

---

### 2️⃣ Setup Backend

```bash
npm install
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

```
GROQ_API_KEY=your_api_key
```

---

### 5️⃣ Run Project

* Frontend → http://localhost:5173
* Backend → http://localhost:3000 (if using local server)

---

## 🌍 Deployment (Vercel)

### Steps:

1. Push project to GitHub
2. Import project in Vercel
3. Set **Root Directory → client**
4. Add Environment Variables:

   ```
   GROQ_API_KEY=your_key
   ```
5. Deploy 🚀

---

## 🔗 API Routes

| Route                    | Description          |
| ------------------------ | -------------------- |
| `/api/ai/article`        | Generate article     |
| `/api/ai/blog-title`     | Generate blog titles |
| `/api/ai/generate-image` | Generate image       |

---

## 🧠 Key Learnings

* Serverless architecture on Vercel
* API integration with AI models
* Frontend-backend communication
* Authentication handling

---

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Abhishek Ranjan**

* GitHub: [https://github.com/your-username](https://github.com/abhi-2029)
* LinkedIn: [(add your link)](https://www.linkedin.com/in/abhishekranjan20/)

---

⭐ If you like this project, give it a star!
