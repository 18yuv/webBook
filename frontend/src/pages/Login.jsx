import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import api from '../api/axios.js'
import { useState } from 'react'
import toast from "react-hot-toast";
import GoogleLoginButton from '../components/GoogleLogin.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Login() {

    const navigate = useNavigate()
    const [serverMsg, setServerMsg] = useState(null)


    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm()

    async function onSubmit(data) {
        try {
            const response = await api.post("/auth/login", data)
            toast.success("Verification email sent. Please check your inbox.");
            setServerMsg(response.data.message)
            setTimeout(() => { navigate("/dashboard") }, 4000);
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed");
            setServerMsg(error.response?.data?.message || error.message || "Signup Failed")
            console.error("Error:", error.response?.data || error.message || "Signup Failed");
        }

    }

    return (
        <>
            <h1>Login</h1>
            {serverMsg && <p>{serverMsg}</p>}
            <form onSubmit={handleSubmit(onSubmit)} >

                <label htmlFor="email">Email</label>

                <input id="email" {...register("email", {
                    required: { value: true, message: "Email is required" },
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address" },
                })} type="email" placeholder='will@gmail.com' title='Email' />

                {errors.email && <span>{errors.email.message}</span>}

                <label htmlFor="password">Password</label>

                <input id="password" {...register("password", {
                    required: { value: true, message: "Password is required" },
                    pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/, message: "Password must include uppercase, lowercase, number, and symbol" },
                    minLength: { value: 6, message: "Password must be at least 6 characters long" },
                    maxLength: { value: 20, message: "Password cannot exceed 20 characters" }
                })}
                    type="password" placeholder='Password' title='Password must be 6-20 characters' />

                {errors.password && <span>{errors.password.message}</span>}

                <button disabled={isSubmitting}>
                    {isSubmitting ? (<>Loging in...<FontAwesomeIcon icon={faSpinner} spinPulse /></>) : "Login"}
                </button>

            </form>
            <GoogleLoginButton />
            <p>Create Account? <Link to="/" >Signup</Link></p>

            {/* if resend =  true from the backend (login control in authcontroller)
            <p><Link to="/resend-verification">Resend Verification Email?</Link></p>  */}


            <p>Forgot Password? <Link to='/request-password-reset'>Reset Password</Link></p>
        </>
    )
}