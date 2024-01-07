import { useState } from "react";
import Timer from "./Timer";
import Button from "./Button";

const App: React.FC = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(15);
  const [seconds, setSeconds] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);

  const startTimer = () => {
    setTimerStarted(true);
  };

  const stopTimer = () => {
    setTimerStarted(false);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-gray-950 h-screen grid place-items-center text-gray-400">
      {timerStarted ? (
        <Timer
          initialTime={hours * 3600 + minutes * 60 + seconds}
          onStop={stopTimer}
        />
      ) : (
        <div className="text-center">
          <p className="text-5xl font-mono">
            <input
              className="w-20 font-mono bg-transparent"
              type="number"
              min={0}
              max={24}
              value={hours}
              onChange={(e) => setHours(+e.target.value)}
            />
            {"h "}
            <input
              className="w-20 font-mono bg-transparent"
              type="number"
              min={0}
              max={59}
              value={minutes}
              onChange={(e) => setMinutes(+e.target.value)}
            />
            {"m "}
            <input
              className="w-20 font-mono bg-transparent"
              type="number"
              min={0}
              max={59}
              value={seconds}
              onChange={(e) => setSeconds(+e.target.value)}
            />
            {"s"}
          </p>

          <Button onClick={startTimer} text="Start" />
        </div>
      )}
    </div>
  );
};

export default App;
