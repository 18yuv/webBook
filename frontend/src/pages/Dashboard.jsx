import Bookmark from "../components/BookmarkCard.jsx";
import Header from "../components/Header.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";

export default function Dashboard() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // to redirect if not logged in

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get('/home/me')
        setUser(response.data);
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        navigate("*");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [navigate]);

  async function handleLogout() {
    try {
      await api.post('/auth/logout')
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
      navigate("/login");
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h1>{user?.message}!</h1>

      <Header />
      <div className="top">
        <h4>Items</h4>
        <select name="" id="">
          <option value="Tags">Tag</option>
        </select>
        <input type="text" /><FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>
      <Bookmark />
      <button>Create New <FontAwesomeIcon icon={faBookmark} /></button>

      <button onClick={handleLogout} >
        Logout
      </button>
    </>
  );
}

import useBookmarks from "../hooks/useBookmarks.js";
import BookmarkCard from "../components/BookmarkCard.jsx";
import BookmarkForm from "../components/BookmarkForm.jsx";
import SearchBar from "../components/SearchBar.jsx";

export default function Dashboard() {
  const { bookmarks, loading, error, fetchBookmarks } = useBookmarks();

  return (
    <div className="dashboard">
      <h1>My Bookmarks</h1>

      <SearchBar onSearch={fetchBookmarks} />
      <BookmarkForm onCreated={fetchBookmarks} />

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="bookmark-grid">
        {bookmarks.map(b => (
          <BookmarkCard
            key={b._id}
            bookmark={b}
            onChange={fetchBookmarks}
          />
        ))}
      </div>
    </div>
  );
}