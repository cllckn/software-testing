const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000

app.get("/", (req, res) => {
    res.send(`Server running on port ${PORT}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
