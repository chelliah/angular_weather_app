/**
 * Created by aronthomas on 11/12/15.
 */
var express = require('express');
var Weather = require('forecast');
var router = express.Router();
var geoLocate = require('google-geocoding');

var weather = new Weather({
    service: 'forecast.io',
    key: '041ff102905bdefb0ef47e79379741fa',
    units: 'celcius',
    cache: true,
    ttl: { // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/
        minutes: 27,
        seconds: 45
    }
});

router.get('/data', function(req,res){
    //var locationInfo = [req.query.lat, req.query.long];

    geoLocate.geocode(req.query.place, function(err,location){
        if (err){
            console.log(err)
        }else if(!location){
            console.log('no entries');
            res.send(false);
        }else{
            //console.log(location);
            var coordinates=[];
            coordinates.push(location.lat);
            coordinates.push(location.lng);
            sendWeather(coordinates)

        }
    });

    function sendWeather(latLong){
        weather.get(latLong, function(err,weather){
            if(err){
                console.log(err);
                res.send(false);
            }
            res.send(weather);
        });
    }
});




module.exports = router;