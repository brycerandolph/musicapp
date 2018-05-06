var express = require('express');
var router = express.Router();
var user_dal = require('../dal/user_dal');

router.get('/all',function(req,res,next){
    user_dal.getAll(function(err,result){
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            // console.log(result);
            res.render('user/user_view_all', {users: result});
        }
    })
});

router.get('/add', function(req,res) {
    res.render('user/user_add');
});

router.get('/insert', function(req, res){
    user_dal.insert(req.query, function(err, result){
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            res.redirect(302, '/user/all');
        }
    });
});
router.get('/edit', function(req, res){
    user_dal.getinfo(req.query.user_id, function(err, result) {
        if(err) { res.send(err); }
        else {
            res.render('user/user_update',
                {users: result[0][0], user_result: result[1]}
            );
        }
    });
});
router.get('/update', function(req, res) {
    user_dal.update(req.query, function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.redirect(302, '/user/all');
        }
    });
});
router.get('/delete', function(req, res) {
    user_dal.delete(req.query.user_id, function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.redirect(302, '/user/all');
        }
    });
});
module.exports = router;