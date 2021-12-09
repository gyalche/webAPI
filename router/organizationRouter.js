const mongoose=require("mongoose");
const express=require("express");
const app=express();
const bcryptjs=require("bcryptjs");
const organization=require('../modle/organization');


//organization  login
const jwt=require('jsonwebtoken');

const router=new express.Router();

router.post("/organization/register", function(req, res){
    const organizationName=req.body.organizationName;
    const address=req.body.address;
    const phoneNumber=req.body.phoneNumber;
    const email=req.body.email;
    const username=req.body.username;
    const password=req.body.password;
    


    // organization.findOne({organizationName:organizationName}).then(function (organizationFind) {
    //     if(organizationFind!=null){
    //         res.status(401).json({msg:"already exist"});
    //         return;
    //     }
    // });

    bcryptjs.hash(password, 10, function(e, hash_password){
        const organizationData=new organization({
            organizationName:organizationName,
            address:address,
            phoneNumber:phoneNumber,
            email:email,
            username:username,
            password:hash_password,
         
        })
        organizationData.save()
        .then(function () {
            res.json({msg:"saved in organization"})
        })
        .catch(function (e) {
            res.json({err:e});
        })
        
    })
})
//for searching
// router.post("/testOrg", function (req, res) {
//     const address=req.body.address;
//     organization.findOne({address:address}).then(function (orgD) {
//         if(orgD!=null){
//             res.json(orgD)
//         }
//         else{
//             res.json({msg:"invalid address"})
//         }
//     })
// })

//LOGIN ROUTE FOR ORGANIZATIION

router.post("/organization/login", function (req, res) {
    const username=req.body.username;
    organization.findOne({username:username,}).then(function (organizationData) {
        if(organizationData==null){
            return res.json({message:"invalid credintal"})
        }
        // if the user name is correct then 
        const password=req.body.password;
        //compring the enterd password in the database which is bcrypted
        bcryptjs.compare(password, organizationData.password, function (err, result) {
            if(result==false){
                return res.json({msg:"invalid credential"})
            }
            //if password matches
            const token=jwt.sign({organizationId:organizationData._id}, "my secret key");
            res.json({token:token, message:"Auth Success"});
        })
    })
})

module.exports=router;