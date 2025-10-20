import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/logod.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleCloseMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosing(false);
    }, 300); // Match animation duration
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      handleCloseMenu();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleGetStarted = () => {
    navigate('/get-started');
    handleCloseMenu();
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <button 
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={22} className="text-gray-700" /> : <FaBars size={22} className="text-gray-700" />}
          </button>
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logo} alt="Aadhar Finance Logo" className="h-12" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link 
            to="/" 
            className={`text-sm font-medium hover:text-blue-600 transition-colors ${isActive('/') ? 'text-blue-600' : 'text-gray-700'}`}
          >
            Home
          </Link>
          <a 
            href="/#features" 
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            Features
          </a>
          <a 
            href="/#partners" 
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            Partners
          </a>
          <a 
            href="/#testimonials" 
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            Reviews
          </a>
          <a 
            href="/#contact" 
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden lg:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              {/* Dashboard link will be enabled later */}
              {/* <Link 
                to="/dashboard" 
                className="px-4 py-2 text-blue-600 hover:text-blue-700 transition font-medium"
              >
                Dashboard
              </Link> */}
              <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">
                  {user?.phoneNumber}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-5 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium text-sm active:scale-95"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-colors font-medium text-sm"
              >
                Login
              </Link>
              <button
                onClick={handleGetStarted}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium text-sm shadow-sm hover:shadow-md active:scale-95"
              >
                Get Started
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`fixed top-0 left-0 h-full w-72 backdrop-blur-xl bg-white/95 shadow-2xl lg:hidden z-40 ${isClosing ? 'animate-slideOut' : 'animate-slideIn'}`}>
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-200/50">
                <div className="flex items-center gap-2">
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shadow-md">
                    AF
                  </div>
                  <span className="font-bold text-lg text-gray-900">Aadhar Finance</span>
                </div>
                <button 
                  onClick={handleCloseMenu}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <FaTimes size={20} className="text-gray-700" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col p-5 gap-2 flex-1">
                <Link 
                  to="/" 
                  className={`px-4 py-3 rounded-xl transition-colors font-medium ${isActive('/') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  onClick={handleCloseMenu}
                >
                  Home
                </Link>
                <a 
                  href="/#features" 
                  className="px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-medium" 
                  onClick={handleCloseMenu}
                >
                  Features
                </a>
                <a 
                  href="/#partners" 
                  className="px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-medium" 
                  onClick={handleCloseMenu}
                >
                  Partners
                </a>
                <a 
                  href="/#testimonials" 
                  className="px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-medium" 
                  onClick={handleCloseMenu}
                >
                  Reviews
                </a>
                <a 
                  href="/#contact" 
                  className="px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-medium" 
                  onClick={handleCloseMenu}
                >
                  Contact
                </a>
              </nav>

              {/* Mobile Auth Buttons */}
              <div className="border-t border-gray-200/50 p-5">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl text-gray-700 mb-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">{user?.phoneNumber}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium active:scale-95"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="space-y-3">
                    <Link
                      to="/login"
                      className="block w-full px-4 py-3 text-center text-blue-600 border-2 border-blue-600 rounded-xl hover:bg-blue-50 transition-colors font-medium"
                      onClick={handleCloseMenu}
                    >
                      Login
                    </Link>
                    <button
                      onClick={handleGetStarted}
                      className="w-full px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-sm active:scale-95"
                    >
                      Get Started
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Overlay */}
        {isMenuOpen && (
          <div 
            className="fixed inset-0 backdrop-blur-sm bg-gray-900/20 lg:hidden z-30 transition-opacity duration-300"
            onClick={handleCloseMenu}
          />
        )}
      </div>
    </header>
  );
};

export default Navbar;
