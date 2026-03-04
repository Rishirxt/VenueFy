# 📂 VenueFy

**VenueFy** is a modern, full-stack venue booking and management platform. It allows users to discover, list, and reserve spaces for events, weddings, or corporate gatherings with a seamless, high-performance interface.


## 🚀 Features

* **🏠 Property Listings:** Users can list their own venues with detailed descriptions, pricing, and category tags.
* **📅 Advanced Booking System:** Integrated calendar for checking availability and making reservations.
* **🔍 Smart Search & Filtering:** Filter venues by category, location, guest capacity, and date ranges.
* **👤 Authentication:** Secure social login (Google/GitHub) and email/password authentication via NextAuth.
* **📸 Image Management:** High-quality image uploads and optimization using Cloudinary.
* **🗺️ Interactive Maps:** Location visualization using Leaflet/Mapbox for easy navigation.
* **📱 Responsive Design:** Fully optimized for Mobile, Tablet, and Desktop using Tailwind CSS.
* **💖 Favorites System:** Users can save their favorite venues for later viewing.

## 🛠️ Tech Stack

* **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Database:** [MongoDB](https://www.mongodb.com/)
* **ORM:** [Prisma](https://www.prisma.io/)
* **Authentication:** [NextAuth.js](https://next-auth.js.org/)
* **Image Storage:** [Cloudinary](https://cloudinary.com/)
* **Deployment:** [Vercel](https://vercel.com/)

## 🏁 Getting Started

### Prerequisites

* Node.js 18.x or higher
* A MongoDB Atlas account (or local instance)
* Cloudinary account for image hosting

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Rishirxt/VenueFy.git](https://github.com/Rishirxt/VenueFy.git)
    cd VenueFy
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root directory and add the following:
    ```env
    DATABASE_URL="mongodb+srv://..."
    NEXTAUTH_SECRET="your_nextauth_secret"
    
    GOOGLE_CLIENT_ID="your_google_id"
    GOOGLE_CLIENT_SECRET="your_google_secret"
    
    GITHUB_ID="your_github_id"
    GITHUB_SECRET="your_github_secret"
    
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
    ```

4.  **Sync Database Schema:**
    ```bash
    npx prisma db push
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```text
├── app/             # Next.js App Router (Pages, Layouts, API routes)
├── components/      # Reusable UI components (Modals, Navbar, Inputs)
├── hooks/           # Custom React hooks (useSearch, useFavorite)
├── libs/            # Shared library instances (Prisma client)
├── public/          # Static assets (Images, Icons)
├── types/           # TypeScript interfaces and types
└── prisma/          # Database schema (schema.prisma)
