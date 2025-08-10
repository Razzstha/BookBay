import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    
    title: {
        type: String,
        required: true,
        trim: true,
    },

    author: {
        type: String,
        required: true,
        trim: true,
    },

    cover: {
        type: String, 
        required: true,
    },

    pdf: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },

    category: {
        type: String,
        required: true,
        trim: true,
    },
    
}, {
    timestamps: true, // adds createdAt and updatedAt
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
