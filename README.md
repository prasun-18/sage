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



(function automateDino() {
    const JUMP_DISTANCE = 100;

    setInterval(() => {
        const runner = Runner.instance_;
        if (!runner || !runner.horizon || runner.horizon.obstacles.length === 0) return;

        const obstacle = runner.horizon.obstacles[0];

        // Only jump if the obstacle is close and Dino is on the ground
        if (obstacle.xPos < JUMP_DISTANCE && !runner.tRex.jumping) {
            // Trigger jump
            const keyDown = new KeyboardEvent('keydown', { keyCode: 32 });
            document.dispatchEvent(keyDown);
            
            // Short delay then trigger landing (helps with fast obstacles)
            setTimeout(() => {
                const keyUp = new KeyboardEvent('keyup', { keyCode: 32 });
                document.dispatchEvent(keyUp);
            }, 100);
        }
    }, 10); // Checks every 10ms
})();
