import { useState } from "react";
import NoSleep from "nosleep.js";

import Timer from "./Timer";
import Button from "./components/Button";
import { convertToSeconds } from "./utils";
import AboutModal from "./AboutModal";

function getSectionDividers(
  initialTime: number,
  sectionCount: number,
): number[] {
  const sectionLength = Math.ceil(initialTime / sectionCount);
  const sectionDividers = [];

  let remaining = initialTime - sectionLength;

  while (remaining > 0) {
    sectionDividers.push(remaining);
    remaining = remaining - sectionLength;
  }

  return sectionDividers;
}

const App: React.FC = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(15);
  const [seconds, setSeconds] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [sectionCount, setSectionCount] = useState(1);
  const [isAboutModalOpen, setAboutModalOpen] = useState(false);

  const noSleep = new NoSleep();

  const startTimer = () => {
    setTimerStarted(true);
    noSleep.enable();
  };

  const stopTimer = () => {
    setTimerStarted(false);
    noSleep.disable();
  };

  return (
    <div className="grid h-screen place-items-center bg-gradient-to-b from-slate-900 to-gray-950 text-gray-400">
      {timerStarted ? (
        <Timer
          initialTime={convertToSeconds(hours, minutes, seconds)}
          onStop={stopTimer}
          sectionDividers={getSectionDividers(
            convertToSeconds(hours, minutes, seconds),
            sectionCount,
          )}
        />
      ) : (
        <div className="text-center">
          <p className="m-4 text-5xl">
            <input
              className="w-24 rounded-xl bg-gray-900 p-1 text-center font-mono "
              type="number"
              min={0}
              max={24}
              value={hours}
              onChange={(e) => setHours(+e.target.value)}
            />
            {" h "}
            <input
              className="w-24 rounded-xl bg-gray-900 p-1 text-center font-mono"
              type="number"
              min={0}
              max={59}
              value={minutes}
              onChange={(e) => setMinutes(+e.target.value)}
            />
            {" m "}
            <input
              className="w-24 rounded-xl bg-gray-900 p-1 text-center font-mono"
              type="number"
              min={0}
              max={59}
              value={seconds}
              onChange={(e) => setSeconds(+e.target.value)}
            />
            {" s"}
          </p>
          <p className="text-2xl">
            {"Number of sections "}
            <input
              className="w-12 rounded bg-gray-900 p-1 text-center font-mono"
              type="number"
              min={1}
              max={20}
              value={sectionCount}
              onChange={(e) => setSectionCount(+e.target.value)}
            />
          </p>

          <Button onClick={startTimer} text="Start" />
          <Button onClick={() => setAboutModalOpen(true)} text="About" />
          <AboutModal
            isOpen={isAboutModalOpen}
            onClose={() => setAboutModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default App;
