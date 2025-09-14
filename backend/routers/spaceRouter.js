const express = require('express');
const router = express.Router();
const Space = require('../models/spaceModels');

router.post('/addSpace', async (req, res) => {
    try {
        const newSpace = new Space(req.body);
        const savedSpace = await newSpace.save();
        res.status(200).json(savedSpace);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/getall', async (req, res) => {
    try {
        const spaces = await Space.find();
        res.status(200).json(spaces);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/getbyid/:id', async (req, res) => {
    try {
        const space = await Space.findById(req.params.id);
        res.status(200).json(space);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedSpace = await Space.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedSpace);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.put("/update/:id", async (req, res) => {
    try {
        const updatedSpace = await Space.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedSpace);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;