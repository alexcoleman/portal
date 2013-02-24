// Initialize API key, session, and token...
// Think of a session as a room, and a token as the key to get in to the room
// Sessions and tokens are generated on your server and passed down to the client
var apiKey = "1127";
var sessionId = "1_MX4xMTI3fn5TYXQgRmViIDIzIDIyOjIzOjU2IFBTVCAyMDEzfjAuNDk1NDI4OH4";
var token = "T1==cGFydG5lcl9pZD0xMTI3JnNpZz1hZGIzYzZkZGYyNjdkOGU5Y2Y5NzA5MDU1YWY5Y2QzY2Q4ZWEwNDg3OnNlc3Npb25faWQ9MV9NWDR4TVRJM2ZuNVRZWFFnUm1WaUlESXpJREl5T2pJek9qVTJJRkJUVkNBeU1ERXpmakF1TkRrMU5ESTRPSDQmY3JlYXRlX3RpbWU9MTM2MTY4NzQ2OSZyb2xlPXB1Ymxpc2hlciZub25jZT0xMzYxNjg3NDY5LjY3OTY4MTUyMjM1NTY=";

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
