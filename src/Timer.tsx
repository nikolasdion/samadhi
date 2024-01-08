import { useState, useRef, useEffect } from "react";
import Button from "./components/Button";
import SingingBowl from "./assets/singing-bowl.mp3";
import { getHoursMinutesSeconds } from "./utils";

interface Props {
  initialTime: number;
  onStop: () => void;

  // Seconds at which a bell should be rung to indicate the end of one section
  sectionDividers: number[];
}

const Timer: React.FC<Props> = ({ initialTime, onStop, sectionDividers }) => {
  const [remaining, setRemaining] = useState(initialTime);

  const [isActive, setActive] = useState(true);
  const interval = useRef<number>();
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

  const [hours, minutes, seconds] = getHoursMinutesSeconds(remaining);

  return (
    <div className="text-center grid grid-flow-row z-0">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <p className="text-5xl m-4">
          <div className="w-24 p-2 font-mono bg-gray-900 text-center rounded-xl inline-block">
            {hours}
          </div>
          {" h "}
          <div className="w-24 p-2 font-mono bg-gray-900 text-center rounded-xl inline-block">
            {(minutes < 10 ? "0" : "") + minutes}
          </div>
          {" m "}
          <div className="w-24 p-2 font-mono bg-gray-900 text-center rounded-xl inline-block">
            {(seconds < 10 ? "0" : "") + seconds}
          </div>
          {" s"}
        </p>{" "}
        <div>
          {isActive ? (
            <Button text="Pause" onClick={() => setActive(false)} />
          ) : (
            <Button text="Resume" onClick={() => setActive(true)} />
          )}
          <Button text="Stop" onClick={onStop} />
        </div>
      </div>

      {/* Centre indicator - for debugging */}
      {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 z-50" /> */}

      {/* Circle indicating progress */}
      <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[800px] z-10 -rotate-90">
        <circle
          r="250"
          cy="50%"
          cx="50%"
          className="fill-transparent stroke-slate-500 stroke-2 "
        ></circle>
        <circle
          r="250"
          cx="50%"
          cy="50%"
          style={{
            strokeDasharray: "1570px", // 2 * pi * radius
            strokeDashoffset: `${(remaining / initialTime) * 1570}px`,
          }}
          className="fill-transparent stroke-slate-800  stroke-2 "
        ></circle>
      </svg>
    </div>
  );
};

export default Timer;
