import React from 'react';
import { Mode } from '../App';

interface ModeSelectorProps {
    currentMode: Mode;
    onModeChange: (mode: Mode) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onModeChange }) => {
    const baseClasses = "w-full text-center py-3 px-4 rounded-lg font-bold transition-all duration-300 transform focus:outline-none focus:ring-2";
    const activeClasses = "bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg scale-105";
    const inactiveClasses = "bg-gray-700 hover:bg-gray-600";

    return (
        <div className="grid grid-cols-2 gap-4 p-1 bg-gray-800 rounded-xl mb-6">
            <button
                onClick={() => onModeChange('mockup')}
                className={`${baseClasses} ${currentMode === 'mockup' ? activeClasses : inactiveClasses}`}
                aria-pressed={currentMode === 'mockup'}
            >
                🛍️ 제품 목업 생성
            </button>
            <button
                onClick={() => onModeChange('modelAd')}
                className={`${baseClasses} ${currentMode === 'modelAd' ? activeClasses : inactiveClasses}`}
                aria-pressed={currentMode === 'modelAd'}
            >
                💃 AI 모델 광고
            </button>
        </div>
    );
};