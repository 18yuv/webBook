import mongoose from "mongoose";
const { Schema } = mongoose;

const bookmarkSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, // The will store a reference to another document's _id (faster than string)
        required: true,
        ref: 'User'
    },
    url: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        default: "Untitled Bookmark",
        trim: true
    },
    description: {
        type: String,
        trim: true,
        required: false
    },
    tags: {
        type: [String],
        default: [],
        required: false,
        lowercase: true,
        trim: true
    }
}, { timestamps: true });

// helps for performance optimization
bookmarkSchema.index({ userId: 1, tags: 1 }); // ascending 
bookmarkSchema.index({ userId: 1, createdAt: -1 }); // descending

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
export default Bookmark;