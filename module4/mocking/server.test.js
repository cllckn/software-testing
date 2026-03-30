const request = require("supertest");
const { app } = require("../../../src/module4/mocking/server");

// ─────────────────────────────────────────────────────────────────────────────
// Mock Setup
// Replace the real `pg` module before any imports load it — Jest hoists
// jest.mock() calls to the top of the file automatically, so the app module
// receives the mock Pool the moment it is required below.
// ─────────────────────────────────────────────────────────────────────────────
jest.mock("pg", () => {
    const mClient = {
        query: jest.fn(), // Intercepts every pool.query() call inside the app
        end:   jest.fn(), // Intercepts pool.end() — prevents real teardown
    };
    // Pool is a constructor — jest.fn(() => mClient) ensures every
    // `new Pool()` call (in both the app and this test file) returns
    // the same shared mClient object.
    return { Pool: jest.fn(() => mClient) };
});

// Obtain the shared mock instance — because Pool always returns the same
// mClient, this is the identical object the app uses for its queries.
const { Pool } = require("pg");
const db = new Pool(); // Alias as `db` to signal its role clearly in tests

// ─────────────────────────────────────────────────────────────────────────────
// Test Data
// Centralised here so a single change propagates to all tests that use it.
// ─────────────────────────────────────────────────────────────────────────────
const PRODUCT_ID  = 1;
const mockProduct = { id: PRODUCT_ID, name: "Laptop", price: 999.99 };

