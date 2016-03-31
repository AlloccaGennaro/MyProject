var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = mongoose.Schema({

    token : String,

    email: {
        type: String,
        required: [true, 'Email required'],
        index: {unique: true},
        unique: [true, 'there is already a user with this email'],
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Wrong email pattern!'],
        dropDups: true,
        set: toLower,
        get: toLower
    },

    hashed_password : String,

    salt : String,

    temp_str : String,

    name : {
        type: String,
        set: toLower,
        get : toLower
    },

    lastname : {
        type: String,
        set: toLower,
        get : toLower
    },

    city : {
        type: String,
        set: toLower,
        get : toLower
    },

    age : {
        type: Number ,
        trim : true
    }

});

module.exports = mongoose.model('User',UserSchema);


// methods ======================
/**
 * Returns the string in lowercase
 * @param string {string}
 * @returns {string}
 */
function toLower(string) {
    if (string != null) {
        return string.toLowerCase();
    }
    return "";
}
