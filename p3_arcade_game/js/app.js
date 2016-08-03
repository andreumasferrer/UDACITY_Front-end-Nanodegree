/* ------ GAME SETTINGS & STATUS ------ */
var game = {
  "settings": {
    // Initial position for the player in column/row format
    "init_col": 2,
    "init_row": 5,
    // Inital enemy max and min speeds (range for random speeds initialization)
    "min_enemy_speed": 25,
    "max_enemy_speed": 175
  },
  "status": {
    "score": 0,
    "lives": 3
  }
};

// Print game score & remaining lives
game.render = function() {
  // Set text attributes
  ctx.font = '30pt Impact';
  ctx.textAlign = 'right';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;
  ctx.fillStyle = 'yellow';
  // Print game score
  var scoreText = "Score: " + game.status.score;
  ctx.fillText(scoreText, canvas.width, 40);
  ctx.strokeText(scoreText, canvas.width, 40);

  // Set text attributes
  ctx.textAlign = 'left';
  // Print lives
  var livesText = "Lives: " + game.status.lives;
  ctx.fillText(livesText, 0, 40);
  ctx.strokeText(livesText, 0, 40);

  // If no more lives, render game over text
  if (game.status.lives === 0) {
    game.renderGameOver();
  }
};

// Function for rendering "Game Over" message
game.renderGameOver = function() {
  // Set text attributes
  ctx.font = '30pt Impact';
  ctx.textAlign = 'center';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.fillStyle = 'yellow';

  // Print Game Over message
  var scoreText = "GAME OVER!";
  ctx.fillText(scoreText, canvas.width / 2, canvas.height / 2);
  ctx.strokeText(scoreText, canvas.width / 2, canvas.height / 2);

  // Set text attributes
  ctx.font = '20pt Impact';
  ctx.lineWidth = 1;

  // Print "press return to continue" message
  var infoText = "Press 'Return' to start again";
  ctx.fillText(infoText, canvas.width / 2, canvas.height / 2 + 30);
  ctx.strokeText(infoText, canvas.width / 2, canvas.height / 2 + 30);
};


/* ------ ENEMY CLASS ------ */
var Enemy = function() {
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png"; //'images/enemy-bug.png';
  // Calls reset function to ramdomly sets enemy's new position and speed
  // Position is set in pixels: this.x & this.y. Speed is an integer: this.speed
  this.reset();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // Check if the enemy has reached the end of the grid (width = 505px)
  if (this.x <= 505) {
    // Move enemy to the right at his speed. Multiplying the movement by the dt
    // parameter ensures the game runs at the same speed for all computers.
    this.x += this.speed * dt;
  } else {
    // Put the enemy at the begining. It also sets a new random speed.
    this.reset();
  }

  // Check if there is a collision with the player
  //TODO: Decouple Enemy & Player objects by moving collision logic to engine.js
  var player_x_pos = player.x(),
    player_y_pos = player.y();
  // Check overlaping enemy and player positions.
  if ((this.x + 80 >= player_x_pos) && (this.x <= (player_x_pos + 80)) &&
    (this.y === player_y_pos)) {
    game.status.lives--;
    // Put player back to its initial position
    player.reset();
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Reset enemy's position and speed
// Sets this.x, this.y and this.speed attributes
Enemy.prototype.reset = function() {
  // Puts the initial x position is ouside at the left of the grid
  this.x = -101;
  // Generates a random row number between 1 and 3 (enemy rows)
  var new_row = Math.floor((Math.random() * 3) + 1);
  // Convert row position to pixels
  this.y = (new_row * 83) - 20;
  var min = game.settings.min_enemy_speed;
  var max = game.settings.max_enemy_speed
    // Set a random speed between min_enemy_speed and max_enemy_speed.
  this.speed = Math.floor(Math.random() * (max - min + 1) + min);
};


/* ------ PLAYER CLASS ------ */
// Parameters in the constructor are the initial positions in the grid (column and row)
var Player = function(col, row) {
  // The image/sprite for the player, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/char-boy.png";
  // Player current position expresed in row & column
  this.col = col;
  this.row = row;
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
  if (this.row === 0) {
    // Player reached the water (first row)
    game.status.score++;
    this.reset();
    // Increas speed range and recalculate the speed of the enemies
    //TODO: Decouple Enemies & player objects
    allEnemies.forEach(function(enemy) {
      game.settings.min_enemy_speed += 5;
      game.settings.max_enemy_speed += 5;
      var min = game.settings.min_enemy_speed;
      var max = game.settings.max_enemy_speed;
      // Set a random speed between min_enemy_speed and max_enemy_speed.
      // TODO: Implement an enemy method to increase speed (DRY code)
      enemy.speed = Math.floor(Math.random() * (max - min + 1) + min);
    });

  };
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x(), this.y());
};

// Update the posion of the player depending on pressed key
Player.prototype.handleInput = function(key) {
  switch (key) {
    //If statements in each case are to prevent movements outside the board.
    case "up":
      if (this.row > 0) this.row--;
      break;
    case "down":
      if (this.row < 5) this.row++;
      break;
    case "left":
      if (this.col > 0) this.col--;
      break;
    case "right":
      if (this.col < 4) this.col++;
      break;
    default:
      break;
  }
};

// Reset player to its initial position
Player.prototype.reset = function() {
  this.col = game.settings.init_col;
  this.row = game.settings.init_row;
};

// Returns player x position. Converts grid column position to pixels position
Player.prototype.x = function() {
  return this.col * 101;
};

// Returns player y position. Converts grid row position to pixels position
Player.prototype.y = function() {
  return (this.row * 83) - 20;
};


/* ------ GAME OBJECTS INSTANTIATION CLASS ------ */
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
var player = new Player(game.settings.init_col, game.settings.init_row);


/* ------ KEY INPUT EVENT LISTENER ------ */
// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  if (game.status.lives <= 0 && e.keyCode === 13) {
    // If the game is over, the animation is stopped, reload page when user
    // press return (key=13)
    location.reload();
  } else {
    player.handleInput(allowedKeys[e.keyCode]);
  }
});
