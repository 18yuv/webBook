import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import bookmarkLogo from "../assets/bookmark.svg";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
      toast.success("Logout Successful!")
    } catch (err) {
      toast.error(err.response?.data?.message || "Error, Try again!")
    }
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Left */}
        <Link to= {user ? "/dashboard" : "/"} className="navbar-logo">
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

              {/* Google login */}
              {!user?.hasPassword && (
                <Link to="/set-password" className="nav-link">
                  Set password
                </Link>
              )}
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