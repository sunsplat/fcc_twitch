$(document).ready(function(){
  var usernames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "noobs2ninjas", "RobotCaleb"];
  for(var i = 0; i < usernames.length; i++){
    var user = usernames[i];

    $.getJSON('https://wind-bow.hyperdev.space/twitch-api/streams/'+usernames[i]+'?callback=?', function(data) {
      var status = data['stream'];
      var channel =  data['_links']['channel'];
      var channelSplit = channel.split('/');
      var channelName = channelSplit[5];
      console.log(data);
      console.log('status: ' + status);
      console.log('user: ' + user);
      console.log(channelSplit);
      console.log(channelName);
      if (status == null) {
        //document.getElementById('status').innerHTML = "offline";
        $('#link').prepend('<div><p>Offline</p></div>');
      }
      else{
        var link = status.channel.url;
        var name = status.channel.display_name;
        //document.getElementById('status').innerHTML = "online";
        $('#link').prepend('<div><p>Online</p><a href = '+link+'>'+name+'</a></div>');
      }
    });
  }
})

 /*{stream: null,
  _links:
    {self: "https://api.twitch.tv/kraken/streams/freecodecamp", channel: "https://api.twitch.tv/kraken/channels/freecodecamp"}}*/
