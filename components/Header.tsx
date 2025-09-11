
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="text-center">
            <h1 className="font-jua text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500">
                차성종의 AI 스튜디오 ✨
            </h1>
            <p className="mt-3 text-lg text-gray-300">
                제품 이미지를 최고의 광고 목업으로 변신시켜 보세요.
            </p>
        </header>
    );
};
