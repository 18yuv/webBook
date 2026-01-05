import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function VerifyExpired() {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error("Email Expired! Redirecting...");
    const timer = setTimeout(() => {
      navigate("/login");
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="not-found">
      <h1>Email expired!</h1>
      <h3>Please return to the login page and try again</h3>
      <p>You'll be redirected to login shortly.</p>
      <Link to="/login">Login</Link>
    </div>
  );
}