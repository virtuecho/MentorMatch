const request = require("supertest");
const app = require("../app");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Clean DB before running tests
beforeAll(async () => {
  await prisma.mentorSkill.deleteMany();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Auth Endpoints", () => {
  let token;
  let userId;

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
    userId = res.body.user.id;
  });

  it("should fail to register with duplicate email", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        fullName: "Test User",
        email: "test@example.com",
        password: "password123",
      });
    expect(res.statusCode).toBe(409);
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
    const res = await request(app).get("/auth/profile");
    expect(res.statusCode).toBe(401);
  });

  it("should update user profile", async () => {
    const res = await request(app)
      .put("/auth/profile")
      .set("Authorization", `Bearer ${token}`)
      .send({
        fullName: "Updated Name",
        bio: "Test bio",
        location: "Test Location",
        profileImageUrl: "https://example.com/image.jpg",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.profile.fullName).toBe("Updated Name");
    expect(res.body.profile.bio).toBe("Test bio");
  });

  it("should get public mentor profile", async () => {
    await prisma.user.update({
      where: { id: userId },
      data: { role: "mentor", isMentorApproved: true },
    });

    await prisma.mentorSkill.create({
      data: {
        mentorId: userId,
        skillName: "JavaScript",
      },
    });

    const res = await request(app).get(`/auth/mentor/${userId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.fullName).toBe("Updated Name");
    expect(res.body.skills).toContain("JavaScript");
  });
});

describe("Registration Input Validation", () => {
  it("should reject empty email", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        fullName: "Test User",
        email: "",
        password: "password123"
      });
    expect(res.statusCode).toBe(400);
  });

  it("should reject empty password", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        fullName: "Test User",
        email: "empty@example.com",
        password: ""
      });
    expect(res.statusCode).toBe(400);
  });

  it("should reject invalid email format", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        fullName: "Test User",
        email: "not-an-email",
        password: "password123"
      });
    expect(res.statusCode).toBe(400);
  });

  it("should accept non-ASCII characters in name", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        fullName: "Æ张三김สมศักดิ์衞عفيفオバマ",
        email: "nonasciiname@example.com",
        password: "password123"
      });
    expect(res.statusCode).toBe(201);
  });

  it("should accept non-ASCII characters in passwords", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        fullName: "Test User",
        email: "nonasciipassword@example.com",
        password: "Æ张三김สมศักดิ์衞عفيفオバマ"
      });
    expect(res.statusCode).toBe(201);
  });

  it("should reject extremely long names", async () => {
    const longName = "a".repeat(256); // Assuming 255 is max length
    const res = await request(app)
      .post("/auth/register")
      .send({
        fullName: longName,
        email: "longname@example.com",
        password: "password123"
      });
    expect(res.statusCode).toBe(400);
  });

  it("should reject extremely long passwords", async () => {
    const longPassword = "a".repeat(1025); // Assuming 1024 is max length
    const res = await request(app)
      .post("/auth/register")
      .send({
        fullName: "Test User",
        email: "longpass@example.com",
        password: longPassword
      });
    expect(res.statusCode).toBe(400);
  });
});

describe("Login Edge Cases", () => {
  it("should reject login with invalid or empty email", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: "",
        password: "password123"
      });
    expect(res.statusCode).toBe(400);
  });

  it("should reject login with empty password", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: "test@example.com",
        password: ""
      });
    expect(res.statusCode).toBe(400);
  });

  it("should reject login with non-existent email", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: "nonexistent@example.com",
        password: "password123"
      });
    expect(res.statusCode).toBe(401);
  });

  it("should reject login with SQL injection attempt", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: "sqlinjection@example.com",
        password: "' OR '1'='1"
      });
    expect(res.statusCode).toBe(401);
  });
});