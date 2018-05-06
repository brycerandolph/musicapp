var express = require('express');
var router = express.Router();
var song_dal = require('../dal/song_dal');


router.get('/all',function(req,res,next){
    song_dal.getAll(function(err,result){
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            // console.log(result);
            res.render('song/song_view_all', {songs: result});
        }
    })
});
router.get('/singles',function(req,res,next){
    song_dal.getsingles(function(err,result){
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            // console.log(result);
            res.render('song/song_view_singles', {songs: result});
        }
    })
});

router.get('/titlesort',function(req,res,next){
    song_dal.sort_title(function(err,result){
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            // console.log(result);
            res.render('song/song_view_all_title', {songs: result});
        }
    })
});

router.get('/artistsort',function(req,res,next){
    song_dal.sort_artist(function(err,result){
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            // console.log(result);
            res.render('song/song_view_all_artist', {songs: result});
        }
    })
});

router.get('/albumsort',function(req,res,next){
    song_dal.sort_album(function(err,result){
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            // console.log(result);
            res.render('song/song_view_all_album', {songs: result});
        }
    })
});



router.get('/add', function(req,res) {
    res.render('song/song_add');
});

router.get('/insert', function(req, res){
    song_dal.insert(req.query, function(err, result){
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            res.redirect(302, '/song/all');
        }
    });
});


router.get('/edit', function(req, res){
    song_dal.getinfo(req.query.song_id, function(err, result) {
        if(err) { res.send(err); }
        else {
            res.render('song/song_update',
                {songs: result[0][0], song_result: result[1]}
            );
        }
    });
});

router.get('/update', function(req, res) {
    song_dal.update(req.query, function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.redirect(302, '/song/all');
        }
    });
});
router.get('/delete', function(req, res) {
    song_dal.delete(req.query.song_id, function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.redirect(302, '/song/all');
        }
    });
});
module.exports = router;