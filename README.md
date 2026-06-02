# 🚀 QuickAI – Full Stack AI Web App

QuickAI is a full-stack AI-powered web application that allows users to:

* ✍️ **Generate articles** (with adjustable short, medium, and long configurations)
* 📝 **Create blog titles** using AI
* 🖼️ **Generate images** (integrating the Clipdrop API to generate real AI images directly to base64 Data URIs)
* 🔐 **Authenticate users** via Clerk
* 📂 **Manage & Publish creations** in a central public Dashboard and Community feed

Built with a modern stack, Dockerized, configured for Kubernetes orchestrations, and ready for deployment on **Vercel** or cloud clusters.

---

## 🛠️ Tech Stack

### Frontend
* **React (Vite)**
* **Tailwind CSS v4**
* **Lucide Icons**
* **Clerk Authentication**
* **Axios & React Markdown**

### Backend
* **Node.js & Express**
* **Groq API & Llama Models** (for text generation)
* **Clipdrop API** (for real AI image generation)
* **Neon PostgreSQL Database** (serverless database via `@neondatabase/serverless`)
* **Cloudinary** (for secure media hosting)

---

## 📁 Project Structure

```text
QuickAI/
├── client/                 # Frontend (React + Vite)
│   ├── Dockerfile          # Frontend container definition
│   ├── .dockerignore
│   ├── src/                # React source files (components, pages, assets)
│   └── package.json
│
├── server/                 # Backend (Node.js + Express)
│   ├── Dockerfile          # Backend container definition
│   ├── .dockerignore
│   ├── configs/            # Database and Cloudinary configurations
│   ├── controllers/        # Express request logic handlers
│   ├── middlewares/        # Authentication middlewares (Clerk)
│   ├── routes/             # API route definitions
│   └── package.json
│
├── k8s/                    # Kubernetes deployment manifests
│   ├── namespace.yaml      # Cluster namespace config
│   ├── secrets.yaml        # API secrets template
│   ├── configmap.yaml      # Non-sensitive environment variables
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-deployment.yaml
│   └── frontend-service.yaml
│
├── docker-compose.yml      # Local container orchestration with hot reloading
├── package.json            # Root dependency configuration
└── README.md               # Project documentation
```

---

## ⚙️ Getting Started (Local Setup)

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/abhi-2029/QuickAI-Full-Stack.git
cd QuickAI-Full-Stack
```

### 2️⃣ Configure Environment Variables

Create a `.env` file in the `/server` folder:
```env
DATABASE_URL=your_postgres_neon_connection_string
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
GROQ_API_KEY=your_groq_api_key
CLIPDROP_API_KEY=your_clipdrop_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Create a `.env` file in the `/client` folder:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BASE_URL=http://localhost:3000
```

---

## 🐳 Running with Docker (Recommended)

QuickAI is fully Dockerized for simple, single-command startup. It includes live volume mounting so that code changes on your host machine will **hot reload** instantly inside the containers.

Make sure you have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed, then run the following in the project root:

```bash
# Build and start all services (frontend + backend)
docker compose up --build
```
* **Frontend** will be accessible at: `http://localhost:5173`
* **Backend** will be accessible at: `http://localhost:3000`

To stop the containers:
```bash
docker compose down
```

---

## ⚙️ Manual Local Execution (Without Docker)

### 1️⃣ Run the Backend
```bash
cd server
npm install
npm start
```

### 2️⃣ Run the Frontend
```bash
cd client
npm install
npm run dev
```

---

## ☸️ Deploying to Kubernetes

Kubernetes manifests are located under the `/k8s` directory. They configure high-availability pod replicas, internal routing, LoadBalancer endpoints, and ConfigMaps/Secrets.

Ensure you have a running cluster (Minikube, EKS, GKE, etc.) and `kubectl` configured:

```bash
# 1. Create the dedicated quickai namespace
kubectl apply -f k8s/namespace.yaml

# 2. Open k8s/secrets.yaml and replace the placeholder base64 secrets with your credentials
# (Encode secrets in base64: echo -n "secret_value" | base64)

# 3. Apply the manifests
kubectl apply -f k8s/
```

To monitor the deployments:
```bash
kubectl get all -n quickai
```

---

## 🌍 Production Deployment (Vercel)

### Backend Deployment:
1. Set the **Root Directory** to `server`.
2. Add your environment variables (`DATABASE_URL`, `CLERK_SECRET_KEY`, `GROQ_API_KEY`, `CLIPDROP_API_KEY`, etc.) in Vercel settings.
3. Deploy 🚀

### Frontend Deployment:
1. Set the **Root Directory** to `client`.
2. Add the environment variables (`VITE_CLERK_PUBLISHABLE_KEY` and `VITE_BASE_URL` pointing to your deployed backend URL).
3. Deploy 🚀

---

## 🔗 API Routes

| Route | Method | Description | Authentication |
| :--- | :--- | :--- | :--- |
| `/api/ai/article` | `POST` | Generate articles (Short, Medium, Long) | Required |
| `/api/ai/blog-title` | `POST` | Generate 5 blog titles | Required |
| `/api/ai/image` | `POST` | Generate real AI images (via Clipdrop) | Required |
| `/api/ai/remove-background`| `POST` | Remove image background | Required |
| `/api/ai/remove-object` | `POST` | Remove designated objects from image | Required |
| `/api/ai/resume-review` | `POST` | Review resumes (.pdf format) | Required |
| `/api/user/get-user-creations`| `GET` | Get log of creations by user | Required |
| `/api/user/get-published-creations`| `GET` | Get public creations feed | Required |
| `/api/user/toggle-like-creation`| `POST` | Like or Unlike a creation | Required |

---

## 👨‍💻 Author

**Abhishek Ranjan**
* GitHub: [Github](https://github.com/abhi-2029)
* LinkedIn: [Linkedin](https://www.linkedin.com/in/abhishekranjan20/)
