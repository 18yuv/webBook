import { useState } from "react";
import { updateBookmark } from "../api/bookmarks.js";

export default function BookmarkEditModal({ bookmark, onClose, onSaved }) {
  const [form, setForm] = useState({
    title: bookmark.title || "",
    url: bookmark.url || "",
    description: bookmark.description || "",
    tags: (bookmark.tags || []).join(", ")
  });

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      url: form.url.trim(),
      title: form.title.trim() || undefined,
      description: form.description.trim() || undefined,
      tags: form.tags
        ? form.tags.split(",").map(t => t.trim()).filter(Boolean)
        : undefined
    };

    await updateBookmark(bookmark._id, payload);
    onSaved();
    onClose();
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <form
        className="modal"
        onSubmit={handleSubmit}
        onClick={e => e.stopPropagation()}
      >
        <h3>Edit Bookmark</h3>

        <input
          placeholder="Title (optional)"
          value={form.title}
          onChange={e =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          placeholder="URL *"
          value={form.url}
          onChange={e =>
            setForm({ ...form, url: e.target.value })
          }
          required
        />

        <textarea
          placeholder="Description (optional)"
          value={form.description}
          onChange={e =>
            setForm({ ...form, description: e.target.value })
          }
          rows={3}
        />

        <input
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={e =>
            setForm({ ...form, tags: e.target.value })
          }
        />

        <div className="modal-actions">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="primary" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}