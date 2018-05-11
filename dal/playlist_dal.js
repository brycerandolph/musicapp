var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);
/*exports.getAll = function(callback){
    var query = 'SELECT * FROM playlist;';
    connection.query(query, function(err, result){
        callback(err, result);
    });
};*/
exports.getAll = function(callback){//broken currently
    var query = 'SELECT * FROM playlist LEFT JOIN user ON playlist.user_name = user.user_name';
    connection.query(query, function(err, result){
        callback(err, result);
    });
};
exports.stuff = function(callback){//broken currently
    var query = 'CALL playlist_stuff()';
    connection.query(query, function(err, result){
        callback(err, result);
    });
};
exports.alt = function(callback){
    var query = 'SELECT * FROM playlist JOIN playlist_song ON playlist.playlist_id = playlist_song.playlist_id\n' +
        '                                  JOIN song ON playlist_song.song_id = song.song_id\n' +
        '                                  ORDER BY name\n' +
        '\n';
    connection.query(query, function(err, result){
        callback(err, result);
    });
};
exports.insert = function(params, callback){
    //var query = 'INSERT INTO playlist (name) VALUES (?)';
    var query = 'INSERT INTO playlist(name, user_name) VALUES (?,?)';
    var queryData = [params.name, params.user_name];
    connection.query(query, queryData, function(err, result){
            if(err || params.song_id === undefined) {
                console.log(err);
                callback(err, result);
            } else {

                // If the company was successfully inserted,
                // then the auto generated playlist_id value will be stored
                // in the result.insertId property. We will use that to
                // then insert records into the company_address table
                var playlist_id = result.insertId;

                // Notice that there is only one question mark after
                // values instead if (?, ?)
                var query = 'INSERT INTO playlist_song (playlist_id, song_id) VALUES ?';

                // CREATE A MULTIDIMENSIONAL ARRAY OF THE VALUES
                var songPlaylistData = [];

                // if the user only selected one address
                // and its id is 10 or greater JavaScript will treat the
                // number as a string array i.e. ['1','0'].  We have this
                // if/else check to handle that problem
                if (params.song_id.constructor === Array) {
                    // first we check if its an array of values
                    for (var i = 0; i < params.song_id.length; i++) {
                        songPlaylistData.push(
                            [playlist_id, params.song_id[i]]
                        );
                    }
                }
                else {
                    songPlaylistData.push([playlist_id, params.song_id]);
                }

                // Notice the extra [] around songPlaylistData.
                // This is different from inserting one record
                // at a time like we did for company
                connection.query(query, [songPlaylistData],
                    function (err, result) {
                        callback(err, result);
                    });
            }

    });
};
exports.getinfo = function(playlist_id, callback) {
    var query = 'CALL playlist_getinfo(?)';
    var queryData = [playlist_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
var songPlaylistInsert = function(playlist_id, playlistIdArray, callback){
    // NOTE THAT THERE IS ONLY ONE QUESTION MARK IN VALUES ?
    var query = 'INSERT INTO playlist_song (playlist_id, song_id) VALUES ?';

    // TO BULK INSERT RECORDS WE CREATE A MULTIDIMENSIONAL ARRAY OF THE VALUES
    var songPlaylistData = [];
    if (playlistIdArray.constructor === Array) {
        for (var i = 0; i < playlistIdArray.length; i++) {
            songPlaylistData.push([playlist_id, playlistIdArray[i]]);
        }
    }
    else {
        songPlaylistData.push([playlist_id, playlistIdArray]);
    }
    connection.query(query, [songPlaylistData], function(err, result){
        callback(err, result);
    });
};

var songPlaylistUpdate = function(playlist_id, playlistIdArray, callback){
    // First we need to remove all the entries, and then re-insert new ones
    var query = 'CALL playlist_song_delete(?)';

    connection.query(query, playlist_id, function (err, result) {
        if(err || playlistIdArray === undefined) {

            callback(err, result);
        } else {
            songPlaylistInsert(playlist_id, playlistIdArray, callback);
        }
    });
};

exports.edit = function(playlist_id, callback){
    var query = 'CALL playlist_edit(?)';
    var queryData = [playlist_id];
    connection.query(query, queryData, function (err, result) {
            callback(err, result);

    });
    };


exports.update = function(params, callback) {
    var query = 'UPDATE playlist SET name = ? WHERE playlist_id = ?';
    var queryData = [params.name, params.playlist_id];
    connection.query(query, queryData, function(err, result){
    songPlaylistUpdate(params.playlist_id, params.song_id, function (err, result) {

        callback(err, result);
         });
    });
};
exports.delete = function(playlist_id, callback) {
    var query = 'DELETE FROM playlist WHERE playlist_id = ?';
    var queryData = [playlist_id];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });

};