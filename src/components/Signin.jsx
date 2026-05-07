import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {
  // Define the state for capturing/storing user input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  
  // Define the "Remember Me" state
  const [rememberMe, setRememberMe] = useState(false);
  
  // Declare the additional status hooks
  const [loading, setLoading] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Use the useNavigate hook to direct us to another page on success
  const navigate = useNavigate();

  // Handle the sign-in action
  const handlesubmit = async (e) => {
    // Prevent the site from reloading
    e.preventDefault();

    // Update the loading hook with a message
    setLoading('Please wait while we authenticate your account...');

    try {
      // Create a formData object that will hold the email and the password
      const formdata = new FormData();

      // Insert the email & password on the FormData
      formdata.append('email', email);
      formdata.append('password', password);

      // Insert the axios for the response
      const response = await axios.post('https://victoria.alwaysdata.net/api/signin', formdata);

      // Set loading back to default
      setLoading('');

      // Check whether the user exists as part of the API response
      if (response.data.user) {
        // If the user is there, the credentials entered are correct
        const userObj = JSON.stringify(response.data.user);

        // Save to local storage depending on whether "Remember Me" is checked or not
        if (rememberMe) {
  localStorage.setItem('user', userObj);
  localStorage.setItem("role", response.data.user.role);
} else {
  localStorage.setItem('user', userObj);
  localStorage.setItem("role", response.data.user.role);
}

        // Direct the user to the home page
        navigate('/');
        // Force a reload or state update to update the Navbar
        window.location.reload(); 
      } else {
        // User is not found, credentials entered are incorrect
        setError('Login Failed. Please try again...');
      }

    } catch (error) {
      // Set loading back to default 
      setLoading('');

      // Update the error hook with a message
      setError('Oops, something went wrong. Try again...');
    }
  };

  return (
    <div 
      className="row justify-content-center align-items-center min-vh-100" 
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="col-md-5">
        <div 
          className="card border-0 shadow-lg p-4 rounded-4"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
        >
          <div className="text-center mb-4">
            <h2 style={{ fontFamily: 'serif', color: '#8B0000' }}>
              🍷 Bite Bright
            </h2>
            <p className="text-muted">Sign in to explore our delicacies</p>
          </div>

          {/* Status Messages */}
          {loading && <div className="alert alert-warning text-center py-2">{loading}</div>}
          {success && <div className="alert alert-success text-center py-2">{success}</div>}
          {error && <div className="alert alert-danger text-center py-2">{error}</div>}

          <form onSubmit={handlesubmit}>
            <div className="mb-3">
              <input
                type="email"
                placeholder="📧 Enter your email"
                className="form-control form-control-lg rounded-3"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                placeholder="🔒 Enter your password"
                className="form-control form-control-lg rounded-3"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Remember Me Checkbox */}
            <div className="mb-3 d-flex align-items-center">
              <input
                type="checkbox"
                id="rememberMe"
                className="form-check-input me-2 mt-0"
                style={{ cursor: 'pointer' }}
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label 
                htmlFor="rememberMe" 
                className="form-check-label text-muted" 
                style={{ cursor: 'pointer', userSelect: 'none' }}
              >
                Remember Me
              </label>
            </div>

            <div className="d-grid mb-3">
              <button 
                className="btn btn-lg rounded-3 fw-semibold"
                style={{
                  backgroundColor: '#8B0000',
                  color: 'white'
                }}
              >
                🍽️ Sign In
              </button>
            </div>

            <div className="text-center">
              <small className="text-muted">
                New here?{" "}
                <Link to="/Signup" className="fw-semibold" style={{ color: '#8B0000' }}>
                  Create an account
                </Link>
              </small>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;