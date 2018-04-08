var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);
exports.getAll = function(callback){
    var query = 'SELECT * FROM song;';
    connection.query(query, function(err, result){
        callback(err, result);
    });
};
exports.insert = function(params, callback){
    var query = 'INSERT INTO song (title, artist, album, explicit, length, track_number) VALUES (?, ?, ?, ?, ?, ?)';
    var queryData = [params.title, params.artist, params.album, params.explicit, params.length, params.track_number];
    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};
exports.insert = function(params, callback){
    var query = 'INSERT INTO song (title, artist, album, explicit, length, track_number) VALUES (?, ?, ?, ?, ?, ?)';
    var queryData = [params.title, params.artist, params.album, params.explicit, params.length, params.track_number];
    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};
exports.getinfo = function(song_id, callback) {
    var query = 'CALL song_getinfo(?)';
    var queryData = [song_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
exports.update = function(params, callback) {
    var query = 'UPDATE song SET title = ?, artist = ?, album = ?, explicit = ?, length = ?, track_number = ? WHERE song_id = ?';
    var queryData = [params.title, params.artist, params.album, params.explicit, params.length, params.track_number, params.song_id];
    connection.query(query, queryData, function(err, result)
    {
        callback(err, result);
    });

};