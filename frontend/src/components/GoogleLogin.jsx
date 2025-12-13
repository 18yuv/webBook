export default function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    window.location.href =
      "http://localhost:5000/auth/google";
  };

  return (
    <button onClick={handleGoogleLogin}>
      Continue with Google
    </button>
  );
}