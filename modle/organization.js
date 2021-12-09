const mongoose=require('mongoose');

const organization=mongoose.model('organization',{
    organizationName:{
        type:String
    },
    address:{
        type:String
    },
    phoneNumber:{
        type:Number
    },
    email:{
        type:String
    },
    username:{
        type:String
    },
    password:{
        type:String
    },
   


});
module.exports=organization;