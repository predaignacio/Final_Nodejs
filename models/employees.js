var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var employeeSchema = new Schema({
	nombre: String,
	apellido: String,
	email: String//,
	//pass: String,
	//confirm: String
});

var employeeModel = mongoose.model('Employees',employeeSchema);
module.exports = employeeModel; //el module.exports te da la posibilidad que despues se pueda requerir
