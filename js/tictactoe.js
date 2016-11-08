var array = [[null,null,null],[null,null,null],[null,null,null]];
var p1, p2;                     //if there is no p2, comp will play as p2
var comp = false;
var game = true;                
var finish = false;
var selected = false;
var turn;
var choice;
var nextTurn = p2;
var filled = false;
var counter = 0;
var first;

$(document).ready(function(){
  
  //select if you want to play one player or two
  $(".b1").click(function(){
    var sel1 = $(event.currentTarget).attr('id');
    if(sel1 == "oneP") {
      comp = true;
    }
    $("#pick").css("visibility", "visible");

    $("#numOfPlayers").fadeOut(1000, function(){
      $("#pick").fadeTo(1000,1);
    });
  })
  
  //player chooses which one to be
  $(".b2").click(function(){
    p1 = $(event.currentTarget).attr('id');
    p2 = "O";
    first = p1;
    if(p1 == "O") {
      p2 = "X";
    }
    $("#p1").append(p1);
    $("#p2").append(p2);
     $("#menu").fadeOut(1000, function(){
      $("#test").css("visibility", "visible");
      $("#status").css("visibility", "visible");
      $("#test").delay(1000).fadeTo(1000,1);
      $("#status").delay(1000).fadeTo(1000,1);
    });
    selected = true;
    turn = p1;
  })
  
  //once the game start, any of the squares that are clicked
  $(".space").click(function(){
    
  //this is the 2 player game
  if(game && selected && !comp) {
      makeTurn();
      checkWin();
    } 
    //1p game
  else if(game && selected && comp) {
     if(turn == p1) {
       makeTurn();
      checkWin();
     } else {
       var temp = compTurn(array);
       $('#'+id(temp)).append(p2);
       array[temp[0]][temp[1]] = p2;
       turn = p1;
       checkWin();
     } 
   }
  
  })
});

function makeTurn() {
   var temp = $(event.currentTarget).attr('id');

      var row = num(temp.substring(0,temp.length-1));
      var col = parseInt(temp.substring(temp.length-1));
      
      //places the X or O in the array and board
      if($("#"+temp).html() == ""){
        $("#"+temp).append(turn);
        array[row][col] = turn;
        
        //switches the turn
        if(turn == p1){
          turn = p2;
          $("#p1").css('text-decoration', 'none');
          $("#p2").css('text-decoration', 'underline');
        } else {
          turn = p1;
          $("#p1").css('text-decoration', 'underline');
          $("#p2").css('text-decoration', 'none');
        }
        counter++;
      }
      
}

function checkWin() {
  //if someone wins, message pops up
      if(win(array, p1)) {
        game = !game;
        $("#winner").append("P1 wins!");
        finish = true;
      } else if(win(array, p2)) {
        game = !game;
        $("#winner").append("P2 wins!");
        finish = true;
      } else if(counter == 9){
        game = !game;
        $("#winner").append("Draw!");
        finish = true;
      }
  
    if(finish){
      array = [[null,null,null],[null,null,null],[null,null,null]];
      if(first == p1){
        first = p2;
      } else{
        first = p1;
      }
      turn = first;
      counter = 0;
       $("#winner").fadeOut(2000, function(){
          $("#fr").children().empty();
          $("#mr").children().empty();
          $("#br").children().empty();
          $("#winner").empty();
          game = true;
       });
      $("#winner").fadeIn(1000);
      finish = false;
    }
}

function compTurn(currentGame) {
  
  var possible = currentGame.slice(0);
  
  var bestMove = [];
  var keepGoing = true;
  for(var i = 0; i < 9 && keepGoing; i++){ 
    var move = [parseInt(i/3), i%3];
    if(array[move[0]][move[1]] == null){
      bestMove = move;

      possible[move[0]][move[1]] = p1;
      //if the opponent is going to win, return the move as the next comp makes
       if(win(possible, p1)){
        bestMove = move;
        keepGoing = false;
        break;
      }
      
      possible[move[0]][move[1]] = p2;
      //if the comp is going to win, return the move as the next move comp makes
      if(win(possible, p2)){
        bestMove = move;
        keepGoing = false;
        break;
      } 
      
      possible[move[0]][move[1]] = null;
      //if the center is opened, take the center
      if(array[1][1] == null){
        bestMove = [1,1];
        keepGoing = false;
        break;
      }
    }
  }
  counter++;
  $("#p1").css('text-decoration', 'underline');
  $("#p2").css('text-decoration', 'none');
  return bestMove;
}

//check if the given player wins
function win(game, p) {
  
  //go through each row and column
  for(var r = 0; r < game.length; r++){
    if((game[r][0] == game[r][1] && game[r][1] == game[r][2] && game[r][2] == p) ||
       (game[0][r] == game[1][r] && game[1][r] == game[2][r] && game[2][r] == p) ){
      return true;
    }
  }
  //go through the diagonals
  if((game[0][0] == game[1][1] && game[1][1] == game[2][2] && game[2][2] == p) ||
    (game[0][2] == game[1][1] && game[1][1] == game[2][0] && game[2][0] == p)) {
    return true;
  }
  
  return false;
}

//reassigns the id to the row number
function num(str) {
  switch(str){
    case "one":
      return 0;
    case "two":
      return 1;
    case "three":
      return 2;
  }
}

//reassigns the array back to the id
function id(ar) {
  var id;
  switch(ar[0]){
    case 0:
      id = "one";
      break;
    case 1:
      id = "two";
      break;
    case 2:
      id = "three";
      break;
  }
  return id += ar[1];
}