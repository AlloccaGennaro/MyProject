var mongoose = require('mongoose');
var USER = require('../models/user');

exports.about1 = function(email,name,lastname,city,age,callback) {

    if (email.length != 0) {
    USER.find({email: email}, function (err, users) {

        if (users.length != 0) {
            if ((name === null) || (name == "")) {
                callback({'response': " name is void "});

            } else if (name.match(/\W/g) != null) {                   // take just special characters
                callback({'response': " name has some special characters "});

            } else if ((name.replace(/[^\d]+/g, '')) != "") {            // take just number
                callback({'response': " name has some numbers "});

            } else if ((lastname == "") || (lastname == null)) {
                callback({'response': " lastname is void "});

            } else if (lastname.match(/\W/g) != null) {              // take just special characters
                callback({'response': " lastname has some special characters "});

            } else if ((lastname.replace(/[^\d]+/g, '')) != "") {        // take just number
                callback({'response': " lastname has some numbers "});

            } else if ((city.replace(/[^\d]+/g, '')) != "") {        // take just number
                callback({'response': " city has some numbers "});

            }else if ((city == "") || (city == null)) {
                callback({'response': " city is void "});

            }else if (city.match(/\W/g) != null) {              // take just special characters
                callback({'response': " city has some special characters "});

            }else if (age.match(/\W/g) != null) {              // take just special characters
                callback({'response': " age has some special characters "});

            }else if ((age == "") || (age == null)) {
                callback({'response': " age is void "});

            }else if ((age.replace(/[^\d]+/g, '')) == "") {        // take just number
                callback({'response': " age is not number "});

            }else if ((parseInt(age) < 5)  || (parseInt(age) >= 100) ) {
                callback({'response': " age is not correct "});

            }else {

                USER.update({
                        email: email
                    },
                    {$set: {
                            name: name,
                           lastname: lastname,
                            city: city,
                            age: parseInt(age)
                        }}
            , function (err, doc) {

                    if (err) {
                        callback({'response': "there is a problem"});
                    } else {
                        callback({'response': "ok continue", 'email': email});
                    }
                 });
            }
        }else {
            callback({'response': "there is a problem"});
        }
    });
    } else {
        callback({'response' : "there is a problem"});
    }
}

