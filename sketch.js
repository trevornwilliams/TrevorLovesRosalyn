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
}

function draw() {
  background(255, 240, 245);

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
  fill(128, 0, 0);
  stroke(10);
  textFont(amaticFont);
  textAlign(CENTER);

  let baseFontSize = 0.1 * width;
  let scaleFactor = min(1, width / 1000); // Adjust text size for smaller screens

  textSize(baseFontSize * scaleFactor);
  text("T+R", width / 2, height / 5);
  text("06-25-2011", width / 2, height / 3);
  text("12-31-2014", width / 2, height / 2);
  text("09-09-2017", width / 2, height / 1.5);
  text("And every new day together...", width / 2, height / 1.2);
}

function mousePressed() {
  corazones.push(new Heart(mouseX, mouseY));
}

function touchStarted() {
  corazones.push(new Heart(touchX, touchY));
  return false; // Prevent default
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Heart {
  constructor(posX, posY) {
    this.pos = createVector(posX, posY);
    this.vel = createVector(random(-2, 2), random(5, 10));
    this.cR = random(200, 255);
    this.cB = random(255);
    this.size = 2;
  }

  render() {
    push();
    translate(this.pos.x, this.pos.y);
    scale(this.size);
    beginShape();
    noStroke();
    fill(this.cR, 0, this.cB);
    // Heart shape vertices (same as original)
    vertex(0.16755626400632834, -11.211884869082613);
    // ... (include all original vertices here)
    vertex(-0.16755626400633106, -11.211884869082631);
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