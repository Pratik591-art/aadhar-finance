import React from 'react';
import Navbar from '../components/Navbar';

/**
 * Main Layout Component - Wraps all pages with global navbar
 */
const Layout = ({ children, showNavbar = true }) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      {showNavbar && <Navbar />}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;
