const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    address: { type: String },
    phone: { type: String },
    gender: { type: String },
    bio: { type: String },
    role: {
        type: String,
        default: "user"
    },
    image: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);