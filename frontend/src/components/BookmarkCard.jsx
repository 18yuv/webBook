import { deleteBookmark } from "../api/bookmarks";

export default function BookmarkCard({ bookmark, onChange }) {
  const handleDelete = async () => {
    if (!window.confirm("Delete this bookmark?")) return;
    await deleteBookmark(bookmark._id);
    onChange();
  };

  return (
    <div className="bookmark-card">
      <h3>{bookmark.title || "Untitled"}</h3>
      <a href={bookmark.url} target="_blank" rel="noreferrer">
        {bookmark.url}
      </a>

      <div className="tags">
        {bookmark.tags.map(tag => (
          <span key={tag}>#{tag}</span>
        ))}
      </div>

      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}