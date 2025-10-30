# ☁️ CloudBox

CloudBox is a full-stack web application that allows users to **upload, store, and manage files in the cloud** — a mini cloud-drive built using **React, Node.js, Express, and Multer**. It provides a simple and clean interface for users to upload, view, and download files securely.

---

## 🚀 Features

- 📁 Upload multiple files seamlessly  
- 🗂️ View and manage uploaded files  
- ⬇️ Download files anytime  
- ⚙️ Node.js + Express backend for file handling  
- 🌐 React frontend with modern UI  
- 💾 Multer used for file storage management  
- ☁️ Ready for deployment on Vercel (frontend) and Render (backend)

---

## 🛠️ Tech Stack

**Frontend:**  
- React  
- Axios  
- CSS  

**Backend:**  
- Node.js  
- Express.js  
- Multer  

**Deployment:**  
- Frontend → [Vercel](https://vercel.com)  
- Backend → [Render](https://render.com)

---

## 📦 Folder Structure

cloudbox/
│
├── backend/
│ ├── server.js
│ ├── package.json
│ ├── uploads/ # Uploaded files stored here
│ └── ...
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── FileUpload.js
│ │ │ └── FileList.js
│ │ ├── App.js
│ │ └── index.js
│ ├── public/
│ ├── package.json
│ └── ...
│
└── README.md


---

## ⚙️ Installation & Setup (Local)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/GopikaS/cloudboxx.git
cd cloudboxx

---

2️⃣ Setup the Backend
cd backend
npm install
node server.js


✅ Backend runs at 👉 http://localhost:5000
---
