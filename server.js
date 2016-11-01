"use strict";

var express = require("express");
var bodyParser = require('body-parser');
//Require postgres client
var pgp = require("pg-promise")();
console.log('connecting to DB.');
// var db = pgp("postgres://rose:secret@localhost:5432/database");
var db = pgp(require("./db.json"));
var app = express();

// app.set('view engine', 'pug');
app.use('/', express.static(__dirname + '/public'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
// app.get("/api/sweepstakesForm", function(req, res){
//   // user formID = req.body.id;

//   //Our implementation of the promise call
//   //Notice we returned from the function - we can use
//   //that return value here to continue chaining
//   getForm(formID).then(function (data) {
//       //This happens second. This THEN happens after our
//       //first THEN, specified in getForm.
//       //In here, we're going to send the response back.
//       console.log('second THEN!');
//       res.send(data);
//   });
// });

// function getForm(id){
//   //Promises work similarly to callbacks
//   //When code is run that is asynchronous (i.e. a database call), promises "wait"
//   //for the event to finish, before triggering either "then" (on success),
//   //or "catch" (on error).
//   //In a lot of ways, promises work similarly to callbacks,
//   //just with different syntax.

//   //db.one returns a promise, which gives us the ability to say,
//   //"when this is done, THEN do this"
//   //So we will return that promise from our function too.
//   return db.one("SELECT from template where 'templateID'= $1", [req.prams.id])
//       .then(function (data) {
//           //We did our first then. This gets called first.
//           //We can return from here to keep that chain going!
//           console.log('DATA', data);
//           console.log('first THEN!')
//           return data;
//       });
//     .catch(function (error) {
//         console.log("ERROR:", error);
//     });
// }
 


//       var templateData = result.rows[0];
//       res.render('viewSweepstakes', {data: templateData});
//     }
//   );
// });

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

//back end

app.get('/view', function (req, res) {
  var id = req.query.id;
//select the template with the id that matches this id
  db.one('SELECT * FROM "template" WHERE "templateID" = $1', [id])
  //this is our promise the happens when there is a success which sends a result back to front end
    .then(function (result) {
      res.send(result);
      //this is what happens if there is an error
    }).catch(function (error) {
      res.status(500).send('Error selecting from DB: ' + id);
    });
});

//when app.post runs it is listening for submit sweepstakes request (it's going to grab)
// it's grabbing firstname lastname and sweepstake and link params
//it binds it to an array of bound params. one is userId, template name and the params get passed in (json encoded) and get added to the array
//retrieve params from front end aka first name from form
app.post('/submit/sweepstakes', function (req, res) {
  var params = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    sweepstake: req.body.sweepstake,
    link: req.body.link
  };

  var boundParams = {
    userId: 1,
    templateName: 'sweepstakes',
    //turns params into JSON encoded JavaScript Object Notation
    //keys and values to send data back and forth
    //turns into a string that can be parsed out into javascript
    //as keys and values
    params: JSON.stringify(params)
  };
//database query, takes in two arguments which are a query and boundParams which is the object which is mapped to the query (maps the object and passes it into the query (aka lining up parameters))
  console.log('making query');
  db.query(
    //return template ID so we know what it auto incremented to so we can use it
    'INSERT INTO template ("userID", "templateName", "params") VALUES (${userId}, ${templateName}, ${params}) RETURNING "templateID"', 
    //boundParams in an object on lin 102
    boundParams
    //then runs promise and once query is done then we get our data
    //then will run if success happens
  ).then(function (data) {
      console.log(data);
      //grab newly inserted id
      var id = data[0].templateID;
      //and we send it back to the front end as part of an object
      res.send({
        //the status and id are part of that object
        status: 'success',
        id: id
      });
      //if something goes wrong we will take care of it once here.
      //This is the inserting which is the post
  }).catch(function (error) {
    console.log(error);
    res.status(500).send("Error with the database insert. " + JSON.stringify(error));
  });
});

app.listen(3000, function () {
  console.log('See this website at localhost:3000');
});

//EXAMPLE PROMISE CODE
// var promise = new Promise(function (resolve, reject) {
//   return resolve(true);
// });

// promise.then(function (result) {
//   console.log("THEN CHAIN");
//   console.log(result);
//   return result;
// }).then(function (result2) {
//   console.log(result2);
//   return false;
// }).then(function (result3) {
//   console.log(result3);
//   if (!result3) {
//     throw new Error('result3 was false');
//   }
// }).catch(function (error) {
//   console.error("ERROR!!!!");
//   console.log(error);
// });