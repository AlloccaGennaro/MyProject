var crypto = require('crypto');
var rand = require('csprng');
var mongoose = require('mongoose');
var USER = require('../models/user');

exports.register = function(email,password,callback) {

    var x = email;


    if(x.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/) && password.length > 4 &&
            password.match(/[0-9]/) && password.match(/.[!,@,#,$,%,^,&,*,?,_,~]/)) {

            var temp =rand(160, 36);
            var newpass = temp + password;
            var token = crypto.createHash('sha512').update(email +rand).digest("hex");
            var hashed_password = crypto.createHash('sha512').update(newpass).digest("hex");

            var newuser = new USER({
                token: token,
                email: email,
                hashed_password: hashed_password,
                salt: temp
            });



            USER.find({'email': email },function(err,users) {


                var len = users.length;

                if(len == 0) {
                    newuser.save(function(err) {
                        if(err) {
                           callback({'response' : " error"})
                        } else {
                            callback({'response': " Sucessfully Registeres ", 'email': email});
                        }
                    });
                } else {
                    callback({'response' : "Email already Registeres"});
                }
            });

        } else {
            callback({'response' : "Password Weak"});
        }
        } else {
        callback({'response' : "Email Not Valid"});
    }
}