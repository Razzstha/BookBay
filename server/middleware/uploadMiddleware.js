
import multer from 'multer';
import path from 'path';

// Common function to generate filename
const generateFilename = (file) => Date.now() + '-' + file.originalname;

// Image storage & filter
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images'); // save images separately
    },
    filename: (req, file, cb) => {
        cb(null, generateFilename(file));
    }
});

const imageFileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) cb(null, true);
    else cb(new Error('Only image files are allowed!'));
};

// PDF storage & filter
const pdfStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/pdfs'); // save PDFs separately
    },
    filename: (req, file, cb) => {
        cb(null, generateFilename(file));
    }
});

const pdfFileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Only PDF files are allowed!'));
};

// Export upload handlers
export const uploadImage = multer({ storage: imageStorage, fileFilter: imageFileFilter });
export const uploadPDF = multer({ storage: pdfStorage, fileFilter: pdfFileFilter });
