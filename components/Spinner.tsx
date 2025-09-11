
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
import React from 'react';

interface SpinnerProps {
    message: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ message }) => {
    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-cyan-600 rounded-full animate-spin animation-delay-150"></div>
            </div>
            <p className="text-gray-300 text-center max-w-xs">{message}</p>
        </div>
    );
};
