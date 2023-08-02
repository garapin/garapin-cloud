import mongoose from "mongoose";

const imagesSchema = new mongoose.Schema({
    image_name: {
        type: String,
        required: true,
    },
    full_path: {
        type: String,
        required: true,
    },
    bucket: {
        type: String,
        required: true,
    },
    size: {
        type: Date,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
})

const Images = mongoose.model('images', imagesSchema);

export default Images;