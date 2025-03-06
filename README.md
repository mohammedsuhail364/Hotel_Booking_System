# Hotel Booking System

## Overview
This is a full-stack hotel booking system where users can:
- Register using email and password.
- Book a hotel for their family trip.
- Perform a web check-in by providing Aadhaar numbers for all family members.

## Tech Stack
### Frontend:
- **React.js**: Built a responsive UI.
- **Static JSON**: Used for hosting data on a local web server.

### Backend:
- **Node.js & Express.js**: API development.
- **PostgreSQL & Prisma ORM**: Database management.
- **Postman**: API testing and demonstration.

## Installation & Setup

### Prerequisites:
- **Node.js** installed (Recommended: v20.12.2)
- **PostgreSQL** installed and running
- **Prisma ORM** set up

### Backend Setup:
1. Clone the repository:
   ```sh
   git clone [Your Repository URL]
   cd hotel-booking-backend
Install dependencies:
sh
Copy
Edit
npm install
Set up database:
Configure .env file with database URL:
ini
Copy
Edit
DATABASE_URL="postgresql://user:password@localhost:5432/hotel_booking"
Run Prisma migrations:
sh
Copy
Edit
npx prisma migrate dev --name init
Start the backend server:
sh
Copy
Edit
npm start
Frontend Setup:
Navigate to the frontend directory:
sh
Copy
Edit
cd hotel-booking-frontend
Install dependencies:
sh
Copy
Edit
npm install
Start the development server:
sh
Copy
Edit
npm start
API Endpoints
Authentication:
POST /register → User registration
POST /login → User login
Hotel Booking:
POST /book-hotel → Book a hotel
GET /bookings → Get user bookings
Web Check-In:
POST /check-in → Perform web check-in with Aadhaar details
Demo
GitHub Repository: [Your GitHub Repository Link]
Demo Video: [Your Video Link]
Contact
For any queries, feel free to reach out.
