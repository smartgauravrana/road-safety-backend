const mongoose = require('mongoose');

const officialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});

const Official = mongoose.model('Official', officialSchema);

module.exports = Official;