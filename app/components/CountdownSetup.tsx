import React from 'react';
import { FaPlay, FaTimes } from 'react-icons/fa';

interface CountdownSetupProps {
  countdownMinutes: number;
  setCountdownMinutes: (minutes: number) => void;
  countdownSeconds: number;
  setCountdownSeconds: (seconds: number) => void;
  startCountdown: () => void;
  setShowCountdown: (show: boolean) => void;
}

const CountdownSetup: React.FC<CountdownSetupProps> = ({
  countdownMinutes,
  setCountdownMinutes,
  countdownSeconds,
  setCountdownSeconds,
  startCountdown,
  setShowCountdown
}) => {
  return (
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
  );
};

export default CountdownSetup;
