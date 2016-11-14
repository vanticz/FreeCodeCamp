var searchWord = "";

function clearUl(selector, time) {
  $(selector+">li").fadeOut(time);
  $(selector).html("");
}

function getWiki(word) {
  $.ajax({
    url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + word,
    dataType: 'jsonp',
    success: function (data) {
      for (var id in data.query.pages) {
        var title = data.query.pages[id].title;
        var extract = data.query.pages[id].extract;
        var openUrl = "http://en.wikipedia.org/wiki/index.html?curid=" + id;
        var appendText = "<li><a href='" + openUrl + "' target='_blank'><h3>" + title + "</h3><p>" + extract + "</p></a></li>";
        $("#wiki-pages").append(appendText).hide().fadeIn(100);
      }
    }
  });
}

$(document).ready(function() {
  $("#input-area").keyup(function() {
    searchWord = $(this).val();
    clearUl("#wiki-pages", 100);
    if (searchWord !== "") {
      getWiki(searchWord);
    }
  });
});


