import googleLogo from "../assets/google.svg";

export default function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <button onClick={handleGoogleLogin} className="google-btn">
      <img src={googleLogo} alt="Google logo" className="google-icon" />
      Continue with Google
    </button>
  );
}