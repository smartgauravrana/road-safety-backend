const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.usersGetOne = (req, res) => {
    const id = req.params.userId;

    console.log('GET userId', id);

    User
        .findById(id)
        .exec((err, doc) => {
            let response = {
                status : 200,
                message : doc
            };

            if(err) {
                console.log("Error finding user");
                response.status = 500;
                response.message = err;
            } else if(!doc) {
                console.log("userId not found in database", id);
                response.status = 404;
                response.message = {
                "message" : "user ID not found " + id
                };
            }
            res
                .status(response.status)
                .json(response.message);
            
        });
};

module.exports.usersAddOne = (req, res) => {
    console.log('POST user');
    
    User
        .create({
            name: req.body.name,
            phone: req.body.phone,
            attemptsLeft: 2
        }, (err, user) => {
            if (err) {
                console.log("Error creating user");
                res
                  .status(400)
                  .json(err);
              } else {
                console.log("user created!", user);
                res
                  .status(201)
                  .json(user);
              }

        })
};

module.exports.usersUpdateOne = (req, res) => {
    const id = req.params.userId;

    User
        .findById(id)
        .exec((err, user) => {
            if (err) {
                console.log("Error finding user");
                res
                  .status(500)
                  .json(err);
                  return;
              } else if(!user) {
                console.log("userId not found in database", userId);
                res
                  .status(404)
                  .json({
                    "message" : "user ID not found " + userId
                  });
                  return;
              }
              
              if(req.body.phone) {
                user.phone = req.body.phone;
              }
              user.attemptsLeft = req.body.attemptsLeft || 0;
        
              user
                .save((err, userUpdated) => {
                  if(err) {
                    res
                      .status(500)
                      .json(err);
                  } else {
                    res
                      .status(204)
                      .json();
                  }
                });
            }
)};

