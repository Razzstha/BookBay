import express from 'express';
import { getAllCategories, addCategory } from '../controllers/categoryController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all categories - accessible by logged in users (you can restrict if needed)
router.get('/categories', getAllCategories);

// Add category - only admin
router.post('/categories', protect, adminOnly, addCategory);

export default router;
