'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [currentTime, setCurrentTime] = useState<string[]>([]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setCurrentTime(timeString.split(''));
    };

    updateTime();
    const timerId = setInterval(updateTime, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-[10%]">
      <div className="flex gap-2 w-full">
        {currentTime.map((char, index) => (
          <div key={index} className="flex-1 aspect-[3/4] bg-gray-800 rounded-lg flex items-center justify-center">
            <span className="text-[3vw] sm:text-[3.5vw] md:text-[4vw] lg:text-[4.5vw] xl:text-[5vw] font-mono font-bold text-center tabular-nums clock-text">
              {char}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
