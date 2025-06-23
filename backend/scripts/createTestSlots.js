const { default: mongoose } = require('mongoose');
const { model } = require('../connection');
const Doctor = model('doctors', require('../models/DoctorModel').schema);
const Slot = model('slots', require('../models/slotModel').schema);

async function createTestSlots() {
    try {
        await mongoose.connect('mongodb+srv://8384899048shiv:8384899048shiv@8384899048shiv.zzb86.mongodb.net/?retryWrites=true&w=majority&appName=8384899048shiv');
        console.log('Connected to MongoDB successfully');

        // Find the doctor
        const doctor = await Doctor.findOne({
            $or: [
                { name: /jack/i },
                { firstName: /jack/i },
                { lastName: /jack/i }
            ]
        });

        if (!doctor) {
            console.log('No doctor found with name containing "jack"');
            // List all doctors to help debug
            const allDoctors = await Doctor.find({});
            console.log('Available doctors:', allDoctors.map(d => ({ id: d._id, name: d.name })));
            return;
        }

        console.log('Creating test slots for doctor:', {
            id: doctor._id,
            name: doctor.name,
            email: doctor.email
        });

        // Create slots for the next 7 days
        const slots = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            const dateStr = date.toISOString().split('T')[0];

            // Create multiple slots per day
            const times = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

            for (const time of times) {
                slots.push({
                    doctor: doctor._id,  // Make sure we're using doctor._id
                    date: dateStr,
                    time: time,
                    booked: false,
                    status: 'available'
                });
            }
        }

        // Delete all existing slots for this doctor
        const deleteResult = await Slot.deleteMany({ doctor: doctor._id });
        console.log('Deleted existing slots:', deleteResult);

        // Create new slots
        const createdSlots = await Slot.insertMany(slots);
        console.log('Created new slots:', {
            count: createdSlots.length,
            firstSlot: createdSlots[0],
            lastSlot: createdSlots[createdSlots.length - 1]
        });

        // Verify slots were created
        const verifySlots = await Slot.find({ doctor: doctor._id });
        console.log('Verification - slots in database:', {
            count: verifySlots.length,
            dates: [...new Set(verifySlots.map(s => s.date))],
            sampleSlot: verifySlots[0]
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        process.exit();
    }
}

createTestSlots();
