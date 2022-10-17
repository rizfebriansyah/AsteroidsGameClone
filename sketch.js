var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];
var keepTrackTime = 0;
var asteroidScore = 0;

//////////////////////////////////////////////////
function setup() {
  createCanvas(1200,800);
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();

  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width/2, height*2.9);
  atmosphereSize = new createVector(width*3, width*3);
  earthLoc = new createVector(width/2, height*3.1);
  earthSize = new createVector(width*3, width*3);
 
}

//////////////////////////////////////////////////

function draw() {
  background(0);
  sky();
    
    generateMoreAsteroids();
    spaceship.run();
    asteroids.run();
    
    drawEarth();
    drawasteroidScore();
    drawtimeKeeper();
    
        
  checkCollisions(spaceship, asteroids); // function that checks collision between various elements
}

//////////////////////////////////////////////////

//draws more asteroids as game progresses
function generateMoreAsteroids() {
    for(var i=0;i<keepTrackTime;i++) {
        asteroids.spawn();
    }
}

//draws the number of asteroids hit at the bottom left of screen
function drawasteroidScore() {
    fill(random(0,255),random(0,255),random(0,255));
    textSize(30);
    text("Asteroids Hit: " + asteroidScore, 30, 750);
}

//keeps track of the time 
function drawtimeKeeper() {
    keepTrackTime = int(millis()/1000);
    fill(255,0,0);
    text("You played for: " + keepTrackTime + " seconds", 10, 30);
}

//draws earth and atmosphere
function drawEarth(){
  noStroke();
  //draw atmosphere
  fill(220, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x,  atmosphereSize.y);
    
  //draw earth
  fill(0, 0, 125);
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids){

    //spaceship-2-asteroid collisions
    //YOUR CODE HERE (2-3 lines approx)
    
    for(var i = 0; i< asteroids.locations.length;i++) {
        var asteroidLocation =this.asteroids.locations[i];
        var asteroidSize =this.asteroids.diams[i];
        var shipLoc = spaceship.location;
        var shipSize = spaceship.size;
        var asteroidCollideShip = isInside(asteroidLocation, asteroidSize, shipLoc, shipSize);

        if(asteroidCollideShip) {
            gameOver();
        }
    

    //asteroid-2-earth collisions
    //YOUR CODE HERE (2-3 lines approx)
        
    var asteroidCollideEarth = isInside(asteroidLocation, asteroidSize, earthLoc, earthSize.x);
        if(asteroidCollideEarth) {
            gameOver();
        }
    
       
    //spaceship-2-earth
    //YOUR CODE HERE (1-2 lines approx)
        var spaceshipCollideEarth = isInside(shipLoc, shipSize, earthLoc, earthSize.y);
        if(spaceshipCollideEarth) {
            gameOver();
        }
      
    //spaceship-2-atmosphere
    //YOUR CODE HERE (1-2 lines approx)
        var shipInAtmosphere = isInside(shipLoc, shipSize, atmosphereLoc, atmosphereSize.x);
        if(shipInAtmosphere) {
            spaceship.setNearEarth();
        }
    }
    //bullet collisions
    //YOUR CODE HERE (3-4 lines approx)
    
    for(var i=0;i<asteroids.locations.length;i++) {
        for(var j=0;j<spaceship.bulletSys.bullets.length;j++) {
            var asteroidLocation = this.asteroids.locations[i];
            var asteroidSize = this.asteroids.diams[i];
            var bulletLoc = spaceship.bulletSys.bullets[j];
            var bulletSize = spaceship.bulletSys.diam;
            var bulletHitsAsteroid = isInside(asteroidLocation, asteroidSize, bulletLoc, bulletSize);
            if(bulletHitsAsteroid) {
                asteroids.destroy(i);
                asteroidScore++;
                break;
            
            }
        }
    }
    
}

//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB){
    // YOUR CODE HERE (3-5 lines approx)
    var distanceInBetween = dist(locA.x, locA.y, locB.x, locB.y);
    var maxDistance = sizeA/2 +sizeB/2;
    if(distanceInBetween<maxDistance) {
        return true;
    } else{
        return false;
    }
}

//////////////////////////////////////////////////
function keyPressed(){
  if (keyIsPressed && keyCode === 32){ // if spacebar is pressed, fire!
    spaceship.fire();
  }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver(){
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width/2, height/2)
  noLoop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky(){
  push();
  while (starLocs.length<300){
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i=0; i<starLocs.length; i++){
    rect(starLocs[i].x, starLocs[i].y,2,2);
  }

  if (random(1)<0.3) starLocs.splice(int(random(starLocs.length)),1);
  pop();
}
