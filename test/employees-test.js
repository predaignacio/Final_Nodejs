var Employee = require('../models/employees');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/FinalNodeJs'); //mongoose.connect('mongodb://localhost/FinalNode');

var e = new Employee({nombre:"Juan Alberto",apellido:"Spinetta",email:"admin@admin.com"});//,pass:"123456",confirm:"123456"});

e.save(function(err, doc){
	console.log(err, doc);
});