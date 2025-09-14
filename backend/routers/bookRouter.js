const express = require('express');
const router = express.Router();
const Booking = require('../models/bookModal'); 

router.post('/addBooking', async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        const savedBooking = await newBooking.save();
        res.status(200).json(savedBooking);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/getall', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('space').populate('user');
        res.status(200).json(bookings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/getbyuser/:id', async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.params.id }).populate('space');
        res.status(200).json(bookings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedBooking);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;