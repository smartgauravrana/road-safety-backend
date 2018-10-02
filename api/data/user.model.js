const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    attemptsLeft: {
        type: Number,
        min: 0,
        max:2
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;