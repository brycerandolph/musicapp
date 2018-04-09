var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);
exports.getAll = function(callback){
    var query = 'SELECT * FROM playlist;';
    connection.query(query, function(err, result){
        callback(err, result);
    });
};
exports.insert = function(params, callback){
    var query = 'INSERT INTO playlist (name) VALUES (?)';
    var queryData = [params.name];
    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};
exports.getinfo = function(playlist_id, callback) {
    var query = 'CALL playlist_getinfo(?)';
    var queryData = [playlist_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
exports.update = function(params, callback) {
    var query = 'UPDATE playlist SET name = ? WHERE playlist_id = ?';
    var queryData = [params.name, params.playlist_id];
    connection.query(query, queryData, function(err, result)
    {
        callback(err, result);
    });

};