$(document).ready(function(){
  var usernames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "noobs2ninjas", "RobotCaleb"];
  for(var i = 0; i < usernames.length; i++){
    var user = usernames[i];

    $.getJSON('https://wind-bow.hyperdev.space/twitch-api/streams/'+usernames[i]+'?callback=?', function(data) {
      var status = data['stream'];

      console.log(data);
      console.log('status: ' + status);
      console.log('user: ' + user);
      if (status == null) {
        //document.getElementById('status').innerHTML = "offline";
        $('#link').prepend('<div><p>Offline</p></div>');
      }
      else{
        var link = status.channel.url;
        //document.getElementById('status').innerHTML = "online";
        $('#link').prepend('<div><p>Online</p><a href = '+link+'>'+user+'</a></div>');
      }
    });
  }
})

//{stream: null, _links: {self: "https://api.twitch.tv/kraken/streams/freecodecamp", channel: "https://api.twitch.tv/kraken/channels/freecodecamp"}}
