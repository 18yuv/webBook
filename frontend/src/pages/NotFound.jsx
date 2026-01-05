import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function NotFound() {
    const navigate = useNavigate();
    useEffect(() => {
        toast.error("NOTHING HERE! Redirecting...");
        const timer = setTimeout(() => {
            navigate("/login");
        }, 4000);
        return () => clearTimeout(timer);
    }, [navigate]);


    return (
        <div className="not-found">
            <h1>Ooopssiieee!!</h1>
            <h1>Something Went Wrong</h1>
            <h1>NotFound 404</h1>
            <Link to="/login">Login</Link>
        </div>
    )
}