const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const passwordComplexity = require ("joi-password-complexity");
const { string } = require('joi');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    firstName: {type:string, required:true},
    lasttName: {type:string, required:true},
    email: {type:string, required:true},
    password: {type:string, required:true}
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this.id}, process.env.JWTPRIVATEKEY, {expiresIn:"7d"})
    return token
    };

const User = mongoose.model("user", userSchema);

const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        Email: Joi.string().required().label("Email"),
        password: passwordComplexity().required().label("Password")
    })
    return schema.validate(data)
};

module.exports ={User, validate}


