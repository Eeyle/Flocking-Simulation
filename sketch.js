

birds = [];
const nBirds = 100;

var separationSlider, alignmentSlider, coherenceSlider;

function setup() {
  createCanvas(500, 500);
  
  separationSlider = createSlider(0, 0.1, 0.02, 0.01);
  alignmentSlider = createSlider(0, 0.1, 0.01, 0.01);
  coherenceSlider = createSlider(0, 0.01, 0.005, 0.001);
  separationSlider.position(0, height);
  alignmentSlider.position(0, height + separationSlider.height);
  coherenceSlider.position(0, height + separationSlider.height*2);
  
  for (let i = 0; i < nBirds; i++) {
    let randColor = random(0, 155);
    let x = random(0, width);
    let y = random(0, height);
    let vel = p5.Vector.cross( // cross with z axis to make everything spin at the beginning
                p5.Vector.sub(
                  createVector(x, y, 0),
                  createVector(width/2, height/2, 0)
                ),
                createVector(0, 0, 1)
              ).setMag(random(3, 5));
    
    birds[i] = new Bird(x, y,
                        vel.x, vel.y, 1,
                        color(0, 100+randColor, 255-randColor))
  }
  
  background(0);
}

function draw() {
  background(0);
  
  for (let i = 0; i < nBirds; i++) {
    
    // get localbirbs and their average location
    let localBirds = [];
    let vCenter = createVector(birds[i].pos.x, birds[i].pos.y);
    for (let j = 0; j < nBirds; j++) {
      if (i != j && birds[i].pos.dist(birds[j].pos) < 50) {
        localBirds.push(birds[j]);
        vCenter.add(birds[j].pos).div(2);
      }
    }
    
    birds[i].update();
    
    birds[i].separate(localBirds);
    birds[i].align(localBirds);
    birds[i].cohere(vCenter);
    
    fill(birds[i].color);
    strokeWeight(0);
    circle(birds[i].pos.x, birds[i].pos.y, 3*birds[i].mass);
  }
}