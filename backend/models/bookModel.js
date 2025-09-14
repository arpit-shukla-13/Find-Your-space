const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({ 
    space: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Space" // Use the correct Model name
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" // Use the correct Model name
    },
    date: { 
        type: Date, 
        required: true 
    },
    time: { 
        type: String, 
        required: true 
    },
    duration: { 
        type: String, 
        required: true 
    },
    paymentDetails: Object,
    intentId: { 
        type: String, 
        unique: true 
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);