# Networking Companion Backend

A comprehensive backend API for a mentorship platform that connects students with industry professionals. Built with modern web technologies to support secure authentication, booking management, and mentor matching.

## Project Overview

The Networking Companion platform facilitates meaningful connections between students (mentees) and industry professionals (mentors). This backend provides RESTful APIs for user authentication, profile management, availability scheduling, booking system, and mentor search functionality.

Key Features:
- **User Authentication**: Secure JWT-based registration and login
- **Profile Management**: Comprehensive user profiles with education and experience tracking
- **Mentor Matching**: Smart search and recommendation algorithms
- **Booking System**: Complete workflow for scheduling mentorship sessions
- **Availability Management**: Flexible time slot management for mentors

## Tech Stack

- **Runtime**: Node.js + Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT + bcrypt for password hashing
- **Search**: Fuse.js for fuzzy search capabilities
- **Containerization**: Docker for database management
- **Testing**: Jest

## Folder Structure

```
networking_companion_backend/
├── src/
│   ├── controllers/          # Business logic handlers
│   │   ├── auth.js          # Authentication endpoints
│   │   ├── availability.js  # Time slot management
│   │   ├── booking.js       # Booking system
│   │   ├── mentor.js        # Mentor search and profiles
│   │   └── role.js          # User role management
│   ├── middleware/          # Express middleware
│   │   ├── auth.js          # JWT verification
│   │   ├── error.js         # Error handling
│   │   └── role.js          # Role-based access control
│   ├── routes/              # API route definitions
│   ├── config/              # Configuration files
│   └── tests/               # Test suites
├── prisma/                  # Database schema and migrations
├── docker-compose.yml       # Database container configuration
└── package.json            # Dependencies and scripts
```

## Setup Instructions

### Prerequisites
- Node.js
- Docker and Docker Compose
- npm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/COMP30022-G37/networking_companion_backend.git
   cd networking_companion_backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables**
   Edit the `.env` file with your preferred settings:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/networking_companion"
   JWT_SECRET="your-secret-key-here"
   ```

   *Example configuration:*
   ```
   DATABASE_URL="postgresql://longpham:password@localhost:5432/networking_companion"
   JWT_SECRET="comp30022_G37_X2Nvbm5lY3Rpb25fbGlmZXRpbWU9MCZwb29sX3RpbW"
   ```

## Local Deployment & Testing

### Starting the Database

1. **Start PostgreSQL using Docker**
   ```bash
   docker compose up -d
   ```

2. **Set up database schema**
   ```bash
   npm run generate    # Generate Prisma client
   npm run migrate     # Run database migrations
   ```

### Running the Application

1. **Start the development server**
   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:3000`

### Testing

Run the test suite to verify everything is working correctly:
```bash
npm test
```

### API Endpoints

Once running, you can access these main endpoints:
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/mentors` - Mentor search and recommendations
- `POST /api/availability` - Manage mentor availability slots
- `POST /api/bookings` - Booking management

### Frontend Integration

For full-stack development, start the frontend application in parallel:
```bash
# In a separate terminal (frontend repository)
npm run dev
```

## Accessing Database
   Keep the database url on `.env` for local testing  
   Or replace wih the external database url on Render to view the deployed database
   ```bash
   DATABASE_URL="External Database Url"
   ```
   And then run:
   ```bash
   npx prisma studio
   ```