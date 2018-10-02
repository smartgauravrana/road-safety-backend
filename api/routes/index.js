const express = require('express');
const router = express.Router();

const ctrlQuestions = require('../controllers/questions.controller');
const ctrlUsers = require('../controllers/user.controller');

//question routes
router
    .route('/questions')
    .get(ctrlQuestions.questionsGetAll)
    .post(ctrlQuestions.questionsAddOne);

//user routes
router
    .route('/users')
    .post(ctrlUsers.usersAddOne);

router
    .route('/users/:userId')
    .get(ctrlUsers.usersGetOne)
    .put(ctrlUsers.usersUpdateOne);

module.exports = router;