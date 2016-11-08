$(document).ready(function() {

  var l, lat, lon, celsius, faren, f;
  
  if (navigator.geolocation) {
 
    navigator.geolocation.getCurrentPosition(function(position) {
      $('#error').empty();
      lat = position.coords.latitude.toFixed(2);
      lon = position.coords.longitude.toFixed(2);
     
      l = 'https://api.apixu.com/v1/current.json?key=be4767290dfa44c0abc162117162009&q='+ lat + "," + lon;
  
      console.log(l)
      
      $.ajax({
        url: l,
        dataType: "json",
        success: function(json) {
        console.log(json);
        console.log(json.current.condition);  
         //city
        document.getElementById("city").innerHTML = json.location.name + ", " + json.location.region;
        //weather
        document.getElementById("weather").innerHTML = json.current.condition.text;
     
          
        //temperature
          f = true;
        celsius = json.current.temp_c;
        faren = json.current.temp_f;
        document.getElementById("temperature").innerHTML = faren + "°F";

        $("#temperature").click(function() {
            f = !f;
            $("#temperature").fadeOut(1000, function() {
              if (f) {
                var temp = faren + "°F";
                $(this).text(temp).fadeIn(1000);
              } else {
                var temp = celsius + "°C"
                $(this).text(temp).fadeIn(1000);
              }
            });
          })
        
        var i = json.current.condition.code;
        var dayOrNight = json.current.condition.icon.match(/day|night/g)[0];
          
        //if night change text color
        if(dayOrNight == "night") {
           $("body").css('color', '#ffffcc');
            $("#temperature").on({
              mouseenter: function () {
                  $("#temperature").css('color','#4d4d4d');
              },
              mouseleave: function () {
                  $("#temperature").css('color','#ffc');
              }
            });
         
        }
        //clear day
        if (i == 1000 || i == 1003 || i == 1006){
            if(dayOrNight == "day") {
              $("#icon").append('<div class="sun"></div>');
            }
            else if( dayOrNight == "night"){
             $("body").css("background-color", "#1a1a1a");
             $("#icon").append('<div class="clearnight"></div>');
           }
            if (i == 1003 || i == 1006) {
                $("#icon").append('<div class="clouds"></div>');
                cloudylight(6, true);
             }
         
        }
          
         //mist or fog
        else if (i == 1009 || i == 1030 || i == 1135 || i == 1147) {
           if(dayOrNight == "day") {
            $("body").css("background-color", "#008fb3");
          } else {
            $("body").css("background-color", "#1a1a1a");
          }
          $("#icon").append('<div class="clouds"></div>');
          cloudylight(15, false, true);
          $("#icon").append('<div class="misty"></div>');
          createMist();
        }
          
          //drizzle, rain, or thunderstorm
        else if (i == 1063 || i == 1069 || i == 1072 || i == 1072 || i == 1087 || 
                 (i >= 1150 && i <= 1207 ) || (i >= 1240 && i <= 1252 ) || 
                i == 1273 || i == 1276) {
          $("#icon").append('<div class="clouds"></div>');
         if(dayOrNight == "day") {
            $("body").css("background-color", "#8c8c8c");
          } else {
            $("body").css("background-color", "#1a1a1a");
          }
          $("#icon").append('<div class="clouds"></div>');
          $("#icon").append('<div class="rainfall"></div>');
          //drizzle
          if (i >= 1150 && i <= 1171) {
            createRain(100, 5);
          } else {
            if (i == 1087 || i == 1273 || i == 1276) {
              $('.rainfall').append('<div class="lightning"></div>');
            }
            createRain(300, 10);
          }
        }

        //snow
        else {
          if(dayOrNight == "day") {
            $("body").css("background-color", "#008fb3");
          } else {
            $("body").css("background-color", "#1a1a1a");
          }
          $("#icon").append('<div class="clouds"></div>');
          cloudylight(6, false, true);
          $("#icon").append('<div class="rainfall"></div>');
          if(i == 1210 || i == 1213 || i == 1255){
            createRain(50, 7, true);
          }
          else {
            createRain(150, 7, true);
          }
          if(i == 1282) {
            $('.rainfall').append('<div class="lightning"></div>');
          }
        }

        
       /*----------------------------------------------------------------------------
       
        //setting weather its day or night
        var i = json.weather[0].icon;

        //clear day
        if (i == "01d" || i == "02d") {
          $("#icon").append('<div class="sun"></div>');
          if (i == "02d") {
            $("#icon").append('<div class="clouds"></div>');
            cloudylight(6, true);
          }
        }

        //clear night
        else if (i == "01n" || i == "02n") {
          $("body").css("background-color", "#1a1a1a");
          $("#icon").append('<div class="clearnight"></div>');
          if (i == "02n") {
            $("#icon").append('<div class="clouds"></div>');
            cloudylight(6, true);
          }
        }

        //broken day
        else if (i == "03d") {
          $("#icon").append('<div class="clouds"></div>');
          cloudylight(6, true);
        }

        //broken night
        else if (i == "03n" || i == "04n") {
          $("body").css("background-color", "#1a1a1a");
          $("#icon").append('<div class="clouds"></div>');
          if (i == "03n") {
            cloudylight(6, true);
          } else if (i == "04n") {
            cloudylight(15, false);
          }
        }

        //broken day
        else if (i == "04d") {
          $("body").css("background-color", "#008fb3");
          $("#icon").append('<div class="clouds"></div>');
          cloudylight(15, false);
        }

        //drizzle, rain, or thunderstorm
        else if (i == "09d" || i == "10d" || i == "11d" || i == "09n" || i == "10n" || i == "11n") {
          $("#icon").append('<div class="clouds"></div>');
          if (i == "09d" || i == "10d" || i == "11d") {
            $("body").css("background-color", "#8c8c8c");
          } else {
            $("body").css("background-color", "#1a1a1a");
          }
          $("#icon").append('<div class="clouds"></div>');
          $("#icon").append('<div class="rainfall"></div>');
          if (i == "09d" || i == "09n") {
            createRain(100, 5);
          } else if (i == "10n" || i == "11n" || i == "10d" || i == "11d") {
            if (i == "11d" || i == "11n") {
              $('.rainfall').append('<div class="lightning"></div>');
            }
            createRain(300, 10);
          }
        }

        //snow
        else if (i == "13d" || i == "13n") {
          if (i == "13d") {
            $("body").css("background-color", "#008fb3");
          } else {
            $("body").css("background-color", "#1a1a1a");
          }
          $("#icon").append('<div class="clouds"></div>');
          cloudylight(6, false, true);
          $("#icon").append('<div class="rainfall"></div>');
          createRain(50, 7, true);
        }

        //mist
        else if (i == "50d" || i == "50n") {
          if (i == "50d") {
            $("body").css("background-color", "#008fb3");
          } else {
            $("body").css("background-color", "#1a1a1a");
          }
          $("#icon").append('<div class="clouds"></div>');
          cloudylight(15, false, true);
          $("#icon").append('<div class="misty"></div>');
          createMist();
        }----------------------------*/
      },
        error: function(){
          $('p').append("Could not find current location <br><div class = 'er'>check if location is allowed on your browser</div>");
        }
      })
    });
      
  }
})

