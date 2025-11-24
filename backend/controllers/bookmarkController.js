import Bookmark from "../models/bookmark.js";

// to create a new bookmark (post req)
export async function createBookmark(req, res) {
    try {
        const data = req.validatedBookmark;

        const bookmark = await Bookmark.create({
            userId: req.user.id,
            title: data.title || "Untitled Bookmark",
            url: data.url,
            description: data.description || "",
            tags: data.tags || []
        });

        return res.status(201).json({ message: "Bookmark created successfully", bookmark });

    } catch (err) {
        return res.status(500).json({ message: "Error creating bookmark" });
    }
}

// to get the bookmarks (get req)
export async function getMyBookmarks(req, res) {
    const { tags, search } = req.query;
    const filter = { userId: req.user.id };

    // tag filter
    if (tags) {
        const tagArray = tags.split(",").map(t => t.trim().toLowerCase()).filter(Boolean);
        if (tagArray.length > 0) {
            filter.tags = { $in: tagArray };
        }
    }

    // search filter
    if (search) {
        const regex = { $regex: search, $options: "i" };
        filter.$or = [
            { title: regex },
            { tags: regex } // mongo can search inside an array
        ];
    }

    try {
        const bookmarks = await Bookmark.find(filter).sort({ createdAt: -1 });
        res.json(bookmarks);
    } catch (err) {
        res.status(500).json({ message: "Error fetching bookmarks" });
    }
}

// to update an existing bookmark (put req)
export async function updateBookmark(req, res) {
    try {
        const updateData = req.validatedBookmark;

        const bookmark = await Bookmark.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            updateData,
            { new: true }
        );

        if (!bookmark) {
            return res.status(404).json({ message: "Bookmark not found" });
        }

        return res.status(200).json({ message: "Bookmark updated", bookmark });

    } catch (err) {
        return res.status(500).json({ message: "Error updating bookmark" });
    }
}

// to delete a bookmark (delete req)
export async function deleteBookmark(req, res) {
    const { id } = req.params;

    try {
        const deleted = await Bookmark.findOneAndDelete({
            _id: id,
            userId: req.user.id
        });

        if (!deleted) {
            return res.status(404).json({ message: "Bookmark not found" });
        }

        res.json({ message: "Deleted", bookmark: deleted });
    } catch (err) {
        res.status(500).json({ message: "Error deleting bookmark" });
    }
}