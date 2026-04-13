const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Credentials ─────────────────────────────────────────────────────────────
// Single hard-coded user for the Cypress demo — no database needed.
const VALID_USER = { username: "user", password: "password" };

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// ─── Routes ───────────────────────────────────────────────────────────────────

// GET / → serve login page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// POST /login → validate credentials and redirect
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === VALID_USER.username && password === VALID_USER.password) {
    // Redirect to the welcome page on success
    return res.redirect("/welcome");
  }

  // Return to login with an error flag on failure
  res.redirect("/?error=1");
});

// GET /welcome → serve welcome page
app.get("/welcome", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "welcome.html"));
});

// ─── Start ────────────────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () =>
    console.log(`Server running at http://localhost:${PORT}`)
  );
}

module.exports = app;
