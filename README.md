# sage
## [Still working on it]


function autoPlay() {
  const runner = Runner.instance_;
  
  // Check if runner and the horizon exist to avoid the TypeError
  if (runner && runner.horizon && runner.horizon.obstacles.length > 0) {
    const firstObstacle = runner.horizon.obstacles[0];
    
    // Adjust the '75' value to change jump timing (lower = later jump)
    if (firstObstacle.xPos < 75 && !runner.tRex.jumping) {
        // Create a fake 'keydown' event for jumping
        const jumpEvent = new KeyboardEvent('keydown', {keyCode: 32});
        document.dispatchEvent(jumpEvent);
    }
  }
  requestAnimationFrame(autoPlay);
}

// Start the loop
autoPlay();
