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
    
    this.vel.mult(1-0.01*this.mass); // velocities slowly decay to offset extra forces from flocking
    
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
      this.acc.add(
        p5.Vector.sub(this.pos, bird.pos)
        .normalize()
        .mult(separationSlider.value()*this.mass)
      );
    }
  }
  
  align(birds) {
    for (let bird of birds) {
      this.vel.rotate(
        alignmentSlider.value() * 
        this.vel.angleBetween(bird.vel) *
        ((createVector(this.vel.x, this.vel.y, 0)
          .cross(createVector(bird.vel.x, bird.vel.y, 0)).z < 0) 
          ? -1 : 1) // cross product negative -> left handed turn
      );
    }
  }
  
  cohere(vCenter) {
    this.acc.add(p5.Vector.sub(this.pos, vCenter)
                 .mult(-coherenceSlider.value()/this.mass));
  }
}