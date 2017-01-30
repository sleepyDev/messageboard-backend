var express = require('express')
var app = express()
var SSE = require('sse')
var config = require('./knexfile.js').development
var knex = require('knex')(config)

var sse;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/topics', function(req, res) {
    knex.select().from('topics').then(function(values) {
        res.json(values)
        sse.emit('topics')
    });
});

var server = app.listen(4399, function(){
    sse = new SSE(server)

    // Server-sent events
    sse.on('connection', function(client) {
        client.send('You have connected to the Messageboard app server!')
    })
});
