import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext.jsx'
import { useState } from 'react'
import toast from "react-hot-toast";
import GoogleLoginButton from '../components/GoogleLogin.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import bookmarkLogo from "../assets/bookmark.svg"
import { resendVerification } from "../api/auth.js";

export default function Login() {
  const navigate = useNavigate();
  const [serverMsg, setServerMsg] = useState(null);
  const [canResend, setCanResend] = useState(false);
  const { login } = useAuth();

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  async function onSubmit(data) {
    try {
      await login(data);
      setCanResend(false)
      toast.success("Login successful. Redirecting…");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      if (error.response?.data?.resend) {
        setCanResend(true);
      } else {
        setCanResend(false);
      }
      console.log(error)
      toast.error(error.response?.data?.message || "Login failed");
      setServerMsg(error.response?.data?.message || "Login failed");
    }
  }

  async function handleResend() {
    try {
      const email = getValues("email");

      if (!email) {
        toast.error("Please enter your email first");
        return;
      }

      await resendVerification({ email });
      toast.success("Verification email sent!");
      setCanResend(false);
      setServerMsg(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend verification email");
    }
  };


  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="bookmark-logo" ><i>WebBook<img src={bookmarkLogo} alt="Google logo" className="google-icon" /></i></h1>
        <h2>Log in</h2>

        {serverMsg && <p className="auth-message">{serverMsg}</p>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Email</label>
          <input id="email" {...register("email", {
            required: { value: true, message: "Email is required" },
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address" },
          })} type="email" placeholder='will@gmail.com' title='Email' />
          {errors.email && <span className="error">{errors.email.message}</span>}

          <label htmlFor="password">Password</label>
          <input id="password" {...register("password", {
            required: { value: true, message: "Password is required" },
            pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/, message: "Password must include uppercase, lowercase, number, and symbol" },
            minLength: { value: 6, message: "Password must be at least 6 characters long" },
            maxLength: { value: 20, message: "Password cannot exceed 20 characters" }
          })}
            type="password" placeholder='Password' title='Must be 6-20 characters long' />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}

          <button disabled={isSubmitting}>
            {isSubmitting ? (
              <>Logging in… <FontAwesomeIcon icon={faSpinner} spinPulse /></>
            ) : (
              "Log in"
            )}
          </button>
        </form>

        <div className="auth-divider">or</div>

        <div className="google-wrap">
          <GoogleLoginButton />
        </div>

        <p className="auth-footer">
          New here? <Link to="/">Create an account</Link>
        </p>

        <p className="auth-footer small">
          <Link to="/request-password-reset">Forgot password?</Link>
        </p>

        {canResend && (
          <p className="auth-footer small">
            Didn't get the email?{" "}
            <button
              type="button"
              onClick={handleResend}
              className="link-button"
            >
              Resend verification email
            </button>
          </p>
        )}

      </div>
    </div>
  );
}
