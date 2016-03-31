var chgpass = require('../config/chgpass');
var register = require('../config/register');
var login = require('../config/login');
var about = require('../config/about');

module.exports = function(app) {

    app.get('/', function(req,res) {
        res.end(" Gennaro Allocca's Project");
    });

    app.post('/login', function(req,res) {
       var email = req.body.email;
       var password = req.body.password;

            login.login(email, password, function(found) {
               console.log(found);
                res.json(found);
            });
    });

    app.post('/register', function(req,res) {
       var email = req.body.email;
       var password = req.body.password;

            register.register(email,password, function(found) {
               console.log(found);
                res.json(found);
            });
    });

    app.post('/api/chgpass', function(req,res) {
        var id = req.body.id;
        var opass = req.body.oldpass;
        var npass = req.body.newpass;

        chgpass.cpass(id,opass,npass,function(found) {
            console.log(found);
            res.json(found);
        });
    });

    app.post('/api/resetpass', function(req,res){
        var email = req.body.email;

        chgpass.respass_init(email,function(found) {
            console.log(found);
            res.json(found);
        });
    });

    app.post('/api/resetpass/chg', function(req,res) {
        var email = req.body.email;
        var code = req.body.code;
        var npas = req.body.newpass;

        chgpass.respass_chg(email,code,npas,function(found) {
            console.log(found);
            res.json(found);
        });
    });

    app.post('/about', function(req,res) {
        var email = req.body.email;
        var name = req.body.name;
        var lastname = req.body.lastname;
        var city = req.body.city;
        var age = req.body.age;

        about.about1(email,name,lastname,city,age,function(found) {
            console.log(found);
            res.json(found);
        })
    });


}