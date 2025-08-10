import express from 'express';
import { signupUser, login } from '../controllers/authController.js';
import { changePassword } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', login);
router.post("/change-password", protect, changePassword);

export default router;

