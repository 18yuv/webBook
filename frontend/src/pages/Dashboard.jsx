import { useState } from "react";
import useBookmarks from "../hooks/useBookmarks";
import BookmarkCard from "../components/BookmarkCard";
import BookmarkCreateModal from "../components/BookmarkCreateModal";
import SearchBar from "../components/SearchBar";

export default function Dashboard() {
  const { bookmarks, loading, error, fetchBookmarks } = useBookmarks();
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Bookmarks</h1>
        <button className="primary" onClick={() => setShowCreate(true)}>
          + Add Bookmark
        </button>
      </header>

      <SearchBar onSearch={fetchBookmarks} />

      {loading && <p>Loading bookmarks...</p>}
      {error && <p className="error">{error}</p>}

      <div className="bookmark-list">
        {!loading && bookmarks.length === 0 && (
          <p className="muted">No bookmarks yet</p>
        )}

        {bookmarks.map(b => (
          <BookmarkCard
            key={b._id}
            bookmark={b}
            onChange={fetchBookmarks}
          />
        ))}
      </div>

      {showCreate && (
        <BookmarkCreateModal
          onClose={() => setShowCreate(false)}
          onCreated={fetchBookmarks}
        />
      )}
    </div>
  );
}