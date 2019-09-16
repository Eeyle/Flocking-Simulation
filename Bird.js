class Bird {
  
  constructor(x, y, vx, vy, mass_, color_) {
    this.pos = createVector(x, y);
    this.vel = createVector(vx, vy);
    this.acc = createVector(0, 0);
    this.mass = mass_;
    this.color = color_;
  }
  
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    
    this.vel.mult(1-0.01*this.mass);
    
    if (this.pos.x < 0) {
      this.pos = createVector(width, this.pos.y);
      //this.vel = createVector(-this.vel.x, this.vel.y);
    } 
    if (this.pos.x > width) { 
      this.pos = createVector(0, this.pos.y);
      //this.vel = createVector(-this.vel.x, this.vel.y);
    } 
    if (this.pos.y < 0) { 
      this.pos = createVector(this.pos.x, height);
      //this.vel = createVector(this.vel.x, -this.vel.y);
    } 
    if (this.pos.y > height) { 
      this.pos = createVector(this.pos.x, 0);
      //this.vel = createVector(this.vel.x, -this.vel.y);
    } 
  }
  
  separate(birds) {
    for (let bird of birds) {
      let diff = p5.Vector.sub(this.pos, bird.pos);
      if (diff.mag() != 0) { diff.div(diff.mag()); }
      diff.mult(separationSlider.value()*this.mass);
      this.acc.add(diff);
    }
  }
  
  align(birds) {
    for (let bird of birds) {
      let angleDiff = this.vel.angleBetween(bird.vel);
      let v1 = createVector(this.vel.x, this.vel.y, 0);
      let v2 = createVector(bird.vel.x, bird.vel.y, 0);
      let v3 = v1.cross(v2);
      if (v3.z < 0) { angleDiff *= -1; }
      this.vel.rotate(alignmentSlider.value()*angleDiff);
    }
  }
  
  cohere(vCenter) {
    let diff = p5.Vector.sub(this.pos, vCenter);
    diff.mult(-coherenceSlider.value()/this.mass);
    this.acc.add(diff);
  }
}