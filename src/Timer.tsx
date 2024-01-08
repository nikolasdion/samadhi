import { useState, useRef, useEffect } from "react";
import Button from "./components/Button";
import SingingBowl from "./assets/singing-bowl.mp3";
import { formatTime } from "./utils";

interface Props {
  initialTime: number;
  onStop: () => void;

  // Seconds at which a bell should be rung to indicate the end of one section
  sectionDividers: number[];
}

const Timer: React.FC<Props> = ({ initialTime, onStop, sectionDividers }) => {
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
        if (remaining === initialTime || sectionDividers.includes(remaining)) {
          // Play sound at the start of the timer or the start of each section
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
  }, [isActive, remaining, onStop, player, initialTime, sectionDividers]);

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
