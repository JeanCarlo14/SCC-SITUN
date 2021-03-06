var express = require('express');
var router = express.Router();
var path    = require("path");
var db = require('../public/javascripts/server');

var app = express();
var url = require("url");

var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {

	var obj = { mensaje: 'Usuario y/o clave incorrectos', 
	error: req.session.retry,
	usr: req.session.usr,
	pass: req.session.pass
	};
	//console.log(req.session.retry);

	//if(req.session.retry)
	//	console.log('retrying');
	//	obj.retry = true;
	req.session.retry = true;
  res.render('index', obj);
  //console.log("Ingresando al root");
 // console.log(req.session);

	//res.sendFile(path.join(__dirname+'/../public/HTML/index.html'));
});

/*
router.get('/HTML/*', function(req, res, next) {
  console.log("Ingresando al Buscar desde " + req.url); 
  console.log(req.session.passport);
	if(!req.session.passport)
	{
		console.log("No esta loggeado...");
		//console.log(req.session);
		res.redirect('/');
	}
	else{
		//req.session.usr = "hola.";
		console.log("Si esta loggeado XD");
		var dir = req.url.replace(/%20/g, " ");
		console.log(req.session.usuario);
		console.log(dir);
		//res.render(dir);
		res.sendFile(path.join(__dirname+'/../public/'+dir+'.html'));
		//next();
	}
});

*/
router.post('/login',passport.authenticate('local-login',{
	successRedirect: '/HTML/Ingreso de Correspondencia',
	failureRedirect: '/',
	filureFlash: false
}));

router.get('/logout',function(req, res){
	req.logout();
    req.session.destroy();
    res.redirect('/');
});

router.get('/sessionInfo',function(req, res, next){
	console.log("Solicitud de info de sesson... "); 
  //console.log(req.session);
	res.json(req.session.usuario);
});

router.get('/HTML/*', function(req, res, next) {
  console.log("Ingresando al Buscar desde " + req.url); 
  console.log(req.session.passport);
	if(!req.session.passport)
	{
		console.log("No esta loggeado...");
		//console.log(req.session);
		res.redirect('/');
	}
	else{
		//req.session.usr = "hola.";
		console.log("Si esta loggeado XD");
		var dir = (req.url.replace(/%20/g, " ")).substr(6);
		console.log(req.session.usuario);
		console.log(dir);
		res.render(dir);
		//res.sendFile(path.join(__dirname+'/../public/'+dir+'.html'));
		//next();
	}
});


//----------- BUSQUEDA EN TABLAS -------------------------------------
router.post('/api/ALL/ENLACES',db.getAllEnlaces);       // Busqueda todos lo TP

//----------- DEVOLUCION DE TODO LOS DATOS DE UNA TABLA -------------------------------------
router.post('/api/TP/ALL',db.getAllTP);       // Busqueda todos lo TP
router.post('/api/TU/ALL',db.getAllTU);		// Busqueda todos lo TU
router.post('/api/TC/ALL',db.getAllTC);		// Busqueda todos lo TC


//----------- DEVOLUCION DE DATOS DE UNA TABLA SEGUN UNA CONDICION ----------
router.post('/api/TPTU/B',db.getTPTU);// Busqueda TP Y TU especifico
router.post('/api/TP/B', db.getSingleTP); // Busqueda TP especifico identificacion
router.post('/api/TP/BN',db.getALLTP1); // Busqueda TP nombre
router.post('/api/TP/BA1',db.getALLTP2); // Busqueda TP Primer apellido
router.post('/api/TP/BA2',db.getALLTP3); // Busqueda TP Primer apellido
router.post('/api/TU/B', db.getSingleTU); // Busqueda TU especifico
router.post('/api/TC/BO', db.getALLTC1); // Busqueda TC  oficio
router.post('/api/TC/BD', db.getALLTC2); // Busqueda TC  destinatario
router.post('/api/TC/BR', db.getALLTC3); // Busqueda TC  remitente
router.post('/api/TC/BA', db.getALLTC4); // Busqueda TC  asunto
router.post('/api/TE/ALL_ONE',db.getALLTE_ONE);	// Busqueda Todos los enlaces sobre un documento
router.post('/api/TA/ALL_FECHA',db.getALLTA_FECHA);	// Busqueda Todos las alarmas antes de la fecha
router.get('/api/TC/BC',db.getLastTC); // Busqueda TC recupera ultimo id de la tabla TC

//----------- INSERTAR EN TABLAS ----------------------------------------
router.post('/api/TP/I', db.createTP);	// Insertando en TP
router.post('/api/TU/I', db.createTU);  // Insertando en TU
router.post('/api/TC/I', db.createTC);  // Insertando en TC
router.post('/api/TE/I', db.createTE);  // Insertando en TE
router.post('/api/TA/I', db.createTA);  // Insertando en TA

//----------- ACTUALIZACIONES EN TABLAS ---------------------------------
router.post('/api/TP/UD', db.updateTP); // Actualizar TP especifico
router.post('/api/TU/UD', db.updateTU); // Actualizar TU especifico
router.post('/api/TC/UD', db.updateTC); // Actualizar TC especifico
router.post('/api/TE/UD', db.updateTE); // Actualizar TE especifico
router.post('/api/TA/UD', db.updateTA); // Actualizar TA especifico

//----------- ELIMINACIONES EN TABLAS -----------------------------------
router.get('/api/TP/D', db.removeTP); // Eliminar un TP especifico
router.get('/api/TU/D', db.removeTU); // Eliminar un TP especifico
router.get('/api/TC/D', db.removeTC); // Eliminar un TC especifico
router.post('/api/TE/D',db.removeTE); // Eliminando un enlace especifico
router.post('/api/TA/D',db.removeTA); // Eliminando un TA especifico


module.exports = router;