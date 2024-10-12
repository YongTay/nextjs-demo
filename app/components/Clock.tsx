import React, { useState, useEffect } from 'react';

interface ClockProps {
  showSeconds: boolean;
  fontColor: string;
}

const Clock: React.FC<ClockProps> = ({ showSeconds, fontColor }) => {
  const [currentTime, setCurrentTime] = useState<string[]>([]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit',
        second: showSeconds ? '2-digit' : undefined,
        hour12: false
      });
      setCurrentTime(timeString.split(''));
    };

    updateTime();
    const timerId = setInterval(updateTime, 1000);

    return () => clearInterval(timerId);
  }, [showSeconds]);

  return (
    <div className="flex gap-2 w-full h-screen items-center">
      {currentTime.map((char, index) => (
        <div key={index} className="flex-1 aspect-[2/3] bg-gray-800 rounded-lg flex items-center justify-center">
          <span className="text-[7vw] sm:text-[7.5vw] md:text-[8vw] lg:text-[8.5vw] xl:text-[9vw] font-mono font-bold text-center tabular-nums clock-text" style={{color: fontColor}}>
            {char}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Clock;
