const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const JWT_SECRET = "your-secret-key"; // replace with .env in real app
const users = []; // in-memory users store for testing

// ----------------- Sign-Up -----------------
app.post("/api/auth/signup", (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = users.find(u => u.email === email);
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    users.push({ name, email, password }); // password stored as plain text for testing
    res.status(201).json({ message: "User created successfully" });
});

// ----------------- Sign-In -----------------
app.post("/api/auth/signin", (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email: user.email, name: user.name }, JWT_SECRET, { expiresIn: "1h" });

    res.json({
        token,
        user: { name: user.name, email: user.email }
    });
});

// ----------------- Middleware: Verify Token -----------------
const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Invalid token" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // attach user info to request
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token expired or invalid" });
    }
};

// ----------------- Analyze -----------------
app.post("/api/analyze", verifyToken, (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ message: "Text is required" });
    }

    // Dummy AI analysis
    const result = {
        aiGenerated: text.includes("AI"),
        citation: "Verified",
        confidence: Math.floor(Math.random() * 21) + 80 // random 80-100%
    };

    res.json(result);
});

app.listen(port, () => {
    console.log(`TruthCheck AI Backend running on http://localhost:${port} 🚀`);
});
