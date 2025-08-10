import React from 'react';
import { Navigate } from 'react-router-dom';
import AdminDashboard from '../pages/AdminDashboard';

const AdminRoute = ({ children }) => {
    const userData = JSON.parse(localStorage.getItem('user')); // or get user info however you store it

    if (!userData || userData.name.toLowerCase() === 'admin') {
        // Not logged in or not admin — redirect to login or homepage
        return <Navigate to="/admin-dashboard" replace />;
    }

    return children;
};

export default AdminRoute;
