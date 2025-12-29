import { useState } from "react";
import { createBookmark } from "../api/bookmarks";

export default function BookmarkForm({ onCreated }) {
  const [form, setForm] = useState({ title: "", url: "", tags: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.url) {
      setError("URL is required");
      return;
    }

    try {
      await createBookmark({
        ...form,
        tags: form.tags ? form.tags.split(",").map(t => t.trim().toLowerCase()) : []

      });
      setForm({ title: "", url: "", tags: "" });
      onCreated();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create bookmark");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Title" value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })} />

      <input placeholder="URL" value={form.url}
        onChange={e => setForm({ ...form, url: e.target.value })} />

      <input placeholder="Tags (comma separated)"
        value={form.tags}
        onChange={e => setForm({ ...form, tags: e.target.value })} />

      {error && <p>{error}</p>}
      <button>Add Bookmark</button>
    </form>
  );
}