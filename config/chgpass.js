var crypto = require('crypto');
var rand = require('csprng');
var mongoose = require('mongoose');
var nodemailer = require("nodemailer");
var USER = require('../models/user');
var smtpTransport = require("nodemailer-smtp-transport")

var smtpTransport = nodemailer.createTransport(smtpTransport({
    host : "Smtp.gmail.com",
    secureConnection : true,
    port: 587,
    auth : {
        user : "genni.allocca@gmail.com",
        pass : "djfalskjf"
    }
}));


exports.cpass = function(id,opass,npass,callback) {
    var templ = rand(160,36);
    var newpass1 = templ + npass;
    var hashed_passwordn = crypto.createHash('sha512').update(newpass1).digest("hex");


    USER.find({'token': id}, function(err,users) {

        if(users.length != 0) {
            var temp = users[0].salt;
            var hash_db = users[0].hashed_password;
            var newpass = temp + opass;
            var hashed_password = crypto.createHash('sha512').update(newpass).digest("hex");

            if(hash_db == hashed_password) {
                if (npass.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/) && npass.length > 4 &&
                    npass.match(/[0-9]/) && npass.match(/.[!,@,#,$,%,^,&,*,?,_,~]/)) {

                    USER.findOne({'token': id}, function (err,doc) {
                        doc.hashed_password = hashed_passwordn;
                        doc.salt = templ;
                        doc.save();


                        callback({'response': "Password Sucessfully changed", 'res': true});
                    });
                } else {
                    callback({'response': "New Password is Weak. Try a Strong Password !", 'res': false});
                }
                } else {
                    callback({'response': "Password do not match. Try Again !", 'res': false});
                }
        } else {
            callback({'response': "Error while changing password", 'res': false});
        }
    });
}


exports.respass_init = function(email,callback) {

    var temp = rand(24,24);

    USER.find({'email' : email}, function(err,users) {

        if(users.length != 0) {

            USER.findOne({'email' : email}, function(err,doc){
                doc.temp_str = temp;
                doc.save();

                var mailOptions = {
                    from : "Gennaro Allocca <gennaroalloccaelis@gmail.com",
                    to : email,
                    subject : "Reset Password",
                    text : "Hello " + email + ".  Code to reset your Password is " + temp + " Gennaro Allocca",
                }

            smtpTransport.sendMail(mailOptions, function(error, response){
                if (error) {
                callback({'response':"Error While Resetting password. Try Again !",'res':false});
                console.log(error);
                }else{
                callback({'response' : "Check your Email and enter the verification code to reset yor *Password.", 'res' : true});
                }
            });
            });
        } else {
            callback({'response' : "Email does not Exists.", 'res' : false});
        }
    });
}


exports.respass_chg = function(email, code, npass, callback) {

    USER.find({'email' : email}, function(err, users){

        if(users.length != 0) {

            var temp = users[0].temp_str;
            var temp1 = rand(160, 36);
            var newpass1 = temp1 + npass;
            var hashed_password = crypto.createHash('sha512').update(newpass1).digest("hex");

            if(temp == code) {
                if(npass.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/) && npass.length > 4 && npass.match(/[0-9]/) &&
                npass.match(/.[!,@,#,$,%,^,&,*,?,_,~]/)) {

                    USER.findOne({'email' : email }, function(err, doc){
                        doc.hashed_password = hashed_password;
                        doc.salt = temp1;
                        doc.temp_str = "";
                        doc.save();

                        callback({'response' : "Password Sucessfully changed ", 'res' : true});
                    });
                } else {
                    callback({'response' : "New Password is weak. Try a strong Password !", 'res' : false});
                }
            } else {
                callback({'response' : "Code does not match. Try again !", 'res': false});
            }
        } else {
            callback({'response' : "Error", 'res' : true});
        }
    });
}