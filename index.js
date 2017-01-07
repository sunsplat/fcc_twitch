function displayOnlineUsers() {
  var onlineArray = document.getElementsByClassName("online");
  var offlineArray = document.getElementsByClassName("offline");
  for (var i = 0; i < onlineArray.length; i++) {
    onlineArray[i].style.display = 'block';
  }
  for (var i = 0; i < offlineArray.length; i++) {
    offlineArray[i].style.display = 'none';
  }
}

function displayOfflineUsers() {
  var onlineArray = document.getElementsByClassName("online");
  var offlineArray = document.getElementsByClassName("offline");
  for (var i = 0; i < onlineArray.length; i++) {
    onlineArray[i].style.display = 'none';
  }
  for (var i = 0; i < offlineArray.length; i++) {
    offlineArray[i].style.display = 'block';
  }
}

function displayAllUsers() {
  var allArray = document.getElementsByClassName("all");
  for (var i = 0; i < allArray.length; i++) {
    allArray[i].style.display = 'block';
  }
}


function changeBgImageOfCard(channelName, logoUrl) {
  document.getElementById(channelName).style.backgroundImage = logoUrl;
}

window.onload = function() {
  var channels = ["ESL_DOTA2", "cretetion", "freecodecamp", "gamenewton", "scarra", "Doublelift", "adobe", "seebotschat"];
  var divItem = document.getElementById("status");

  function makeHttpObject() {
    try {return new XMLHttpRequest();}
    catch (error) {}
    try {return new ActiveXObject("Msxml2.XMLHTTP");}
    catch (error) {}
    try {return new ActiveXObject("Microsoft.XMLHTTP");}
    catch (error) {}

    throw new Error("Could not create HTTP request object.");
  }

  function simpleHttpRequest(url, success, failure) {
    var request = makeHttpObject();
    request.open("GET", url, true);
    request.responseType = "json";
    request.send(null);
    request.onreadystatechange = function() {
      if (request.readyState == 4) {
        if (request.status == 200) {
          //handleRequest(request);
          var data = request.response;
          success(data);
          var status = data.stream;
          var apiLink = data._links.channel;
          var makeChild = document.createElement('div');
          var splitLink = apiLink.split('/');
          var channelName = splitLink[5];
          var link = "https://www.twitch.tv/"+channelName;
          if (status === null) {
            success(channelName);
            makeChild.innerHTML = '<div class="offline all"><div  class="demo-card-square mdl-card mdl-shadow--2dp"><div class="mdl-card__title mdl-card--expand"><h2 class="mdl-card__title-text">'+channelName+'</h2></div><div class="mdl-card__supporting-text">This channel is currently not streaming.</div><div class="mdl-card__actions mdl-card--border"><a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"  href="'+link+'" target="_blank">'+channelName+'</a></div></div>';
          } else {
            var logo = data.stream.channel.logo;
            var channelStatus = data.stream.channel.status;
            makeChild.innerHTML = '<div class="online all"><div  class="demo-card-square mdl-card mdl-shadow--2dp"><div class="mdl-card__title mdl-card--expand" id="'+channelName+'"><h2 class="mdl-card__title-text">'+channelName+'</h2></div><div class="mdl-card__supporting-text">'+channelStatus+'</div><div class="mdl-card__actions mdl-card--border"><a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"  href="'+link+'" target="_blank">'+channelName+'</a></div></div>';
            //changeBgImageOfCard(channelName, logo);
          }
          divItem.appendChild(makeChild);

        } else if (failure)
          failure(request.status, request.statusText);
      }
    };
  }

  for (var i = 0; i < channels.length; i++) {
    simpleHttpRequest("https://wind-bow.gomix.me/twitch-api/streams/"+channels[i], console.log);
  }

  function handleRequest(request) {
    var data = request.response;
    //success(data);
    var status = data.stream;
    var link = "https://www.twitch.tv/";
    var makeChild = document.createElement('div');
    if (status == null) {
      var splitLink = link.split('/');
      var channelName = splitLink[5];
      console.log('channelname'+channelName);
      link = link + channelName;
      makeChild.innerHTML = '<div class="offline"><a href="'+link+'">'+channelName+'</a></div>';
    } else {
      link = data.stream.channel.url;
      makeChild.innerHTML = '<div class="online"><a href=""'+link+'">'+channelName+'</a></div>';
    }
    divItem.appendChild(makeChild);
  }
}
