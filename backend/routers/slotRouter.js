const express = require('express');
const Model = require('../models/slotModel');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/add', verifyToken, async (req, res) => {
    try {
        req.body.doctor = req.user._id;
        console.log('Creating slot with data:', {
            doctor: req.body.doctor,
            date: req.body.date,
            time: req.body.time,
            booked: req.body.booked || false
        });

        const slot = new Model(req.body);
        const result = await slot.save();
        console.log('Slot created successfully:', result);
        res.status(200).json(result);
    } catch (err) {
        console.error('Error creating slot:', err);
        res.status(500).json({ error: err.message });
    }
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

// Add this route to get all booked slots for a doctor
router.get('/doctor-booked-slots', verifyToken, async (req, res) => {
    try {
        const doctorId = req.user._id;

        // Find all slots where doctor matches and status is not 'available'
        const bookedSlots = await Model.find({
            doctor: doctorId,
            status: { $ne: 'available' }  // Get all non-available slots
        }).populate('patient', 'name email phone');

        res.json(bookedSlots);
    } catch (error) {
        console.error('Error fetching doctor booked slots:', error);
        res.status(500).json({ message: 'Failed to fetch booked slots' });
    }
});

// Update your slot deletion endpoint
router.delete('/:slotId', verifyToken, async (req, res) => {
    try {
        const slotId = req.params.slotId;

        // Check if the slot exists
        const slot = await Model.findById(slotId);
        if (!slot) {
            return res.status(404).json({ message: 'Slot not found' });
        }

        // Check if the doctor is the owner of this slot
        if (slot.doctor.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this slot' });
        }

        // Check if the slot is already booked
        if (slot.status !== 'available') {
            return res.status(400).json({ message: 'Cannot delete a booked slot' });
        }

        // Delete the slot
        await Model.findByIdAndDelete(slotId);
        res.json({ message: 'Slot deleted successfully' });
    } catch (error) {
        console.error('Error deleting slot:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get appointments for a specific patient by ID
router.get('/patient/:id', async (req, res) => {
    try {
        const patientId = req.params.id;

        // Find all slots where the patient is the one requested
        const appointments = await Model.find({ patient: patientId })
            .populate('doctor', 'name speciality address city')
            .sort({ date: 1, time: 1 });

        if (!appointments || appointments.length === 0) {
            return res.json([]);  // Return empty array instead of 404 to avoid errors
        }

        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error fetching patient appointments:', error);
        res.status(500).json({ message: 'Failed to fetch appointments' });
    }
});

// Add a ping route for connection testing
router.get('/ping', (req, res) => {
    res.status(200).send('pong');
});

// Get available slots for a specific doctor
router.get('/available/:doctorId', async (req, res) => {
    try {
        const { doctorId } = req.params;
        console.log('Fetching available slots for doctor:', doctorId);

        // Find all slots for this doctor that are available and not booked
        const slots = await Model.find({
            doctor: doctorId,
            booked: false,
            status: 'available'
        }).sort({ date: 1, time: 1 });

        console.log(`Found ${slots.length} available slots`);
        res.json({ success: true, slots });
    } catch (error) {
        console.error('Error fetching available slots:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch available slots' });
    }
});

// Debug route to test slot availability
router.get('/debug/:doctorId', async (req, res) => {
    try {
        const { doctorId } = req.params;
        const currentDate = new Date();
        console.log('Debug request for doctor:', doctorId);
        console.log('Current date:', currentDate);

        // Get all slots for the doctor
        const allSlots = await Model.find({ doctor: doctorId }).lean();
        console.log('All slots:', allSlots);

        // Get available slots
        const availableSlots = await Model.find({
            doctor: doctorId,
            status: 'available',
            booked: false,
            date: { $gt: currentDate }
        }).lean();
        console.log('Available slots:', availableSlots);

        res.status(200).json({
            doctorId,
            totalSlots: allSlots.length,
            availableSlots: availableSlots.length,
            allSlots: allSlots.map(slot => ({
                date: slot.date,
                time: slot.time,
                status: slot.status,
                booked: slot.booked,
                isFuture: new Date(slot.date) > currentDate
            })),
            currentDate,
            message: 'Debug information retrieved successfully'
        });
    } catch (error) {
        console.error('Debug route error:', error);
        res.status(500).json({
            message: 'Error in debug route',
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// Add this function to your manage-appointment page
const debugAuthAndFetch = async () => {
    try {
        // Check what's in localStorage
        const userString = localStorage.getItem('user');
        console.log('Raw localStorage user:', userString);

        // Try to parse it
        let parsedUser;
        try {
            parsedUser = JSON.parse(userString || '{}');
            console.log('Parsed user:', parsedUser);
        } catch (parseError) {
            console.error('Failed to parse user from localStorage:', parseError);
            return;
        }

        // Check token
        if (!parsedUser.token) {
            console.error('No token found in user data');
            return;
        }

        // Make a test request to a simple endpoint
        const testResponse = await fetch('http://localhost:5000/ping', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const testText = await testResponse.text();
        console.log('Test ping response:', testText);

        // Now try the actual endpoint
        const response = await fetch('http://localhost:5000/slot/doctor-booked-slots', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${parsedUser.token}`,
                'Content-Type': 'application/json'
            }
        });

        // Get response as text first to see what's coming back
        const responseText = await response.text();
        console.log('Raw API response:', responseText);

        // Try parsing it
        try {
            const parsedData = JSON.parse(responseText);
            console.log('Parsed data:', parsedData);
        } catch (jsonError) {
            console.error('Failed to parse response as JSON:', jsonError);
        }
    } catch (error) {
        console.error('Debug fetch failed:', error);
    }
};

// Get available slots for a doctor
router.get('/available-slots/:doctorId', async (req, res) => {
    try {
        const doctorId = req.params.doctorId;
        console.log('Fetching available slots for doctor:', doctorId);

        // Get current date in YYYY-MM-DD format
        const today = new Date();
        const currentDate = today.toISOString().split('T')[0];
        const currentTime = today.toTimeString().split(' ')[0];

        console.log('Current date/time:', { currentDate, currentTime });

        const slots = await Model.find({
            doctor: doctorId,
            booked: false
        });

        // Filter slots in memory to handle date/time comparison properly
        const availableSlots = slots.filter(slot => {
            const slotDateTime = new Date(`${slot.date}T${slot.time}`);
            const isAvailable = slotDateTime > today;
            console.log('Slot:', {
                date: slot.date,
                time: slot.time,
                dateTime: slotDateTime,
                isAvailable
            });
            return isAvailable;
        });

        console.log(`Found ${availableSlots.length} available slots out of ${slots.length} total slots`);

        res.status(200).json({
            total: slots.length,
            available: availableSlots.length,
            slots: availableSlots
        });
    } catch (err) {
        console.error('Error fetching available slots:', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;