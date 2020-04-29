var express = require('express');
var router = express.Router();


router.get('/prevention', function(req, res) {
    
    let serverCache = req.app.get('staticCache');
    let userCache = serverCache/2;
    res.set('Cache-Control', 'public, max-age=' + userCache + ', s-maxage=' + serverCache);

    res.render('prevention_plain', {
        pageTitle: 'Prevention',
        pageID: 'prevention'
    });

});    


module.exports = router;
