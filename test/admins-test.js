var Admin = require('../models/admins');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/FinalNodeJs');

var a = new Admin({ email:"admin@admin.com", password: "123456" });
a.save(function(err, doc){
    console.log(err, doc);

    //comprobar pass
    console.log("PasswordOK", a.authenticate("123456"));
	console.log("PasswordFAIL", a.authenticate("incorrect"));    
});
