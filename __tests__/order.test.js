const request = require("supertest");
const app = require("../server");

describe("POST /api/orders", () => {
  it("should create an order and return a JWT token", async () => {
    const orderData = {
      userId: "60b7e8d0f1e0f81f89f4b5a7", // Example user ID
      products: [
        { productId: 1, quantity: 2 },
        { productId: 3, quantity: 1 },
      ],
    };

    const res = await request(app).post("/api/orders").send(orderData);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Order created successfully");
    expect(res.body.order).toHaveProperty("totalPrice");
    expect(res.body.order.products).toHaveLength(2); // Check number of products
  });
});
