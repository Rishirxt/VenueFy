# VenueFy 🎟️

**VenueFy** is a modern, full-stack entertainment booking platform designed to streamline how users discover movies, live events, and secure their bookings with interactive seat selection.

<div align="center">
  <img src="frontend/src/assets/VenueFy.png" alt="VenueFy Logo" width="200"/>
</div>

---

## � Presentation Highlights

- **Seamless Rebranding**: Successfully transitioned from "BookMyScreen" to a more premium "VenueFy" identity.
- **Dynamic Live Events**: A newly implemented module for browsing and booking tickets for concerts, sports, and theatre performances.
- **Interactive Seat Mapping**: Real-time seat selection with distinct pricing tiers and availability status.
- **Location-Aware Experience**: Smart filtering based on user-selected cities to show relevant local content.

---

## ✨ Key Features

### 🎬 Entertainment Discovery
- **Movie Hub**: Browse trending and now-showing movies with detailed descriptions, ratings, and trailers.
- **Live Events**: Discover music festivals, stand-up comedy, and local workshops in a dedicated ecosystem.
- **Smart Filtering**: Filter by location, date, genres, and event types.

### 🎟️ Booking Experience
- **Theatre & Showtimes**: Integrated view of all theatres hosting a specific movie with multiple time slots.
- **Visual Seat Selection**: Interactive grid layout showing available, booked, and selected seats.
- **Unified Checkout**: Simplified booking flow for both cinema and live event tickets.

### 👤 User & Order Management
- **Personalized Profile**: Manage account details and view booking records.
- **Booking History**: Access past tickets, view QR-ready order details, and track spent history.
- **Secure Authentication**: Robust registration and login system with persistent sessions.

---

## 🛠️ Tech Stack

### Frontend (Modern UI/UX)
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vite.dev/)
- **Styling**: [TailwindCSS 4](https://tailwindcss.com/)
- **State Management**: [TanStack Query v5](https://tanstack.com/query/latest)
- **Routing**: [React Router 7](https://reactrouter.com/en/main)
- **Components**: Swiper, React Icons, Slick Carousel

### Backend (Scalable Architecture)
- **Runtime**: [Node.js](https://nodejs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Web Framework**: [Express 5](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: JWT (JSON Web Tokens) with Cookie-based storage
- **Utilities**: Nodemailer, Mailgen, Zod (Validation), Day.js

---

## � Project Structure

```bash
VenueFy/
├── backend/                   # API Server & Business Logic
│   ├── src/
│   │   ├── modules/           # Modular domain logic (User, Movie, Show, Order, etc.)
│   │   ├── config/            # Database and App configurations
│   ├── routes/                # Route definitions
│   ├── seed-*.ts              # Specialized data seeders (movies, shows, events)
│   └── index.ts               # Server Entry Point
├── frontend/                  # Client-Side Application
│   ├── src/
│   │   ├── pages/             # Route-level components (Home, Movies, SeatLayout, etc.)
│   │   ├── components/        # Reusable UI elements (Header, Footer, MovieCards)
│   │   ├── context/           # Global states (Auth, Location)
│   │   ├── apis/              # API interaction layer
│   │   └── assets/            # Static files and logos
├── clear_db.ts                # Database reset utility
└── README.md
```

---

## 🏁 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or via Atlas)

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/Rishirxt/VenueFy.git
cd VenueFy

# Install Backend dependencies
cd backend
npm install

# Install Frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Setup
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_app_password
```

### 4. Database Seeding
Populate your database with initial data:
```bash
cd backend
npm run seed:theaters
npm run seed:movies
npm run seed:shows
npm run seed:events
```

### 5. Running the Application
```bash
# In backend directory
npm run dev

# In frontend directory
npm run dev
```

---

## 🤝 Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License
This project is licensed under the ISC License.

---
<div align="center">
  Built with ❤️ by <a href="https://github.com/Rishirxt">Rishirxt</a>
</div>
