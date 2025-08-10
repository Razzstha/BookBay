import React, { useEffect, useState } from "react";
import axios from "axios";

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({ name: "", description: "" });
    const [formError, setFormError] = useState("");
    const [formLoading, setFormLoading] = useState(false);

    // Fetch categories from backend
    const fetchCategories = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get("http://localhost:3000/api/categories", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setCategories(res.data);
        } catch (err) {
            setError("Failed to load categories");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Submit new category
    const handleAddCategory = async (e) => {
        e.preventDefault();
        setFormError("");
        setFormLoading(true);

        if (!formData.name.trim()) {
            setFormError("Category name is required");
            setFormLoading(false);
            return;
        }

        try {
            await axios.post(
                "http://localhost:3000/api/categories",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            setShowAddForm(false);
            setFormData({ name: "", description: "" });
            fetchCategories();
        } catch (err) {
            setFormError(err.response?.data?.message || "Failed to add category");
        } finally {
            setFormLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Categories</h2>

            <button
                onClick={() => setShowAddForm(true)}
                className="mb-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
                + Add New Category
            </button>

            {showAddForm && (
                <div className="fixed inset-0 bg-opacity-40 flex justify-center items-center z-50" style={{
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                }}>
                    <div className="bg-gradient-to-r from-indigo-900 to-purple-800 p-6 rounded shadow-md w-full max-w-md relative">
                        <button
                            className="absolute top-2 right-2 text-white hover:text-gray-400 font-bold"
                            onClick={() => setShowAddForm(false)}
                        >
                            &times;
                        </button>
                        <h3 className="text-xl mb-4 font-semibold text-white">Add New Category</h3>

                        <form onSubmit={handleAddCategory} className="flex flex-col gap-3">
                            <input
                                type="text"
                                name="name"
                                placeholder="Category Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="border px-3 py-2 rounded bg-white"
                            />
                            <textarea
                                name="description"
                                placeholder="Description (optional)"
                                value={formData.description}
                                onChange={handleChange}
                                className="border px-3 py-2 rounded resize-none bg-white"
                                rows={4}
                            />

                            {formError && <p className="text-red-600">{formError}</p>}

                            <button
                                type="submit"
                                disabled={formLoading}
                                className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition disabled:opacity-50"
                            >
                                {formLoading ? "Adding..." : "Add Category"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {loading && <p>Loading categories...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && categories.length === 0 && <p>No categories available.</p>}

            {!loading && !error && categories.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-white">
                    {categories.map((cat) => (
                        <div
                            key={cat._id}
                            className=" rounded p-7 bg-gradient-to-r from-indigo-900 to-purple-800 shadow hover:shadow-md transition"
                        >
                            <h3 className="font-semibold text-lg">{cat.name}</h3>
                            {cat.description && <p className="text-white-600 mt-2">{cat.description}</p>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Category;
