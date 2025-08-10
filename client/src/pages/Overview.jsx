import React, { useEffect, useState } from "react";
import axios from "axios";

const Overview = () => {
    const [stats, setStats] = useState({
        totalBooks: 0,
        totalCategories: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStats = async () => {
        setLoading(true);
        setError(null);
        try {
            const [booksRes, categoriesRes] = await Promise.all([
                axios.get("http://localhost:3000/api/books"),
                
                axios.get("http://localhost:3000/api/categories", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }),
            ]);

            setStats({
                totalBooks: booksRes.data.length,
                totalCategories: categoriesRes.data.length,
            });
        } catch (err) {
            setError("Failed to fetch overview data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    if (loading) return <p>Loading overview...</p>;
    if (error) return <p className="text-red-600">{error}</p>;

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6">Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-white">
                <div className="p-6 bg-gradient-to-r from-indigo-900 to-purple-800 rounded shadow">
                    <h3 className="text-xl font-semibold mb-2">Total Books</h3>
                    <p className="text-4xl font-bold text-white-600">{stats.totalBooks}</p>
                </div>
                <div className="p-6 bg-gradient-to-r from-indigo-900 to-purple-800 rounded shadow">
                    <h3 className="text-xl font-semibold mb-2">Total Categories</h3>
                    <p className="text-4xl font-bold text-white-600">{stats.totalCategories}</p>
                </div>
            </div>
        </div>
    );
};

export default Overview;
