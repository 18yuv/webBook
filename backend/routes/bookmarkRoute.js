import express from 'express';
import ensureAuth from "../middlewares/ensureAuth.js";
import { createBookmark, getMyBookmarks, deleteBookmark, updateBookmark } from "../controllers/bookmarkController.js";
import { validateCreateBookmark, validateUpdateBookmark } from '../middlewares/bookmarkValidation.js';

const bookmarkRouter = express.Router();

bookmarkRouter.post("/", ensureAuth, validateCreateBookmark , createBookmark);
bookmarkRouter.get("/", ensureAuth, getMyBookmarks);
bookmarkRouter.put("/:id", ensureAuth, validateUpdateBookmark, updateBookmark);
bookmarkRouter.delete("/:id", ensureAuth, deleteBookmark);

export default bookmarkRouter;