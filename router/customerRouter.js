const express=require('express');
const bcryptjs=require('bcryptjs');
require('mongoose');

//jwt helps to create token
const jwt = require('jsonwebtoken');


const customer=require('../modle/customer');
const router=new express.Router();


router.post("/customer/register", function(req, res){
    const username=req.body.username;
    const phoneNumber=req.body.phoneNumber;
    const gender=req.body.gender;
    const email=req.body.email;
    const password=req.body.password;
    const address=req.body.address;
    
    //if you dont want to put image empty then do this
    const image="abc.jpg";

    customer.findOne({address:address}).then(function(customerData){
        if(customerData!=null){
            res.status(401).json({msg:"address already exists"})
            return;
        }
        
    });
    customer.findOne({email:email}).then(function(emailData){
        if(emailData!=null){
            res.status(401).json({msg:"already exist"})
            return ;
        }
    });


    bcryptjs.hash(password, 10, function(e, hashed_password){

        const customerData=new customer({
            username:username,
            phoneNumber:phoneNumber,
            gender:gender,
            email:email,
            password:hashed_password,
            address:address,
            image:image
        });
        
            customerData.save()
            .then(function(){
                res.json({message:"Sucessfully registerd"})
            })
            .catch(function(e){
                res.json({err:e})
            })
        
        
      
    })
    
})


//give the address in postman
// router.post("/test", function(req, res){
//     const address=req.body.address;
//     customer.findOne({address:address}).then(function(data){
//         if(data!=null){
//             res.json(data);
//         }
//         else{
//             res.json({message:"invalid address"})
//         }
        
//     })
// })

// router.post("/emailtest", function(req, res){
//     const email=req.bod.email;
//     customer.findOne({email:email}).then(function(emailData){
//         if(data!=null){
//             res.json(emailData)
//         }
//         else{
//             res.json({message:"invalid email"})
//         }
//     })
// })


//LOGIN ROUTE FOR CUSTOMER
router.post('/customer/login', function (req, res) {
    const username=req.body.username;
    customer.findOne({username:username}).then(function (customerData) {
        if(customerData==null){
            return res.json({msg:"invalid login"})
        }
        //now it means username is valid
        const password=req.body.password;
        bcryptjs.compare(password, customerData.password, function (err, result) {
            if(result==false){
                return res.json({message:"Invalid login credintal"})
            }

            // IF USERNAME AND PASSWORD IS CORRECT WE GENERATE Token

            const token=jwt.sign({customerId:customerData._id,}, "mysecretkey");
            res.json({token:token, message:"Auth Sucess"})
        })

        
    }).catch()
})

module.exports=router;

