
import React, { useEffect, useState } from "react";
import axios from "axios";

const Books = () => {
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showAddForm, setShowAddForm] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    author: "",
    category: "",
    rating: "",
    cover: null,
    pdf: null, // Added for PDF file
  });

  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  // Fetch categories and books on mount
  useEffect(() => {
    fetchCategories();
    fetchBooks();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://localhost:3000/api/books");
      setBooks(res.data);
    } catch {
      setError("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "cover" || name === "pdf") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormLoading(true);

    try {
      if (
        !formData.id ||
        !formData.title ||
        !formData.author ||
        !formData.category ||
        !formData.rating ||
        !formData.cover ||
        !formData.pdf
      ) {
        setFormError("Please fill all fields and upload cover image and PDF.");
        setFormLoading(false);
        return;
      }

      const data = new FormData();
      data.append("id", formData.id);
      data.append("title", formData.title);
      data.append("author", formData.author);
      data.append("category", formData.category);
      data.append("rating", formData.rating);
      data.append("cover", formData.cover);
      data.append("pdf", formData.pdf);

      const token = localStorage.getItem("token");

      await axios.post("http://localhost:3000/api/admin-dashboard/books", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchBooks();
      setShowAddForm(false);
      setFormData({
        id: "",
        title: "",
        author: "",
        category: "",
        rating: "",
        cover: null,
        pdf: null,
      });
    } catch (err) {
      setFormError(err.response?.data?.message || "Failed to add book. Try again.");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => setShowAddForm(true)}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 mb-4"
      >
        + Add New Book
      </button>

      {showAddForm && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
          }}
        >
          <div className="bg-gradient-to-r from-indigo-900 to-purple-800 p-6 rounded shadow-md w-full max-w-md mx-4 relative">
            <button
              className="absolute top-2 right-2 text-white hover:text-gray-400 font-bold"
              onClick={() => setShowAddForm(false)}
            >
              &times;
            </button>
            <h2 className="text-xl mb-4 font-semibold text-white">Add New Book</h2>

            <form onSubmit={handleAddBook} className="flex flex-col gap-3">

              <input
                type="number"
                name="id"
                placeholder="ID"
                value={formData.id}
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded bg-white"
              />


              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded bg-white"
              />


              <input
                type="text"
                name="author"
                placeholder="Author"
                value={formData.author}
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded bg-white"
              />



              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded bg-white"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <input
                type="number"
                name="rating"
                placeholder="Rating (0-5)"
                value={formData.rating}
                onChange={handleChange}
                min="0"
                max="5"
                step="0.1"
                required
                className="border px-3 py-2 rounded bg-white"
              />

              <span className="text-white">Cover Image</span>
              {/* cover mage */}
              <input
                type="file"
                name="cover"
                accept="image/*"
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded bg-white"
              />

              <span className="text-white">
                Pdf file
              </span>
              {/* pdf file */}
              <input
                type="file"
                name="pdf"
                accept="application/pdf"
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded bg-white"
              />

              {formError && <p className="text-red-600">{formError}</p>}

              <button
                type="submit"
                disabled={formLoading}
                className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition disabled:opacity-50"
              >
                {formLoading ? "Adding..." : "Add Book"}
              </button>
            </form>
          </div>
        </div>
      )}

      {loading && <p>Loading books...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && books.length === 0 && <p>No books available.</p>}

      {!loading && !error && books.length > 0 && (
        <table className="w-full border-collapse border border-gray-300 bg-gradient-to-r from-indigo-900 to-purple-800 text-white ">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-900 to-purple-800 ">
              <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Author</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Rating</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Cover</th>
              <th className="border border-gray-300 px-4 py-2 text-left">PDF</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id} className="hover:bg-purple-600">
                <td className="border border-gray-300 px-4 py-2">{book.id}</td>
                <td className="border border-gray-300 px-4 py-2">{book.title}</td>
                <td className="border border-gray-300 px-4 py-2">{book.author}</td>
                <td className="border border-gray-300 px-4 py-2">{book.category}</td>
                <td className="border border-gray-300 px-4 py-2">{book.rating}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {book.cover ? (
                    <img
                      src={`http://localhost:3000${book.cover}`}
                      alt={book.title}
                      className="h-16 w-auto object-contain"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {book.pdf ? (
                    <a
                      href={`http://localhost:3000${book.pdf}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white-600 underline hover:text-white-800"
                    >
                      View / Download PDF
                    </a>
                  ) : (
                    "No PDF"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Books;
