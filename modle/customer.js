const mongoose=require('mongoose');
const { fileURLToPath } = require('url');

const customer=mongoose.model('customer',{
    username:{
        type:String
    },
    address:{
        type:String
    },
    phoneNumber:{
        type:String
    },
    gender:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
   
    image:{
        type:String
    }
})

module.exports=customer;