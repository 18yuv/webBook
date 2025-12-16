import { useForm } from "react-hook-form"
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api from '../api/axios.js';
import GoogleLoginButton from '../components/GoogleLogin.jsx';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

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
            const response = await api.post("/auth/signup", data)
            toast.success("Verification email sent. Please check your inbox.");
            setServerMsg("Verification email sent. Please check your inbox.")
            setTimeout(() => { navigate("/login") }, 4000);
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed");
            setServerMsg(error.response?.data?.message || error.message || "Signup Failed")
            console.error("Error:", error.response?.data || error.message || "Signup Failed");
        }
    }

    return (
        <>
            <h1>Signup</h1>
            {serverMsg && <p>{serverMsg}</p>}
            <form onSubmit={handleSubmit(onSubmit)} >

                <label htmlFor="name">Name</label>

                <input id="name" {...register("name", {
                    required: { value: true, message: "Name is required" }
                })} type="text" placeholder='Will Smith' title='Name' />
                {errors.name && <span>{errors.name.message}</span>}

                <label htmlFor="email">Email</label>

                <input id="email" {...register("email", {
                    required: { value: true, message: "Email is required" },
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address" },
                })} type="email" placeholder='will@email.com' title='Email' />
                {errors.email && <span>{errors.email.message}</span>}

                <label htmlFor="password">Password</label>

                <input id="password" {...register("password", {
                    required: { value: true, message: "Password is required" },
                    pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/, message: "Password must include uppercase, lowercase, number, and special Character" },
                    minLength: { value: 6, message: "Password must be at least 6 characters long" },
                    maxLength: { value: 20, message: "Password cannot exceed 20 characters" }
                })}
                    type="password" placeholder='Password' title='Password must be 6-20 characters' />
                {errors.password && <span>{errors.password.message}</span>}

                <button disabled={isSubmitting}>
                    {isSubmitting ? (<>Signing up...<FontAwesomeIcon icon={faSpinner} spinPulse /></>) : "Submit" }
                </button>
            </form>

            <GoogleLoginButton />
            <p>Already exists? <Link to='/login'>Login</Link></p>
        </>
    )
}