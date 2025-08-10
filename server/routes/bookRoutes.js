
import express from 'express';
import multer from 'multer';
import Book from '../models/Book.js';
import { getAllBooks } from '../controllers/bookController.js';

// Placeholder auth middleware
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Storage for both images and PDFs (same folder or separate if you want)
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

// File filter: allow images or pdf
const fileFilter = (req, file, cb) => {
    const imageTypes = /jpeg|jpg|png|gif/;
    if (file.fieldname === 'cover') {
        // Validate image file
        const isValid = imageTypes.test(file.mimetype) && imageTypes.test(file.originalname.toLowerCase());
        if (isValid) cb(null, true);
        else cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'Only image files (jpeg, jpg, png, gif) are allowed for cover'));
    } else if (file.fieldname === 'pdf') {
        // Validate PDF file
        if (file.mimetype === 'application/pdf') cb(null, true);
        else cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'Only PDF files are allowed for pdf'));
    } else {
        cb(new Error('Unexpected field'));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB max size
});

// Middleware to handle upload of both cover image and pdf files
const uploadFiles = (req, res, next) => {
    const uploadFields = upload.fields([
        { name: 'cover', maxCount: 1 },
        { name: 'pdf', maxCount: 1 },
    ]);

    uploadFields(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ message: 'File too large. Max size is 20MB.' });
            }
            if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                return res.status(400).json({ message: err.message });
            }
            return res.status(400).json({ message: err.message });
        } else if (err) {
            return res.status(400).json({ message: err.message });
        }
        next();
    });
};

router.post(
    '/admin-dashboard/books',
    protect,
    adminOnly,
    uploadFiles,
    async (req, res) => {
        try {
            const { id, title, author, rating, category } = req.body;

            if (!id || !title || !author || !rating || !category) {
                return res.status(400).json({
                    message: 'Please provide all required fields: id, title, author, rating, category',
                });
            }

            const idNum = Number(id);
            const ratingNum = Number(rating);
            if (isNaN(idNum) || isNaN(ratingNum)) {
                return res.status(400).json({ message: 'id and rating must be numbers' });
            }

            if (ratingNum < 0 || ratingNum > 5) {
                return res.status(400).json({ message: 'rating must be between 0 and 5' });
            }

            if (!req.files || !req.files.cover || !req.files.cover[0]) {
                return res.status(400).json({ message: 'Cover image file is required' });
            }

            if (!req.files || !req.files.pdf || !req.files.pdf[0]) {
                return res.status(400).json({ message: 'PDF file is required' });
            }

            const coverPath = `/uploads/${req.files.cover[0].filename}`;
            const pdfPath = `/uploads/${req.files.pdf[0].filename}`;

            const book = new Book({
                id: idNum,
                title: title.trim(),
                author: author.trim(),
                rating: ratingNum,
                category: category.trim(),
                cover: coverPath,
                pdf: pdfPath,  // make sure your Book model has pdf field (string)
            });

            await book.save();

            res.status(201).json(book);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message || 'Server Error' });
        }
    }
);

router.get('/books', getAllBooks);

export default router;