function cloudylight(numOfClouds, light, stationary) {

  for (i = 0; i < numOfClouds; i++) {
    var duration;
    duration = randRange(120, 150);
    if (light) {
      if (i % 3 == 0) {
        $('.clouds').append('<div class="cloudya" id="cloud' + i + '"></div>');
      } else if (i % 3 == 1) {
        $('.clouds').append('<div class="cloudyb" id="cloud' + i + '"></div>');
      } else if (i % 3 == 2) {
        $('.clouds').append('<div class="cloudyc" id="cloud' + i + '"></div>');
      }
    } else {
      if (i % 3 == 0) {
        $('.clouds').append('<div class="cloudy1" id="cloud' + i + '"></div>');
      } else if (i % 3 == 1) {
        $('.clouds').append('<div class="cloudy2" id="cloud' + i + '"></div>');
      } else if (i % 3 == 2) {
        $('.clouds').append('<div class="cloudy3" id="cloud' + i + '"></div>');
      }
      if (stationary && i % 2 == 0) {
        duration = 0;
      }
    }
    var time = duration + 's';
    var animate = 'move ' + time + ' linear infinite';
    $('#cloud' + i).css('animation', animate);
  }
}

function createMist() {
  var top, left, t;
  for (var i = 0; i < 10; i++) {
    left = randRange(-150, -100);
    t = randRange(50, 55);
    top = i * t + 500;
    $('.misty').append('<div class="mist" id="mist' + i + '"></div>');
    $('#mist' + i).css('top', top);
    $('#mist' + i).css('left', left);
  }
}

function randRange(minNum, maxNum) {
  return Math.random() * (maxNum - minNum + 1) + minNum;
}

function createRain(numOfDrops, size, snow) {
  cloudylight(6, false, true);
  for (i = 1; i < numOfDrops; i++) {
    var dropLeft = randRange(0, 1600);
    var dropTop = randRange(510, 620);
    var duration;
    if (snow) {
      duration = randRange(15, 25);
      $('.rainfall').append('<div class="snow" id="drop' + i + '"></div>');

    } else {
      duration = randRange(2, 5);
      $('.rainfall').append('<div class="rain" id="drop' + i + '"></div>');
    }
    var time = duration + 's';
    $('#drop' + i).css('height', size);
    $('#drop' + i).css('width', size);
    $('#drop' + i).css('left', dropLeft);
    $('#drop' + i).css('top', dropTop);
    $('#drop' + i).css('animation-duration', time);
  }
}