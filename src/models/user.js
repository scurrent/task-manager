const mongoose = require("mongoose")
const validator = require("validator")

const User = mongoose.model("User", {
    name: {
        type: String,
        require : true, 
        trim: true       
    },
    password: {
        type: String,
        require : true, 
        trim: true,
        minlength : 7,
        validate(value){
            if("password" === value.toLowerCase()){
                throw new Error("password cannot be password")
            }
        }
               
    },
    email: {
        type: String,
        require : true,
        trim: true, 
        lowercase : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email")
            }
        }       
    },
    age : {
        type: Number,
        default: 0, 
        validate(value){
            if(value>0){
                throw new Error('invalid age - no negatives')
            }
        }
    }
})

module.exports = User