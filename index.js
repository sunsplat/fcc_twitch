$(document).ready(function(){
  var usernames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  for(var i = 0; i < usernames.length; i++){
    var user = usernames[i];
  $.getJSON('https://wind-bow.hyperdev.space/twitch-api/streams/'+user+'?callback=?', function(data) {
    var status = data['stream'];
    console.log(data);
    console.log('status: ' + status);
    if (status == null) {
      document.getElementById('status').innerHTML = "offline";
    }
    else{
      var link = status.channel.url;
      document.getElementById('status').innerHTML = "online";
      document.getElementById('link').innerHTML = '<a href = '+link+'>'+user+'</a>';
    }
  });
}
})

//{stream: null, _links: {self: "https://api.twitch.tv/kraken/streams/freecodecamp", channel: "https://api.twitch.tv/kraken/channels/freecodecamp"}}
