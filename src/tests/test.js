const request = require("supertest");
const app = require("../app");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Clean DB before running tests
beforeAll(async () => {
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Auth Endpoints", () => {
  let token;

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        fullName: "Test User",
        email: "test@example.com",
        password: "password123",
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user.email).toBe("test@example.com");
  });

  it("should login with valid credentials", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: "test@example.com",
        password: "password123",
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  it("should fail login with wrong password", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: "test@example.com",
        password: "wrongpassword",
      });
    expect(res.statusCode).toBe(401);
  });

  it("should access profile with token", async () => {
    const res = await request(app)
      .get("/auth/profile")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe("test@example.com");
  });

  it("should block profile without token", async () => {
    const res = await request(app)
      .get("/auth/profile");
    expect(res.statusCode).toBe(401);
  });
});

