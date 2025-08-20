
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from './Footer';
import Login from './Login';
import Signup from './Signup';
import { FiBookOpen, FiSearch, FiStar } from 'react-icons/fi';

const LandingPage = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [user, setUser] = useState(null);

    const [categories, setCategories] = useState([]);
    const [books, setBooks] = useState([]);

    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingBooks, setLoadingBooks] = useState(true);

    const [errorCategories, setErrorCategories] = useState(null);
    const [errorBooks, setErrorBooks] = useState(null);

    // On mount, check localStorage for user
    useEffect(() => {
        const token = localStorage.getItem('token');
        const name = localStorage.getItem('name');
        const email = localStorage.getItem('email');
        if (token && name && email) {
            setUser({ name, email, token });
        }
    }, []);

    // Fetch categories from backend
    const fetchCategories = async () => {
        setLoadingCategories(true);
        setErrorCategories(null);
        try {
            const res = await axios.get('http://localhost:3000/api/categories', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setCategories(res.data);
        } catch (err) {
            setErrorCategories('Failed to load categories');
        } finally {
            setLoadingCategories(false);
        }
    };

    // Fetch books from backend
    const fetchBooks = async () => {
        setLoadingBooks(true);
        setErrorBooks(null);
        try {
            const res = await axios.get('http://localhost:3000/api/books');
            setBooks(res.data);
        } catch (err) {
            setErrorBooks('Failed to load books');
        } finally {
            setLoadingBooks(false);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchBooks();
    }, []);

    const [searchTerm, setSearchTerm] = useState('');

    const filteredBooks = books.filter(
        (book) =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredCategories = categories.filter((cat) =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAuthSuccess = (userData) => {
        setUser(userData);
        localStorage.setItem('name', userData.name);
        localStorage.setItem('email', userData.email);
        localStorage.setItem('token', userData.token);
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.clear();
    };

    const switchToLogin = () => {
        setShowSignup(false);
        setShowLogin(true);
    };

    const switchToSignup = () => {
        setShowLogin(false);
        setShowSignup(true);
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <nav className="bg-gradient-to-r from-indigo-900 to-purple-800 text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50">
                <div className="text-2xl font-bold">BookBay</div>
                <div>
                    {!user ? (
                        <>
                            <button
                                onClick={() => setShowLogin(true)}
                                className="mr-4 bg-transparent border border-white px-4 py-2 rounded hover:bg-white hover:text-indigo-900 transition"
                            >
                                Login
                            </button>

                            <button
                                onClick={() => setShowSignup(true)}
                                className="bg-purple-500 px-4 py-2 rounded hover:bg-purple-600 transition"
                            >
                                Get Started
                            </button>
                        </>
                    ) : (
                        <>
                            <span className="mr-4">Welcome, {user.name}!</span>
                            <button
                                onClick={handleLogout}
                                className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 transition"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </nav>

            <main className="flex-grow flex flex-col justify-center items-center text-center bg-gray-50">
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-indigo-900 to-purple-800 text-white py-20 w-full">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="md:w-1/2 mb-10 md:mb-0">
                                <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Your Next Favorite Book</h1>
                                <p className="text-xl mb-8">Explore our vast collection of e-books across all genres</p>
                            </div>
                            <div className="md:w-1/2 flex justify-center">
                                <img
                                    src="https://imgs.search.brave.com/18z0aS8Blj-FIAQol4L392CrUVPPDs-UgfkKql5ME_w/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9zdHVk/ZW50LXJlYWRpbmct/Ym9vay0xNTQ0OTA2/Mi5qcGc"
                                    alt="Person reading e-book on tablet surrounded by floating book icons"
                                    className="rounded-lg shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Search Bar */}
                <section className="py-8 bg-white shadow-sm w-full">
                    <div className="container mx-auto px-6">
                        <div className="max-w-3xl mx-auto relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiSearch className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search for books, authors, or categories..."
                                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </section>

                {/* Books and Categories Section */}
                <div className="min-h-screen bg-gray-50 p-8">
                    <h1 className="text-4xl font-bold mb-8 text-center">Books and Categories
                        <div className="w-80 h-1 bg-indigo-600 mx-auto mt-5"></div>
                    </h1>

                    {/* Books */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-semibold mb-6">Books
                            <div className="w-15 h-1 bg-indigo-600 mx-auto mt-5"></div>
                        </h2>

                        {loadingBooks && <p>Loading books...</p>}
                        {errorBooks && <p className="text-red-600">{errorBooks}</p>}

                        {!loadingBooks && !errorBooks && filteredBooks.length === 0 && <p>No books found.</p>}

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filteredBooks.map((book) => (
                                <div
                                    key={book._id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                                >
                                    <img
                                        src={`http://localhost:3000${book.cover}`}
                                        alt={`${book.title} cover`}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold">{book.title}</h3>
                                        <p className="text-gray-600 mb-1">Author: {book.author}</p>
                                        <p className="text-sm bg-gray-200 inline-block px-2 py-1 rounded">{book.category}</p>
                                        <div className="flex items-center mt-2">
                                            {[...Array(5)].map((_, i) => (
                                                <FiStar
                                                    key={i}
                                                    className={`h-5 w-5 ${i < Math.floor(book.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                                />
                                            ))}
                                            <span className="ml-2 text-sm text-gray-600">({book.rating || 0})</span>
                                        </div>

                                        {/* View and Download PDF buttons */}
                                        <div className="mt-3 flex gap-3">
                                            {/* View PDF - open to all */}
                                            <a
                                                href={`http://localhost:3000${book.pdf}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                                            >
                                                View PDF
                                            </a>

                                            {/* Download PDF - only logged in users */}
                                            {user ? (
                                                <a
                                                    href={`http://localhost:3000${book.pdf}`}
                                                    download
                                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                                >
                                                    Download PDF
                                                </a>
                                            ) : (
                                                <p className="bg-green-600 text-white px-4 py-2 rounded">Login to download PDF</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Categories */}
                    <section>
                        <h2 className="text-3xl font-semibold mb-6">Categories
                            <div className="w-20 h-1 bg-indigo-600 mx-auto mt-5"></div>
                        </h2>

                        {loadingCategories && <p>Loading categories...</p>}
                        {errorCategories && <p className="text-red-600">{errorCategories}</p>}

                        {!loadingCategories && !errorCategories && filteredCategories.length === 0 && <p>No categories found.</p>}

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                            {filteredCategories.map((category) => (
                                <div
                                    key={category._id}
                                    className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md flex flex-col items-center"
                                >
                                    <div className="bg-indigo-100 p-3 rounded-full mb-4">
                                        <FiBookOpen className="h-6 w-6 text-indigo-600" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-800">{category.name}</h3>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
            {/* About Project */}
            <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Project</h2>
                <div className="space-y-4 text-gray-600">
                    <p>
                        This e-book website was built as a showcase of modern web development techniques.
                        It demonstrates clean React architecture, responsive design principles, and efficient state management.
                    </p>
                    <p>
                        Key features include:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Responsive design that works on all devices</li>
                        <li>Advanced search and filtering capabilities</li>
                        <li>Read-on-the-go functionality with offline support</li>
                        <li>Performance optimized for fast page loads</li>
                    </ul>
                    <p>
                        The project utilizes modern libraries and frameworks to provide an exceptional user experience.
                    </p>
                </div>
            </div>
            <Footer />

            {/* Login and Signup Modals */}
            {showLogin && (
                <Login
                    onLoginSuccess={handleAuthSuccess}
                    onClose={() => setShowLogin(false)}
                    onSwitchToSignup={switchToSignup}
                />
            )}

            {showSignup && (
                <Signup
                    onSuccess={handleAuthSuccess}
                    onClose={() => setShowSignup(false)}
                    onSwitchToLogin={switchToLogin}
                />
            )}
        </div>
    );
};

export default LandingPage;
