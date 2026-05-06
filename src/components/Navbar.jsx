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
    setUser(null);
    navigate('/signin');
    window.location.reload(); // Refresh to update the Navbar across tabs
  };

  // Adjust the condition based on your backend response (e.g., user.role === 'admin' or user.isAdmin === true)
  const isAdmin = user && (user.role === 'admin' || user.isAdmin === true);

  return (
    <nav className="navbar navbar-expand-lg navbar-beige bg-beige sticky-top shadow-sm">
      <div className="container">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto gap-3">
            <li className="nav-item">
              <Link className="nav-link text-light" to="/">Menu</Link>
            </li>

            {/* Conditional Rendering for Sign In / Sign Out and Links */}
            {user ? (
              <>
                {/* Show "Add Meal" ONLY if the user is an admin */}
                {isAdmin && (
                  <li className="nav-item">
                    <Link className="nav-link text-light" to="/addproducts">Add Meal</Link>
                  </li>
                )}
                
                <li className="nav-item">
                  <button 
                    className="btn btn-link nav-link text-light text-decoration-none p-0" 
                    onClick={handleLogout}
                    style={{ border: 'none', background: 'transparent' }}
                  >
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/signin">Sign In</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/signup">Sign Up</Link>
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