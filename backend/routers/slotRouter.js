const express = require('express');
const Model = require('../models/slotModel');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/add', verifyToken, (req, res) => {
    req.body.doctor = req.user._id;
    console.log(req.body);

    new Model(req.body).save()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
        });
});

// getall
router.get('/getall', (req, res) => {
    Model.find()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get by id
router.get('/getbyid/:id', (req, res) => {
    Model.findById(req.params.id)
        .then((result) => {
            if (!result) {
                return res.status(404).json({ message: "Doctor not found" });
            }
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/authenticate', (req, res) => {
    Model.findOne(req.body)
        .then((result) => {
            if (result) {
                //login successful
                const { name, email, _id } = result;
                const payload = { _id, name, email };

                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' },
                    (err, token) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json({ message: 'Error generating token' });
                        }
                        else {
                            res.status(200).json({ token });
                        }
                    }

                )
            }
            else {
                //login failed
                res.status(401).json({ message: 'Invalid credentials' })
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);

        });
});

// Get slots by doctor ID (only unbooked slots)
router.get('/getbydoctor/:doctorId', (req, res) => {
    Model.find({
        doctor: req.params.doctorId,
        booked: false
    })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Update slot to booked status
router.put('/book/:id', verifyToken, (req, res) => {
    Model.findByIdAndUpdate(
        req.params.id,
        {
            booked: true,
            patient: req.user._id,
            status: 'booked'
        },
        { new: true }
    )
        .then((result) => {
            if (!result) {
                return res.status(404).json({ message: "Slot not found" });
            }
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;