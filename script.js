const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
context.scale(20, 20);

// Tetromino shapes
const matrix = [
  [0, 0, 0],
  [1, 1, 1],
  [0, 1, 0],
];

function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = 'red';
        context.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
}

let player = {
  pos: {x: 5, y: 5},
  matrix: matrix,
};

function draw() {
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);
  drawMatrix(player.matrix, player.pos);
}

function update() {
  draw();
  player.pos.y++;
  setTimeout(update, 1000);
}

update();
