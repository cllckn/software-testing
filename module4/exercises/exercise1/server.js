const express = require("express");
const morgan = require('morgan');
const winston = require('winston');


const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Log requests in Apache-style format
const logger = winston.createLogger({
    transports: [new winston.transports.File({ filename: 'logs/requests.log' })]
});

app.use(morgan('combined', { stream: { write: message => logger.info(message) } }));



// In-memory database (array of accounts)
let accounts = [];

// -------------------- GET all accounts --------------------
app.get("/api/accounts", (req, res) => {
    res.json(accounts);
});

// -------------------- GET account by accountNumber --------------------
app.get("/api/accounts/:accountNumber", (req, res) => {
    const account = accounts.find(acc => acc.accountNumber == req.params.accountNumber);
    if (!account) return res.status(404).json({ error: "Account not found" });
    res.json(account);
});

// -------------------- POST - Create a new account --------------------
app.post("/api/accounts", (req, res) => {
    const { accountNumber, name, balance, currency } = req.body;
    if (!accountNumber || !name || balance == null || !currency) {
        return res.status(400).json({ error: "Invalid input" });
    }
    const newAccount = { accountNumber, name, balance, currency, createdAt: new Date().toISOString() };
    accounts.push(newAccount);
    res.status(201).json(newAccount);
});

// -------------------- PUT - Update an account --------------------
app.put("/api/accounts/:accountNumber", (req, res) => {
    const { name, balance, currency } = req.body;
    let account = accounts.find(acc => acc.accountNumber == req.params.accountNumber);
    if (!account) return res.status(404).json({ error: "Account not found" });
    if (name) account.name = name;
    if (balance !== undefined) account.balance = balance;
    if (currency) account.currency = currency;
    res.json(account);
});

// -------------------- DELETE - Remove an account --------------------
app.delete("/api/accounts/:accountNumber", (req, res) => {
    const index = accounts.findIndex(acc => acc.accountNumber == req.params.accountNumber);
    if (index === -1) return res.status(404).json({ error: "Account not found" });
    accounts.splice(index, 1);
    res.json({ message: "Account deleted" });
});

// -------------------- POST - Deposit money --------------------
app.post("/api/accounts/:accountNumber/deposit", (req, res) => {
    const { amount } = req.body;
    let account = accounts.find(acc => acc.accountNumber == req.params.accountNumber);
    if (!account) return res.status(404).json({ error: "Account not found" });
    if (!amount || amount <= 0) return res.status(400).json({ error: "Invalid deposit amount" });
    account.balance += amount;
    res.json(account);
});

// -------------------- POST - Withdraw money --------------------
app.post("/api/accounts/:accountNumber/withdraw", (req, res) => {
    const { amount } = req.body;
    let account = accounts.find(acc => acc.accountNumber == req.params.accountNumber);
    if (!account) return res.status(404).json({ error: "Account not found" });
    if (!amount || amount <= 0) return res.status(400).json({ error: "Invalid withdrawal amount" });
    if (account.balance < amount) return res.status(400).json({ error: "Insufficient funds" });
    account.balance -= amount;
    res.json(account);
});

// Start the server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
