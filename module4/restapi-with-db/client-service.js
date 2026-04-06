const express = require("express");
//const axios = require("axios"); // For making API requests

const app = express();
const API_URL = "http://localhost:3000/api/products"; // URL of the main REST API

app.get("/products", async (req, res) => {
  try {
    const response = await fetch(API_URL);         // Native fetch — no import needed (Node 18+)

    if (!response.ok)                              // fetch does not throw on 4xx/5xx — must check manually
      return res.status(response.status).json({ error: "Upstream service error" });

    const data = await response.json();            // Parse response body as JSON
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" }); // Network-level failure (e.g. service unreachable)
  }
});

/*app.get("/products", async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});*/

// ------------------------ Start server (only when not in test mode) ------------------------
// If NODE_ENV is set to "test", the server does not start separately.Instead, Supertest
// handles requests internally, preventing conflicts and unnecessary resource consumption.
const PORT = process.env.PORT || 4000;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

// Export the app for testing
module.exports = app;
