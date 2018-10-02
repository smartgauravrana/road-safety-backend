const mongoose = require('mongoose');
const Question = mongoose.model('Question');

module.exports.questionsGetAll = (req, res) => {
    console.log('Getting all questions');
    Question
        .find()
        .exec((err, questions) => {
            if (err) {
                console.log("Error finding questions");
                res
                    .status(500)
                    .json(err);
            } else {
                console.log("Found questions", questions.length);
                res
                    .json(questions);
            }
        });
}

module.exports.questionsAddOne = (req, res) => {
    console.log('Adding new question');

    Question
        .create({
            ques: req.body.ques,
            image: req.body.image,
            options: _splitArray(req.body.options),
            answer: req.body.answer
        }, (err, questions) => {
            if (err) {
                console.log("Error creating questions");
                res
                  .status(400)
                  .json(err);
              } else {
                console.log("questions created!", questions);
                res
                  .status(201)
                  .json(questions);
              }
        });
}

const _splitArray = (input) => {
    var output;
    if (input && input.length > 0) {
      output = input.split(",")
                            .map(el => el.trim());
    } else {
      output = [];
    }
    return output;
};