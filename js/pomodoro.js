$(document).ready(function(){
  window.clearTimeout();
  var breakLength = $("#bl").html();
  var sessionLength = $("#sl").html();
  $("#time").append(sessionLength);
  var start = false;
  var i = sessionLength * 60;;
  var hour, min, sec;
  var isSession = true;
  
  //once the pomodoro is clicked, the timer starts
  $("#pomodoro").click(function(){
    start = !start;
   //start the interval timer 
   var t =  window.setInterval(function(){
         if(!start){
           stop();
         } else if(i == 0) {
           isSession = !isSession;
           $("#title").empty();
           if(isSession) {
             $("#title").append("Session");
             i = sessionLength * 60;
           } else {
             $("#title").append("Break!");
             i = breakLength * 60;
           }
         } else{
           i--;
           $("#time").empty();
           showTime();
         }
       }, 1000);
   //abort the timer 
   function stop() {
      window.clearInterval(t);
    }
  })
  //make changes to current timer when needed
  function update(section) {
     $(section).empty();
    
    if(section == "#bl"){
      $(section).append(breakLength);
    } else {
      $(section).append(sessionLength);
    }
    
    //update if the tomato is showing a old number
     if(isSession) {
        $("#time").empty();
        $("#time").append(sessionLength);
        i = sessionLength * 60;
     } else {
        $("#time").empty();
        $("#time").append(breakLength);
        i = breakLength * 60;
     }
  }
  //convert the length into HH:MM:SS format
  function showTime() {
    if(isSession) {
      hour = Math.floor(sessionLength / 60);
      min = sessionLength % 60 - 1;
    } else {
      hour = Math.floor(breakLength / 60);
      min = breakLength % 60 - 1;
    }
    sec = i % 60;
    if(hour > 0) {
      if(min < 10){
        $("#time").append(hour + ":0");
      } else{
        $("#time").append(hour + ":");
      }
    }
    if(sec < 10){
       $("#time").append(min + ":0"+ sec);
     } else{
       $("#time").append(min + ":"+ sec);
     }
  }
  //decrease break length
  $("#subb").click(function() {
    if(breakLength > 1 && !start) {
      breakLength--;
      update("#bl");
    }
  })
  //increase break length
  $("#addb").click(function() {
    if(!start) {
      breakLength++;
      update("#bl");
    }
  })
  //decrease session length
  $("#subs").click(function() {
    if(sessionLength > 1  && !start) {
      sessionLength--;
      update("#sl");
    }
  })
  //increase session length
  $("#adds").click(function() {
    if(!start) {
      sessionLength++;
      update("#sl");
    }
  })
  
})