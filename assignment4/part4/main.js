// set up canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Ball extends Shape {
  constructor(x, y, velX, velY, size, color) {
      super(x, y, velX, velY);
      this.size = size;
      this.color = color;
      this.exists = true;
  }

  draw() {
    if (this.exists) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

  update() {
    if (this.x + this.size >= width) {
      this.velX = -Math.abs(this.velX);
    }

    if (this.x - this.size <= 0) {
      this.velX = Math.abs(this.velX);
    }

    if (this.y + this.size >= height) {
      this.velY = -Math.abs(this.velY);
    }

    if (this.y - this.size <= 0) {
      this.velY = Math.abs(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball) && ball.exits) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

class EvilCircle extends Shape {
  constructor(x, y) {
      super(x, y, 20, 20);
      this.color = 'white';
      this.size = 10;

      window.addEventListener('keydown', (e) => {
          switch (e.key) {
              case 'a':
                  this.x -= this.velX;
                  break;
              case 'd':
                  this.x += this.velX;
                  break;
              case 'w':
                  this.y -= this.velY;
                  break;
              case 's':
                  this.y += this.velY;
                  break;
          }
      });
  }


const balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
}

checkBounds() {
    if (this.x - this.size < 0) this.x = this.size;
    if (this.x + this.size > canvas.width) this.x = canvas.width - this.size;
    if (this.y - this.size < 0) this.y = this.size;
    if (this.y + this.size > canvas.height) this.y = canvas.height - this.size;
}

collisionDetect() {
    for (const ball of balls) {
        if (ball.exists) {
            const dx = this.x - ball.x;
            const dy = this.y - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + ball.size) {
                ball.exists = false;
                ballCount--;
                ballCountDisplay.textContent = ballCount;
            }
        }
    }
}
}

function random(min, max) {
return Math.floor(Math.random() * (max - min)) + min;
}

function randomRGB() {
return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Create balls
function createBalls() {
while (balls.length < 25) {
    const size = random(10, 20);
    const ball = new Ball(
        random(size, canvas.width - size),
        random(size, canvas.height - size),
        random(-7, 7),
        random(-7, 7),
        size,
        randomRGB()
    );
    balls.push(ball);
    ballCount++;
    ballCountDisplay.textContent = ballCount;
}
}

const evilCircle = new EvilCircle(random(0, canvas.width), random(0, canvas.height));

// Animation loop
function loop() {
ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
ctx.fillRect(0, 0, canvas.width, canvas.height);

for (const ball of balls) {
    if (ball.exists) {
        ball.draw();
        ball.update();
        ball.collisionDetect();
    }
}

evilCircle.draw();
evilCircle.checkBounds();
evilCircle.collisionDetect();

requestAnimationFrame(loop);
}

createBalls();
loop();