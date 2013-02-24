var express = require('express'),
    app = EXPRESS_APP,
    hoganEngine = require('hogan-engine');

// Twilio Route

var message = "";

app.post('/twilio', function (req, res, next) {

  console.log(req.body.Body);
  message = req.body.Body;

});

app.get('/lastmessage', function (req, res, next) {
  var context = {
    page: {
      message: message
    }
  };

  res.json(context);
});