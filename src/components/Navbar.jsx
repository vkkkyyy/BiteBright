import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user account exists in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('role'); // Also clear the role on logout
    setUser(null);
    navigate('/signin');
    window.location.reload(); // Refresh to update the Navbar across tabs
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top shadow-sm" style={{ backgroundColor: '#8B0000' }}>
      <div className="container">
        {/* Brand Logo */}
        <Link className="navbar-brand fw-bold" to="/">🍷 Bite Bright</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto gap-3 align-items-center">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Menu</Link>
            </li>

            {/* Conditional Rendering for Sign In / Sign Out and Links */}
            {user ? (
              <>
                {/* We show "Add Meal" to any logged-in user because the 
                    Addproducts page itself is protected by the Secret Key logic gate */}
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/add-product">Add Meal</Link>
                </li>
                
                <li className="nav-item">
                  <button 
                    className="btn btn-link nav-link text-white text-decoration-none p-0" 
                    onClick={handleLogout}
                    style={{ border: 'none', background: 'transparent' }}
                  >
                    Sign Out
                  </button>
                </li>
                
                <li className="nav-item">
                  <span className="badge bg-light text-dark ms-2">
                    👤 {user.fullname || 'User'}
                  </span>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/signin">Sign In</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/signup">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
