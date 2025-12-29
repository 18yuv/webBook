import { useForm } from "react-hook-form"
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import GoogleLoginButton from "../components/GoogleLogin.jsx";
import { signup } from "../api/auth.js";

export default function Signup() {

    const [serverMsg, setServerMsg] = useState(null)
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm()

    async function onSubmit(data) {
        try {
            await signup(data)
            toast.success("Verification email sent. Please check your inbox.");
            setServerMsg("Verification email sent. Please check your inbox.")
            setTimeout(() => { navigate("/login") }, 4000);
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed");
            setServerMsg(error.response?.data?.message || error.message || "Signup Failed")
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1><i>WebBook</i></h1>
                <h2>Create account</h2>

                {serverMsg && <p className="auth-message">{serverMsg}</p>}

                <form onSubmit={handleSubmit(onSubmit)}>

                    <label htmlFor="name">Name</label>
                    <input id="name" {...register("name", {
                        required: { value: true, message: "Name is required" }
                    })} type="text" placeholder='Will Smith' title='Name' />
                    {errors.name && <span className="error">{errors.name.message}</span>}

                    <label htmlFor="email">Email</label>
                    <input id="email" {...register("email", {
                        required: { value: true, message: "Email is required" },
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address" },
                    })} type="email" placeholder='will@email.com' title='Email' />
                    {errors.email && <span className="error">{errors.email.message}</span>}

                    <label htmlFor="password">Password</label>
                    <input id="password" {...register("password", {
                        required: { value: true, message: "Password is required" },
                        pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/, message: "Must include uppercase, lowercase, number, and special Character" },
                        minLength: { value: 6, message: "Minimum 6 characters" },
                        maxLength: { value: 20, message: "Maximum 20 characters" }
                    })}
                        type="password" placeholder='Password' title='Password must be 6-20 characters' />
                    {errors.password && <span className="error">{errors.password.message}</span>}

                    <button disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>Creating account… <FontAwesomeIcon icon={faSpinner} spinPulse /></>
                        ) : (
                            "Create account"
                        )}
                    </button>
                </form>

                <div className="auth-divider">or</div>

                <GoogleLoginButton />

                <p className="auth-footer">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    )
}