import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <h1 className="text-2xl font-bold">Movie Rental System</h1>
      <div>
        {user && user.role === 'Admin' && (
          <Link to="/admin" className="mr-4 hover:underline">Admin Dashboard</Link>
        )}
        {user && user.role === 'Staff' && (
          <Link to="/staff" className="mr-4 hover:underline">Staff Dashboard</Link>
        )}
        {user && user.role === 'Customer' && (
          <Link to="/customer" className="mr-4 hover:underline">Customer Dashboard</Link>
        )}
        {user ? (
          <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 mr-4">
              Login
            </Link>
            <Link to="/register" className="bg-gray-500 px-4 py-2 rounded hover:bg-gray-600">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
