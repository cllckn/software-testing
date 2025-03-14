const express = require("express");
const app = express();

app.use(express.json()); // Parse JSON requests

// In-memory database: JSON array for products
let products = [
  { id: 1, name: "Laptop", price: 999.99 },
  { id: 2, name: "Phone", price: 499.99 },
  { id: 3, name: "Phone", price: 499.99 },
];

// GET all products
app.get("/api/products", (req, res) => {
  res.json(products); // Respond with the list of all products
});

// GET a single product by ID
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id)); // Find the product by ID
  if (!product) return res.status(404).json({ error: "Product not found" }); // If not found, respond with 404
  res.json(product); // Respond with the found product
});

// POST - Add a new product
app.post("/api/products", (req, res) => {
  const { name, price } = req.body; // Extract name and price from the request body
  if (!name || !price) return res.status(400).json({ error: "Invalid input" }); // Validate input

  const newProduct = { id: products.length + 1, name, price }; // Add a new product with a unique ID
  products.push(newProduct); // Add the new product to the list
  res.status(200).json(newProduct); // Respond with the added product
});

// PUT - Update a product
app.put("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id)); // Find the product by ID
  if (!product) return res.status(404).json({ error: "Product not found" }); // If not found, respond with 404

  const { name, price } = req.body; // Extract name and price from the request body
  product.name = name || product.name; // Update the product name if provided
  product.price = price || product.price; // Update the product price if provided
  res.json(product); // Respond with the updated product
});

// DELETE - Remove a product
app.delete("/api/products/:id", (req, res) => {
  products = products.filter((p) => p.id !== parseInt(req.params.id)); // Remove the product by ID
  res.json({ message: "Product deleted" }); // Respond with a deletion message
});

// Start server
const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // the server on port 3000
