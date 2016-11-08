var temp, link, t;
$("#submit").click(function() {
   
  temp = document.getElementById("bar").value;
  
  link = 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=' + temp + '&callback=?';
  $(".results").fadeOut(250, function() {
    $(".results").empty();
  });

  $.getJSON(link, function(json) {
    
    $(".center").animate({
      top: '20px'
    }, function() {

      $.each(json.query.search, function(i, item) {

        $(".results").append('<a href = "https://en.wikipedia.org/wiki/' + item.title + '" target="_blank"><div class = "result"><h4><b>' + item.title + '</b></h4><br>' + item.snippet + '...</div><a>').fadeIn(250);
      });
    });
  });

})

$("#random").click(function() {
  window.open('https://en.wikipedia.org/wiki/Special:Random', '_blank');
})