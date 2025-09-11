
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-4">
                차성종의 AI 스튜디오 ✨
            </h1>
            <p className="text-lg text-gray-300 mb-8">
                AI로 멋진 제품 목업과 모델 광고를 만들어보세요! ✨
            </p>
        </header>
    );
};
