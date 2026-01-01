import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import bookmarkLogo from "../assets/bookmark.svg";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Left */}
        <Link to="/" className="navbar-logo">
          <img src={bookmarkLogo} alt="WebBook" />
          <span>WebBook</span>
        </Link>

        {/* Right */}
        <nav className="navbar-actions">
          {user ? (
            <>
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>

              <button
                className="nav-button"
                onClick={handleLogout}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Log in
              </Link>
              <Link to="/" className="nav-button primary">
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}