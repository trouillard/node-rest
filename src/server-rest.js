
var path 		= require('path');
var express 	= require('express');
var mysql 		= require('mysql');
var bodyParser 	= require('body-parser');
var cors 		= require('cors');


// CONFIGURATIONS DEFAULT
//const app = new Express();
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin: '*'}));


// DONNES DE CONNEXION DB (config.js)
var config = require('./config');
global.pool = mysql.createPool(config.db);


// API REST DEFAULT
var rest = require('./framework');
app.get('/rest/:objets', rest.all);
app.get('/rest/:objets/:id',	rest.get);
app.post('/rest/:objets', rest.post);
app.put('/rest/:objets', rest.put);
app.delete('/rest/:objets/:id', rest.del);


// DEMARRAGE SERVEUR
app.listen(3003);
console.log("Serveur REST demarre sur : http://locahost:3003/rest/...");
