import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { resetPassword } from "../api/auth.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [serverMsg, setServerMsg] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm();

  async function onSubmit(data) {
    try {
      await resetPassword(token, { newPassword: data.newPassword });
      toast.success("Password reset successful, Redirecting...");
      setServerMsg("Password reset successful");
      setTimeout(() => { navigate("/login"); }, 4000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
      setServerMsg(err.response?.data?.message || "Reset failed");
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Set new password</h1>
        {serverMsg && <p className="auth-message">{serverMsg}</p>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <label>New password</label>
          <div className="password-field">
            <input
              type="password"
              {...register("newPassword", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/,
                  message:
                    "Must include uppercase, lowercase, number, and special character"
                }
              })}
            />
          </div>
          {errors.newPassword && (
            <span className="error">{errors.newPassword.message}</span>
          )}

          <label>Confirm password</label>
          <div className="password-field">
            <input
              type="password"
              {...register("confirmPassword", {
                validate: value =>
                  value === watch("newPassword") || "Passwords do not match"
              })}
            />
          </div>
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword.message}</span>
          )}

          <button disabled={isSubmitting}>
            {isSubmitting ? (
              <>Saving... <FontAwesomeIcon icon={faSpinner} spinPulse /></>
            ) : "Reset password"}
          </button>
        </form>
      </div>
    </div>
  );
}
