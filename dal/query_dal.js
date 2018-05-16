var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.query1 = function(callback){
    var query = 'SELECT name\n' +
        'FROM playlist p\n' +
        'WHERE 1 < (SELECT COUNT(song_id) FROM playlist_song WHERE playlist_id = p.playlist_id);';
    connection.query(query, function(err, result){
        callback(err, result);
    });
};
exports.query2 = function(callback){
    var query = 'SELECT p.name, u.user_id\n' +
        'FROM  playlist p\n' +
        'JOIN\n' +
        '(\n' +
        'SELECT *\n' +
        'FROM user u\n' +
        ') AS u\n' +
        'ON p.user_name = u.user_name\n' +
        'GROUP BY p.name;';
    connection.query(query, function(err, result){
        callback(err, result);
    });
};
exports.query3 = function(callback){
    var query = 'SELECT\n' +
        'user_name FROM user WHERE\n' +
        'user_name NOT IN (SELECT DISTINCT\n' +
        'user_name\n' +
        'FROM\n' +
        'playlist);';
    connection.query(query, function(err, result){
        callback(err, result);
    });
};
exports.query4 = function(callback){
    var query = 'SELECT s.title FROM song s\n' +
        'WHERE NOT EXISTS( SELECT ps.song_id FROM playlist_song ps\n' +
        'WHERE ps.song_id=s.song_id);';
    connection.query(query, function(err, result){
        callback(err, result);
    });
};
exports.query5 = function(callback){
    var query = 'SELECT name\n' +
        'FROM playlist p\n' +
        'WHERE 1 > (SELECT COUNT(song_id) FROM playlist_song WHERE playlist_id = p.playlist_id);';
    connection.query(query, function(err, result){
        callback(err, result);
    });
};
exports.query6 = function(callback){
    var query = 'SELECT s.title,s.album FROM song s\n' +
        'WHERE track_number=\'1\'\n' +
        'GROUP BY s.title\n' +
        'ORDER BY s.album;';
    connection.query(query, function(err, result){
        callback(err, result);
    });
};
exports.query7 = function(callback){
    var query = 'SELECT u.user_name FROM user u\n' +
        'JOIN playlist p ON p.user_name = u.user_name\n' +
        'GROUP BY u.user_name\n' +
        'HAVING 1 < COUNT(p.user_name);';
    connection.query(query, function(err, result){
        callback(err, result);
    });
};
exports.query9 = function(callback){
    var query = 'SELECT playlist_id FROM playlist\n' +
        'UNION ALL\n' +
        'SELECT playlist_id FROM playlist_song;';
    connection.query(query, function(err, result){
        callback(err, result);
    });
};
exports.query10 = function(callback){
    var query = 'SELECT DISTINCT name FROM playlist;';
    connection.query(query, function(err, result){
        callback(err, result);
    });
};