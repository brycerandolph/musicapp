var express = require('express');
var router = express.Router();
var playlist_dal = require('../dal/playlist_dal');
var song_dal = require('../dal/song_dal');
var user_dal = require('../dal/user_dal');
var query_dal = require('../dal/query_dal');

router.get('/query1',function(req,res,next){
    query_dal.query1(function(err,result){
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            // console.log(result);
            res.render('query/query1', {query: result});
        }
    })
});
router.get('/query2',function(req,res,next){
    query_dal.query2(function(err,result){
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            // console.log(result);
            res.render('query/query2', {query: result});
        }
    })
});

router.get('/query3',function(req,res,next){
    query_dal.query3(function(err,result){
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            // console.log(result);
            res.render('query/query3', {query: result});
        }
    })
});

router.get('/query4',function(req,res,next){
    query_dal.query4(function(err,result){
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            // console.log(result);
            res.render('query/query4', {query: result});
        }
    })
});

router.get('/query5',function(req,res,next){
    query_dal.query5(function(err,result){
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            // console.log(result);
            res.render('query/query5', {query: result});
        }
    })
});

router.get('/query6',function(req,res,next){
    query_dal.query6(function(err,result){
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            // console.log(result);
            res.render('query/query6', {query: result});
        }
    })
});

router.get('/query7',function(req,res,next){
    query_dal.query7(function(err,result){
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            // console.log(result);
            res.render('query/query7', {query: result});
        }
    })
});

router.get('/query9',function(req,res,next){
    query_dal.query9(function(err,result){
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            // console.log(result);
            res.render('query/query9', {query: result});
        }
    })
});

router.get('/query10',function(req,res,next){
    query_dal.query10(function(err,result){
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            // console.log(result);
            res.render('query/query10', {query: result});
        }
    })
});



module.exports = router;