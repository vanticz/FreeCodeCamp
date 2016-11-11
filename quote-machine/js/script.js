// Load random quote at start
$.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function(a) {
  $('#quote-title').html("- " + a[0].title.replace(/<\/?[^>]+>/gi, ''));
  $('#quote-content').html(a[0].content.replace(/<\/?[^>]+>/gi, ''));
});

$(document).ready(function() {
  $("#new_quote").on('click', function(e) {
    e.preventDefault();
    $.ajax( {
      url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      success: function(data) {
        var post = data.shift(); // The data is an array of posts. Grab the first one.
        $('#quote-title').html("- " + post.title);
        $('#quote-content').html(post.content.replace(/<\/?[^>]+>/gi, ''));
      },
      cache: false
    });//ajax end
  });//onclick end
});//ready end