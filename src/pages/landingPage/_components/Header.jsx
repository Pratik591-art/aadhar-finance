import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <button 
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-3 py-1 rounded font-bold text-lg">
              moneycontrol
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          <a href="#hero" className="text-gray-700 hover:text-blue-600 transition">Home</a>
          <a href="#features" className="text-gray-700 hover:text-blue-600 transition">Features</a>
          <a href="#partners" className="text-gray-700 hover:text-blue-600 transition">Partners</a>
          <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition">Reviews</a>
          <a href="#contact" className="text-gray-700 hover:text-blue-600 transition">Contact</a>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg lg:hidden">
            <nav className="flex flex-col p-4 gap-4">
              <a href="#hero" className="text-gray-700 hover:text-blue-600 transition" onClick={() => setIsMenuOpen(false)}>Home</a>
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition" onClick={() => setIsMenuOpen(false)}>Features</a>
              <a href="#partners" className="text-gray-700 hover:text-blue-600 transition" onClick={() => setIsMenuOpen(false)}>Partners</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition" onClick={() => setIsMenuOpen(false)}>Reviews</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition" onClick={() => setIsMenuOpen(false)}>Contact</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
