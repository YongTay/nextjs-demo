import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface SettingsPanelProps {
  showSeconds: boolean;
  setShowSeconds: (show: boolean) => void;
  fontColor: string;
  setFontColor: (color: string) => void;
  progressColor: string;
  setProgressColor: (color: string) => void;
  clockFontSize: number;
  setClockFontSize: (size: number) => void;
  countdownFontSize: number;
  setCountdownFontSize: (size: number) => void;
  resetAllSettings: () => void;
  toggleSettings: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  showSeconds,
  setShowSeconds,
  fontColor,
  setFontColor,
  progressColor,
  setProgressColor,
  clockFontSize,
  setClockFontSize,
  countdownFontSize,
  setCountdownFontSize,
  resetAllSettings,
  toggleSettings
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-md max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-white text-2xl font-bold">设置</h2>
          <button onClick={toggleSettings} className="text-white hover:text-gray-300">
            <FaTimes size={24} />
          </button>
        </div>
        <div className="overflow-y-auto flex-grow">
          <div className="space-y-6 p-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showSeconds"
                checked={showSeconds}
                onChange={() => setShowSeconds(!showSeconds)}
                className="mr-3 h-5 w-5"
              />
              <label htmlFor="showSeconds" className="text-white text-lg">显示秒数</label>
            </div>
            <div>
              <label htmlFor="fontColor" className="text-white text-lg block mb-2">字体颜色:</label>
              <input
                type="color"
                id="fontColor"
                value={fontColor}
                onChange={(e) => setFontColor(e.target.value)}
                className="w-full h-10 rounded"
              />
            </div>
            <div>
              <label htmlFor="progressColor" className="text-white text-lg block mb-2">进度条颜色:</label>
              <input
                type="color"
                id="progressColor"
                value={progressColor}
                onChange={(e) => setProgressColor(e.target.value)}
                className="w-full h-10 rounded"
              />
            </div>
            <div>
              <label htmlFor="clockFontSize" className="text-white text-lg block mb-2">时钟字体大小: {clockFontSize}</label>
              <input
                type="range"
                id="clockFontSize"
                min="1"
                max="10"
                value={clockFontSize}
                onChange={(e) => setClockFontSize(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="countdownFontSize" className="text-white text-lg block mb-2">倒计时字体大小: {countdownFontSize}</label>
              <input
                type="range"
                id="countdownFontSize"
                min="1"
                max="10"
                value={countdownFontSize}
                onChange={(e) => setCountdownFontSize(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-gray-700">
          <button
            onClick={resetAllSettings}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-4 rounded w-full"
          >
            重置所有设置
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
