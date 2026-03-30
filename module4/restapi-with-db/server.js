// Import necessary modules
const express = require("express");
const { Pool } = require("pg"); // PostgreSQL client

const app = express();

// Initialize a PostgreSQL connection pool
const pool = new Pool({
    host: "localhost",
    database: process.env.NODE_ENV === "test" ? "sttestdb" : "stdb", // Use test DB in testing
    user: "lectureuser",
    password: "lecturepassword",
    port: 5432,
});

// Middleware to parse JSON request bodies
app.use(express.json());

// ------------------------ GET all products ------------------------
app.get("/api/products", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM products ORDER BY id ASC");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Database error" });
    }
});

// ------------------------ GET a single product by ID ------------------------
app.get("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);

        if (result.rows.length === 0)
            return res.status(404).json({ error: "Product not found" });

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Database error" });
    }
});

// ------------------------ POST - Add a new product ------------------------
app.post("/api/products", async (req, res) => {
    try {
        const { name, price } = req.body;
        if (!name || !price) return res.status(400).json({ error: "Invalid input" });

        const result = await pool.query(
          "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *",
          [name, price]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Database error" });
    }
});

// ------------------------ PUT - Update a product ------------------------
app.put("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price } = req.body;

        const result = await pool.query(
          "UPDATE products SET name = COALESCE($1, name), price = COALESCE($2, price) WHERE id = $3 RETURNING *",
          [name, price, id]
        );

        if (result.rows.length === 0)
            return res.status(404).json({ error: "Product not found" });

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Database error" });
    }
});

// ------------------------ DELETE - Remove a product ------------------------
app.delete("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);

        if (result.rows.length === 0)
            return res.status(404).json({ error: "Product not found" });

        res.json({ message: "Product deleted" });
    } catch (err) {
        res.status(500).json({ error: "Database error" });
    }
});

// ------------------------ Start server (only when not in test mode) ------------------------
// If NODE_ENV is set to "test", the server does not start separately.Instead, Supertest
// handles requests internally, preventing conflicts and unnecessary resource consumption.
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

// Export the app and pool for testing
module.exports = { app, pool };
