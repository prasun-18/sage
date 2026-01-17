# sage
## [Still working on it]


function autoPlay() {
  const runner = Runner.instance_;
  const obstacles = runner.horizon.obstacles;

  if (obstacles.length > 0) {
    const firstObstacle = obstacles[0];
    
    // Jump if the obstacle is close (xPos < 100)
    if (firstObstacle.xPos < 100 && !runner.tRex.jumping) {
        runner.tRex.startJump(runner.currentSpeed);
    }
  }
  requestAnimationFrame(autoPlay);
}
autoPlay();
