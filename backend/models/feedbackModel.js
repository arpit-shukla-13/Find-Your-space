const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('Feedback', feedbackSchema);