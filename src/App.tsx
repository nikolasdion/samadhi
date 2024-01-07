import { useEffect, useRef, useState } from "react";

const formatTime = (timeInS: number): string => {
  const min = Math.floor(timeInS / 60);
  const sec = timeInS % 60;

  return `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
};

const App: React.FC = () => {
  const [time, setTime] = useState(150);
  const [isActive, setActive] = useState(false);
  const interval = useRef<number | null>(null);

  useEffect(() => {
    if (time <= 0) {
      setActive(false);
      // TODO: play sound
    } else {
      if (isActive) {
        interval.current = setInterval(() => {
          setTime((time) => time - 1);
        }, 1000);
      } else {
        if (interval.current) clearInterval(interval.current);
      }
    }

    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, [isActive, time]);

  const ResumePauseButton = () => {
    return (
      <button
        className={`w-auto p-3 text-lg ${
          isActive ? "bg-orange-300" : "bg-green-300"
        } `}
        onClick={() => setActive(!isActive)}
      >
        {isActive ? "Pause" : "Resume"}
      </button>
    );
  };

  return (
    <div className="bg-slate-300 h-screen grid place-items-center">
      <div className="text-center">
        <p className="text-5xl font-mono">{formatTime(time)}</p>
        {ResumePauseButton()}
      </div>
    </div>
  );
};

export default App;
