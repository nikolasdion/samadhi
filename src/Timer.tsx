import { useState, useRef, useEffect } from "react";
import Button from "./Button";
import SingingBowl from "./assets/singing-bowl.mp3";
import { formatTime } from "./utils";

interface Props {
  initialTime: number;
  onStop: () => void;

  // TODO - allow the meditation to be divided into equal sessions
  sections?: number;
}

const Timer: React.FC<Props> = ({ initialTime, onStop }) => {
  const [remaining, setRemaining] = useState(initialTime);

  const [isActive, setActive] = useState(true);
  const interval = useRef<number | null>(null);
  const player = useRef<HTMLAudioElement>(new Audio(SingingBowl));

  useEffect(() => {
    if (remaining <= 0) {
      // We've reached the end of the countdown.
      player.current.play();
      onStop();
    } else {
      if (isActive) {
        if (remaining === initialTime) {
          // Play sound at the start of the timer
          player.current.play();
        }
        // Timer is running
        interval.current = setInterval(() => {
          setRemaining((time) => time - 1);
        }, 1000);
      } else {
        // Timer is paused, stop the interval
        if (interval.current) clearInterval(interval.current);
      }
    }

    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, [isActive, remaining, onStop, player, initialTime]);

  return (
    <div className="text-center grid grid-flow-row">
      <p className="text-5xl font-mono">{formatTime(remaining)}</p>
      <div>
        {" "}
        {isActive ? (
          <Button text="Pause" onClick={() => setActive(false)} />
        ) : (
          <Button text="Resume" onClick={() => setActive(true)} />
        )}
        <Button text="Stop" onClick={onStop} />
      </div>
    </div>
  );
};

export default Timer;
