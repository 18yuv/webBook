import mongoose from "mongoose";
const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        default: null,
        required: false
    },
    verified: {
        type: Boolean,
        default: false,
        required: true
    }
}, { timestamps: true }
)

// This is a compiled version of the schema that helps us to perform CRUD operations 
const userModel = mongoose.model('User', userSchema);
// User is name of the collection that mongo db pluaralises to users collection
// userSchema is the schema object


export default userModel;