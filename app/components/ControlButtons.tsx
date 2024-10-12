import React from 'react';
import { FaCog, FaExpand, FaCompress, FaHourglassStart, FaPlay, FaRedo, FaPause, FaClock, FaTimes } from 'react-icons/fa';

interface ControlButtonsProps {
  isCountingDown: boolean;
  isFinished: boolean;
  isPaused: boolean;
  toggleSettings: () => void;
  toggleFullScreen: () => void;
  isFullScreen: boolean;
  toggleCountdown: () => void;
  resetCountdown: () => void;
  togglePause: () => void;
  closeCountdown: () => void;
  restartCountdown: () => void;
  showCurrentTime: () => void;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  isCountingDown,
  isFinished,
  isPaused,
  toggleSettings,
  toggleFullScreen,
  isFullScreen,
  toggleCountdown,
  resetCountdown,
  togglePause,
  closeCountdown,
  restartCountdown,
  showCurrentTime
}) => {
  return (
    <>
      <button onClick={toggleSettings} className="absolute bottom-4 right-4 text-white bg-gray-800 p-2 rounded-full opacity-30 hover:opacity-100 transition-opacity">
        <FaCog size={24} />
      </button>
      <button onClick={toggleFullScreen} className="absolute bottom-4 left-4 text-white bg-gray-800 p-2 rounded-full opacity-30 hover:opacity-100 transition-opacity">
        {isFullScreen ? <FaCompress size={24} /> : <FaExpand size={24} />}
      </button>
      {!(isCountingDown || isFinished) ? (
        <button onClick={toggleCountdown} className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-blue-600 p-2 rounded-full opacity-30 hover:opacity-100 transition-opacity">
          <FaHourglassStart size={24} />
        </button>
      ) : (
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex flex-col space-y-4">
          {isCountingDown && !isFinished && (
            <>
              <button onClick={resetCountdown} className="text-white bg-blue-600 p-2 rounded-full opacity-30 hover:opacity-100 transition-opacity">
                <FaRedo size={24} />
              </button>
              <button onClick={togglePause} className="text-white bg-yellow-600 p-2 rounded-full opacity-30 hover:opacity-100 transition-opacity">
                {isPaused ? <FaPlay size={24} /> : <FaPause size={24} />}
              </button>
              <button onClick={closeCountdown} className="text-white bg-red-600 p-2 rounded-full opacity-30 hover:opacity-100 transition-opacity">
                <FaTimes size={24} />
              </button>
            </>
          )}
          {isFinished && (
            <>
              <button onClick={restartCountdown} className="text-white bg-green-600 p-2 rounded-full opacity-30 hover:opacity-100 transition-opacity">
                <FaPlay size={24} />
              </button>
              <button onClick={showCurrentTime} className="text-white bg-blue-600 p-2 rounded-full opacity-30 hover:opacity-100 transition-opacity">
                <FaClock size={24} />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ControlButtons;
