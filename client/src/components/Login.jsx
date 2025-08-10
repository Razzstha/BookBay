
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onClose, onSwitchToSignup, onLoginSuccess }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { data } = await axios.post('http://localhost:3000/api/auth/login', formData);

            // Save token, name, and email in localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('name', data.name);
            localStorage.setItem('email', data.email);

            // Notify parent component about successful login
            onLoginSuccess && onLoginSuccess(data);
            onClose && onClose();

            if (data.name?.toLowerCase() === 'admin') {
                navigate('/admin-dashboard');
            } 
            

        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-purple-400 bg-opacity-50 flex justify-center items-center z-50" style={{
                    backgroundColor: "rgba(180, 31, 240, 0.77)",
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                }}>
            <div className="bg-gradient-to-r from-indigo-900 to-purple-800 bg-white p-6 rounded shadow-md w-100 relative">
                <button
                    className="absolute top-2 right-2 text-white hover:text-gray-400 font-bold"
                    onClick={onClose}
                    aria-label="Close login form"
                >
                    &times;
                </button>
                <h2 className="text-2xl mb-4 font-semibold text-white">Login</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border px-3 py-2 rounded bg-white"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="border px-3 py-2 rounded bg-white"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition disabled:opacity-50"
                    >
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>
                {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
                <p className="mt-4 text-center text-white">
                    New here?{' '}
                    <button
                        onClick={() => {
                            onClose && onClose();
                            onSwitchToSignup && onSwitchToSignup();
                        }}
                        className="text-purple-600 underline hover:text-purple-800"
                    >
                        Create an account
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
