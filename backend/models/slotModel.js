const { Schema, model, Types } = require('../connection');
const axios = require('axios');

const mySchema = new Schema({
    doctor: { type: Types.ObjectId, ref: 'doctors' },
    time: { type: String, required: true },
    date: { type: String, required: true },
    booked: { type: Boolean, default: false },
    patient: { type: Types.ObjectId, ref: 'users', default: null },
    prescription: {
        medicines: [{
            name: { type: String, required: true },
            dosage: { type: String, required: true },
            frequency: { type: String, required: true }, // e.g., "Twice daily"
            duration: { type: String, required: true }, // e.g., "7 days"
            instructions: { type: String } // e.g., "Take after meals"
        }],
        diagnosis: { type: String },
        doctorNotes: { type: String },
        prescribedAt: { type: Date },
        prescribedBy: { type: Types.ObjectId, ref: 'doctors' },
        followUpDate: { type: Date }
    },
    status: { type: String, default: 'pending' }, // pending, completed, cancelled
    report: { type: String, default: null },
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('slots', mySchema);