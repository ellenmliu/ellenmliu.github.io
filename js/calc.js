$(document).ready(function() {
  var isFloat = false;
  var previous = 0;
  var current;
  var lastOp;
  var startOver;
  var first = true;
  var total = 0;
  
  for(var i = 1; i <= 3; i++){
     $(".numbers").append("<div id = 'row"+i+"'></div>");
    for(var j = 2; j >= 0; j--){
      var x = j * 3 +i;
      $("#row"+i).append("<div class = 'num sbutton' id ='num"+ x +"'>"+x+"</div>");
    
       $("#num"+x).click(function(){
         if(startOver){
           $(".bar").empty();
           current = 0;
           total = 0;
           startOver = false;
         }
         
         var temp = $(event.currentTarget).attr('id');
         var val = temp.substring(temp.length-1);
          
          $(".bar").append(val);
         
       })
    }
   }
  
  //numbers
  $(".numbers").append("<div id = 'bottom'></div>");
  
  $("#bottom").append("<div class = 'dbutton' id ='num0'>"+0+"</div>");
  
  //add a zero to the end
  $("#num0").click(function(){
      var total = parseFloat($(".bar").html());

      if(!isNaN(total)){
        var temp = $(event.currentTarget).attr('id');
        var val = temp.substring(temp.length-1);

        $(".bar").append(val);
        current = parseFloat($(".bar").html());
      }
    })
   
   //add a decimal point after the number
  $("#decimal").click(function(){
      if(!isFloat){
        $(".bar").append(".");
        current = parseFloat($(".bar").html());
        isFloat = true;
      }
    })
    
    //clear the current number
  $("#ce").click(function(){
     current = 0;
     isFloat = true;
     $(".bar").empty();
   })
   
   //clear everything
  $("#ac").click(function(){
     current = 0;
     previous = 0;
     first = true;
     isFloat = true;
     $(".bar").empty();
   })
   
   /*--------operations-----------*/
  $(".op").click(function(){
    current = parseFloat($(".bar").html());

    if(!first) {
       switch(lastOp){
        case "a":
          total += current;
          break;
         case "s":
          total -= current;
          break;
         case "m":
          total *= current;
          break;
         case "d":
          total /= current;
          break;
      }
     
    } else {
      first = false;
      total = current;
    }
    
     if($(event.currentTarget).attr('id') == "addition"){
      lastOp = "a";
     }
    if($(event.currentTarget).attr('id') == "subtraction"){
      lastOp = "s";
     }
    
    if($(event.currentTarget).attr('id') == "division"){
      lastOp = "d";
     }
    
    if($(event.currentTarget).attr('id') == "multiplication"){
      lastOp = "m";
     }
    
     $(".bar").empty();
     isFloat = false;
  })
  $("#equals").click(function(){
     current = parseFloat($(".bar").html());
     $(".bar").empty();

   switch(lastOp){
      case "a":
        total += current;
        break;
       case "s":
        total -= current;
        break;
       case "m":
        total *= current;
        break;
       case "d":
        total /= current;
        break;
    }
      
     $(".bar").append(total);
     startOver = true;
     first = true;
     isFloat = false;
   })
})