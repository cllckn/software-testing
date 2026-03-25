const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000

// Middleware to parse JSON request bodies
app.use(express.json());

// Simple GET endpoint for the root route
app.get("/", (req, res) => {
    res.json({ message: "Hello, world!" });
});

// POST endpoint to greet a user by name
app.post("/greet", (req, res) => {
    const { name } = req.body; // Extract 'name' from the request body
    if (!name) {
        // If 'name' is missing, return a 400 error with a message
        return res.status(400).json({ error: "Name is required" });
    }
    // If 'name' is provided, return a greeting
    res.status(201).json({ message: `Hello, ${name}!` });
});


// ------------------------ Start server (only when not in test mode) ------------------------
// If NODE_ENV is set to "test", the server does not start separately.Instead, Supertest
// handles requests internally, preventing conflicts and unnecessary resource consumption.
if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}
// Export the app for testing
module.exports = app;