var app = module.parent.exports.app;
var passport = module.parent.exports.passport;

var Employees = require('../models/employees.js');
var Admins = require('../models/admins.js');

app.get('/admin',function(req,res){ // /admin para Login
	res.render('login',{ title: 'Login'});
});

app.post('/admin', passport.authenticate('AdminLogin', 
    { successRedirect: '/panel',
      failureRedirect: '/admin',
      failureFlash: true }));


app.get('/panel', function(req,res){
	//res.end('Funciona');
	//var msg = req.flash('message'); //flash message
	Employees.find({},function(err,docs){
		//res.json(docs);
		res.render('list', { title: 'Employee Panel', employees: docs}); //el list es el list.jade q esta en el directorio view
		//res.render('list', { title: 'Employee Panel', persons: docs, flashmsg: msg}); //flash message
	});
});

app.get('/employees/new', function(req,res){
	//req.flash('message', 'You visited /new'); //flash message
	res.render('new', { title: 'New employee'});
});

 app.post('/employees/new', function(req, res){
    console.log(req.body);
    var e = new Employees({ nombre: req.body.nombre, apellido: req.body.apellido, email: req.body.email });// pass: req.body.pass, confirm: req.body.confirm});
    e.save(function(err, doc){
        if(!err){
            res.redirect('/panel');
        } else {
            res.end(err);  
        }    
    });
 });

app.get('/employees/delete/:id', function(req, res){
    Employees.remove({ _id: req.params.id }, function(err, doc){
        if(!err){
            res.redirect('/panel');
        } else {
            res.end(err);    
        }    
    });
});

app.get('/employees/edit/:id', function(req, res){
    Employees.findOne({ _id: req.params.id }, function(err, doc){
        if(!err){
            res.render('edit', { title: 'Edit Employee', employee: doc});
        } else {
            res.end(err);    
        }    
    });
});

app.post('/employees/edit/:id', function(req, res){
    Employees.findOne({ _id: req.params.id }, function(err, doc){
        if(!err){
            doc.nombre = req.body.nombre; 
            doc.apellido = req.body.apellido;
            doc.email = req.body.email;
            doc.save(function(err, doc){
                if(!err){
                    res.redirect('/panel');
                } else {
                    res.end(err);    
                }    
            }); 
        } else {
            res.end(err);    
        }    
    });
});