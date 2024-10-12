'use client';

import { useState, useEffect } from 'react';
import { FaCog, FaTimes, FaExpand, FaCompress } from 'react-icons/fa'; // 确保你已经安装了 react-icons

export default function Home() {
  const [currentTime, setCurrentTime] = useState<string[]>([]);
  const [showSeconds, setShowSeconds] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('showSeconds');
      return saved !== null ? JSON.parse(saved) : true;
    }
    return true;
  });
  const [showSettings, setShowSettings] = useState(false);
  const [fontColor, setFontColor] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('fontColor') || '#ffffff';
    }
    return '#ffffff';
  });
  const [isFullScreen, setIsFullScreen] = useState(false);

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

  useEffect(() => {
    localStorage.setItem('showSeconds', JSON.stringify(showSeconds));
  }, [showSeconds]);

  useEffect(() => {
    localStorage.setItem('fontColor', fontColor);
  }, [fontColor]);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  const toggleSettings = () => setShowSettings(!showSettings);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-[10%] relative">
      <div className="flex gap-2 w-full">
        {currentTime.map((char, index) => (
          <div key={index} className="flex-1 aspect-[2/3] bg-gray-800 rounded-lg flex items-center justify-center">
            <span className="text-[7vw] sm:text-[7.5vw] md:text-[8vw] lg:text-[8.5vw] xl:text-[9vw] font-mono font-bold text-center tabular-nums clock-text" style={{color: fontColor}}>
              {char}
            </span>
          </div>
        ))}
      </div>
      <button onClick={toggleSettings} className="absolute bottom-4 right-4 text-white bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors">
        <FaCog size={24} />
      </button>
      <button onClick={toggleFullScreen} className="absolute bottom-4 left-4 text-white bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors">
        {isFullScreen ? <FaCompress size={24} /> : <FaExpand size={24} />}
      </button>
      {showSettings && (
        <div className="absolute bottom-16 right-4 bg-gray-800 p-4 rounded-lg shadow-lg">
          <button onClick={toggleSettings} className="absolute top-2 right-2 text-white hover:text-gray-300">
            <FaTimes size={20} />
          </button>
          <h2 className="text-white text-xl mb-4">设置</h2>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="showSeconds"
              checked={showSeconds}
              onChange={() => setShowSeconds(!showSeconds)}
              className="mr-2"
            />
            <label htmlFor="showSeconds" className="text-white">显示秒数</label>
          </div>
          <div className="flex items-center">
            <label htmlFor="fontColor" className="text-white mr-2">字体颜色:</label>
            <input
              type="color"
              id="fontColor"
              value={fontColor}
              onChange={(e) => setFontColor(e.target.value)}
              className="w-8 h-8 rounded"
            />
          </div>
        </div>
      )}
    </main>
  );
}
