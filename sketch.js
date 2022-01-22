let objs = [];
let objsNum = 100;
const noiseScale = 0.01;
let colorA, colorB;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  colorA = color(255, 0, 255, 100);
  colorB = color(0, 255, 255, 100);

  for (let i = 0; i < objsNum; i++) {
    objs.push(new Obj());
  }
  background(0);
}

function draw() {
  push();
  translate(width / 2, height / 2);

  for (let i = 0; i < objs.length; i++) {
    objs[i].move();
    objs[i].checkLife();

    objs[i].display();
  }
  pop();
}

class Obj {
  constructor() {
    this.init();
  }

  init() {
    this.vel = createVector(0, 0);
    this.pos = createVector(0, 0);
    this.t = random(-360, 360);
    this.lifeMax = random(20, 50);
    this.life = this.lifeMax;
    this.step = random(0.05, 0.1);
    this.dMax = random(10) >= 5 ? 10 : 20;
    this.d = this.dMax;
    this.c = lerpColor(colorA, colorB, random(1));
  }

  move() {
    let theta = map(noise(this.pos.x * noiseScale, this.pos.y * noiseScale), 0, 1, -360, 360) + this.t;
    this.vel.x = cos(theta);
    this.vel.y = sin(theta);
    this.pos.add(this.vel);
  }

  checkLife() {
    this.life -= this.step;
    this.d = map(this.life, 0, this.lifeMax, 0, this.dMax);
    if (this.life < 0) {
      this.init();
    }
  }

  display() {
   this.c = lerpColor(colorA, colorB, noise(this.pos.x * noiseScale, this.pos.y * noiseScale));

    stroke(this.c);
    fill(255, 100);

    circle(this.pos.x, this.pos.y, this.d);
  }
}

