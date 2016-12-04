$(document).ready(function(){

  $.getJSON('https://wind-bow.hyperdev.space/twitch-api/streams/freecodecamp?callback=?', function(data) {
    var status = data['stream'];
    var link = status.channel.url;
    console.log(data);
    console.log('status: ' + status);
    if (status == null) {
      document.getElementById('status').innerHTML = "offline";
    }
    else{
      document.getElementById('status').innerHTML = "online";
      document.getElementById('link').innerHTML = "<a href></a>";
    }
  });
})

//{stream: null, _links: {self: "https://api.twitch.tv/kraken/streams/freecodecamp", channel: "https://api.twitch.tv/kraken/channels/freecodecamp"}}
