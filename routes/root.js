var express = require('express'),
    app = EXPRESS_APP,
    hoganEngine = require('hogan-engine');

// Route
app.get('/', function (req, res, next) {
  var context = {
    page: {
      title: ""
    }
  };

  res.render('index', context);
});