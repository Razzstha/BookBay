
import React from 'react';

const Navbar = ({ onLoginClick, user, onLogout }) => {
    return (
        <nav className="border-b border-gray-200 bg-white shadow-sm px-6 py-3 flex justify-between w-full items-center sticky top-0 z-50">

            <div className="font-bold text-xl cursor-pointer hover:text-blue-600 transition-colors">
                BookBay
            </div>

            {/* listing of navbar */}
            <div className='flex gap-6 items-center justify-center text-xl font-medium'>
                <a href="/" className="hover:text-purple-600 transition-colors">Home</a>
                <a href="/books" className="hover:text-purple-600 transition-colors">Books</a>
                <a href="/about" className="hover:text-purple-600 transition-colors">About</a>
                <a href="/contact" className="hover:text-purple-600 transition-colors">Contact</a>
            </div>

            {/* login logout buttons */}
            <div>
                {!user ? (
                    <button
                        onClick={onLoginClick}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                        Login
                    </button>
                ) : (
                        <div className='flex items-center gap-3'>
                            
                            <span className="text-md font-medium">Welcome back, <span className='font-bold text-purple-600'>{user.name}!</span></span>

                    <button
                        onClick={onLogout}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
                        Logout
                            </button>
                        </div>
                )}
            </div>

        </nav>
    );
};

export default Navbar;
