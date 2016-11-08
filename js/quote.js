$(document).ready(function() {
  $("#another").click(function() {
    $.ajax({
      url: 'https://andruxnet-random-famous-quotes.p.mashape.com/',
      type: 'POST',
      data: {},
      dataType: 'json',
      success: function(data) {
        var hue = Math.floor(Math.random() * 360);
        var pastel = 'hsl(' + hue + ', 100%, 87.5%)';

        $('body').css('background-color', pastel);
        $('i').css('color', pastel);
        $('i').css('border-color', pastel);
        $('.test').css('color', pastel);
        $('#another').css('background-color', pastel);

document.getElementById("another").innerHTML = 'Another quote';
        document.getElementById("quote").innerHTML = '"' + data.quote + '"';
        document.getElementById("author").innerHTML = data.author;
        var temp1 = 'http://twitter.com/home/?status="' + data.quote + '" ' + data.author;
        $("#tweet").attr("href", temp1);

      },
      error: function(err) {
        alert(err);
      },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("X-Mashape-Authorization", "DtPKG80Ti2mshkFxUhYhpH96ye1Mp1bQ4SBjsnIBVcEuDp0XKn");
      }
    });
  })
})