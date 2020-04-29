var express = require('express');
var router = express.Router();
var path = require('path');


router.get('/about', function(req, res) {
    
    let serverCache = req.app.get('staticCache');
    let userCache = serverCache/2;
    res.set('Cache-Control', 'public, max-age=' + userCache + ', s-maxage=' + serverCache);

    res.render('about', {
        pageTitle: 'About',
        pageID: 'about'
    });

});    


module.exports = router;
