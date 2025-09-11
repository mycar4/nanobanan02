
import React from 'react';

interface SpinnerProps {
    message: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ message }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center">
            <div className="relative h-16 w-16">
                 <div className="absolute inset-0 border-4 border-t-transparent border-purple-500 rounded-full animate-spin"></div>
                 <div className="absolute inset-2 border-4 border-t-transparent border-cyan-500 rounded-full animate-spin" style={{animationDirection: 'reverse'}}></div>
            </div>
            <p className="mt-4 text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">{message}</p>
        </div>
    );
};
