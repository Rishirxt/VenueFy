# VenueFy

A full-stack web application for discovering and booking venues — streamlining how users find, evaluate, and secure event spaces.

```
VenueFy/
├── backend/        # API server & business logic
├── frontend/       # Client-side UI
├── clear_db.ts     # Database reset utility
└── README.md
```

## 🛠️ Tech Stack

| Layer     | Technology          |
|-----------|---------------------|
| Frontend  | JavaScript / React  |
| Backend   | TypeScript / Node.js |
| Database  | (MongoDB)     |

> **Languages:** JavaScript (65%) · TypeScript (34%)

## 🏁 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### 1. Clone the Repository

**1. Clone the repository**
```bash
git clone https://github.com/Rishirxt/VenueFy.git
cd VenueFy
```

**2. Set up the backend**
```bash
cd backend
npm install
```

**3. Set up the frontend**
```bash
cd ../frontend
npm install
```

**4. Configure environment variables**

Create `.env` files in both `backend/` and `frontend/` based on any `.env.example` files provided.

### Running the App

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

## 🗄️ Database Utilities

To reset the database during development:
```bash
npx ts-node clear_db.ts
```

> ⚠️ This will wipe all data. Use with caution.

## 📁 Project Structure

```
backend/
│   ├── routes/         # API endpoints
│   ├── controllers/    # Request handlers
│   ├── models/         # Data models / schemas
│   └── ...

frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # App views/routes
│   │   └── ...
```

> Actual structure may vary — refer to the source directories for details.

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push and open a Pull Request

## 📄 License
This project is open source. See the repository for license details.
