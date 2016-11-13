var APIKEY = "897dd8614e7bf19face5783f9b3c52a0";
var temp = "", weather = "", city = "", country = "", tempFormat="F";

function getWeather(city) {
  $.ajax( {
    url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=" + APIKEY,
    success: function(data) {
      weather = data.weather[0].main;
      $("#temp").html(Math.round(data.main.temp));
      $("#weather").html(weather);
      $("#city").html(data.name);
      $("#country").html(data.sys.country);
      switch (weather) {
        case "clear":
          $("#weatherIcon").attr("class", "wi wi-day-sunny");
          break;
        case "rain":
          $("#weatherIcon").attr("class", "wi wi-rain");
          break;
        case "snow":
          $("#weatherIcon").attr("class", "wi wi-snow");
          break;
        case "sleet":
          $("#weatherIcon").attr("class", "wi wi-sleet");
          break;
        case "wind":
          $("#weatherIcon").attr("class", "wi wi-windy");
          break;
        case "fog":
          $("#weatherIcon").attr("class", "wi wi-fog");
          break;
        case "cloud":
          $("#weatherIcon").attr("class", "wi wi-cloud");
          break;
        case "hail":
          $("#weatherIcon").attr("class", "wi wi-hail");
          break;
        case "thunderstorm":
          $("#weatherIcon").attr("class", "wi wi-thunderstorm");
          break;
        case "tornado":
          $("#weatherIcon").attr("class", "wi wi-tornado");
          break;
      }
    },
    cache: false
  });  
}


$(document).ready(function() {

  $.get('http://ip-api.com/json', function (loc) {
    getWeather(loc.city);
    $("#toggleFormat").click(function() {
      if (tempFormat == "F") {
        var new_temp = Math.round(($("#temp").text() - 32) / 1.8);
        $("#temp").html(new_temp);
        tempFormat = "C";
        $("#toggleFormat").html(tempFormat);
      } else if (tempFormat == "C") {
        var new_temp = Math.round($("#temp").text() * 1.8 + 32);
        $("#temp").html(new_temp);
        tempFormat = "F";
        $("#toggleFormat").html(tempFormat);
      }
    });
  });
});//ready end
