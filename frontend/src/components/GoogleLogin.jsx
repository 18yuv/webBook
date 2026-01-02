import googleLogo from "../assets/google.svg";

export default function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <button onClick={handleGoogleLogin} className="google-btn">
      <img src={googleLogo} alt="Google logo" className="google-icon" />
      Continue with Google
    </button>
  );
}