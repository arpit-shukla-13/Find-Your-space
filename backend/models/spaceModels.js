const mongoose = require('mongoose');

const spaceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    area: { type: String, required: true },
    image: { type: String },
    price: { type: Number, required: true },
    selectedFeatures: { type: [String], required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Space', spaceSchema);