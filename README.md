# Find Your Space - Flexible Space Booking Platform

> A full-stack web application built with the MERN stack (MongoDB, Express, React/Next.js, Node.js) that allows users to browse, book, and pay for flexible spaces. This platform features distinct roles for users and administrators, each with a dedicated dashboard and functionalities.

## Live Demo

* **Frontend (Vercel):** [https://find-your-space-ten.vercel.app/](https://find-your-space-ten.vercel.app/)
* **Backend (Render):** [https://find-your-space.onrender.com/](https://find-your-space.onrender.com/)

---

## Screenshots


*Home Page - A modern and interactive hero section to attract users.*


*Admin Dashboard - A comprehensive overview of users, spaces, bookings, and revenue.*

---

## Features

### 👤 User Features
* **Secure Authentication:** User signup and login with password hashing (bcryptjs) and JWT for session management.
* **Password Reset:** Secure OTP-based password reset functionality via email (Nodemailer).
* **Browse Spaces:** View a gallery of all available office spaces with key details.
* **Detailed View:** See detailed information, features, and images for each space.
* **Booking System:** Select a date, time slot, and duration to book a space.
* **Secure Payments:** Integrated with Stripe for seamless and secure payment processing.
* **Order History:** Users can view their past and upcoming bookings.
* **Profile Management:** Users can view and update their profile information.
* **Feedback System:** Users can submit feedback and ratings.

### 👑 Admin Features
* **Admin Dashboard:** A central hub to view key statistics like total users, spaces, bookings, and revenue.
* **User Management:** Full CRUD (Create, Read, Update, Delete) functionality for all users.
* **Space Management:** Full CRUD functionality for adding, updating, and deleting office spaces and their features.
* **Booking Management:** View all bookings made by users and have the ability to delete them.
* **View Feedback & Contacts:** Access and manage all user-submitted feedback and contact form inquiries.

---

## Tech Stack

**Frontend:**
* **Framework:** Next.js 14
* **Language:** JavaScript (JSX)
* **Styling:** Tailwind CSS
* **State Management:** React Hooks (`useState`, `useEffect`)
* **Form Handling:** Formik & Yup for validation
* **Payment:** Stripe.js

**Backend:**
* **Framework:** Node.js, Express.js
* **Database:** MongoDB with Mongoose ODM
* **Authentication:** JSON Web Tokens (JWT), bcryptjs
* **File Uploads:** Multer
* **Email:** Nodemailer
* **Payment:** Stripe API

**Deployment:**
* **Frontend:** Vercel
* **Backend:** Render
* **Database:** MongoDB Atlas

---

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v18 or later)
* npm
* MongoDB Atlas account (for the database)
* Stripe account (for payment keys)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Setup the Backend:**
    * Navigate to the backend directory: `cd backend`
    * Install NPM packages: `npm install`
    * Create a `.env` file and add the required environment variables (see below).
    * Start the server: `npm run dev`

3.  **Setup the Frontend:**
    * Navigate to the frontend directory: `cd ../frontend`
    * Install NPM packages: `npm install`
    * Create a `.env.local` file and add the required environment variables (see below).
    * Start the client: `npm run dev`

---

## Environment Variables

You will need to create two environment files for the project to run.

#### Backend (`backend/.env`)
```.env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key_for_jwt
STRIPE_SECRET_KEY=your_stripe_secret_key_sk_test_...
EMAIL_USER=your_gmail_address_for_sending_otp
EMAIL_PASS=your_gmail_app_password
```

#### Frontend (`frontend/.env.local`)
```.env
NEXT_PUBLIC_API_URL=http://localhost:5500
NEXT_PUBLIC_STRIPE_KEY=your_stripe_publishable_key_pk_test_...
```

---

## Author

**Arpit Shukla**
* GitHub: [@arpit-shukla-13](https://github.com/arpit-shukla-13)
