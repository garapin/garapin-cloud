import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        trim: true,
    },
    app_id: {
        type: String,
        required: true,
    },
    star: {
        type: Number, // 1 - 5
        required: true,
    },
    comment: {
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

const Review = mongoose.model('reviews', reviewSchema);

export default Review;