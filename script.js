const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

// Define the T piece (you can add other shapes here)
const matrix = [
  [1, 1, 1],
  [0, 1, 0]
];

// Create the game arena (12 columns x 20 rows)
const arena = createMatrix(12, 20);

// Set up the player with a T piece
const player = {
  matrix: matrix,
  pos: {x: 5, y: 0},
  score: 0
};

// Set up the game's main loop
let lastTime = 0;
function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;
  
  // Move the player piece down by 1 unit
  player.pos.y++;

  // Check for collisions
  if (collides(arena, player)) {
    player.pos.y--; // Undo the move
    merge(arena, player); // Merge the piece into the arena
    player.pos.y = 0; // Reset to the top
    player.pos.x = 5; // Reset to the center
    player.matrix = matrix; // Reset to the starting piece
  }

  // Draw the updated game state
  draw();
  
  // Call the next update
  requestAnimationFrame(update);
}

// Start the game loop
requestAnimationFrame(update);

// Draw the current game state
function draw() {
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the arena (merged pieces)
  drawMatrix(arena, {x: 0, y: 0});

  // Draw the falling piece (the current piece the player controls)
  drawMatrix(player.matrix, player.pos);

  // Display the score
  context.fillStyle = 'white';
  context.font = '1px monospace';
  context.fillText(`Score: ${player.score}`, 1, 1);
}

// Draw a matrix (either the arena or the falling piece)
function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell !== 0) {
        context.fillStyle = 'blue'; // Change color if needed
        context.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
}

// Create an empty matrix for the game arena
function createMatrix(width, height) {
  const matrix = [];
  while (height--) {
    matrix.push(new Array(width).fill(0));
  }
  return matrix;
}

// Check if the player's piece has collided with something in the arena
function collides(arena, player) {
  const [m, o] = [player.matrix, player.pos];
  for (let y = 0; y < m.length; y++) {
    for (let x = 0; x < m[y].length; x++) {
      if (m[y][x] !== 0 && 
        (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
        return true;
      }
    }
  }
  return false;
}

// Merge the player's piece with
