const mongoose = require('mongoose');
var config = require('../configFiles/config.json');
const schema = mongoose.Schema;
const Joi = require('@hapi/joi');
const userSchema = new schema({
    name:{
        required: true,
        type: String,
    },
    mobile:{
        required: true,
        type: String,
    },
    emailID:{
        required: true,
        type: String,
        unique: true
    },
    password:{
        required: true,
        type: String,
    }
});
mongoose.connect(config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
module.exports = mongoose.model('users',userSchema); 