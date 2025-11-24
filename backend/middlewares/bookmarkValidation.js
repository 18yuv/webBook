import Joi from "joi";

const urlPattern = /^https?:\/\/.+/
const urlErrMessage = {
    "string.pattern.base": "URL must start with http:// or https://",
    "string.empty": "URL is required",
}
const titleErrMessage = {
    "string.max": "Title cannot exceed 200 characters"
}
const descriptionErrmessage = {
    "string.max": "Description cannot exceed 1000 characters"
}

// We mark fields as "optional" so it can be reused both for:
// Create Bookmark (where some fields are required)
// Update Bookmark (where all fields are optional)

const baseSchema = Joi.object({
    url: Joi.string().trim().pattern(urlPattern).messages(urlErrMessage),
    title: Joi.string().trim().max(200).messages(titleErrMessage),
    description: Joi.string().trim().max(1000).messages(descriptionErrmessage),
    tags: Joi.array().items(Joi.string().trim().lowercase()).messages({
        "array.base": "Tags must be an array of strings"
    })
});

// url is required for creating a bookmark
export function validateCreateBookmark(req, res, next) {
    const createSchema = baseSchema.fork(["url"], (field) => field.required());
    const { error, value } = createSchema.validate(req.body, { abortEarly: false }); // all errors at once

    if (error) {
        return res.status(400).json({
            message: "Validation failed",
            errors: error.details.map(d => d.message)
        });
    }
    req.validatedBookmark = value;
    next();
}

// everything is optional but if any, should follow the rules.
export function validateUpdateBookmark(req, res, next) {
    const { error, value } = baseSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            message: "Validation failed",
            errors: error.details.map(d => d.message)
        });
    }

    req.validatedBookmark = value;
    next();
}