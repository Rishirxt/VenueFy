<div align="center">

<img src="frontend/src/assets/VenueFy.png" alt="VenueFy Logo" width="180"/>

# VenueFy

**Your all-in-one platform for discovering movies, live events, and booking seats — instantly.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

</div>

---

## 📖 About

**VenueFy** is a full-stack entertainment booking platform that lets users browse movies and live events, pick their preferred theatre or venue, choose seats on an interactive seat map, and complete bookings — all in one seamless experience.

The platform is designed with a clean, modern UI and a robust REST API backend to handle real-time seat availability, authenticated user sessions, location-based filtering, and order management.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎬 **Movie Discovery** | Browse now-showing movies with details, cast, ratings & trailers |
| 🎭 **Live Events** | Explore concerts, comedy shows, sports & more with dedicated event pages |
| 📍 **Location Filtering** | Filter movies and shows by city/location |
| 🪑 **Interactive Seat Selection** | Real-time seat layout with live availability, seat classes & pricing |
| 🎟️ **End-to-End Booking** | Select show timings, choose seats, checkout and confirm instantly |
| 👤 **User Accounts** | Register, login & manage your profile with full booking history |
| 📦 **Order Management** | View past bookings, ticket details & show info in your profile |
| 🔒 **JWT Authentication** | Secure cookie-based auth with bcrypt password hashing |
| 📧 **Email Notifications** | Booking confirmation emails via Nodemailer + Mailgen |
| 🏛️ **Theatre & Venue Management** | Multi-theatre, multi-show support with location-aware scheduling |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI framework with hooks & context |
| **Vite 7** | Lightning-fast dev server & build tool |
| **TailwindCSS 4** | Utility-first styling |
| **React Router DOM v7** | Client-side routing |
| **TanStack Query v5** | Server state management & data fetching |
| **Axios** | HTTP client with interceptors |
| **Swiper / React Slick** | Carousels for banners & recommended content |
| **React Hot Toast / Notistack** | Toast notifications |
| **React Icons** | Icon library |
| **Day.js / date-fns** | Date formatting & manipulation |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js + Express 5** | REST API server |
| **TypeScript 5** | Type-safe server-side code |
| **MongoDB + Mongoose 8** | NoSQL database & ODM |
| **JSON Web Tokens (JWT)** | Stateless authentication |
| **bcryptjs** | Password hashing |
| **Zod** | Runtime schema validation |
| **Nodemailer + Mailgen** | Transactional email |
| **Day.js** | Date utilities for show scheduling |
| **Nodemon + tsx** | Hot-reload development |

---

## 🗂️ Project Structure

```
VenueFy/
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/          # Registration, login, JWT
│   │   │   ├── user/          # User profile & management
│   │   │   ├── movie/         # Movie CRUD & search
│   │   │   ├── show/          # Show scheduling & availability
│   │   │   ├── theatre/       # Theatre & seat management
│   │   │   ├── event/         # Live events & venues
│   │   │   ├── order/         # Booking & order records
│   │   │   └── location/      # City/location data
│   │   └── config/            # DB connection & env config
│   ├── routes/                # API route aggregator
│   ├── seed-movies.ts         # Movie seeder
│   ├── seed-theaters.ts       # Theatre seeder
│   ├── seed-shows.ts          # Show seeder
│   ├── seed-events.ts         # Live events seeder
│   ├── seed-venues.ts         # Venues seeder
│   ├── seed-event-shows.ts    # Event shows seeder
│   └── index.ts               # Server entry point
│
├── frontend/
│   └── src/
│       ├── pages/
│       │   ├── Home.jsx          # Landing page
│       │   ├── Movies.jsx         # Movie listing & filters
│       │   ├── MovieDetails.jsx   # Movie detail + theatre timings
│       │   ├── TheatreShows.jsx   # Shows by theatre
│       │   ├── SeatLayout.jsx     # Interactive seat map
│       │   ├── Checkout.jsx       # Booking confirmation
│       │   ├── Events.jsx         # Live events listing
│       │   ├── EventBooking.jsx   # Event seat booking
│       │   ├── Profile.jsx        # User profile & orders
│       │   └── Login.jsx          # Auth page (login/register)
│       ├── components/
│       │   ├── shared/            # Header, Footer, Banner
│       │   ├── movies/            # MovieList, MovieFilters, TheaterTimings
│       │   ├── profile/           # BookingHistory
│       │   ├── LiveEvents.jsx     # Events section component
│       │   └── Recommended.jsx    # Recommended shows section
│       ├── context/               # AuthContext, LocationContext
│       ├── apis/                  # Axios instance & API wrappers
│       ├── hooks/                 # Custom React hooks
│       └── utils/                 # Constants & helper utilities
│
├── clear_db.ts                # Drops all collections (dev use only)
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **npm** v9+
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone the Repository

```bash
git clone https://github.com/Rishirxt/VenueFy.git
cd VenueFy
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/venuefy
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

Start the backend dev server:

```bash
npm run dev
```

> API runs at `http://localhost:5000`

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

> Frontend runs at `http://localhost:5173`

### 4. Seed the Database

Run seeders in order to populate the database with sample data:

```bash
cd backend

# Seed in this order:
npm run seed:theaters     # Theatres & seats
npm run seed:movies       # Movies
npm run seed:shows        # Movie show schedules
npm run seed:events       # Live events & venues
```

---

## 🔌 API Overview

All routes are prefixed with `/api/v1/`.

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Create a new user account |
| `POST` | `/auth/login` | Login and receive JWT cookie |
| `GET` | `/movies` | Get all movies |
| `GET` | `/shows` | Get shows by movie, date & location |
| `GET` | `/theatres` | Get theatre listings |
| `GET` | `/events` | Get live events |
| `POST` | `/orders` | Place a booking order |
| `GET` | `/orders/:userId` | Get user's order history |
| `GET` | `/locations` | Get available cities/locations |
| `PUT` | `/user/profile` | Update user profile |

---

## 🗄️ Database Utilities

> ⚠️ **Warning:** The following command drops all data permanently. Only use in development.

```bash
npx ts-node clear_db.ts
```

---

## 📸 App Walkthrough

| Page | Description |
|---|---|
| **Home** | Hero banner, recommended shows, live events carousel |
| **Movies** | Filter by location & date, browse all movies |
| **Movie Details** | Full movie info, available theatres & showtimes |
| **Seat Layout** | Interactive seat map, select seats by class & price |
| **Checkout** | Booking summary, confirm order |
| **Events** | Browse live events (music, comedy, sports) |
| **Event Booking** | Event details, seat selection & booking |
| **Profile** | View account info, past bookings & tickets |

---

## 📄 License

This project is open source. Contributions and feedback are welcome.

---

<div align="center">
  Built with ❤️ by <a href="https://github.com/Rishirxt">Rishirxt</a>
</div>
