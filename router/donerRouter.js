const express=require('express');
require('mongoose');
const bcryptjs=require('bcryptjs');
const doner=require('../modle/doner');
// const customer = require('../modle/customer');

//TOKEN 
const jwt=require("jsonwebtoken");

const router=new express.Router();

router.post("/doner/register", function(req, res){
    const username=req.body.username;
    const address=req.body.address;
    const email=req.body.email;
    const phone=req.body.phone;
    const password=req.body.password;
    const image="abc.jpg";

    // to find the value whether it exists or not

    doner.findOne({username:username}).then(function(donerData){
        if(donerData!=null){
            res.status(401).json({msg: "already exists"});
            return;
        }
    })

    bcryptjs.hash(password, 10, function(e, hasedPassword){
        const donerData=new doner({

            username:username,
            address:address,
            email:email,
            phone:phone,
            password:hasedPassword,
            image:image
    
        })
        donerData.save()
        .then(function(){
            res.json({message:"sucessfully inserted doner"});
        })
        .catch(function(e){
            res.json({err:e});
        })
        
    })
    // router.post("/testname", function(req, res){
    //     const name=req.body.name;
    //     doner.findOne({name:name}).then(function(nameData){
    //         if(nameData!=null){
    //             res.json(nameData);
    //         }
    //         else{
    //             res.json({mesage:"already exist name"})
    //         }
    //     })

    // })

    //LOGIN ROUTE FOR CUSTOMER
     
})
router.post('/doner/login', function (req, res) {
    const username=req.body.username;
    doner.findOne({username:username}).then(function (donerData) {
        if(donerData==null){
            return res.json({message:"invalid username"})
        }
        // IF USERNAME IS VALID
        const password=req.body.password;
        //now compare the password from database which is bcrypted
        bcryptjs.compare(password, donerData.password, function (err, result) {
            if(result==false){
                return res.json({message:"Invalid login credintal"})
            }
            else{
                //If password is correct 
            const token=jwt.sign({donerId:donerData._id,}, "my secret key");
            res.json({token:token, message:"Auth sucess"});
            }
            
        })
    }).catch(function (e) {
        res.json({err:e})
    })
})
module.exports=router;

