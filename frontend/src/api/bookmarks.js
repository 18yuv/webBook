import api from "./axios";

export const getBookmarks = (search) =>
    api.get("/bookmarks", { params: { search } });

export const createBookmark = (data) =>
    api.post("/bookmarks", data);

export const updateBookmark = (id, data) =>
    api.put(`/bookmarks/${id}`, data);

export const deleteBookmark = (id) =>
    api.delete(`/bookmarks/${id}`);