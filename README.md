# Networking Companion Backend

This is the backend for the mentor-mentee connection app. It handles user authentication, mentor search, booking requests, and mentor validation workflows.

Built with:
- Node.js + Express.js
- PostgreSQL (via Docker)
- Prisma ORM
- JWT for authentication
- bcrypt for password hashing

How to start:
1. Clone to repo
git clone https://github.com/COMP30022-G37/networking_companion_backend.git
cd networking_companion_backend

2. Install dependencies, make sure Node.js has been installed
npm install

3. Set up environment variables
cp .env.example .env

4. Fill in .env
- DATABASE_URL="postgresql://longpham:mFzZVVybCI6InBvc3RncmVzOi8vcG9zdGdyZXM6cG9zd@localhost:5432/networking_companion"
- JWT_SECRET="comp30022_G37_X2Nvbm5lY3Rpb25fbGlmZXRpbWU9MCZwb29sX3RpbW"

5. Start Postgres via Docker, make sure Docker is installed and opened
docker compose up -d

6. Generate Prisma client
npm run generate

7. Run mitigation to set up the database schema
npm run mitigate

8. Testing
npm run test-user

