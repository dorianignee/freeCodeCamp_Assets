import React, { useState, useEffect } from 'react';

function CountdownTimer() {
  const [countdown, setCountdown] = useState(25 * 60); // Initial countdown duration in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setCountdown(prevCountdown => {
          if (prevCountdown === 0) {
            clearInterval(interval);
            // Trigger alarm
            alert("Time's up!");
            return 25 * 60; // Reset countdown to 25 minutes
          }
          return prevCountdown - 1;
        });
      }, 1000); // Run every second
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCountdown(25 * 60);
  };

  const handleInputChange = event => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      setCountdown(value * 60);
    }
  };

  const formattedTime = () => {
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <h1>Countdown Timer</h1>
      <div>
        <input
          type="number"
          min="1"
          value={countdown / 60}
          onChange={handleInputChange}
          disabled={isRunning}
        />
        <span> minutes</span>
      </div>
      <div>
        <h2>{formattedTime()}</h2>
        {!isRunning ? (
          <button onClick={handleStart}>Start</button>
        ) : (
          <button onClick={handlePause}>Pause</button>
        )}
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default CountdownTimer;