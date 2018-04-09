var express = require('express');
var router = express.Router();
var playlist_dal = require('../dal/playlist_dal');
var song_dal = require('../dal/song_dal');

router.get('/all',function(req,res,next){
    playlist_dal.getAll(function(err,result){
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            // console.log(result);
            res.render('playlist/playlist_view_all', {playlists: result});
        }
    })
});

router.get('/add', function(req,res) {
    song_dal.getAll(function (err,result){
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.render('playlist/playlist_add', {playlist_result: result});
        }
    });
});

router.get('/insert', function(req, res){
    playlist_dal.insert(req.query, function(err, result){
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            res.redirect(302, '/playlist/all');
        }
    });
});


router.get('/edit', function(req, res){
    playlist_dal.getinfo(req.query.playlist_id, function(err, result) {
        if(err) { res.send(err); }
        else {
            res.render('playlist/playlist_update',
                {playlists: result[0][0], playlist_result: result[1]}
            );
        }
    });
});

router.get('/update', function(req, res) {
    playlist_dal.update(req.query, function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.redirect(302, '/playlist/all');
        }
    });
});
module.exports = router;