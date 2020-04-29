var express = require('express');
var router = express.Router();
const axios = require('axios');


var rssJSON = {};


router.get('/newsfeed', function(req, res) {
    
    res.cookie('anonymous', 'visitor', {sameSite: 'none', secure: true });

    let serverCache = req.app.get('semiCache');
    let userCache = serverCache/2;
    res.set('Cache-Control', 'public, max-age=' + userCache + ', s-maxage=' + serverCache);

    function pageRender(rss_tribune = rssJSON) {

        articleIDs = new Set();
        newsStories = [];
        for(var i=0; i<rss_tribune.length; i++) {
            element = rss_tribune[i];
            if(articleIDs.has(element.title[0])) {
                continue;
            } else {
                articleIDs.add(element.title[0]);
                if(element.description[0].includes('coronavirus') || element.description[0].includes('covid')) {
                    newsStories.push(element);
                }
            }
        }


        res.render('newsfeed', {
            pageTitle: 'NewsFeed',
            pageID: 'newsfeed',
            rssData: newsStories
        });


    }

    axios.all([
        axios.get('https://www.tribuneindia.com/rss/feed?catId=0'),
        axios.get('https://www.tribuneindia.com/rss/feed?catId=42'),
        axios.get('https://www.tribuneindia.com/rss/feed?catId=57')
    ]).then(responseArr => {
    
        var parseString = require('xml2js').parseString;
    
        var xml_0 = responseArr[0].data;
        var rss_0 = {};
        parseString(xml_0, function (err, result) {
            rss_0 =  result['rss']['channel'][0]['item'];
        });
    

        var xml_42 = responseArr[1].data;
        var rss_42 = {};
        parseString(xml_42, function (err, result) {
            rss_42 =  result['rss']['channel'][0]['item'];
        });
    
        var xml_57 = responseArr[2].data;
        var rss_57 = {};
        parseString(xml_57, function (err, result) {
            rss_57 =  result['rss']['channel'][0]['item'];
        });
    
        rssJSONLocal = Object.values(rss_0).concat(Object.values(rss_42), Object.values(rss_57));

        pageRender(rssJSONLocal);

        return rssJSONLocal;

    }).then((JSONObj) => {

        rssJSON = JSONObj;

    }).catch((err) => {
        
        pageRender();

    });
    
});


module.exports = router;
