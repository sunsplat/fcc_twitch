$(document).ready(function(){
  var usernames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "noobs2ninjas", "RobotCaleb", "brunofin", "comster404"];
  for (var i = 0; i < usernames.length; i++) {
     var user = usernames[i];
     $.getJSON('https://wind-bow.gomix.me/twitch-api/streams/'+usernames[i]+'?callback=?', function(data) {
      if(data['error']){
        var message = data['message'];
        $('#link').prepend('<div><p>'+message+'</p></div>');
      }
      else{
        var status = data['stream'];
        var channel =  data['_links']['channel'];
        var channelSplit = channel.split('/');
        var channelName = channelSplit[5];
        console.log(data);
        console.log('status: ' + status);
        console.log('user: ' + user);
        if (status == null) {
          $('#link').prepend('<div><p>Offline</p>'+channelName+'</div><hr />');
        }
        else{
          var link = status.channel.url;
          var name = status.channel.display_name;
          var game = status.game;
          var viewers = status.viewers;

          $('#link').prepend('<div><p>Online<br /><a href="'+link+'" target="_blank">'+name+'</a><br />What\'s streaming: '+game+'<br /> Number of viewers: '+viewers+'</p></div>');
        }
      }
    }).fail(function() {
      $('#link').prepend('<div><p>Account doesn\'t exist');
     });
  }
})

 /*{stream: null,
  _links:
    {self: "https://api.twitch.tv/kraken/streams/freecodecamp", channel: "https://api.twitch.tv/kraken/channels/freecodecamp"}}*/
