const express = require("express");
const app = express();
app.use(express.json());

const PORT = 3000;

// ─────────────────────────────────────────────
// In-Memory Database
// ─────────────────────────────────────────────
let accounts = [
  { accountNumber: 1001, name: "John Doe",    balance: 1500.75, currency: "USD" },
  { accountNumber: 1002, name: "Jane Smith",  balance: 3200.00, currency: "EUR" },
  { accountNumber: 1003, name: "Alice Brown", balance:  800.50, currency: "USD" },
];

// ─────────────────────────────────────────────
// Helper: find account by accountNumber
// ─────────────────────────────────────────────
const findAccount = (accountNumber) =>
  accounts.find((a) => a.accountNumber === parseInt(accountNumber));

// ─────────────────────────────────────────────
// GET /api/accounts
// Returns all accounts
// ─────────────────────────────────────────────
app.get("/api/accounts", (req, res) => {
  res.json(accounts);
});

// ─────────────────────────────────────────────
// GET /api/accounts/:accountNumber
// Returns a single account by accountNumber
// ─────────────────────────────────────────────
app.get("/api/accounts/:accountNumber", (req, res) => {
  const account = findAccount(req.params.accountNumber);

  if (!account)
    return res.status(404).json({ error: `Account ${req.params.accountNumber} not found` });

  res.json(account);
});

// ─────────────────────────────────────────────
// POST /api/accounts
// Creates a new account
// Body: { accountNumber, name, balance, currency }
// ─────────────────────────────────────────────
app.post("/api/accounts", (req, res) => {
  const { accountNumber, name, balance, currency } = req.body;

  // Validate required fields
  if (!accountNumber || !name || balance === undefined || !currency)
    return res.status(400).json({ error: "accountNumber, name, balance, and currency are required" });

  // Prevent duplicate accountNumber
  if (findAccount(accountNumber))
    return res.status(409).json({ error: `Account ${accountNumber} already exists` });

  const newAccount = {
    accountNumber: parseInt(accountNumber),
    name,
    balance: parseFloat(balance),
    currency,
  };

  accounts.push(newAccount);
  res.status(201).json(newAccount);
});

// ─────────────────────────────────────────────
// PUT /api/accounts/:accountNumber
// Replaces / updates fields of an existing account
// Body: any subset of { name, balance, currency }
// ─────────────────────────────────────────────
app.put("/api/accounts/:accountNumber", (req, res) => {
  const account = findAccount(req.params.accountNumber);

  if (!account)
    return res.status(404).json({ error: `Account ${req.params.accountNumber} not found` });

  const { name, balance, currency } = req.body;

  if (name     !== undefined) account.name     = name;
  if (balance  !== undefined) account.balance  = parseFloat(balance);
  if (currency !== undefined) account.currency = currency;

  res.json(account);
});

// ─────────────────────────────────────────────
// DELETE /api/accounts/:accountNumber
// Removes an account by accountNumber
// ─────────────────────────────────────────────
app.delete("/api/accounts/:accountNumber", (req, res) => {
  const index = accounts.findIndex(
    (a) => a.accountNumber === parseInt(req.params.accountNumber)
  );

  if (index === -1)
    return res.status(404).json({ error: `Account ${req.params.accountNumber} not found` });

  accounts.splice(index, 1);
  res.json({ message: `Account ${req.params.accountNumber} deleted successfully` });
});

// ─────────────────────────────────────────────
// PATCH /api/accounts/:accountNumber
// Adjusts the balance of an account
// Body: { amount } — positive to deposit, negative to withdraw
// ─────────────────────────────────────────────
app.patch("/api/accounts/:accountNumber", (req, res) => {
  const account = findAccount(req.params.accountNumber);

  if (!account)
    return res.status(404).json({ error: `Account ${req.params.accountNumber} not found` });

  const { amount } = req.body;

  if (amount === undefined || isNaN(parseFloat(amount)))
    return res.status(400).json({ error: "A numeric 'amount' field is required" });

  const parsed = parseFloat(amount);

  // Prevent overdraft
  if (account.balance + parsed < 0)
    return res.status(400).json({
      error: "Insufficient funds",
      currentBalance: account.balance,
      requestedChange: parsed,
    });

  account.balance = parseFloat((account.balance + parsed).toFixed(2));

  res.json({
    message: parsed >= 0 ? "Deposit successful" : "Withdrawal successful",
    account,
  });
});

// ─────────────────────────────────────────────
// Start Server
// ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Bank Account API running at http://localhost:${PORT}`);
  console.log("\nAvailable endpoints:");
  console.log("  GET    /api/accounts");
  console.log("  GET    /api/accounts/:accountNumber");
  console.log("  POST   /api/accounts");
  console.log("  PUT    /api/accounts/:accountNumber");
  console.log("  DELETE /api/accounts/:accountNumber");
  console.log("  PATCH  /api/accounts/:accountNumber  (deposit/withdraw)");
});