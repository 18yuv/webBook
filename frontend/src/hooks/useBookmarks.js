import { useEffect, useState } from "react";
import * as bookmarkApi from "../api/bookmarks.js";

export default function useBookmarks() {
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchBookmarks = async (search = "") => {
        try {
            setLoading(true);
            const res = await bookmarkApi.getBookmarks(search);
            setBookmarks(res.data);
        } catch (err) {
            setError("Failed to load bookmarks");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookmarks();
    }, []);

    return {
        bookmarks,
        loading,
        error,
        fetchBookmarks
    };
}