// ─────────────────────────────────────────────────────────────────────────────
// Suite
// ─────────────────────────────────────────────────────────────────────────────
describe("Product API", () => {

    // Resets all mock calls before each test.
    // Ensures that old mock calls do not interfere with new ones.
    beforeEach(() => jest.clearAllMocks());

    // Ensure mock pool is closed — mirrors real teardown so the
    // Jest process exits cleanly without a hanging open-handle warning.
    afterAll(async () => { await db.end(); });

    // ── GET /api/products ──────────────────────────────────────────────────────
    describe("GET /api/products", () => {
        it("getAllProducts_whenProductsExist_returns200WithProducts", async () => {
            // mockResolvedValueOnce: the mock query returns this value for the
            // next call only — subsequent calls return undefined unless set again.
            db.query.mockResolvedValueOnce({ rows: [mockProduct] });

            const response = await request(app).get("/api/products");

            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBeGreaterThan(0);
            // Verifies the app sends the exact SQL the database expects —
            // catches typos, wrong table names, and missing ORDER BY clauses.
            expect(db.query).toHaveBeenCalledWith("SELECT * FROM products ORDER BY id");
        });

        it("getAllProducts_whenDatabaseFails_returns500WithErrorMessage", async () => {
            // mockRejectedValueOnce: simulates a database error for this call only.
            db.query.mockRejectedValueOnce(new Error("DB error"));

            const response = await request(app).get("/api/products");

            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual({ error: "Database error" });
        });
    });

    // ── GET /api/products/:id ──────────────────────────────────────────────────
    describe("GET /api/products/:id", () => {
        it("getProductById_whenProductExists_returns200WithProduct", async () => {
            db.query.mockResolvedValueOnce({ rows: [mockProduct] });

            const response = await request(app).get(`/api/products/${PRODUCT_ID}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(mockProduct);
            // $1 is a parameterised placeholder — verifying it is used (not string
            // interpolation) confirms the app is protected against SQL injection.
            expect(db.query).toHaveBeenCalledWith(
                "SELECT * FROM products WHERE id = $1",
                [PRODUCT_ID]
            );
        });

        it("getProductById_whenProductDoesNotExist_returns404WithErrorMessage", async () => {
            // Empty rows array simulates a product that does not exist in the DB.
            db.query.mockResolvedValueOnce({ rows: [] });

            const response = await request(app).get("/api/products/99999");

            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual({ error: "Product not found" });
        });

        it("getProductById_whenIdIsNotANumber_returns400WithErrorMessage", async () => {
            // No db.query mock needed — the app should reject before hitting the DB.
            const response = await request(app).get("/api/products/abc");

            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual({ error: "Invalid product ID" });
            expect(db.query).not.toHaveBeenCalled(); // Guard: DB must not be touched
        });
    });

    // ── POST /api/products ─────────────────────────────────────────────────────
    describe("POST /api/products", () => {
        it("createProduct_whenValidDataProvided_returns201WithCreatedProduct", async () => {
            // RETURNING * means the DB echoes back the full inserted row —
            // mock it to verify the app passes that row straight to the response.
            db.query.mockResolvedValueOnce({ rows: [mockProduct] });

            const response = await request(app)
                .post("/api/products")
                .send({ name: "Laptop", price: 999.99 });

            expect(response.statusCode).toBe(201);
            expect(response.body).toEqual(mockProduct);
            expect(db.query).toHaveBeenCalledWith(
                "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *",
                ["Laptop", 999.99]
            );
        });

        it("createProduct_whenRequiredFieldsAreMissing_returns400WithErrorMessage", async () => {
            const response = await request(app)
                .post("/api/products")
                .send({ name: "Laptop" }); // price is missing

            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual({ error: "Invalid input" });
            expect(db.query).not.toHaveBeenCalled(); // Guard: DB must not be touched
        });
    });

    // ── DELETE /api/products/:id ───────────────────────────────────────────────
    describe("DELETE /api/products/:id", () => {
        it("deleteProduct_whenProductExists_returns200WithSuccessMessage", async () => {
            db.query.mockResolvedValueOnce({ rows: [mockProduct] });

            const response = await request(app).delete(`/api/products/${PRODUCT_ID}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({ message: "Product deleted" });
            expect(db.query).toHaveBeenCalledWith(
                "DELETE FROM products WHERE id = $1 RETURNING *",
                [PRODUCT_ID]
            );
        });

        it("deleteProduct_whenProductDoesNotExist_returns404WithErrorMessage", async () => {
            // RETURNING * yields no rows when nothing was deleted.
            db.query.mockResolvedValueOnce({ rows: [] });

            const response = await request(app).delete("/api/products/99999");

            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual({ error: "Product not found" });
        });
    });

    // ── GET /api/products/:id/final-price ─────────────────────────────────────
    describe("GET /api/products/:id/final-price", () => {

        // Discount tiers (matches the server logic being tested):
        //   price < 500          →  0% discount
        //   500 <= price <= 1000 → 10% discount
        //   price > 1000         → 20% discount
        // Tax: +20% applied after discount in all cases.

        it("getFinalPrice_whenPriceIsBelow500_appliesNoDiscountAnd20PercentTax", async () => {
            db.query.mockResolvedValueOnce({ rows: [{ price: 400 }] });

            const response = await request(app).get(`/api/products/${PRODUCT_ID}/final-price`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({ validatedPrice: "480.00" }); // 400 * 1.20
            expect(db.query).toHaveBeenCalledWith(
                "SELECT price FROM products WHERE id = $1",
                [PRODUCT_ID]
            );
        });

        it("getFinalPrice_whenPriceIsBetween500And1000_applies10PercentDiscountAnd20PercentTax", async () => {
            db.query.mockResolvedValueOnce({ rows: [{ price: 1000 }] });

            const response = await request(app).get(`/api/products/${PRODUCT_ID}/final-price`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({ validatedPrice: "1080.00" }); // 1000 * 0.90 * 1.20
        });

        it("getFinalPrice_whenPriceIsAbove1000_applies20PercentDiscountAnd20PercentTax", async () => {
            db.query.mockResolvedValueOnce({ rows: [{ price: 1200 }] });

            const response = await request(app).get(`/api/products/${PRODUCT_ID}/final-price`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({ validatedPrice: "1152.00" }); // 1200 * 0.80 * 1.20
        });

        it("getFinalPrice_whenProductDoesNotExist_returns404WithErrorMessage", async () => {
            db.query.mockResolvedValueOnce({ rows: [] });

            const response = await request(app).get("/api/products/99999/final-price");

            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual({ error: "Product not found" });
        });

        it("getFinalPrice_whenIdIsNotANumber_returns400WithErrorMessage", async () => {
            const response = await request(app).get("/api/products/abc/final-price");

            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual({ error: "Invalid product ID" });
            expect(db.query).not.toHaveBeenCalled(); // Guard: DB must not be touched
        });
    });
});