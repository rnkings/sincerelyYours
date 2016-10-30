"use strict";

var express = require("express");
var bodyParser = require('body-parser');

//Require postgres client
var pg = require('pg');
//Require our credentials (SHOULD NOT BE IN VERSION CONTROL)
var config = require('./db.json');

//Create a new client pool with our credentials
var pool = new pg.Pool(config);

var app = express();

app.set('view engine', 'pug');
app.use('/', express.static(__dirname + '/public'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/view/sweepstakes/:id', function (req, res) {
  pool.query(
    'SELECT * FROM template where "templateID" = $1', 
    [req.params.id], 
    function (err, result) {
      if (err) {
        throw new Error(err);
      }

      var templateData = result.rows[0];
      res.render('viewSweepstakes', {data: templateData});
    }
  );
});

// app.get('/api/data', function (req, res) {
//   let allTheData = "soooo much data";
//   // get data from some source.... api or db
//   console.log("getting data");
//   res.send(allTheData);
// });

// app.post('/api/data', function (req, res) {
//   let theInfoWePosted = req.body.firstName;
//   res.send(theInfoWePosted);
// });

app.post('/submit/sweepstakes', function (req, res) {
  var params = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    sweepstake: req.body.sweepstake,
    link: req.body.link
  };

  var boundParams = [
    1,
    'sweepstakes',
    JSON.stringify(params)
  ];

  pool.query(
    'INSERT INTO template ("userID", "templateName", "params") VALUES ($1, $2, $3) RETURNING "templateID"', 
    boundParams, 
    function(err, result) {
      if(err) {
        throw new Error(err);
      } else {
        var id = result.rows[0].templateID;
        res.send({
          status: 'success',
          link: '/view/sweepstakes/' + id
        });
      }
    }
  );
});

app.listen(3000, function () {
  console.log('See this website at localhost:3000');
});