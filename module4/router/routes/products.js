// Import the Express framework to be able to call express.Router()
const express = require("express");

// Initialize a new router object.
// This router can hold route definitions (GET, POST, etc.)
// and allows modularizing routes into separate files.
const router = express.Router();


// ───────────────────────────────────────────────────────────────
// In-memory database: JSON array for products
// ───────────────────────────────────────────────────────────────
let products = [
  { id: 1, name: "SSD", price: 999.99 },
  { id: 2, name: "RAM", price: 499.99 },
];

// ───────────────────────────────────────────────────────────────
// Define Routes
// ───────────────────────────────────────────────────────────────
// Routes are the connection points (end points - addresses) in a web service where clients send requests to interact with the service.
// GET all products
router.get("/", (req, res) => {
  res.json(products); // Respond with the list of all products
});

// GET a single product by ID
router.get("/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id)); // Find the product by ID
  if (!product) return res.status(404).json({ error: "Product not found" }); // If not found, respond with 404
  res.json(product); // Respond with the found product
});

// POST - Add a new product
router.post("/", (req, res) => {
  const { name, price } = req.body; // Extract name and price from the request body
  if (!name || !price) return res.status(400).json({ error: "Invalid input" }); // Validate input

  const newProduct = { id: products.length + 1, name, price }; // Add a new product with a unique ID
  products.push(newProduct); // Add the new product to the list
  res.status(201).json(newProduct); // Respond with the added product
});


// PUT - Replace a Product Record (full replacement)
router.put("/:id", (req, res) => {
  // 1. Destructure and extract all fields from the request body.
  // Assuming 'name', 'price' are the mutable fields.
  const { name, price } = req.body;

  // 2. Validate the Request Body (Required for PUT)
  // Check if all required fields are present.
  // Note: Unlike the original code, we do NOT use '|| product.name'
  // because PUT must overwrite all fields, or fail.
  if (!name || price == null ) {
    return res.status(400).json({
      error: "PUT /products requires ALL mutable fields (name, price) for full replacement."
    });
  }

  // 3. Find the Product
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  // 4. Update/Replace: Directly assign ALL new values.
  product.name = name;
  product.price = price;

  // 5. Respond with the fully updated product
  res.json(product);
});

// PATCH - Modify a product (partial or full replacement)
router.patch("/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id)); // Find the product by ID
  if (!product) return res.status(404).json({ error: "Product not found" }); // If not found, respond with 404

  const { name, price } = req.body; // Extract name and price from the request body
  product.name = name || product.name; // Update the product name if provided
  product.price = price || product.price; // Update the product price if provided
  res.json(product); // Respond with the updated product
});

// DELETE - Remove a product
router.delete("/:id", (req, res) => {
  const productIdToDelete = parseInt(req.params.id);

  // 1. Store the initial count of products
  const initialLength = products.length;

  // 2. Filter the array, creating a new array without the specified product ID
  products = products.filter((p) => p.id !== productIdToDelete);

  // 3. Store the final count of products
  const finalLength = products.length;

  if (finalLength < initialLength) {
    // The product was found and successfully deleted (the array length decreased).

    // REST Best Practice: 204 No Content for a successful DELETE with no response body.
    res.status(204).end();
  } else {
    // The product was NOT found (the array length remained the same).

    // REST Best Practice: 404 Not Found indicates the resource doesn't exist.
    res.status(404).json({
      error: `Product with ID ${productIdToDelete} not found.`
    });
  }
});


// Export the router so it can be used in other files
module.exports = router;