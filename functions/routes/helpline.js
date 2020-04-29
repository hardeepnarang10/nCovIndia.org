var express = require('express');
var router = express.Router();
var path = require('path');


router.get('/helpline', function(req, res) {
    
    let serverCache = req.app.get('staticCache');
    let userCache = serverCache/2;
    res.set('Cache-Control', 'public, max-age=' + userCache + ', s-maxage=' + serverCache);

    res.render('helpline', {
        pageTitle: 'Helpline',
        pageID: 'helpline',
        testingCenters: require(path.join(req.app.get('dataDir'),'testing_centers.json')),
        officialResources: require(path.join(req.app.get('dataDir'),'official_resources.json')),
        supportGroups: require(path.join(req.app.get('dataDir'),'support_groups.json'))
    });

});    


module.exports = router;
