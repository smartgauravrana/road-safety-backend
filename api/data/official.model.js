const mongoose = require('mongoose');

const officialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    countryCode: {
        type: Number
    }
});

const Official = mongoose.model('Official', officialSchema);

module.exports = Official;