const express = require('express');
const router = express.Router();

const ctrlQuestions = require('../controllers/questions.controller');
const ctrlUsers = require('../controllers/user.controller');
const ctrlOfficials = require('../controllers/officials.controller');

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

//official routes
router
    .route('/officials')
    .post(ctrlOfficials.officialsAddOne)

router
    .route('/officials/verifyOtp')
    .get(ctrlOfficials.officialsVerifyOtp);

router
    .route('/officials/:officialId')
    .get(ctrlOfficials.officialsGetOtp)
    .delete(ctrlOfficials.officialsRemoveOne);



module.exports = router;