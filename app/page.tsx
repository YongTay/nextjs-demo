'use client';

import { useState, useEffect } from 'react';
import { FaCog, FaTimes, FaExpand, FaCompress, FaHourglassStart, FaPlay, FaStop, FaPause } from 'react-icons/fa'; // 确保你已经安装了 react-icons

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
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdownMinutes, setCountdownMinutes] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('countdownMinutes');
      return saved !== null ? parseInt(saved) : 0;
    }
    return 0;
  });
  const [countdownSeconds, setCountdownSeconds] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('countdownSeconds');
      return saved !== null ? parseInt(saved) : 0;
    }
    return 0;
  });
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

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

  const toggleCountdown = () => {
    setShowCountdown(!showCountdown);
    // 这里可以添加开始倒计时的逻辑
  };

  const startCountdown = () => {
    const totalSeconds = countdownMinutes * 60 + countdownSeconds;
    setRemainingTime(totalSeconds);
    setIsCountingDown(true);
    setIsPaused(false);
    setShowCountdown(false);
  };

  const stopCountdown = () => {
    setIsCountingDown(false);
    setRemainingTime(0);
    setIsPaused(false);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCountingDown && remainingTime > 0 && !isPaused) {
      timer = setInterval(() => {
        setRemainingTime(prev => prev - 1);
      }, 1000);
    } else if (remainingTime === 0 && isCountingDown) {
      setIsFinished(true);
      setIsCountingDown(false);
      setIsPaused(false);
    }
    return () => clearInterval(timer);
  }, [isCountingDown, remainingTime, isPaused]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    localStorage.setItem('countdownMinutes', countdownMinutes.toString());
  }, [countdownMinutes]);

  useEffect(() => {
    localStorage.setItem('countdownSeconds', countdownSeconds.toString());
  }, [countdownSeconds]);

  const calculateProgress = () => {
    const totalSeconds = countdownMinutes * 60 + countdownSeconds;
    return 1 - (remainingTime / totalSeconds);
  };

  const restartCountdown = () => {
    setRemainingTime(countdownMinutes * 60 + countdownSeconds);
    setIsCountingDown(true);
    setIsFinished(false);
    setIsPaused(false);
  };

  return (
    <main className="flex flex-col min-h-screen bg-black px-[10%] relative">
      {!(isCountingDown || isFinished) && (
        <div className="flex gap-2 w-full h-screen items-center">
          {currentTime.map((char, index) => (
            <div key={index} className="flex-1 aspect-[2/3] bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-[7vw] sm:text-[7.5vw] md:text-[8vw] lg:text-[8.5vw] xl:text-[9vw] font-mono font-bold text-center tabular-nums clock-text" style={{color: fontColor}}>
                {char}
              </span>
            </div>
          ))}
        </div>
      )}
      
      {(isCountingDown || isFinished) && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <svg className="w-[50vw] h-[50vw] -rotate-90" viewBox="0 0 100 100">
              <circle
                className="text-gray-700"
                strokeWidth="4"
                stroke="currentColor"
                fill="transparent"
                r="48"
                cx="50"
                cy="50"
              />
              <circle
                className="text-blue-500 transition-all duration-1000 ease-linear"
                strokeWidth="4"
                stroke="currentColor"
                fill="transparent"
                r="48"
                cx="50"
                cy="50"
                strokeDasharray="301.59"
                strokeDashoffset={301.59 * (1 - calculateProgress())}
              />
            </svg>
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[8vw] font-mono font-bold text-center tabular-nums clock-text" style={{color: fontColor}}>
              {isFinished ? formatTime(countdownMinutes * 60 + countdownSeconds) : formatTime(remainingTime)}
            </span>
          </div>
        </div>
      )}

      <button onClick={toggleSettings} className="absolute bottom-4 right-4 text-white bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors opacity-30 hover:opacity-100 focus:opacity-100">
        <FaCog size={24} />
      </button>
      <button onClick={toggleFullScreen} className="absolute bottom-4 left-4 text-white bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors opacity-30 hover:opacity-100 focus:opacity-100">
        {isFullScreen ? <FaCompress size={24} /> : <FaExpand size={24} />}
      </button>
      {!(isCountingDown || isFinished) ? (
        <button onClick={toggleCountdown} className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors opacity-30 hover:opacity-100 focus:opacity-100">
          <FaHourglassStart size={24} />
        </button>
      ) : (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
          {isCountingDown && !isFinished && (
            <>
              <button onClick={stopCountdown} className="text-white bg-red-600 p-2 rounded-full hover:bg-red-700 transition-colors opacity-30 hover:opacity-100 focus:opacity-100">
                <FaStop size={24} />
              </button>
              <button onClick={togglePause} className="text-white bg-yellow-600 p-2 rounded-full hover:bg-yellow-700 transition-colors opacity-30 hover:opacity-100 focus:opacity-100">
                {isPaused ? <FaPlay size={24} /> : <FaPause size={24} />}
              </button>
            </>
          )}
          {isFinished && (
            <button onClick={restartCountdown} className="text-white bg-green-600 p-2 rounded-full hover:bg-green-700 transition-colors opacity-30 hover:opacity-100 focus:opacity-100">
              <FaPlay size={24} />
            </button>
          )}
        </div>
      )}
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
      {showCountdown && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg relative">
            <button onClick={() => setShowCountdown(false)} className="absolute top-2 right-2 text-white hover:text-gray-300">
              <FaTimes size={20} />
            </button>
            <h2 className="text-white text-xl mb-4">设置倒计时</h2>
            <div className="flex items-center mb-4">
              <label htmlFor="minutes" className="text-white mr-2">分钟:</label>
              <input
                type="number"
                id="minutes"
                value={countdownMinutes}
                onChange={(e) => setCountdownMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-16 p-1 text-black"
                min="0"
              />
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="seconds" className="text-white mr-2">秒数:</label>
              <input
                type="number"
                id="seconds"
                value={countdownSeconds}
                onChange={(e) => setCountdownSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                className="w-16 p-1 text-black"
                min="0"
                max="59"
              />
            </div>
            <button
              onClick={startCountdown}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              <FaPlay className="inline-block mr-2" />
              开始倒计时
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
