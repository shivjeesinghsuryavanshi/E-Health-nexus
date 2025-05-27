const { Schema, model, Types } = require('../connection');
const axios = require('axios');

const mySchema = new Schema({
    doctor: { type: Types.ObjectId, ref: 'doctors' },
    time: { type: String, required: true },
    date: { type: String, required: true },
    booked: { type: Boolean, default: false },
    patient: { type: Types.ObjectId, ref: 'users', default: null },
    prescription: { type: String, default: null },
    status: { type: String, default: 'pending' }, // pending, completed, cancelled
    report: { type: String, default: null },
    createdAt: { type: Date, default: Date.now }
})

module.exports = model('slots', mySchema);