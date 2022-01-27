
const road = new Image();
road.src = "/images/road.png";
const myObstacles = [];
//const player;

window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  function startGame() {
    myGameArea.start();
    player = new Car(225, 610);
    
  }
};

const myGameArea = {
  canvas: document.getElementById('canvas'),
  frames: 0,
  start: function() {
    this.ctx = this.canvas.getContext('2d');
    ctx = this.ctx;
    this.interval = setInterval(updateGameArea, 20);
  },
  clear: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function() {
    clearInterval(this.interval);
  },
  score: function() {
    const points = Math.floor(this.frames / 10);
    this.ctx.font = '30px arial';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(`Score: ${points}`, 80, 35);
  }
}


function updateGameArea() {
  myGameArea.clear();
  myGameArea.frames += 1;
  ctx.drawImage(road, 0, 0, 500, 700);
  player.newPos();
  updateObstacles();
  player.draw();
  myGameArea.score();
  
}

class Car {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 80;
    this.img = new Image();
    this.img.src = "/images/car.png"
    this.speedX = 0;
    this.speedY = 0;
    
  }
  draw(){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  left(){
    return this.x
  }
  right(){
    return this.x + this.width;
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }
  newPos(){
    this.x += this.speedX;    
  }
  crashWith(obstacle) {
    return !(
      this.bottom() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.right() < obstacle.left() ||
      this.left() > obstacle.right()
    );
  }
}

class Component {
  constructor(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
  }
  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }
  update() {
    ctx = myGameArea.ctx;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}


function updateObstacles() {
  for (let i = 0; i < myObstacles.length; i++){
  myObstacles[i].y += 2;
  myObstacles[i].update();
  }

  

  if (myGameArea.frames % 100 === 0) {
    
    let y = myGameArea.canvas.height;
    let minWidth = 120;
    let maxWidth = 300;

    let width = Math.floor(Math.random() * (maxWidth - minWidth) + minWidth);

    let minX = 40;
    let maxX = 500;

    let x = Math.floor(Math.random() * (maxX - minX) - minX);

    myObstacles.push(new Component(width, 30, 'red', x, -30))
    
  }
}

document.addEventListener('keydown', (e) => {
  switch(e.code) {
    case 'ArrowLeft':
      player.speedX = -5;
      break;
    case 'ArrowRight':
      player.speedX = 5;
      break;
  }
});

document.addEventListener('keyup', (e) => {
  player.speedX = 0;
})