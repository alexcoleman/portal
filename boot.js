APP_ROOT = __dirname;

var express = require('express'),
    hoganEngine = require('hogan-engine'),
    OpenTok = require('opentok');

var app = express();

EXPRESS_APP = app;

// configure the application
hoganEngine.root = __dirname + '/templates';
hoganEngine.cache = app.get('view cache');

app.engine('html', hoganEngine);
app.set('views', __dirname + '/templates');
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public', {}));
app.use(express.bodyParser());


require('./views/index.js');

// routes
require('./routes');

app.listen(3000);
console.log('Web server listening on port: 3000');