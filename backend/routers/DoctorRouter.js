const express = require('express');
const Model = require('../models/DoctorModel');
const SlotModel = require('../models/slotModel'); // Import the slot model
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/add', (req, res) => {
    console.log(req.body);

    new Model(req.body).save()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);

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

// Fetch slots by doctor id
router.get('/slots', async (req, res) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) return res.status(401).json({ message: "No token provided" });

        // Decode token to get doctor id
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const doctorId = decoded._id;

        // Find slots for this doctor
        const slots = await SlotModel.find({ doctor: doctorId });
        res.status(200).json(slots);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch slots", error: err });
    }
});

// Update doctor by id
router.put('/update/:id', async (req, res) => {
    try {
        console.log('Updating doctor profile:', req.params.id);
        console.log('Update data received:', req.body);
        
        const updatedDoctor = await Model.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        
        if (!updatedDoctor) {
            console.log('Doctor not found with ID:', req.params.id);
            return res.status(404).json({ message: "Doctor not found" });
        }
        
        console.log('Doctor updated successfully:', updatedDoctor);
        res.status(200).json(updatedDoctor);
    } catch (err) {
        console.error('Error updating doctor:', err);
        res.status(500).json({ message: "Failed to update doctor", error: err });
    }
});

module.exports = router;