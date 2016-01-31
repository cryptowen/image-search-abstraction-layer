require('dotenv').config();
var express = require("express");
var http = require('http');
var app = express();

// https://www.googleapis.com/customsearch/v1?searchType=image&key=AIzaSyDuGfoO5e4IjFH_YZ3orljuvh7vSuJ0CXk&cx=005649931137423518614:jm7kxu1ddvo&q=google

var url = 'http://graph.facebook.com/517267866/?fields=picture';

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.listen(process.env.PORT, function(){
  console.log('Server start, listen on ' + process.env
  .IP + ':' + process.env.PORT);
});

// http.get(url, function(res){
//     var body = '';

//     res.on('data', function(chunk){
//         body += chunk;
//     });

//     res.on('end', function(){
//         var fbResponse = JSON.parse(body);
//         console.log("Got a response: ", fbResponse.picture);
//     });
// }).on('error', function(e){
//       console.log("Got an error: ", e);
// });
