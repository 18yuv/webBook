import googleLogo from "../assets/google.svg";

export default function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <button onClick={handleGoogleLogin} style={styles.btn}>
      <img src={googleLogo} alt="Google logo" style={styles.icon} />
      Sign in with Google
    </button>
  );
}

const styles = {
  btn: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 16px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    background: "#fff",
    cursor: "pointer",
  },
  icon: {
    width: "18px",
    height: "18px",
  },
};