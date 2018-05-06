var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);
exports.getAll = function(callback){
    var query = 'SELECT * FROM user;';
    connection.query(query, function(err, result){
        callback(err, result);
    });
};
exports.insert = function(params, callback){
    var query = 'INSERT INTO user (user_name, password) VALUES (?,?)';
    var queryData = [params.user_name, params.password];
    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};
exports.getinfo = function(user_id, callback) {
    var query = 'CALL user_getinfo(?)';
    var queryData = [user_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
exports.update = function(params, callback) {
    var query = 'UPDATE user SET user_name = ?, password = ? WHERE user_id= ?';
    var queryData = [params.user_name, params.password, params.user_id];
    connection.query(query, queryData, function(err, result)
    {
        callback(err, result);
    });

};
exports.delete = function(user_id, callback) {
    var query = 'DELETE FROM user WHERE user_id = ?';
    var queryData = [user_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);

    });
};