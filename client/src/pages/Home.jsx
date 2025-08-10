import React from 'react';
import { FiBookOpen, FiSearch, FiHeart, FiDownload, FiStar } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import books from './Books';

const Home = () => {
  // Sample book data
  const featuredBooks = [
    {
      id: 1,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      cover: "https://imgs.search.brave.com/z2gauBc_BF6i5e-P8DuRuONzFgghIlfP1iYbcTUubAs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuY3RmYXNzZXRz/Lm5ldC9xcG4xZ3p0/YnVzdTIvMkJjcE1D/dFV2R3Y3SUppM0xY/RnA0SS8xMGUyNDY1/N2IwOTBmMDI2NWFl/OTFkNDI2ZTU2NTIx/Ni9hbGV4LW1pY2hh/ZWxpZGVzLXRoZS1z/aWxlbnQtcGF0aWVu/dC53ZWJwP2ZtPWpw/ZyZ3PTM4NDAmcT03/MA",
      rating: 4.5,
      category: "Psychological Thriller"
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      cover: "https://imgs.search.brave.com/EFMjsMursKmQSn40CBp6F-rl4BJNj4ylJXXMqQLumW0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJhY2Nlc3Mu/Y29tL2Z1bGwvOTky/Mjg2OS5wbmc",
      rating: 4.8,
      category: "Self-Help"
    },
    {
      id: 3,
      title: "Project Hail Mary",
      author: "Andy Weir",
      cover: "https://imgs.search.brave.com/5rqL338s_-lko87ZEwsdIZiIoWjv1YAV33udWmgXDds/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aGUt/YmlibGlvZmlsZS5j/b20vd3AtY29udGVu/dC91cGxvYWRzL3By/b2plY3RoYWlsbWFy/eS5qcGc",
      rating: 4.7,
      category: "Science Fiction"
    },
    {
      id: 4,
      title: "The Midnight Library",
      author: "Matt Haig",
      cover: "https://imgs.search.brave.com/dRXlN535-iTG1vW5pb6saKxOS73un-y1wvzsCUPjJTI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aGUt/YmlibGlvZmlsZS5j/b20vd3AtY29udGVu/dC91cGxvYWRzL21p/ZG5pZ2h0bGlicmFy/eS5wbmc",
      rating: 4.3,
      category: "Fantasy"
    }
  ];

  const categories = [
    "Fiction", "Non-Fiction", "Mystery", "Romance",
    "Sci-Fi", "Biography", "History", "Self-Help"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-900 to-purple-800 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Your Next Favorite Book</h1>
              <p className="text-xl mb-8">Explore our vast collection of e-books across all genres</p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  <a href="/books">Browse Collection</a>
                </button>

              </div>
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
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for books, authors, or categories..."
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">Featured Books</h2>
            <a href="/books" className="text-indigo-600 hover:text-indigo-800 font-medium">View All</a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredBooks.map((book) => (
              <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative pb-2/3">
                  <img
                    src={book.cover}
                    alt={`${book.title} book cover - ${book.category} novel by ${book.author}`}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    Bestseller
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
                  <p className="text-gray-600 mb-2">{book.author}</p>
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(book.rating) ? 'text-amber-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="text-gray-500 text-sm ml-1">({book.rating})</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{book.category}</span>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Browse Categories</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center">
                <div className="bg-indigo-100 p-4 rounded-full mb-4">
                  <FiBookOpen className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-1">{category}</h3>
                <p className="text-gray-500 text-sm">1,240 books</p>
                <a href="/books" className="mt-3 text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                  Explore →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">What Our Readers Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "BookBay has the best collection of e-books I've ever seen. The reading experience is flawless!",
                author: "Sarah Johnson",
                pic: "https://imgs.search.brave.com/aIln845o6a3XE4QVJFY-eTj_4gZqmIQCyCRrhj2nfZ0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWdj/ZG4uc3RhYmxlZGlm/ZnVzaW9ud2ViLmNv/bS8yMDI1LzMvMTUv/ZDZkMjE4ZGItYzBl/MS00OGE4LTlmZTQt/MTM1YzY0MzRkN2U0/LmpwZw",
                role: "Avid Reader"
              },
              {
                quote: "I love how easy it is to discover new books. The recommendations are always spot on!",
                author: "Michael Chen",
                pic: "https://imgs.search.brave.com/yZvgt-grGL3vmaZTBPHPpT-xV6KZnA8G5xST0KFtR9o/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWdj/ZG4uc3RhYmxlZGlm/ZnVzaW9ud2ViLmNv/bS8yMDI0LzEwLzI1/LzYxZTBjZDM1LTJi/MjQtNDY1OC1hOTMy/LTZhNjllNDI1OTll/Mi5qcGc",
                role: "Book Blogger"
              },
              {
                quote: "As someone who reads daily, BookBay has become my go-to platform for all my reading needs.",
                author: "Emily Rodriguez",
                pic: "https://imgs.search.brave.com/NnBu1-DwquFmucNeSYzVSwE1a6-4amXLEznDIGqPaiw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9taXJv/Lm1lZGl1bS5jb20v/djIvMSoyVGx4S0t2/S2xLd0RkbkFIZGNL/eVh3LmpwZWc",
                role: "Literary Critic"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="h-5 w-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-600 italic mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <img
                    src={testimonial.pic}
                    alt={`${testimonial.author} profile photo`}
                    className="h-10 w-10 rounded-full object-cover mr-3"
                  />
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Reading Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of readers discovering amazing books every day
          </p>
          <button className="bg-white hover:bg-gray-100 text-indigo-800 px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
            <a href="/books">Read now</a>
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
