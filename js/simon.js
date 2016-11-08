var on = false;
var strict = false;

var simon = {
  sequence: [],
  player: [],
  count: 1,
  turn: 0,
  
  //go through the whole sequence
  animate: function(){
    var temp = this;
   $.each(this.sequence, function(index, val){  
     if(on) 
     setTimeout(function(){
        temp.lit(val, 500);
         if(index == temp.sequence.length - 1){
           setTimeout(function(){temp.playerMove(0)},500)
         }
      }, 1000 * index);
    })
  },
  
  //light up the tile with sound
  lit: function(numTile, delay){
    var tile = this.color(numTile);
    //adding the audio
    var audio = document.createElement("audio");
    audio.src = "https://s3.amazonaws.com/freecodecamp/simonSound"+ numTile + ".mp3";
    audio.autoPlay = false;
    audio.preLoad = true;
    //flash
    setTimeout(function(){
      $("#"+tile).css('opacity', '1');
      audio.play();
    }, delay);
    setTimeout(function(){
      $("#"+tile).css('opacity', '.6');
    }, delay+500);
  },
  
  //convert the number into the color
  color: function(num){
    switch(num){
      case 1:
        return 'green';
      case 2:
        return 'red';
      case 3:
        return 'yellow';
      case 4:
        return 'blue';
    }
  },
  
  //convert the color to number
  num: function(color){
    switch(color){
      case 'green':
        return 1;
      case 'red':
        return 2;
      case 'yellow':
        return 3
      case 'blue':
        return 4;
    }
  },
  
  //generates a random number to add another tile to the sequence
  randomAdd: function(){
    this.sequence.push(Math.ceil(Math.random()*4));
  },
  
  newGame: function() {
    this.sequence = [];
    this.player = [];
    this.count = 1;
    this.newLevel();
  },
  
  press: function(){
     var b =  $(event.currentTarget).attr('id');
     var pressed = temp.num(b);
     this.lit(pressed,0);
     this.player.push(pressed);
     this.checkSequence(pressed);
  },
  
  playerMove: function(){
    this.player = [];
    this.turn = 0;
    
    this.handleEvent = function(event){
      if(on){
      event.stopImmediatePropagation();
      var b =  event.target.id;
      var pressed = this.num(b);
      this.lit(pressed,0);
      this.player.push(pressed);
      this.checkSequence(pressed);
      }
    }
    if(on)
      document.getElementById('colors').addEventListener('click', this);
  },
  
  //check if the current tile is correct
  checkSequence: function(tile){
    var temp = this;
    //if the tile was pressed correctly, it will check for the next one
    if(this.sequence[this.turn] == tile){
      this.turn++;
    } 
    //if the mode is strict, then it would start all over
    else if(this.sequence[this.turn] != tile && strict){
      document.getElementById('colors').removeEventListener('click', this);
      $("#counter").empty();
      $("#counter").html("!!!!!!");
       setTimeout(function(){
				temp.newGame();
			},1000);
    }
    //if the tile pressed was wrong, it will restart the turn
    else{
      this.turn = 0;
      this.player = [];
      document.getElementById('colors').removeEventListener('click', this);
      $("#counter").empty();
      $("#counter").html("!!!!!!");
      setTimeout(function(){
				temp.animate();
        temp.showScore();
			},1000);
    }
    //if the whole sequence was correct, it will move on to the next round
    if(this.turn == this.sequence.length){
      this.count++;
      
      document.getElementById('colors').removeEventListener('click', this);
      if(this.count <= 21){
        setTimeout(function(){
          temp.newLevel();
        },1000);
      } else {
          $("#counter").empty();
          $("#counter").html("GJ!");
         setTimeout(function(){
          temp.newGame();
        },1500);
      }
    }
  },
  
  //shows how many correct
  showScore:function(){
    $("#counter").empty();
    $("#counter").html(this.count);
  },
  
  //resets the turn and player sequence, adds another to the end of the sequence, and animates it
  newLevel: function(){
    
    this.turn = 0;
    this.player = [];
    this.randomAdd();
    this.animate();
    this.showScore();
  }
}

$(document).ready(function() {
  $("#start").click(function(){
    on = false;
    on = true;
    if(on){
     simon.newGame();
    }
  })
  
  $("#switch").click(function(){
    on = !on;
    if(on)
      $("#counter").html("------");
    else
       $("#counter").empty();
  })
  
  $("#strict").click(function(){
    on = false;
    on = true;
    strict = true;
    if(on){
      simon.newGame();
    }
  })
})