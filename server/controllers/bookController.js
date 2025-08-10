// controllers/bookController.js

import Book from '../models/Book.js';  // adjust path as needed

// Get all books
export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find(); // fetch all books from MongoDB
        res.status(200).json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Server error while fetching books' });
    }
};
