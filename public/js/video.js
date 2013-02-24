// Initialize API key, session, and token...
// Think of a session as a room, and a token as the key to get in to the room
// Sessions and tokens are generated on your server and passed down to the client
var apiKey = "1127";
var sessionId = "2_MX4xMTI3fn5TYXQgRmViIDIzIDExOjExOjI5IFBTVCAyMDEzfjAuMDQ3NzAyNzl-";
var token = "T1==cGFydG5lcl9pZD0xMTI3JnNpZz0zZmE0NmI4Mzg0YzQzMzk1MmVkMDJiOTFlM2UxNmMzZmQxMDM0NTQ4OnNlc3Npb25faWQ9Ml9NWDR4TVRJM2ZuNVRZWFFnUm1WaUlESXpJREV4T2pFeE9qSTVJRkJUVkNBeU1ERXpmakF1TURRM056QXlOemwtJmNyZWF0ZV90aW1lPTEzNjE2NDY2OTAmcm9sZT1wdWJsaXNoZXImbm9uY2U9MTM2MTY0NjY5MC4wMzA4MjQ1MDk0Mzkx";

// Enable console logs for debugging
TB.setLogLevel(TB.NONE);

// Initialize session, set up event listeners, and connect
var session = TB.initSession(sessionId);
session.addEventListener('sessionConnected', sessionConnectedHandler);
session.addEventListener('streamCreated', streamCreatedHandler);
session.connect(apiKey, token);

function sessionConnectedHandler(event) {
  var publisher = TB.initPublisher(apiKey);
  session.publish(publisher);

  // Subscribe to streams that were in the session when we connected
  subscribeToStreams(event.streams);

  removePublisher();
}

function removePublisher() {
  // hide my mirror
  $('.OT_publisher').hide();
}

function streamCreatedHandler(event) {
  // Subscribe to any new streams that are created
  subscribeToStreams(event.streams);
}

function subscribeToStreams(streams) {
  for (var i = 0; i < streams.length; i++) {
    // Make sure we don't subscribe to ourself
    if (streams[i].connection.connectionId == session.connection.connectionId) {
      return;
    }

    // Create the div to put the subscriber element in to
    var div = document.createElement('div');
    div.setAttribute('id', 'stream' + streams[i].streamId);
    // document.body.appendChild(div);

    $('.portal').append(div);

    var windowWidth = $(window).width(),
        windowHeight = $(window).height();

    // Subscribe to the stream
    session.subscribe(streams[i], div.id, {
      width: windowWidth,
      height: windowHeight,
      subscribeToAudio: false
    });
  }
}
