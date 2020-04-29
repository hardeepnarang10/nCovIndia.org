var express = require('express');
var router = express.Router();
var path = require('path');


router.get('/faqs', function(req, res) {
    
    res.cookie('anonymous', 'visitor', {sameSite: 'none', secure: true });

    let serverCache = req.app.get('staticCache');
    let userCache = serverCache/2;
    res.set('Cache-Control', 'public, max-age=' + userCache + ', s-maxage=' + serverCache);

    res.render('faqs', {
        pageTitle: 'FAQs',
        pageID: 'faqs',
        FAQSArr: require(path.join(req.app.get('dataDir'),'faqs.json'))
    });

});    


module.exports = router;
