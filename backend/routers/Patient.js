const express = require('express');
const Model = require('../models/PatientModel');
const jwt = require('jsonwebtoken')

const router= express.Router();

router.post('/add' , (req, res) => {
    console.log(req.body);
    
    new Model(req.body).save()
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        if(err?. code ===11000){
            res.status(400).json({essage : 'Email Already Registered'});
        }
        else{
            res.status(500).json({mesage : 'Some Error Occured'});
        }
            console.log(err);
    });
});

// getall
router.get('/getall', (req, res) =>{
   Model.find()
   .then((result) => {
    res.status(200).json(result);
    })
    .catch((err) => {
    console.log(err);
    res.status(500).json(err);
   });
});


//: denotes url parameter
router.get('/getbycity/:city', (req, res)=>{
   Model.find({city : req.params.city})
 .then((result) => {
    res.status(200).json(result);
 })
 .catch((err) => {
    console.log(err);
    res.status(500).json(err);
    
 });
})

//get by email
router.get('/getbyemail2:email', (req, res) =>{
    Model.findOne({email : req.params.email})
    .then((result) => {
     res.status(200).json(result);
     })
     .catch((err) => {
     console.log(err);
     res.status(500).json(err);
    });
 });
 

//getbyid
router.get('/getbyid/:id', (req, res) =>{
    Model.findById(req.params.id)
    .then((result) => {
     res.status(200).json(result);
     })
     .catch((err) => {
     console.log(err);
     res.status(500).json(err);
    });
 });

 
 
//update
router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, res.body)
    .then((result) => {
        res.status(200).json(result);
        })
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
       });
    
});



//delete
router.delete('/delete/:id', (req, res) =>{
  Model.findByIdAndDelete(req.params.id)
  .then((result) => {
    res.status(200).json(result);
    })
    .catch((err) => {
    console.log(err);
    res.status(500).json(err);
   });
});
   
router.post('/authenticate', (req , res) =>{
Model.findOne(req.body)
.then((result) => {
    if(result){
        //login successful
        const{ name, email, id} = result;
        const payload = {_id, name, email};

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresOIm: 'id'},
            (err, token) => {
                if(err){
                    console.log(err);
                    res.status(500).json({message: 'Error generating token'});
                }
                else{
                    res.status(200).json({token});
                }
            }

        )
    }
    else
    {
        //login failed
        res.status(401).json({message: 'Invalid credentials'})
    }
}).catch((err) => {
 console.log(err);
 res.status(500).json(err);
    
});
});
module.exports = router;