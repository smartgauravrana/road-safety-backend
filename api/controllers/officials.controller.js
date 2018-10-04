const mongoose = require('mongoose');
const Official = mongoose.model('Official');

module.exports.officialsAddOne = (req, res) => {
    console.log('Adding new official');

    Official.create({
        name: req.body.name,
        phone: req.body.phone
    }, (err, official) => {
        if(err) {
            console.log("Error creating official");
                res
                  .status(400)
                  .json(err);
        } else{
            console.log("official created!", official);
                res
                  .status(201)
                  .json(official);
        }
    })

};

module.exports.officialsRemoveOne = (req, res) => {
    const id = req.params.officialId;
    console.log('DELETE officialId: ', id);

    Official.findOneAndRemove({_id: id}, (err, official) => {
        if (err) {
            res
            .status(500)
            .send()
        }

        const response = {
            status: 200,
            msg: {success: true}
        };

        if(!official) {
            response.status = 404;  
            response.msg.success = false
        } else{
            official.remove();
        }
        
        return res.status(response.status).send(response.msg);
    });


};