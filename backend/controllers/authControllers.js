// controllers/auth.controller.js
const users = []; // In-memory store for testing; replace with DB later
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// ----------------- Sign-Up -----------------
exports.signup = (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const userExists = users.find(u => u.email === email);
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Store user (password is plain text for testing; hash in real app)
    const newUser = { name, email, password };
    users.push(newUser);

    res.status(201).json({ message: "User created successfully" });
};

// ----------------- Sign-In -----------------
exports.signin = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ email: user.email, name: user.name }, JWT_SECRET, { expiresIn: "1h" });

    res.json({
        token,
        user: { name: user.name, email: user.email }
    });
};
