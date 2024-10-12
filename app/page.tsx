'use client';

import { useState, useEffect, useRef } from 'react';
import Clock from './components/Clock';
import Countdown from './components/Countdown';
import ControlButtons from './components/ControlButtons';
import SettingsPanel from './components/SettingsPanel';
import CountdownSetup from './components/CountdownSetup';
import useWakeLock from './hooks/useWakeLock';

export default function Home() {
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
  const [progressColor, setProgressColor] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('progressColor') || '#3b82f6';
    }
    return '#3b82f6';
  });
  const [fontSize, setFontSize] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fontSize');
      return saved !== null ? Number(saved) : 5; // 默认值为5
    }
    return 5;
  });
  const [clockFontSize, setClockFontSize] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('clockFontSize');
      return saved !== null ? Number(saved) : 5; // 默认值为5
    }
    return 5;
  });
  const [countdownFontSize, setCountdownFontSize] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('countdownFontSize');
      return saved !== null ? Number(saved) : 5; // 默认值为5
    }
    return 5;
  });

  useWakeLock();

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

  const resetCountdown = () => {
    setRemainingTime(countdownMinutes * 60 + countdownSeconds);
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

  const showCurrentTime = () => {
    setIsCountingDown(false);
    setIsFinished(false);
  };

  const resetAllSettings = () => {
    setShowSeconds(true);
    setFontColor('#ffffff');
    setProgressColor('#3b82f6');
    setClockFontSize(5);
    setCountdownFontSize(5);
    
    localStorage.setItem('showSeconds', JSON.stringify(true));
    localStorage.setItem('fontColor', '#ffffff');
    localStorage.setItem('progressColor', '#3b82f6');
    localStorage.setItem('clockFontSize', '5');
    localStorage.setItem('countdownFontSize', '5');
  };

  useEffect(() => {
    localStorage.setItem('showSeconds', JSON.stringify(showSeconds));
  }, [showSeconds]);

  useEffect(() => {
    localStorage.setItem('fontColor', fontColor);
  }, [fontColor]);

  useEffect(() => {
    localStorage.setItem('progressColor', progressColor);
  }, [progressColor]);

  useEffect(() => {
    localStorage.setItem('clockFontSize', clockFontSize.toString());
  }, [clockFontSize]);

  useEffect(() => {
    localStorage.setItem('countdownFontSize', countdownFontSize.toString());
  }, [countdownFontSize]);

  const closeCountdown = () => {
    setIsCountingDown(false);
    setIsFinished(false);
    setShowCountdown(false);
  };

  return (
    <main className="flex flex-col min-h-screen bg-black px-[10%] relative">
      {!(isCountingDown || isFinished) && (
        <Clock showSeconds={showSeconds} fontColor={fontColor} fontSize={clockFontSize} />
      )}
      
      {(isCountingDown || isFinished) && (
        <Countdown
          remainingTime={remainingTime}
          isFinished={isFinished}
          countdownMinutes={countdownMinutes}
          countdownSeconds={countdownSeconds}
          fontColor={fontColor}
          progressColor={progressColor}
          fontSize={countdownFontSize}
        />
      )}

      <ControlButtons
        isCountingDown={isCountingDown}
        isFinished={isFinished}
        isPaused={isPaused}
        toggleSettings={toggleSettings}
        toggleFullScreen={toggleFullScreen}
        isFullScreen={isFullScreen}
        toggleCountdown={toggleCountdown}
        resetCountdown={resetCountdown}
        togglePause={togglePause}
        closeCountdown={closeCountdown}
        restartCountdown={restartCountdown}
        showCurrentTime={showCurrentTime}
      />

      {showSettings && (
        <SettingsPanel
          showSeconds={showSeconds}
          setShowSeconds={setShowSeconds}
          fontColor={fontColor}
          setFontColor={setFontColor}
          progressColor={progressColor}
          setProgressColor={setProgressColor}
          clockFontSize={clockFontSize}
          setClockFontSize={setClockFontSize}
          countdownFontSize={countdownFontSize}
          setCountdownFontSize={setCountdownFontSize}
          resetAllSettings={resetAllSettings}
          toggleSettings={toggleSettings}
        />
      )}

      {showCountdown && (
        <CountdownSetup
          countdownMinutes={countdownMinutes}
          setCountdownMinutes={setCountdownMinutes}
          countdownSeconds={countdownSeconds}
          setCountdownSeconds={setCountdownSeconds}
          startCountdown={startCountdown}
          setShowCountdown={setShowCountdown}
        />
      )}
    </main>
  );
}
