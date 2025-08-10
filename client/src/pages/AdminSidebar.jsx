import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
    const links = [
        { name: 'Overview', path: '/admin-dashboard/overview' },
        { name: 'Categories', path: '/admin-dashboard/categories' },
        { name: 'Books', path: '/admin-dashboard/books' },
        { name: 'Settings', path: '/admin-dashboard/settings' },
    ];

    return (
        <aside className="w-60 bg-gray-800 min-h-screen text-white flex flex-col">
            <div className="p-6 text-2xl font-bold border-b border-gray-700">
                Admin Panel
            </div>
            <nav className="flex-grow p-4 flex flex-col gap-2">
                {links.map((link) => (
                    <NavLink
                        key={link.name}
                        to={link.path}
                        className={({ isActive }) =>
                            `block px-4 py-3 rounded hover:bg-gray-700 transition ${isActive ? 'bg-gray-700 font-semibold' : 'font-medium'
                            }`
                        }
                        end
                    >
                        {link.name}
                    </NavLink>
                ))}
            </nav>
            <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
                &copy; 2025 YourCompany
            </div>
        </aside>
    );
};

export default AdminSidebar;
