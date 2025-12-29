import { useState } from "react";
import { createBookmark } from "../api/bookmarks";

export default function BookmarkCreateModal({ onClose, onCreated }) {
    const [form, setForm] = useState({
        title: "",
        url: "",
        description: "",
        tags: ""
    });
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!form.url.trim()) {
            setError("URL is required");
            return;
        }

        const payload = {
            url: form.url.trim(),
            title: form.title.trim() || undefined,
            description: form.description.trim() || undefined,
            tags: form.tags ? form.tags.split(",").map(t => t.trim()).filter(Boolean) : undefined
        };

        try {
            await createBookmark(payload);
            onCreated();
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create bookmark");
        }
    }

    return (
        <div className="modal-backdrop">
            <form className="modal" onSubmit={handleSubmit}>
                <h3>New Bookmark</h3>

                <input
                    placeholder="Title (optional)"
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                />

                <input
                    placeholder="URL *"
                    value={form.url}
                    onChange={e => setForm({ ...form, url: e.target.value })}
                />

                <textarea
                    placeholder="Description (optional)"
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                />

                <input
                    placeholder="Tags (comma separated)"
                    value={form.tags}
                    onChange={e => setForm({ ...form, tags: e.target.value })}
                />

                {error && <p className="error">{error}</p>}

                <div className="modal-actions">
                    <button type="button" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="primary">Save</button>
                </div>
            </form>
        </div>
    );
}