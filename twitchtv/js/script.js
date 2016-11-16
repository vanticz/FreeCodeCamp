var chanels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var url = 'https://api.twitch.tv/kraken/';

function generateURL(type, channelName) {
  return url + type + '/' + channelName;
}

function getStreams() {
  var cb = "?client_id=qpt1opj8zjvmhb08hxf9or21xosuwds&callback=?";
  
  chanels.forEach(function(channel) {
    
    $.getJSON(generateURL("streams", channel)+cb, function(data) {
      var game, status;
      if (data.stream === null) {
        game = "Offline";
        status = "offline";
      } else if (data.stream === undefined) {
        game = "Account closed or doesn't exist";
        status = "offline";
      } else {
        game = data.stream.game;
        status = "online";
      }
      
      $.getJSON(generateURL("channels", channel)+cb, function(data) {
        var logo = data.logo ? data.logo : "https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_70x70.png",
            name = data.display_name ? data.display_name : channel,
            description = status === "online" ? data.status : "";
        html = '<div class="row ' + status + '"><a href="' + data.url + '" target="_blank">\
                  <div class="col-xs-2">\
                    <img src="' + logo + '" class="logo">\
                  </div>\
                  <div class="channel_detail col-xs-10">\
                    <div class="channel_name">'
                      + name +
                    '</div>\
                    <div class="game_detail">' +
                      '<span class="game_name ' + status + '_text">' + game + '</span>\
                      <span class="game_description ' + status + '_text">' + description + '</span>\
                    </div>\
                  </div></a>\
                </div>';
        status === "online" ? $("#streams").prepend(html) : $("#streams").append(html);
//        console.log(data);
      });
    });

  }); // end of forEach
}



$(document).ready(function() {
  getStreams();

  $(".selector").click(function() {
    if (!$(this).hasClass("active")) {
      $(".selector").removeClass("active");
      $(this).addClass("active");
    }
    var selected = $(this).attr("id");
    switch(selected) {
      case "all_tab":
        $(".online, .offline").removeClass("hidden");
        break;
      case "online_tab":
        $(".online").removeClass("hidden");
        $(".offline").addClass("hidden");
        break;
      case "offline_tab":
        $(".offline").removeClass("hidden");
        $(".online").addClass("hidden");
        break;
    }
  });
  
});


