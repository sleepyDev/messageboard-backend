var express = require('express')
var parser = require('body-parser')
var app = express()
var config = require('./knexfile.js').development
var knex = require('knex')(config)

var sse;
var updates = false;
// use these middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
app.use(parser.urlencoded({extended:false}))
app.use(parser.json())

app.get('/topics', function(req, res) {
    knex.select().from('topics').then(function(values) {
        res.json(values)
        updates = true;
    });
});
app.post('/topics', function(req, res) {
    if (req.body.hasOwnProperty('topic') && req.body.hasOwnProperty('desc')) {
        knex('topics').insert({name: req.body.topic, desc: req.body.desc})
        .then(function() {
            res.json({inserted: true})
        })
    } else {
        res.json({error: "Missing properties"})
    }
})
app.delete('/topics', function(req, res) {
    knex('topics').del().then(function() {
        res.json({response: "success"})
    })
})
var server = app.listen(4399, function(){
});
