import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface SettingsPanelProps {
  showSeconds: boolean;
  setShowSeconds: (show: boolean) => void;
  fontColor: string;
  setFontColor: (color: string) => void;
  progressColor: string;
  setProgressColor: (color: string) => void;
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
  resetAllSettings,
  toggleSettings
}) => {
  return (
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
      <div className="flex items-center mb-4">
        <label htmlFor="fontColor" className="text-white mr-2">字体颜色:</label>
        <input
          type="color"
          id="fontColor"
          value={fontColor}
          onChange={(e) => setFontColor(e.target.value)}
          className="w-8 h-8 rounded"
        />
      </div>
      <div className="flex items-center mb-4">
        <label htmlFor="progressColor" className="text-white mr-2">进度条颜色:</label>
        <input
          type="color"
          id="progressColor"
          value={progressColor}
          onChange={(e) => setProgressColor(e.target.value)}
          className="w-8 h-8 rounded"
        />
      </div>
      <button
        onClick={resetAllSettings}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
      >
        重置所有设置
      </button>
    </div>
  );
};

export default SettingsPanel;
