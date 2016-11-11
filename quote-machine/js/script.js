var quoteContent = "";
var quoteSource = "";
var colors = ["#006600", "#006633", "#006666", "#006699", "#0066cc", "#663333", "#663366", "#993333", "#993366", "#cc3333", "#cc3366", "#ff3333", "#ff3366", "#ff6666"];
var randomIndex = Math.floor(Math.random() * colors.length);
var new_color = colors[randomIndex];

function changeColor() {
  randomIndex = Math.floor(Math.random() * colors.length);
  new_color = colors[randomIndex];
  
  $("body").css("backgroundColor", new_color);
  $(".quote").css("color", new_color);
  $("#tweet").css("backgroundColor", new_color);
  $("#new_quote").css("backgroundColor", new_color);
}

function getQuote() {
  $.ajax( {
    url: "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
    success: function(data) {
      var post = data.shift(); // The data is an array of posts. Grab the first one.
      quoteContent = post.content.replace(/<\/?[^>]+>/gi, "");
      quoteSource = "- " + post.title.replace(/<\/?[^>]+>/gi, "")
      $("#quote-content").html(quoteContent);
      $("#quote-source").html(quoteSource);
      $("#tweet").attr("href", "https://twitter.com/intent/tweet?text=" + encodeURIComponent('"' + quoteContent + '" ' + quoteSource));
    },
    cache: false
  });
  changeColor();
}

changeColor();
$(document).ready(function() {
  getQuote();
  $("#new_quote").on("click", getQuote);
});//ready end