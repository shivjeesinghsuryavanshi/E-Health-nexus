const { Schema, model } = require('../connection');

const mySchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: { type: String, required: true },
    city: { type: String, default: "unknown" },
    dob: { type: String, default: "unknown" },
    gender: { type: String, default: "unknown" },
    contact: { type: String, default: "unknown" },
    bloodGroup: { type: String, default: "unknown" },
    avatar: { type: String },
    createdAt: { type: Date, default: Date.now },
})

module.exports = model('users', mySchema);