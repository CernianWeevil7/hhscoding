
const h = window.innerHeight
const w = window.innerWidth

let ball;
let paddle1;
let paddle2;
let s1 = 0;
let s2 = 0;
let play = false;

function setup(){
  createCanvas(w,h);
  ball = new Ball();
  paddle1 = new Paddle(40,h/2);
  paddle2 = new Paddle(w-40,h/2);
  playButton = new RectButton(w/2,h/2,400,100,'PLAY');
  playAgainButton = new RectButton (w/2, h/2+ 200, 400, 100, "PLAY AGAIN")
}

function draw(){

  background(0);
  stroke('white');
  strokeWeight(5);
  fill('white');

  textFont('Roboto')
  textAlign(CENTER,CENTER)
  textSize(200)
  text("PONG",w/2,h/4)

  playButton.draw()

  textFont('Times New Roman')
  textSize(50)
  text("Player 1",w/4,5*h/7)
  text ("Up - W",w/4,11*h/14)
  text ("Down - S",w/4,12*h/14)

  textFont('Times New Roman')
  textSize(50)
  text("Player 2",3*w/4,5*h/7)
  text ("Up - ;",3*w/4,11*h/14)
  text ("Down - /",3*w/4,12*h/14)

  if(play){
    clear();
    background(0);
    stroke('white');
    strokeWeight(5);
    fill('white');

    paddle1.display();
    paddle1.move(83,87);

    paddle2.display();
    paddle2.move(191,186);

    for(let i=0;i<h;i+=40){
      rect(w/2,i,2,20)
    }

    ball.display();
    ball.move();

    textSize(100)
    text(s1,w/2-120,120)
    text(s2,w/2+60,120)

    if(s1 > 4 || s2>4){
      clear();
      background(0);
      textAlign(CENTER,CENTER);
      text(s1>4 ? 'Player 1 Wins' : 'Player 2 Wins',w/2,h/2);
      playAgainButton.draw();
    }
  }
}

//-------------------------------------------------------------------------------------------------

class Ball{
  constructor(){
    this.x = w/2;
    this.y = h/2;
    this.vx = -10;
    this.vy=0;
    this.theta=0;
  }
  move(){

//Paddle Physics
    this.x += this.vx;
    this.y += this.vy;

    if((this.x-7.5 <= paddle1.x) && (this.y>paddle1.y-10 && this.y<paddle1.y+130)){
      this.theta = (Math.PI/240)*(this.y-paddle1.y)-Math.PI/4;
      this.vx = 10*Math.cos(this.theta);
      this.vy = 10*Math.sin(this.theta);
    }
    if((this.x+7.5 >= paddle2.x) && (this.y>paddle2.y-10 && this.y<paddle2.y+130)){
      this.theta = (Math.PI/240)*(this.y-paddle2.y)-Math.PI/4;
      this.vx = -10*Math.cos(this.theta);
      this.vy = 10*Math.sin(this.theta);
    }
//Hitting the Wall
  if(this.y<0 || this.y>h) this.vy *= -1
//Scoring
  if(this.x<0){
    s2++;
    this.x = w/2;
    this.y = h/2;
    this.vx= -10;
    this.vy=0;

  }
  if(this.x>w){
    s1++;
    this.x = w/2;
    this.y = h/2;
    this.vx= -10;
    this.vy=0;
  }

  }
  display(){
    ellipseMode(CENTER);
    circle(this.x,this.y,15,15);
  }
}


class Paddle{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }

  move(up,down){
    if (keyIsDown(up)) this.y += 12;
    if (keyIsDown(down)) this.y -= 12;
  }

  display(){
    rectMode(CENTER)
    rect(this.x+5,this.y+60,10,120);
  }
}
//-------------------------------------------------------------------------------------------------
//Button

var RectButton = class {
  constructor (x, y, width, height, text) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
  }

  draw () {
    stroke ('white');
    strokeWeight (4);
    noFill ();
    rectMode(CENTER);
    rect (this.x, this.y, this.width, this.height);
    fill ('white');
    textAlign(CENTER,CENTER);
    textSize (this.width / 7);
    text (this.text, this.x, this.y);
  }

  in () {
    if (
        mouseX > this.x - this.width/2 &&
        mouseX < this.x + this.width/2 &&
        mouseY > this.y - this.height/2 &&
        mouseY < this.y + this.height/2
       ) {
      return true;
    } else {
      return false;
    }
  }
}


function mouseClicked() {
  if (playAgainButton.in()) {
    s1=0;
    s2=0;

    ball.x = w/2;
    ball.y = h/2;
    ball.vx= -10;
    ball.vy=0;

    paddle1.x = 40;
    paddle1.y = h/2;
    paddle2.x = w-40;
    paddle2.y = h/2;
  }
  if(playButton.in()) play = true;
}
