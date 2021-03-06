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
  var channels = ["ESL_DOTA2", "cretetion", "freecodecamp", "gamenewton", "scarra", "Doublelift", "adobe", "seebotschat", "comster404"];
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
          var data = request.response;
          var makeChild = document.createElement('div');
          var splitLink = url.split('/');
          var channelName = splitLink[5];
          var link = "https://www.twitch.tv/"+channelName;
          if (data.error) {
            makeChild.innerHTML = '<li class="offline all mdl-list__item mdl-list__item--three-line"><span  class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-avatar">person</i><span>'+channelName+'</span><span class="mdl-list__item-text-body">This channel has been deleted.</span></span><span class="mdl-list__item-secondary-content"><i class="material-icons  md-inactive">portable_wifi_off</i></span></li>';
          } else {
            var status = data.stream;
            var apiLink = data._links.channel;
            if (status === null) {
              success(channelName);
              makeChild.innerHTML = '<li class="offline all mdl-list__item mdl-list__item--three-line"><span  class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-avatar">person</i><span><a href="'+link+'" target="_blank">'+channelName+'</a></span><span class="mdl-list__item-text-body">This channel is currently not streaming.</span></span><span class="mdl-list__item-secondary-content"><i class="material-icons md-inactive">portable_wifi_off</i></span></li>';
            } else {
              var logo = data.stream.channel.logo;
              var channelStatus = data.stream.channel.status;
              makeChild.innerHTML = '<li class="online all mdl-list__item mdl-list__item--three-line"><span  class="mdl-list__item-primary-content"><img src="'+logo+'" class="material-icons mdl-list__item-avatar"><span><a href="'+link+'" target="_blank">'+channelName+'</a></span><span class="mdl-list__item-text-body">'+channelStatus+'</span></span><span class="mdl-list__item-secondary-content"><i class="material-icons md-active">wifi_tethering</i></span></li>';
            }
          }
          divItem.appendChild(makeChild);

        } else if (failure) {
          failure(request.status, request.statusText);
        }
      }
    };
  }

  for (var i = 0; i < channels.length; i++) {
    simpleHttpRequest("https://wind-bow.gomix.me/twitch-api/streams/"+channels[i], console.log, console.log);
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
