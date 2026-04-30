import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer 
      className="mt-5 text-dark"
      style={{ backgroundColor:"beige"}}
    >
      <div className="container py-5">
        <div className="row">

          {/* About Us */}
          <div className="col-md-4 mb-4">
            <h5 style={{ fontFamily: "serif" }}>🍽️ Bite Bright</h5>
            <p className="small">
              Experience the finest delicacies crafted with passion. 
              We bring you a luxurious dining experience right at your fingertips.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-dark text-decoration-none">Home</Link></li>
              <li><Link to="/signin" className="text-dark text-decoration-none">Sign In</Link></li>
              <li><Link to="/signup" className="text-dark text-decoration-none">Sign Up</Link></li>
              <li><Link to="/addproducts" className="text-dark text-decoration-none">Add Meal</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-4">
            <h5>Contact Us</h5>
            <p className="small mb-1">📍 Nairobi, Kenya</p>
            <p className="small mb-1">📞 +254 712 345 678</p>
            <p className="small mb-1">📧 info@bitebright.com</p>

            <div className="mt-3">
              <span className="me-3">🌐</span>
              <span className="me-3">📸</span>
              <span>🐦</span>
            </div>
          </div>

        </div>

        <hr className="bg-light" />

        <div className="text-center small">
          © {new Date().getFullYear()} BiteBright. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;

