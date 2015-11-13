/**
 * Created by aronthomas on 11/12/15.
 */
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var forecast = require('./routes/forecast');


app.set("port", process.env.PORT || 5000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/forecast', forecast);

app.get("/*", function(req,res,next){
    console.log("Here is the asset I needs: " , req.params);
    var file = req.params[0] || "/assets/views/index.html";
    res.sendFile(path.join(__dirname, "./public/", file))
});

app.listen(app.get("port"), function(req,res,next){
    console.log("Listening on port: " + app.get("port"));
});

module.exports = app;