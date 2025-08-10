import React, { useState } from "react";
import axios from "axios";

const Settings = () => {
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setError("");
        setSuccess("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const { oldPassword, newPassword, confirmPassword } = formData;

        if (!oldPassword || !newPassword || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("New password and confirm password do not match.");
            return;
        }

        if (newPassword.length < 6) {
            setError("New password must be at least 6 characters.");
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(
                "http://localhost:3000/api/auth/change-password",
                { oldPassword, newPassword },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSuccess(res.data.message || "Password changed successfully.");
            setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
        } catch (err) {
            setError(err.response?.data?.message || "Failed to change password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-gradient-to-r from-indigo-900 to-purple-800 p-6 rounded shadow">
            <h2 className="text-2xl font-semibold mb-6 text-white">Change Password</h2>
            {error && <p className="mb-4 text-red-600">{error}</p>}
            {success && <p className="mb-4 text-green-600">{success}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="password"
                    name="oldPassword"
                    placeholder="Old Password"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    className="border bg-white px-3 py-2 rounded text-gray-500 mt-5"
                    required
                />
                <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded bg-white text-gray-500 mt-5"
                    required
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm New Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded bg-white text-gray-500 mt-5"
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition disabled:opacity-50 mt-5"
                >
                    {loading ? "Updating..." : "Change Password"}
                </button>
            </form>
        </div>
    );
};

export default Settings;
