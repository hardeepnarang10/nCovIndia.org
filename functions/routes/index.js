const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs');
const path = require('path');


var backChannelArr = [];


router.get('/', function (req, res) {

    let serverCache = req.app.get('dynamicCache');
    let userCache = serverCache/2;
    res.set('Cache-Control', 'public, max-age=' + userCache + ', s-maxage=' + serverCache);


    function fallbackRender(apiData = backChannelArr[0], districtAPIData = backChannelArr[1]) {

        let updatedDate = apiData['statewise'][0].lastupdatedtime.split(' ');
        let dateSplit = updatedDate[0].split('/');
        let timeSplit = updatedDate[1];
        var dateFormat = dateSplit[2] + '/' + dateSplit[1] + '/' + dateSplit[0] + ' ' + timeSplit;
        lastUpdateMinutes = Math.round((Date.now() - Date.parse(dateFormat) + (330*60*1000))/(1000*60));
        
        allStateDataArr = apiData['statewise'].slice(1);
        allStateDataDict = {}
        for(var i=0;i<allStateDataArr.length;i++) {
            allStateDataDict[allStateDataArr[i].state] = allStateDataArr[i];
        }


        res.render('index', {
            pageTitle: 'Home',
            pageID: 'home',
            overviewData: apiData['statewise'][0],
            lastUpdateTime: lastUpdateMinutes,
            allStatesData: apiData['statewise'].slice(1),
            allStateDataDict: allStateDataDict,
            statesData: fs.readFileSync(path.join(__dirname,'..','public','geojson','states.geojson')),
            districtStateData: districtAPIData,
            dailyData: apiData['cases_time_series'].slice(31)
            });


    }

    axios.all([
        axios.get('https://api.covid19india.org/data.json'),
        axios.get('https://api.covid19india.org/state_district_wise.json')
        ]).then((responseArr) => {
            
            fallbackRender(responseArr[0].data, responseArr[1].data);

            return responseArr;

        }).then((validatedResponseArr) => {

            backChannelArr = [validatedResponseArr[0].data, validatedResponseArr[1].data];

        }).catch((err) => {

            fallbackRender();
            
        });
    });


module.exports = router;