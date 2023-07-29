import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title'],
        trim: true,
    },
    logo: {
        type: String,
        required: [true, 'Please enter a logo'],
    },
    version: {
        type: String,
        required: [true, 'Please enter a version'],
    },
    category: {
        type: String,
        required: [true, 'Please enter a category'],
    },
    description: {
        type: String, // RTE
        required: [true, 'Please enter a description'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Please enter a price'],
    },
    source: {
        type: String, //Github link
        required: [true, 'Please enter a source'],
    },
    support_detail: {
        type: String, // RTE
        required: [true, 'Please enter a support detail'],
    },
    status: {
        type: String, // Published, Unpublished
        required: [true, 'Please enter a status'],
    },
    user_id: {
        type: String,
        required: [true, 'Please enter a user_id'],
    },
    screenshoots: {
        type: Array,
        required: [true, 'Please enter a screenshoots'],
    },
    software_included: {
        type: Array, // [ {package: "package", version: "version" license: "license"} ]
        required: [false, 'Please enter a software_included'],
    },
    base_image: {
        type: String, // Linux + MySQL
        required: [false, 'Please enter a base_image'],
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

const Application = mongoose.model('applications', applicationSchema);

export default Application;