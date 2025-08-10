
import React from "react";
import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import Books from "./Books";
import Category from "./Catagory";
import Overview from "./Overview";
import Settings from "./Settings";

const AdminDashboard = ({ onLogout }) => {

    const links = [
        { name: "Overview", path: "/admin-dashboard/overview" },
        { name: "Categories", path: "/admin-dashboard/categories" },
        { name: "Books", path: "/admin-dashboard/books" },
        { name: "Settings", path: "/admin-dashboard/settings" },
    ];


    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-60 bg-gradient-to-r from-indigo-900 to-purple-800 text-white flex flex-col">
                <div className="p-6 text-2xl font-bold border-b border-white-700">
                    Admin Panel
                </div>
                <nav className="flex-grow p-4 flex flex-col gap-2">
                    {links.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) =>
                                `block px-4 py-3 rounded hover:bg-purple-500 transition ${isActive ? "bg-purple-500 font-semibold" : "font-medium"
                                }`
                            }
                            end
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </nav>
                <div className="p-4 border-t border-white-700 text-sm text-white-400">
                    &copy; 2025 BookBay
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-grow p-6 overflow-auto">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard
                        <div className="w-100 h-1 bg-purple-600 mx-auto mt-5"></div>
                    </h1>
                    <button
                        onClick={onLogout}
                        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                    >
                        Logout
                    </button>
                </header>

                {/* Routing for different sections */}
                <Routes>

                    <Route path="/" element={<Navigate to="/admin-dashboard/overview" replace />} />
                    <Route path="overview" element={<Overview />} />
                    <Route path="categories" element={<Category />} />
                    <Route path="books" element={<Books />} />
                    <Route path="settings" element={<Settings />} />

                </Routes>
            </main>
        </div>
    );
};

export default AdminDashboard;
