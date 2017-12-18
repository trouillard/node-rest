var executeSQL = function (sql, res) {

     pool.getConnection(function(err,connection){
         if (err) {
           connection.release();
           res.json({"code" : 100, "status" : "Error in connection database"});
           console.log("DB non d�mar�e");
           return;
           ;
         }

         connection.query(sql,function(err, rows){
             connection.release();
             if(!err) {
                 res.json(rows);
                 return;
             }
             else {
				 res.json({"code" : 100, "status" : "Probl�me de requ�te SQL", "Erreur" : err});
				 return;
		 	 }
         });

         connection.on('error', function(err) {
               res.json({"code" : 100, "status" : "Error in connection database"});
               return ;
         });
   });
 }


var all = function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	var requete = "select * from " + req.params.objets;
	executeSQL(requete, res);
	return;
}

var get = function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	var requete = "select * from " + req.params.objets + " where id = '" + req.params.id + "'";
	executeSQL(requete, res);
	return;
}

var post = function (req, res) {

	// Ajout du Content-type
		res.setHeader('Content-Type', 'application/json');

	// R�cup�ration des param�tres de la requ�te POST dans le corps
		var parametres	= Object.keys(req.body);
		if (parametres.length == 0) {
			res.json({"code" : 200, "status" : "Aucune donnee � inserer"});
			return;
		}
		var donnees = Object.values(req.body);

	//	Fa�onnage de la requ�te
		var i = 0;
		var sql  = 'insert into ' + req.params.objets + " (";
		var sql2 = '';
		while (i < parametres.length) {
			if (i != 0) {
				sql  = sql + ", ";
				sql2 = sql2 + ", ";
			};
			sql  = sql + parametres[i];
			sql2 = sql2 + "'" + donnees[i] + "'";
			i++
		}
		sql = sql + ") values (" + sql2 + ");";
		//console.log ("requete  : " + sql);

	// Passage de la requ�te
		executeSQL(sql, res);
		return;

}

var put = function (req, res) {

	// Ajout du Content-type
		res.setHeader('Content-Type', 'application/json');

	// R�cup�ration des param�tres de la requ�te POST dans le corps
		var parametres	= Object.keys(req.body);
		if (parametres.length == 0) {
			res.json({"code" : 200, "status" : "Aucune donnee � inserer"});
			return;
		}
		var donnees = Object.values(req.body);

	//	Fa�onnage de la requ�te
		var i = 0;
		var sql  = 'update ' + req.params.objets + " set ";
		while (i < parametres.length) {
			if (i != 0) {
				sql  = sql + ", ";
			};
			sql  = sql + parametres[i] + "='" + donnees[i] + "'";
			i++
		}
		sql = sql + " where id=" + req.params.id + ";";
		//console.log ("requete  : " + sql);

	// Passage de la requ�te
		executeSQL(sql, res);
		return;

}

var del = function (req, res) {
	var sql = "delete from " + req.params.objets + " where id = '" + req.params.id + "'";
	executeSQL(sql, res);
	return;
}

exports.executeSQL = executeSQL;
exports.all = all;
exports.get = get;
exports.post = post;
exports.put = put;
exports.del = del;