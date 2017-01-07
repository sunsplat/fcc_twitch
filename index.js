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
          var data = request.response;
          success(data);
          var status = data.stream;
          var link = data._links.channel;
          //success(status);
          var makeChild = document.createElement('div');
          if (status == null) {
            makeChild.innerHTML = '<div class="offline">'+link+'</div>';
          } else {
            makeChild.innerHTML = '<div class="online">'+link+'</div>';
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
}

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
  var allArray = document.getElementsByClassName("users");
  for (var i = 0; i < allArray.length; i++) {
    allArray[i].style.display = 'block';
  }
}
