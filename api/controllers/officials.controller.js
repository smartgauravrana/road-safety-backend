const mongoose = require('mongoose');
const axios = require('axios');

const Official = mongoose.model('Official');

module.exports.officialsAddOne = (req, res) => {
    console.log('Adding new official');

    Official.create({
        name: req.body.name,
        phone: req.body.phone,
        countryCode: 91
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

module.exports.officialsGetOtp = (req, res) => {
    const id = req.params.officialId;
    console.log('Sending Otp to officialId:', id);
    Official
        .findById(id)
        .exec((err, official) => {
            if(err){
                console.log("Error finding official");
                res
                  .status(500)
                  .json(err);
                  return;
            }else if(!official) {
                console.log("officialId not found in database", officialId);
                res
                  .status(404)
                  .json({
                    "message" : "official ID not found " + officialId
                  });
                  return;
              }
              getOtpRequest(official);
            });

              
};

getOtpRequest = official => {
    const headers = {'X-Authy-API-Key': 'gV7kQyypoVvoLcsVBL93fOtoZo1iHLDo'};
    axios
    .post('https://api.authy.com/protected/json/phones/verification/start', {
        via: 'sms',
        phone_number: official.phone,
        country_code: official.countryCode,
        locale: 'en'
    }, 
    {headers: headers})
    .then(response => {
        console.log("Otp sent successfully");
        console.log("response: " + response.data);
        res.status(200).json(response.data);
    })
    .catch(
        err => console.log(err));
    
};

module.exports.officialsVerifyOtp = (req, res) => {
    const BASE_URL = 'https://api.authy.com/protected/json/phones/verification/check';
    const headers = {'X-Authy-API-Key': 'gV7kQyypoVvoLcsVBL93fOtoZo1iHLDo'};

    const phone = req.query.phone;
    const otp = req.query.otp;
    const verifyUrl = BASE_URL + '?phone_number='+phone+'&country_code=91'+'&verification_code='+otp;

    axios
        .get(verifyUrl, {headers: headers})
        .then(response => {
            console.log("Otp verified successfully");
            console.log("response: " + JSON.stringify(response.data));
            res.status(200).json(response.data);
        })
        .catch(err => {
            console.log("error ---->",err.response.data);
            res.status(200).json({success: err.response.data.success, message: err.response.data.message});
        });
};

