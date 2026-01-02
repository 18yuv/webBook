import { useState } from "react";
import { createBookmark } from "../api/bookmarks.js";
import toast from "react-hot-toast";

export default function BookmarkCreateModal({ onClose, onCreated }) {
    const initialForm = { title: "", url: "", description: "", tags: "" };
    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState("");
    
    const hasUnsavedChanges = () => {
        // Check if any form field is different from initial
        return Object.keys(initialForm).some(key => form[key].trim() !== initialForm[key].trim());
    };

    const handleClose = () => {
        if (hasUnsavedChanges()) {
            const confirmClose = window.confirm(
                "You have unsaved changes. Are you sure you want to close?"
            );
            if (!confirmClose) return;
        }
        onClose();
    };


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
            toast.success("Bookmark Created successfully!")
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to create bookmark")
            setError(err.response?.data?.message || "Failed to create bookmark");
        }
    }

    return (
        <div className="modal-backdrop" onClick={handleClose}>
            <form className="modal" onSubmit={handleSubmit} onClick={e => e.stopPropagation()}>
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
                    <button type="button" onClick={handleClose}>
                        Cancel
                    </button>
                    <button className="primary">Save</button>
                </div>
            </form>
        </div>
    );
}