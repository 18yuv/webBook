import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function VerifySuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 4000);
    
    toast.success("Email verified successfully!");
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="not-found">
      <h1>Email Verified!</h1>
      <h3>Your email has been successfully verified.</h3>
      <p>You'll be redirected to login shortly.</p>
      <Link to="/login">Go to Login</Link>
    </div>
  );
}