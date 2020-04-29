var express = require('express');
var router = express.Router();


router.get('/cluster', function(req, res) {
    
    res.cookie('anonymous', 'visitor', {sameSite: 'none', secure: true });

    let serverCache = req.app.get('staticCache');
    let userCache = serverCache/2;
    res.set('Cache-Control', 'public, max-age=' + userCache + ', s-maxage=' + serverCache);

    res.render('cluster', {
        pageTitle: 'Cluster',
        pageID: 'cluster'
    });

});    


module.exports = router;
