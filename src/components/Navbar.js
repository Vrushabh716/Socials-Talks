import { Link } from "react-router-dom";
import "../styles/theme.css";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="navbar">
      <h2>Social Talks</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/create">Create</Link>

        {user ? (
  <Link to="/account" className="user-link">
    👤 {user.username}
  </Link>
) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;