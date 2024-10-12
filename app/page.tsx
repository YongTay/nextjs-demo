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
    <main className="flex min-h-screen items-center justify-center bg-black p-4">
      <div className="flex w-full max-w-[90vw] justify-between">
        {currentTime.map((char, index) => (
          <div key={index} className="flex-1">
            <div className="aspect-square bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-[8vw] sm:text-[10vw] md:text-[12vw] lg:text-[14vw] xl:text-[16vw] font-mono font-bold text-center tabular-nums clock-text">
                {char}
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
