let corazones = [];
let interval = 400;
let last = -interval;
let waves = [];

let amaticFont;

function preload() {
  amaticFont = loadFont('AmaticSC-Regular.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 30; i++) {
    waves.push(new Wave());
  }
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(355, 40, 100);

  for (let wave of waves) {
    wave.display();
  }

  drawResponsiveText();

  if (millis() - last > interval) {
    corazones.push(new Heart(mouseX, mouseY));
    last = millis();
  }

  corazones = corazones.filter(heart => heart.pos.y <= height);

  for (let heart of corazones) {
    heart.render();
    heart.update();
  }
}

function drawResponsiveText() {
  fill(0, 80, 50);
  stroke(0, 80, 30);
  strokeWeight(1);
  textFont(amaticFont);
  textAlign(CENTER, CENTER);

  let baseFontSize = min(width, height) * 0.06;
  let lineHeight = baseFontSize * 1.5;

  textSize(baseFontSize * 1.2);
  text("T+R", width / 2, height * 0.2);

  textSize(baseFontSize);
  text("06-25-2011", width / 2, height * 0.2 + lineHeight);
  text("12-31-2014", width / 2, height * 0.2 + lineHeight * 2);
  text("09-09-2017", width / 2, height * 0.2 + lineHeight * 3);

  textSize(baseFontSize * 0.8);
  text("And every new day together...", width / 2, height * 0.2 + lineHeight * 4);
}

function mouseMoved() {
  corazones.push(new Heart(mouseX, mouseY));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Heart {
  constructor(posX, posY) {
    this.pos = createVector(posX, posY);
    this.vel = createVector(random(-2, 2), random(5, 10));
    this.cH = random(340, 360);
    this.cS = random(80, 100);
    this.cB = random(80, 100);
    this.size = min(width, height) * 0.03;
  }

  render() {
    push();
    translate(this.pos.x, this.pos.y);
    scale(this.size);
    beginShape();
    noStroke();
    fill(this.cH, this.cS, this.cB);
    vertex(0, -0.5);
    bezierVertex(-0.5, -0.8, -1, -0.5, -1, 0);
    bezierVertex(-1, 0.6, 0, 1, 0, 1.5);
    bezierVertex(0, 1, 1, 0.6, 1, 0);
    bezierVertex(1, -0.5, 0.5, -0.8, 0, -0.5);
    endShape();
    pop();
  }

  update() {
    this.pos.add(this.vel);
  }
}

class Wave {
  constructor() {
    this.yoffA = random(10);
    this.yoffB = this.yoffA;
    this.yRandom = random(-100, 100);
    this.c = random(360);
  }

  display() {
    let xoffA = 0;
    let xoffB = 0;

    fill(this.c, 80, 100, 50);
    noStroke();
    beginShape();

    for (let xA = 0; xA <= width; xA += 10) {
      let yA = map(noise(xoffA, this.yoffA), 0, 1, 0, height) + this.yRandom;
      vertex(xA, yA);
      xoffA += 0.05;
    }

    for (let xB = width; xB >= 0; xB -= 10) {
      let yB = map(noise(xoffB, this.yoffB), 0, 1, 0, height) + this.yRandom;
      vertex(xB, yB);
      xoffB += 0.05;
    }

    this.yoffA += 0.01;
    this.yoffB += 0.01;
    endShape(CLOSE);
  }
}