//images
var pumpkin;
var pumpkins = [];
var trickOrTreat;
var candy;
var ghost;
var wallpaper;
var backArrow;
var play;
var ring;
var theRing;
//datasets
var scaryFacts;
//fonts
var finger_paint;
//sounds
var melancholia;
var glitch;
var scream;
//other
var currentScaryFact;
var n = 37;
var m = 0;
var j = 0;
var currentPage = 0;
var firstTime = false;


function preload() {
  // images
  for (let i=1; i<=n; i++) {
    pumpkin = loadImage("assets/images/pumpkin/pumpkin_"+i+".png");
    pumpkins.push(pumpkin)
  }
  trickOrTreat = loadImage("assets/images/TrickOrTreat.png");
  candy = loadImage("assets/images/candy.png");
  ghost = loadImage("assets/images/ghost.png");
  wallpaper = loadImage("assets/images/halloween_wallpaper.jpg");
  backArrow = loadImage("assets/images/back_arrow.png");
  ring = loadImage("assets/images/ring.jpg");
  theRing = loadImage("assets/images/the_ring_child.jpg");
  play = loadImage("assets/images/play.png");
  // datasets
  scaryFacts = loadJSON("assets/data/scary_facts.json");
  // fonts
  finger_paint = loadFont("assets/fonts/Finger_Paint/FingerPaint-Regular.ttf");
  // sounds
  melancholia = loadSound("assets/sounds/melancholia.mp3");
  glitch = loadSound("assets/sounds/glitch_sound.mp3");
  scream = loadSound("assets/sounds/horror_sound.mp3");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  imageMode(CENTER);
  rectMode(CENTER);
  textAlign(CENTER);
}

function draw() {
  switch(currentPage) {
    case 0:
    background("black");
    melancholia.amp(1);
    // trick or treat
    writtenHeight = windowHeight/5;
    writtenWidth = writtenHeight/trickOrTreat.height*trickOrTreat.width;
    image(trickOrTreat, windowWidth/2+windowWidth/50, windowHeight/8, writtenWidth, writtenHeight);
    // pumpkins
    pumpkinHeight = windowHeight/5*4;
    pumpkinWidth = pumpkinHeight/pumpkin.height*pumpkin.width;
    image(pumpkins[m], windowWidth/2, windowHeight/5*3, pumpkinWidth, pumpkinHeight);
    m++;
    if(m>=n){
      m=0;
    }
    // candy
    var candyButton = new button(candy, windowHeight/3*1.1 , windowWidth/8, windowHeight/7*3, 1);
    candyButton.click();
    candyButton.print();
    // ghost
    var ghostButton = new button(ghost, windowHeight/3*0.9, windowWidth/8*7, windowHeight/7*3, 2);
    ghostButton.click();
    ghostButton.print();
    //play
    var playButton = new button(play, windowHeight/10, windowWidth/2, windowHeight/9*8, 0);
    playButton.playMusic();
    playButton.print();
    break;

    case 1:
    // soundtrack
    if (melancholia.isPlaying() == false) {
      melancholia.play();
      melancholia.amp(1);
    }
    // select current scary fact
    if (firstTime) {
      currentScaryFact = random(scaryFacts["Scary Facts"])["Scary fact"];
      firstTime = false;
    }
    //wallpaper
    wpWidth = windowWidth;
    wpHeight = wpWidth/wallpaper.width*wallpaper.height;
    image(wallpaper, windowWidth/2, windowHeight/2, wpWidth, wpHeight);
    // text
    textSize(pow(pow(windowHeight,2)+pow(windowWidth,2), 0.5)/40);
    fill(255);
    textFont(finger_paint);
    text(currentScaryFact, width/2, height/2, windowWidth/3*2, windowHeight/2);
    // back
    var backButton = new button(backArrow, windowHeight/10,  windowWidth/10, windowHeight/8, 0);
    backButton.click();
    backButton.print();
    break;

    case 2:
    background("black");
    //low soundtrack volume
    if (melancholia.isPlaying() == true) {
      melancholia.amp(1/pow(j+1, 0.7));
    }
    // start to count
    if (firstTime) {
      j=0;
      firstTime = false;
    }
    // trick
    var backButton = new button(backArrow, windowHeight/10,  windowWidth/10, windowHeight/8, 0);
    if (j < 500 ) {
      if (glitch.isPlaying() == false) {
        glitch.play();
      }
      backButton.falseClick();
      if (noise(j)>=0.75) {
        ringWidth = windowWidth*0.8;
        ringHeight = ringWidth/ring.width*ring.height;
        image(ring, windowWidth/2, windowHeight/2, ringWidth, ringHeight);
      }
    }
    else {
      if (glitch.isPlaying() == true) {
        glitch.stop();
      }
      if (scream.isPlaying() == false) {
        scream.play();
      }
      backButton.click();
      theRingWidth = windowWidth;
      theRingHeight = theRingWidth/theRing.width*theRing.height;
      image(theRing, windowWidth/2, windowHeight/2, theRingWidth, theRingHeight);
    }
    backButton.print();
    j++;
    if(j==900) {
      currentPage=0;
    }
    break;
  }
}

class button {
  constructor(myImage, height, centerX, centerY, pageNum) {
    this.myImage = myImage;
    this.centerX = centerX;
    this.centerY = centerY;
    this.originalHeight = height;
    this.currentHeight = height;
    this.width = this.currentHeight/myImage.height*myImage.width;
    this.pageNum = pageNum;
  }
  click() {
    if (mouseX>this.centerX-this.width/2 && mouseX<this.centerX+this.width/2 &&
      mouseY>this.centerY-this.currentHeight/2 && mouseY<this.centerY+this.currentHeight/2) {
        this.currentHeight = this.originalHeight*1.2;
        if(mouseIsPressed) {
          currentPage = this.pageNum;
          firstTime = true;
        }
      }
      else {
        this.currentHeight = this.originalHeight;
      }
      this.width = this.currentHeight/this.myImage.height*this.myImage.width;
  }
  falseClick () {
    if (mouseX>this.centerX-this.width/2 && mouseX<this.centerX+this.width/2 &&
      mouseY>this.centerY-this.currentHeight/2 && mouseY<this.centerY+this.currentHeight/2) {
        this.currentHeight = this.originalHeight*1.2;
        if(mouseIsPressed) {
          textSize(60);
          fill(255);
          textFont(finger_paint);
          text("Don't be shy", width/2, height/8)
        }
      }
      else {
        this.currentHeight = this.originalHeight;
      }
      this.width = this.currentHeight/this.myImage.height*this.myImage.width;
  }
  playMusic(){
    if (mouseX>this.centerX-this.width/2 && mouseX<this.centerX+this.width/2 &&
      mouseY>this.centerY-this.currentHeight/2 && mouseY<this.centerY+this.currentHeight/2) {
        this.currentHeight = this.originalHeight*1.2;
        if(mouseIsPressed) {
          if (melancholia.isPlaying() == false) {
            melancholia.play();
            melancholia.amp(1);
          }
        }
      }
      else {
        this.currentHeight = this.originalHeight;
      }
      this.width = this.currentHeight/this.myImage.height*this.myImage.width;
  }
  print() {
      image(this.myImage, this.centerX, this.centerY, this.width, this.currentHeight);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
