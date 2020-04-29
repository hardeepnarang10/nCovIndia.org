var express = require('express');
var router = express.Router();


router.get('/database', function(req, res) {
    
    res.cookie('anonymous', 'visitor', {sameSite: 'none', secure: true });

    let serverCache = req.app.get('semiCache');
    let userCache = serverCache/2;
    res.set('Cache-Control', 'public, max-age=' + userCache + ', s-maxage=' + serverCache);

    res.render('database', {
        pageTitle: 'Database',
        pageID: 'database'
    });

});    


module.exports = router;
