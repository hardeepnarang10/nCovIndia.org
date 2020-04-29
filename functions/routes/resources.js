var express = require('express');
var router = express.Router();


router.get('/resources', function(req, res) {
    
    let serverCache = req.app.get('staticCache');
    let userCache = serverCache/2;
    res.set('Cache-Control', 'public, max-age=' + userCache + ', s-maxage=' + serverCache);

    res.render('resources', {
        pageTitle: 'Resources',
        pageID: 'resources'
    });

});    


module.exports = router;
