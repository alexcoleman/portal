var express = require('express'),
    hoganEngine = require('hogan-engine'),
    OpenTok = require('opentok');

// opentok stuff
var key = '1127';    // Replace with your API key
var secret = '2_MX4xMTI3fn5TYXQgRmViIDIzIDExOjExOjI5IFBTVCAyMDEzfjAuMDQ3NzAyNzl-';  // Replace with your API secret  
var opentok = new OpenTok.OpenTokSDK(key, secret);

var location = '127.0.0.1'; // use an IP of 'localhost'
var sessionId = '';

opentok.createSession(location, {'p2p.preference':'enabled'}, function(result){
  sessionId = result;
});
// end opentok stuff