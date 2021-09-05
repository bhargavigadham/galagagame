
var jet = document.getElementById("jet");
var board = document.getElementById("board");
var sound = new Audio("firing.mp3");
var sound1 = new Audio("killenemy.mp3");
var sound3 = new Audio("galaga.mp3");

window.addEventListener("keydown", (e) => {
  var left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
  var top = parseInt(window.getComputedStyle(jet).getPropertyValue("top"));
  if (e.key == "ArrowLeft" && left > 0) {
    jet.style.left = left - 10 + "px";
  }
  //1550  =>  board width - jet width
  else if (e.key == "ArrowRight" && left <= 1550) {
    jet.style.left = left + 10 + "px";
  }
  
  else if (e.key == "ArrowUp" && top > 0 ){
	jet.style.top = top - 10 + "px"; 
  }//boardheight-jet height
  else if (e.key == "ArrowDown" && top < 850 ){
	jet.style.top = top + 10 + "px"; 
  }
  
  if ( e.keyCode == 32) {
    //32 is for space key
   var bullet = document.createElement("div");
    sound.play(); 
	bullet.classList.add("bullets");
    board.appendChild(bullet);

    var movebullet = setInterval(() => {
      var rocks = document.getElementsByClassName("rocks");

      for (var i = 0; i < rocks.length; i++) {
        var rock = rocks[i];
        if (rock != undefined) {
          var rockbound = rock.getBoundingClientRect();
          var bulletbound = bullet.getBoundingClientRect();

          //Condition to check whether the rock/alien and the bullet are at the same position..!
          //If so,then we have to destroy that rock

          if (
            bulletbound.left >= rockbound.left &&
            bulletbound.right <= rockbound.right &&
            bulletbound.top <= rockbound.top &&
            bulletbound.bottom <= rockbound.bottom
          ) {
            rock.parentElement.removeChild(rock);
        	sound1.play();		//Just removing that particular rock;
            //Scoreboard
            document.getElementById("points").innerHTML =
            parseInt(document.getElementById("points").innerHTML) + 1;
          }
        }
      }
      var bulletbottom = parseInt(
        window.getComputedStyle(bullet).getPropertyValue("bottom"))
      if (bulletbottom >= 900) {
        clearInterval(movebullet);
      }

      bullet.style.left = left + "px"; //bullet should always be placed at the top of my jet..!
      bullet.style.bottom = bulletbottom + 10 + "px";
    });
  }
});

var generaterocks = setInterval(() => {
  var rock = document.createElement("div");
  rock.classList.add("rocks");
  //Just getting the left of the rock to place it in random position...
  var rockleft = parseInt(
    window.getComputedStyle(rock).getPropertyValue("left")
  );
  //generate value between 0 to 1600 where 1550 => board width - rock width
  rock.style.left = Math.floor(Math.random() * 1550) + "px";

  board.appendChild(rock);
}, 1000);

var moverocks = setInterval(() => {
  var rocks = document.getElementsByClassName("rocks");

  if (rocks != undefined) {
    for (var i = 0; i < rocks.length; i++) {
      //Now I have to increase the top of each rock,so that the rocks can move downwards..
      var rock = rocks[i]; //getting each rock
      var rocktop = parseInt(
        window.getComputedStyle(rock).getPropertyValue("top")
      );
      //475 => boardheight - rockheight + 25
      if (rocktop >= 850) {
        sound3.play();
		alert("Game Over");
	    clearInterval(moverocks);
        window.location.reload();
      }

      rock.style.top = rocktop + 25 + "px";
    }
  }
}, 450);
