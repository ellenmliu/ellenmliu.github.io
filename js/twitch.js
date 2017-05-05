var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];
var link;
var status = "all";
$(document).ready(function() {

  for (var index = 0; index < users.length; index++) {
    (function(index) {
      link = 'https://wind-bow.gomix.me/twitch-api/streams/' + users[index] + '?callback=?';

      $.ajax({
        url: link,
        type: 'GET',
        dataType: 'json',
        cache: false,
        async: false,
        success: function(data) {
          users[index] = {
            "user": users[index],
            "stream": data.stream,
            "link": 'https://www.twitch.tv/' + users[index],
            "status": (data.stream === null) ? "offline" : "online"
          }
          insert(index);
        },
        error: function() {
          users[index] = {
            "user": users[index],
            "stream": null,
            "link": 'https://s.codepen.io/FreeCodeCamp/fullpage/undefined',
            "status": "account closed"
          }
          insert(index);
        }
      })
    })(index)
  }

  buttonClicked();
})

var buttonClicked = function() {

  //online
  $("#button1").click(function() {
    $("#button1").css("box-shadow", "none");
    $("#button2").css("box-shadow", "5px 5px 2.5px #888888");
    $("#button3").css("box-shadow", "5px 5px 2.5px #888888");
    $(".streams").empty();
    for (var i = 0; i < users.length; i++) {
      if (users[i].stream != null) {
        insert(i);
      }
    }
  })

  //offline
  $("#button2").click(function() {
    $("#button1").css("box-shadow", "5px 5px 2.5px #888888");
    $("#button2").css("box-shadow", "none");
    $("#button3").css("box-shadow", "5px 5px 2.5px #888888");
    $(".streams").empty();
    for (var i = 0; i < users.length; i++) {
      if (users[i].stream === null) {
        insert(i);
      }
    }
  })

  //all
  $("#button3").click(function() {
    $("#button1").css("box-shadow", "5px 5px 2.5px #888888");
    $("#button2").css("box-shadow", "5px 5px 2.5px #888888");
    $("#button3").css("box-shadow", "none");
    $(".streams").empty();
    for (var i = 0; i < users.length; i++) {
      insert(i);
    }
  })
}

var insert = function(index) {

  $(".streams").append('<a target = "_blank" href = "' + users[index].link + '"><div class = "stream" id ="stream' + index + '">' + users[index].user + '</div></a>');
  if (users[index].status === "online") {
    $("#stream" + index).css("background-color", "#00e6ac");
    $("#stream" + index).append('<div class = "info">' + users[index].stream.channel.game + ": " + users[index].stream.channel.status.substring(0, 20) + '...</div>');
    $("#stream" + index).append('<img src = "' + users[index].stream.channel.logo + '"/>');
  } else if (users[index].status === "offline") {
    $("#stream" + index).append('<div class = "info">' + users[index].status + '</div>');
    $("#stream" + index).css("background-color", "#ff6666");
    $("#stream" + index).css("padding-top", "45px");
  } else {
    $("#stream" + index).append('<div class = "info">' + users[index].status + '</div>')
    $("#stream" + index).css("padding-top", "45px");
  }
}
