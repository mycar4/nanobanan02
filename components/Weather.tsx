import React, { useState, useEffect } from 'react';
import { getWeather, WeatherData } from '../services/weather';

export const Weather: React.FC = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const data = await getWeather();
                setWeather(data);
            } catch (err) {
                console.error("Failed to fetch weather:", err);
                setError("날씨 정보 로딩 실패");
            }
        };

        fetchWeather();
    }, []);

    if (error) {
        return <div className="text-sm text-red-400">{error}</div>;
    }

    if (!weather) {
        return <div className="text-sm text-gray-400">날씨 로딩 중...</div>;
    }

    return (
        <div className="flex items-center gap-2 text-sm text-gray-300 bg-gray-800/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-cyan-500/20">
            <span>{weather.city}</span>
            <span className="text-lg leading-none">{weather.icon}</span>
            <span>{weather.temperature}°C</span>
            <span>({weather.condition})</span>
        </div>
    );
};
