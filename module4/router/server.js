const express = require("express");

// Import the router module defined in 'routes/products.js'.
// This gives access to all product-related end points.
const productRoutes = require("./routes/products");

const app = express();

app.use(express.json()); // Parse JSON requests


app.use("/api/products", productRoutes);
// Mount the productRoutes router at the path "/api/products".
// This means all routes defined in productRoutes will be prefixed with "/api/products".
// Example: router.get("/") becomes GET /api/products/

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));