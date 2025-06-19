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

// Get slots for current doctor - NEW ROUTE
router.get('/doctor-slots', verifyToken, async (req, res) => {
    try {
        const doctorId = req.user._id;
        const slots = await Model.find({ doctor: doctorId }).sort({ date: 1, time: 1 });
        res.status(200).json(slots);
    } catch (error) {
        console.error('Error fetching doctor slots:', error);
        res.status(500).json({ message: 'Failed to fetch slots' });
    }
});

// Delete slot by doctor - NEW ROUTE
router.delete('/delete/:id', verifyToken, async (req, res) => {
    try {
        const doctorId = req.user._id;
        const slot = await Model.findById(req.params.id);

        if (!slot) {
            return res.status(404).json({ message: 'Slot not found' });
        }

        if (slot.doctor.toString() !== doctorId.toString()) {
            return res.status(403).json({ message: 'Unauthorized to delete this slot' });
        }

        if (slot.booked) {
            return res.status(400).json({ message: 'Cannot delete booked slot' });
        }

        await Model.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Slot deleted successfully' });
    } catch (error) {
        console.error('Error deleting slot:', error);
        res.status(500).json({ message: 'Failed to delete slot' });
    }
});

// get by id
router.get('/getbyid/:id', (req, res) => {
    Model.findById(req.params.id)
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
            status: 'pending'
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

// Get user's booked slots
router.get('/user-bookings', verifyToken, async (req, res) => {
    try {
        const userId = req.user._id;
        const userSlots = await Model.find({
            patient: userId,
            booked: true
        }).populate('doctor', 'name speciality location fee qualification experience');

        res.status(200).json(userSlots);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch user bookings' });
    }
});

// Cancel slot
router.put('/cancel/:id', verifyToken, async (req, res) => {
    try {
        const slot = await Model.findById(req.params.id);

        if (!slot || slot.patient.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: 'Slot not found or unauthorized' });
        }

        if (slot.status === 'completed') {
            return res.status(400).json({ message: 'Cannot cancel completed appointment' });
        }

        const updatedSlot = await Model.findByIdAndUpdate(
            req.params.id,
            {
                status: 'cancelled',
                booked: false,
                patient: null
            },
            { new: true }
        );

        res.status(200).json({
            message: 'Appointment cancelled successfully',
            slot: updatedSlot
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to cancel slot' });
    }
});

// Get appointments for doctor
router.get('/doctor-appointments', verifyToken, async (req, res) => {
    try {
        const doctorId = req.user._id;
        const appointments = await Model.find({
            doctor: doctorId,
            booked: true
        }).populate('patient', 'name email contact');

        res.status(200).json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch appointments' });
    }
});

// Update appointment status by doctor
router.put('/update-status/:id', verifyToken, async (req, res) => {
    try {
        const { status } = req.body;
        const doctorId = req.user._id;

        const appointment = await Model.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        if (appointment.doctor.toString() !== doctorId.toString()) {
            return res.status(403).json({ message: 'Unauthorized to update this appointment' });
        }

        const result = await Model.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update appointment status' });
    }
});

// Add prescription (Doctor only)
router.put('/add-prescription/:slotId', verifyToken, async (req, res) => {
    try {
        const { slotId } = req.params;
        const { medicines, diagnosis, doctorNotes, followUpDate } = req.body;
        
        const slot = await Model.findById(slotId).populate('doctor');
        if (!slot) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        
        // Check if user is the doctor for this appointment
        if (slot.doctor._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Only the assigned doctor can add prescription' });
        }
        
        const prescription = {
            medicines: medicines || [],
            diagnosis: diagnosis || '',
            doctorNotes: doctorNotes || '',
            prescribedAt: new Date(),
            prescribedBy: req.user._id,
            followUpDate: followUpDate ? new Date(followUpDate) : null
        };
        
        slot.prescription = prescription;
        slot.status = 'completed'; // Mark as completed when prescription is added
        await slot.save();
        
        res.json({ 
            message: 'Prescription added successfully', 
            prescription: slot.prescription
        });
    } catch (error) {
        console.error('Error adding prescription:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update prescription (Doctor only)
router.put('/update-prescription/:slotId', verifyToken, async (req, res) => {
    try {
        const { slotId } = req.params;
        const { medicines, diagnosis, doctorNotes, followUpDate } = req.body;
        
        const slot = await Model.findById(slotId).populate('doctor');
        if (!slot) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        
        // Check if user is the doctor for this appointment
        if (slot.doctor._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Only the assigned doctor can update prescription' });
        }
        
        slot.prescription = {
            medicines: medicines || [],
            diagnosis: diagnosis || '',
            doctorNotes: doctorNotes || '',
            prescribedAt: slot.prescription.prescribedAt || new Date(),
            prescribedBy: slot.prescription.prescribedBy || req.user._id,
            followUpDate: followUpDate ? new Date(followUpDate) : null
        };
        
        await slot.save();
        
        res.json({ 
            message: 'Prescription updated successfully', 
            prescription: slot.prescription
        });
    } catch (error) {
        console.error('Error updating prescription:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get prescription (Patient only)
router.get('/prescription/:slotId', verifyToken, async (req, res) => {
    try {
        const { slotId } = req.params;
        
        const slot = await Model.findById(slotId)
            .populate('doctor', 'name speciality')
            .populate('patient', 'name email');
            
        if (!slot) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        
        // Check if user is the patient for this appointment
        if (slot.patient._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Only the patient can view their prescription' });
        }
        
        if (!slot.prescription || !slot.prescription.medicines || slot.prescription.medicines.length === 0) {
            return res.status(404).json({ message: 'No prescription found for this appointment' });
        }
        
        res.json({
            appointment: {
                id: slot._id,
                date: slot.date,
                time: slot.time,
                doctor: slot.doctor,
                status: slot.status
            },
            prescription: slot.prescription
        });
    } catch (error) {
        console.error('Error fetching prescription:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get appointments with prescription status (for patient dashboard)
router.get('/user-bookings', verifyToken, async (req, res) => {
    try {
        const userId = req.user._id;
        
        const slots = await Model.find({ patient: userId })
            .populate('doctor', 'name speciality address city')
            .sort({ createdAt: -1 });
        
        const formattedSlots = slots.map(slot => ({
            _id: slot._id,
            doctor: slot.doctor,
            date: slot.date,
            time: slot.time,
            status: slot.status,
            hasPrescription: !!(slot.prescription && slot.prescription.medicines && slot.prescription.medicines.length > 0),
            prescriptionDate: slot.prescription?.prescribedAt || null,
            followUpDate: slot.prescription?.followUpDate || null
        }));
        
        res.json(formattedSlots);
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;