var corazones = [];
var interval = 400;
var last = -interval;
var waves = [];

var amaticFont;
function preload() {
	amaticFont = loadFont('AmaticSC-Regular.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (var i = 0; i < 30; i++) {
    waves.push(new Wave());
  }
}

function draw() {
  background(255, 240, 245);

  for (var i = 0; i < waves.length; i++) {
    waves[i].display();
  }

  fill(128, 0, 0);
  stroke(10);
  textFont(amaticFont);
  textSize(200);
  textAlign(CENTER);
  text("T+R", width / 2, height / 5);
  text("06-24-2011", width / 2, (height / 5) + 10);
  text("12-31-2014", width / 2, (height / 5) + 20);
  text("09-09-2017", width / 2, (height / 5) + 30);
  text("And every new day together...", width / 5, (height / 5) + 50);


  if (millis() - last > interval) {
    corazones.push(new Heart(mouseX, mouseY));
    last = millis();
  }

  if (corazones.length - 1 > 0) {
    for (i = 0; i < corazones.length; i++) {
      if (corazones[i].pos.y > height) {
        corazones.splice(i, 1);
      }
    }
  }

  for (i = 0; i < corazones.length; i++) {
    corazones[i].render();
    corazones[i].update();
  }
}

function touchMoved() {
  corazones.push(new Heart(mouseX, mouseY));
}

function Heart(posX, posY) {
  var r = 2;
  this.pos = createVector(posX, posY);
  this.vel = createVector(random(-2, 2), random(5, 10));
  this.cR = random(200, 255);
  this.cB = random(255);

  this.render = function () {
    push();
    translate(this.pos.x, this.pos.y);
    beginShape();
    noStroke();
    fill(this.cR, 0, this.cB);
    vertex(0.16755626400632834, -11.211884869082613);
    vertex(1.2802802095405401, -14.424267353909979);
    vertex(3.9999999999999987, -18.516660498395407);
    vertex(8.498699402201431, -22.06005898599594);
    vertex(14.385066634855471, -23.7924464852289);
    vertex(20.784609690826525, -23);
    vertex(26.552622898861795, -19.669773417461066);
    vertex(30.5635893025685, -14.37968994096132);
    vertex(32, -8.000000000000002);
    vertex(30.5635893025685, -1.349984702280941);
    vertex(26.552622898861802, 5.043477265749222);
    vertex(20.78460969082653, 10.999999999999991);
    vertex(14.385066634855471, 16.56071244874666);
    vertex(8.49869940220144, 21.774252056190914);
    vertex(3.9999999999999987, 26.516660498395407);
    vertex(1.280280209540542, 30.43974892695726);
    vertex(0.16755626400632817, 33.069915057276695);
    vertex(5.877363255445677e-47, 34);
    vertex(-0.16755626400632873, 33.069915057276695);
    vertex(-1.2802802095405394, 30.439748926957257);
    vertex(-4.000000000000003, 26.516660498395407);
    vertex(-8.498699402201431, 21.77425205619092);
    vertex(-14.385066634855464, 16.560712448746663);
    vertex(-20.78460969082651, 11.000000000000014);
    vertex(-26.552622898861788, 5.043477265749245);
    vertex(-30.5635893025685, -1.3499847022809406);
    vertex(-32, -7.999999999999993);
    vertex(-30.56358930256851, -14.379689940961306);
    vertex(-26.552622898861813, -19.669773417461048);
    vertex(-20.784609690826525, -23);
    vertex(-14.385066634855477, -23.7924464852289);
    vertex(-8.498699402201446, -22.060058985995955);
    vertex(-4.000000000000011, -18.516660498395417);
    vertex(-1.280280209540539, -14.424267353909972);
    vertex(-0.16755626400633106, -11.211884869082631);

    endShape();
    pop();
  };

  this.update = function () {
    this.pos.add(this.vel);
  };
}

function Wave() {
  this.yoffA = random(10);
  this.yoffB = this.yoffA;
  this.yRandom = random(-100, 100);
  this.c = random(360);

  this.display = function () {
    this.xoffA = 0;
    this.xoffB = 0;

    fill(this.c, 80, 100, 50);
    beginShape();

    for (var xA = 0; xA <= width; xA += 10) {
      var yA =
        map(noise(this.xoffA, this.yoffA), 0, 1, 0, height) + this.yRandom;
      vertex(xA, yA);
      this.xoffA += 0.05;
    }

    for (var xB = width; xB >= 0; xB -= 10) {
      var yB =
        map(noise(this.xoffB, this.yoffB), 0, 1, 0, height) + this.yRandom;
      vertex(xB, yB);
      this.xoffB += 0.05;
    }

    this.yoffA += 0.01;
    this.yoffB += 0.01;
    endShape(CLOSE);
  };
}
