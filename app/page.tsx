'use client';

import { useState, useEffect } from 'react';
import { FaCog, FaTimes } from 'react-icons/fa'; // 确保你已经安装了 react-icons

export default function Home() {
  const [currentTime, setCurrentTime] = useState<string[]>([]);
  const [showSeconds, setShowSeconds] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

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

  const toggleSettings = () => setShowSettings(!showSettings);

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-[10%] relative">
      <div className="flex gap-2 w-full">
        {currentTime.map((char, index) => (
          <div key={index} className="flex-1 aspect-[2/3] bg-gray-800 rounded-lg flex items-center justify-center">
            <span className="text-[7vw] sm:text-[7.5vw] md:text-[8vw] lg:text-[8.5vw] xl:text-[9vw] font-mono font-bold text-center tabular-nums clock-text">
              {char}
            </span>
          </div>
        ))}
      </div>
      <button onClick={toggleSettings} className="absolute bottom-4 right-4 text-white bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors">
        <FaCog size={24} />
      </button>
      {showSettings && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg relative">
            <button onClick={toggleSettings} className="absolute top-2 right-2 text-white hover:text-gray-300">
              <FaTimes size={20} />
            </button>
            <h2 className="text-white text-xl mb-4">设置</h2>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showSeconds"
                checked={showSeconds}
                onChange={() => setShowSeconds(!showSeconds)}
                className="mr-2"
              />
              <label htmlFor="showSeconds" className="text-white">显示秒数</label>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
