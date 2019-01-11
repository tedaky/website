var fs = require('fs');

var mysql = require('mysql');

var mysqlconnect = require('../mysql/mysql-connect');

var connection = mysql.createConnection(mysqlconnect);

var create = '';
fs.readFile(__dirname + '/createDB.sql', function(err, data) {
  if(err) throw err;
  create += data.toString();
});

connection.connect(function(err) {
  if(err) throw err;
  console.log('Connected!');
  connection.query(
    create,
    function(err, res) {
      if(err) throw err;
      console.log('Database Created!');
    }
  );
  connection.end();
});
