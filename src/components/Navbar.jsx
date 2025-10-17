import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleGetStarted = () => {
    navigate('/get-started');
    setIsMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <button 
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-3 py-1 rounded font-bold text-lg">
              Aadhar Finance
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link 
            to="/" 
            className={`hover:text-blue-600 transition ${isActive('/') ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}
          >
            Home
          </Link>
          <a 
            href="/#features" 
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Features
          </a>
          <a 
            href="/#partners" 
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Partners
          </a>
          <a 
            href="/#testimonials" 
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Reviews
          </a>
          <a 
            href="/#contact" 
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Contact
          </a>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden lg:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {/* Dashboard link will be enabled later */}
              {/* <Link 
                to="/dashboard" 
                className="px-4 py-2 text-blue-600 hover:text-blue-700 transition font-medium"
              >
                Dashboard
              </Link> */}
              <span className="px-4 py-2 text-gray-700">
                {user?.phoneNumber}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={handleGetStarted}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Get Started
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg lg:hidden">
            <nav className="flex flex-col p-4 gap-4">
              <Link 
                to="/" 
                className={`hover:text-blue-600 transition ${isActive('/') ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <a 
                href="/#features" 
                className="text-gray-700 hover:text-blue-600 transition" 
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="/#partners" 
                className="text-gray-700 hover:text-blue-600 transition" 
                onClick={() => setIsMenuOpen(false)}
              >
                Partners
              </a>
              <a 
                href="/#testimonials" 
                className="text-gray-700 hover:text-blue-600 transition" 
                onClick={() => setIsMenuOpen(false)}
              >
                Reviews
              </a>
              <a 
                href="/#contact" 
                className="text-gray-700 hover:text-blue-600 transition" 
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              
              {/* Mobile Auth Buttons */}
              <div className="border-t pt-4 mt-2">
                {isAuthenticated ? (
                  <>
                    {/* Dashboard link will be enabled later */}
                    {/* <Link 
                      to="/dashboard" 
                      className="block px-4 py-2 text-center text-blue-600 hover:bg-blue-50 rounded-lg transition mb-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link> */}
                    <div className="px-4 py-2 text-center text-gray-700 mb-2">
                      {user?.phoneNumber}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleGetStarted}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Get Started
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
