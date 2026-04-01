const request = require("supertest");
const { app, pool } = require("../../../../src/st/module4/restapi-with-db/server"); // Import pool separately


// Clear test database before running tests. Runs once per test file.
// beforeEach(async () => { ... }) runs before each individual test case.
beforeAll(async () => {
    await pool.query("DELETE FROM products"); // Clean up test data
});

// Close DB connection after tests
afterAll(async () => {
    await pool.end();
});

describe("Product API Integration Tests", () => {
    let productId;

    // Test POST /api/products - Create a new product
    it("should add a new product", async () => {
        const response = await request(app).post("/api/products")
          .send({ name: "Laptop", price: 999.99 });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.name).toBe("Laptop");
        expect(Number(response.body.price)).toBe(999.99);

        productId = response.body.id;
    });

    // Test GET /api/products - Fetch all products
    it("should retrieve all products", async () => {
        const response = await request(app).get("/api/products");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    // Test GET /api/products/:id - Fetch a single product
    it("should retrieve a product by ID", async () => {
        const response = await request(app).get(`/api/products/${productId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(productId);
        expect(response.body.name).toBe("Laptop");
    });

    // Test PUT /api/products/:id - Update a product
    it.skip("should update a product", async () => {
        const response = await request(app)
          .put(`/api/products/${productId}`)
          .send({ name: "Gaming Laptop", price: 4000 });

        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe("Gaming Laptop");
        expect(Number(response.body.price)).toBe(4000);
    });

    // Test DELETE /api/products/:id - Remove a product
    it.skip("should delete a product", async () => {
        const response = await request(app).delete(`/api/products/${productId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ message: "Product deleted" });
    });
});
