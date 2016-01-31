require('dotenv').config();
var express = require("express");
var nunjucks = require("nunjucks");
var http = require('https');
var util = require('util');
var app = express();

var queryTerms = [];

nunjucks.configure('templates', {
    autoescape: true,
    express: app
});

app.get('/', function(req, res) {
  res.render('index.html', {app_url: process.env.APP_URL});
});

var urlTemplate = 'https://www.googleapis.com/customsearch/v1?searchType=image&key=AIzaSyDuGfoO5e4IjFH_YZ3orljuvh7vSuJ0CXk&cx=005649931137423518614:jm7kxu1ddvo&q=%s&start=%d';

app.get('/api/imagesearch/:term', function(req, res) {
    var term = req.params.term;
    var history = {
        "term": term,
        "when": Date().toString()
    };
    queryTerms.unshift(history);

    var url = util.format(urlTemplate, term, req.query.offset || 1);
    http.get(url, function(http_res){
        var body = '';

        http_res.on('data', function(chunk){
            body += chunk;
        });

        http_res.on('end', function(){
            var googleResponse = JSON.parse(body);
            res.json(googleResponse.items.map(function(item) {
                return {
                    url: item.link,
                    snippet: item.snippet,
                    thumbnail: item.image.thumbnailLink,
                    context: item.image.contextLink
                };
            }));
        });
    }).on('error', function(e){
          console.log("Got an error: ", e);
    });
});

app.get('/api/latest/imagesearch', function(req, res) {
    res.json(queryTerms.slice(0, 10));
});

app.listen(process.env.PORT, function(){
  console.log('Server start, listen on ' + process.env
  .IP + ':' + process.env.PORT);
});


