import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { logOut } from '../../utils/authFunctions';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <a href='/' className="text-white text-2xl font-semibold">WeatherPulse</a>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/" className="text-white hover:text-gray-200">Dashboard</Link>
              <Link to="/history" className="text-white hover:text-gray-200">History</Link>
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                  className="flex items-center space-x-2 text-white focus:outline-none"
                >
                  <FaUserCircle className="text-2xl" />
                  <span>{user.displayName}</span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-10">
                    {/* <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link> */}
                    <div className="px-4 py-2 border-t border-gray-200">
                      <span className="text-gray-700">{user.email}</span>
                    </div>
                    <button 
                      onClick={handleLogout} 
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/signIn" className="text-white hover:text-gray-200">Sign In</Link>
              <Link to="/signUp" className="text-white hover:text-gray-200">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
