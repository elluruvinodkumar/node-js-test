var usersCollection = require('../../app/DbModels/users');
var paramValidations = require('../../Controllers/User/user_validation');
var bcrypt = require('bcryptjs');

var userOperations={

    //Add UserInfo
    inserUserInfo:function(req,res,callback) {
        
        const {error} = paramValidations.validateInsertPArams(req);
        
        console.log("from controller...",req);  
        if (error) {
            callback({
               status: 400,
               data: {
                   message:error
               }
           });
           return;
        }          
        else{     
            usersCollection.findOne({emailID:new RegExp(req.emailID,'i')}).exec().then((userFound) => {

            if (userFound) {
                res.send({response: '5', message: "User already existed with this Email-ID"});
            } 
            else {
                    var personDb = new usersCollection({
                        name: req.name,
                        mobile: req.mobile,
                        emailID: req.emailID,
                        password: bcrypt.hashSync(req.password, 8)
                    });

                    console.log("save before...",personDb);
                    personDb.save((personDb) => { 
                        
                        res.send({
                                    response: '3',
                                    message: 'User information has been successfully stored.'
                        });
                    });
            }

            }).catch((error) => {
                console.log(error);
            })
        }
    },

    //Fetch UserInfo
    fetchUserInfo : (callback) => {
        usersCollection.find().exec().then( (res) => {
                        callback({response: '3', Users: res});
                    }) .catch((err) => {
                        console.log(err);
        })               
    },

    //Delete UserInfo
    deleteUserInfo : (data,callback) => {

        usersCollection.findOne({name:data.name}).exec().then((fileFound)=>{

            if(fileFound){

                usersCollection.deleteOne({name:data.name}).exec().then((res) => {
                    if(res){                            
                        callback({response: '3', name: data.name, message: 'user data deleted successfully !!!'});
                    }
                }).catch((error) => {
                    console.log(error);
                })

            }else{
                callback({response: '0', message: 'No User found'});
            }
            
        }).catch((error) => {
            console.log(error);
        })
    }

};

module.exports = userOperations;