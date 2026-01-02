import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setPassword } from "../api/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext.jsx";

export default function SetPassword() {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting }
    } = useForm();

    async function onSubmit(data) {
        try {
            await setPassword({ newPassword: data.newPassword });

            setUser(prev => ({ ...prev, hasPassword: true }));

            toast.success("Password set successfully!");
            navigate("/dashboard");
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to set password");
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>Set a password</h1>
                <p className="muted">
                    You signed in with Google. Setting a password lets you log in without Google.
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>New password</label>
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
                    {errors.newPassword && (
                        <span className="error">{errors.newPassword.message}</span>
                    )}

                    <label>Confirm password</label>
                    <input
                        type="password"
                        {...register("confirmPassword", {
                            validate: value =>
                                value === watch("newPassword") || "Passwords do not match"
                        })}
                    />
                    {errors.confirmPassword && (
                        <span className="error">{errors.confirmPassword.message}</span>
                    )}

                    <button disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>Saving… <FontAwesomeIcon icon={faSpinner} spinPulse /></>
                        ) : (
                            "Set password"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}