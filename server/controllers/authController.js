
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Generate JWT token with id and name (added name to payload for admin check)
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, name: user.name }, // <-- added name here for adminOnly middleware
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
};

// Signup controller
export const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user in DB
        const newUser = await User.create({ name, email, password: hashedPassword });

        // Generate token (include name)
        const token = generateToken(newUser); // <-- pass user object here

        res.status(201).json({
            token,
            name: newUser.name,
            email: newUser.email,
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

// Login controller
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        // Check if user exists and password matches
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate token with id and name
        const token = generateToken(user); // <-- pass user object here

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Logout controller (simple message, actual logout handled client-side)
export const logout = (req, res) => {
    res.json({ message: 'Logout successful' });
};


export const changePassword = async (req, res) => {
    try {
        const userId = req.user.id; // from protect middleware
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: "Please provide old and new password." });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Check old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(401).json({ message: "Old password is incorrect" });

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        await user.save();

        res.json({ message: "Password changed successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};