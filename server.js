const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Home
app.get("/", (req, res) => {
    res.send("ESG Backend Running 🚀");
});

// Dashboard
app.get("/dashboard", (req, res) => {
    res.json({
        totalReports: 120,
        completedReports: 98,
        pendingReports: 22,
        environmental: 40,
        social: 35,
        governance: 45
    });
});

// Login
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (email === "admin@esg.com" && password === "1234") {
        return res.json({
            success: true,
            message: "Login Successful"
        });
    }

    res.status(401).json({
        success: false,
        message: "Invalid Credentials"
    });
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});