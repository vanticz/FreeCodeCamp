var APIKEY = "897dd8614e7bf19face5783f9b3c52a0";
var temp = "", weather = "", city = "", country = "", tempFormat="F";

function getWeather(city) {
  $.ajax( {
    url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=" + APIKEY,
    success: function(data) {
      temp = data.main.temp;
      weather = data.weather[0].main;
      city = data.name;
      country = data.sys.country;
      $("#temp").html(temp);
      $("#weather").html(weather);
      $("#city").html(city);
      $("#country").html(country);
//      console.log("temp: " + temp + "\n" + "weather: " + weather + "\n" + "city: " + city  + "\n" + "country: " + country + "\n");
    },
    cache: false
  });  
}


$(document).ready(function() {

  $.get('http://ip-api.com/json', function (loc) {
    getWeather(loc.city);
    $("#toggleFormat").on("click", function() {
      if (tempFormat == "F") {
        var new_temp = Math.floor(($("#temp").text() - 32) / 1.8);
        $("#temp").html(new_temp);
        tempFormat = "C";
        $("#toggleFormat").html(tempFormat);
      } else if (tempFormat == "C") {
        var new_temp = Math.floor($("#temp").text() * 1.8 + 32);
        $("#temp").html(new_temp);
        tempFormat = "F";
        $("#toggleFormat").html(tempFormat);
      }
    });
  });
});//ready end