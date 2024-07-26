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
  colorMode(RGB, 255);
}

function draw() {
  background(255, 240, 245); // Light pink background

  for (let wave of waves) {
    wave.display();
  }

  drawResponsiveText();

  if (millis() - last > interval) {
    corazones.push(new Heart(random(width), random(height)));
    last = millis();
  }

  corazones = corazones.filter(heart => heart.pos.y <= height);

  for (let heart of corazones) {
    heart.render();
    heart.update();
  }
}

function drawResponsiveText() {
  fill(128, 0, 0); // Maroon color for text
  stroke(10);
  strokeWeight(1);
  textFont(amaticFont);
  textAlign(CENTER, CENTER);

  let baseSize = min(width, height) * 0.1;
  
  textSize(baseSize);
  text("T+R", width / 2, height * 0.2);
  
  textSize(baseSize * 0.6);
  text("06-25-2011", width / 2, height * 0.33);
  text("12-31-2014", width / 2, height * 0.5);
  text("09-09-2017", width / 2, height * 0.67);
  
  textSize(baseSize * 0.5);
  text("And every new day together...", width / 2, height * 0.84);
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
    this.vel = createVector(random(-1, 1), random(2, 5));
    this.color = color(
      random(200, 255), // Red component
      0,                // Green component
      random(100, 200)  // Blue component
    );
    this.size = min(width, height) * 0.03;
  }

  render() {
    push();
    translate(this.pos.x, this.pos.y);
    scale(this.size);
    beginShape();
    noStroke();
    fill(this.color);
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
    this.yRandom = random(-height/4, height/4);
    this.color = this.generateWaveColor();
  }

  generateWaveColor() {
    let r = random(180, 255);
    let g = random(0, 50);
    let b = random(100, 180);
    return color(r, g, b, 50); // 50 is the alpha value for transparency
  }

  display() {
    let xoffA = 0;
    let xoffB = 0;

    fill(this.color);
    noStroke();
    beginShape();

    for (let xA = 0; xA <= width; xA += width / 20) {
      let yA = map(noise(xoffA, this.yoffA), 0, 1, 0, height) + this.yRandom;
      vertex(xA, yA);
      xoffA += 0.05;
    }

    for (let xB = width; xB >= 0; xB -= width / 20) {
      let yB = map(noise(xoffB, this.yoffB), 0, 1, 0, height) + this.yRandom;
      vertex(xB, yB);
      xoffB += 0.05;
    }

    this.yoffA += 0.01;
    this.yoffB += 0.01;
    endShape(CLOSE);
  }
}