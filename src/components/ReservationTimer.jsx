import React, { useEffect, useState } from "react";

const ReservationTimer = ({ timeLeft, onExpire }) => {
    // components memory
  const [seconds, setSeconds] = useState(timeLeft);

//   useEffect checks if seconds hits 0 it triggers onExpire and tells you to cancel the reservation
  useEffect(() => {
    if (seconds <= 0) {
      onExpire();
      return;
    }

    // // The Tick: It sets up an interval (a heartbeat) that runs every1 second and subtracts 1 from our current time.
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    
// The Cleanup: return () => clearInterval(timer); is super important. It stops the timer if the user leaves the page so the app doesn't crash or leak memory.
    return () => clearInterval(timer);
  }, [seconds, onExpire]);

//   to display time left in minutes and seconds formart
  const formatTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div>
      <h3>Time Remaining: {formatTime()}</h3>
      <p>If you don’t arrive in time, your table will be released.</p>
    </div>
  );
};

export default ReservationTimer;