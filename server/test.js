import express from 'express';
const app = express();

app.get('/api/books', (req, res) => {
    res.json([
        {
            _id: "1",
            id: "1",
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            category: "Classic",
            rating: 4.2,
            cover: "https://example.com/covers/gatsby.jpg"
        },
        {
            _id: "2",
            id: "2",
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            category: "Classic",
            rating: 4.5,
            cover: "https://example.com/covers/mockingbird.jpg"
        },
        {
            _id: "3",
            id: "3",
            title: "1984",
            author: "George Orwell",
            category: "Dystopian",
            rating: 4.6,
            cover: "https://example.com/covers/1984.jpg"
        }
    ]);
});

app.listen(3000, () => console.log('Dummy API running on port 3000'));
