let mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, default: 'client' },
    address: { type: String },
    created_at: { type: Date, default: Date.now }
});

const user = mongoose.model("user", userSchema, "users")

module.exports = user;