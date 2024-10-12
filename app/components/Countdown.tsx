import React from 'react';

interface CountdownProps {
  remainingTime: number;
  isFinished: boolean;
  countdownMinutes: number;
  countdownSeconds: number;
  fontColor: string;
  progressColor: string;
  fontSize: number;
}

const Countdown: React.FC<CountdownProps> = ({
  remainingTime,
  isFinished,
  countdownMinutes,
  countdownSeconds,
  fontColor,
  progressColor,
  fontSize
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateProgress = () => {
    const totalSeconds = countdownMinutes * 60 + countdownSeconds;
    return 1 - (remainingTime / totalSeconds);
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[80vh] max-h-[80vh]">
      <div className="relative w-full h-full">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            className="text-gray-700"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="44"
            cx="50"
            cy="50"
          />
          <circle
            className="transition-all duration-1000 ease-linear"
            strokeWidth="8"
            stroke={progressColor}
            fill="transparent"
            r="44"
            cx="50"
            cy="50"
            strokeLinecap="round"
            strokeDasharray="276.46"
            strokeDashoffset={276.46 * (1 - calculateProgress())}
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full">
          <span 
            className="font-mono font-bold tabular-nums clock-text" 
            style={{
              color: fontColor,
              fontSize: `${fontSize * 1.5}vw`
            }}
          >
            {isFinished ? formatTime(countdownMinutes * 60 + countdownSeconds) : formatTime(remainingTime)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
