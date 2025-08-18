# Networking Companion Backend

Some guidances to start setting up the program

Built with:
- Node.js + Express.js
- PostgreSQL (via Docker)
- Prisma ORM
- JWT for authentication
- bcrypt for password hashing

How to start:
1. Clone to repo<br>
git clone https://github.com/COMP30022-G37/networking_companion_backend.git<br>
cd networking_companion_backend

2. Install dependencies, make sure Node.js has been installed<br>
npm install

3. Set up environment variables<br>
cp .env.example .env

4. Fill in .env
- DATABASE_URL="postgresql://longpham:mFzZVVybCI6InBvc3RncmVzOi8vcG9zdGdyZXM6cG9zd@localhost:5432/networking_companion"
- JWT_SECRET="comp30022_G37_X2Nvbm5lY3Rpb25fbGlmZXRpbWU9MCZwb29sX3RpbW"

5. Start Postgres via Docker, make sure Docker is installed and opened<br>
docker compose up -d

6. Generate Prisma client<br>
npm run generate

7. Run mitigation to set up the database schema<br>
npm run mitigate

8. Testing<br>
npm run test-user

