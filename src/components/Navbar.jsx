import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-beige bg-beige sticky-top shadow-sm">
  <div className="container">
    <Link className="navbar-brand" to="/">MyBiteBrightApp</Link>
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarNav">
      {/* Centered with mx-auto and added gap for spacing */}
      <ul className="navbar-nav mx-auto gap-3">
        <li className="nav-item">
          <Link className="nav-link text-dark" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-dark" to="/signin">Sign In</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-dark" to="/signup">Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-dark" to="/addproducts">Add Meal</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
  );
}

export default Navbar;