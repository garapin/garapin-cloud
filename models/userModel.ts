import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
        trim: true,
    },
    email: {
        type: String,
        required: [false, 'Please enter a email'],
    },
    provider: { // google, facebook
        type: String,
        required: [true, 'Please enter a provider'],
    },
    provider_uid: { // uid from provider
        type: String,
        required: [true, 'Please enter a uid'],
    },
    publisher_name: {
        type: String,
        required: [false, 'Please enter a publisher_name'],
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    }
})

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;