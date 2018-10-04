const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    ques: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    options: [{
        type: String,
        required: true
    }],
    answer: {
        type: Number,
        required: true
    },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;