const { Schema, model } = require('../connection');

const mySchema = new Schema({
    name: String,
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    speciality: { type: String, default: "unknown" },
    price: { type: Number, default: 0 },
    experience: { type: String, default: "unknown" },
    gender: { type: String, default: "unknown" },
    certification: { type: String, default: "unknown" },
    qualification: { type: String, default: "unknown" },
    language: { type: String, default: "unknown" },
    location: { type: String, default: "unknown" },
    designation: { type: String, default: "unknown" },
    about: { type: String, default: "" },
    image: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now }
})

module.exports = model('doctors', mySchema);