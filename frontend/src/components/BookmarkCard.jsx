import { useState } from "react";
import BookmarkEditModal from "./BookmarkEditModal";
import { deleteBookmark } from "../api/bookmarks.js";

export default function BookmarkCard({ bookmark, onChange }) {
  const [editing, setEditing] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Delete this bookmark?")) return;
    await deleteBookmark(bookmark._id);
    onChange();
  };

  return (
    <>
      <div className="bookmark-card">
        <div className="bookmark-main">
          <h3>{bookmark.title || "Untitled Bookmark"}</h3>

          <a href={bookmark.url} target="_blank" rel="noreferrer">
            {bookmark.url}
          </a>

          {bookmark.description && (
            <p className="muted">{bookmark.description}</p>
          )}

          <div className="tags">
            {(bookmark.tags || []).map(tag => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
        </div>

        <div className="bookmark-actions">
          <button onClick={() => setEditing(true)}>Edit</button>
          <button className="danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      {editing && (
        <BookmarkEditModal
          bookmark={bookmark}
          onClose={() => setEditing(false)}
          onSaved={onChange}
        />
      )}
    </>
  );
}