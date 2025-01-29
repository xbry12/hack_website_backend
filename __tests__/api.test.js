const app = require("../server"); // Import the app
const request = require("supertest");

describe("POST /api/users/register", () => {
  it("should register a new user and return a JWT token", async () => {
    const res = await request(app).post("/api/users/register").send({
      username: "John Doe2",
      email: "johndoe2@example.com",
      password: "password123",
    });

    console.log(res.body);
    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined(); // Check that the token exists
    expect(res.body.message).toBe("User registered successfully");
  });
});
