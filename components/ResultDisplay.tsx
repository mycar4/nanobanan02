
import React from 'react';
import type { EditedImageResult } from '../types';
import { Spinner } from './Spinner';

interface ResultDisplayProps {
  result: EditedImageResult | null;
  isLoading: boolean;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, isLoading }) => {
  return (
    <div className="w-full flex-grow flex items-center justify-center bg-gray-900 rounded-lg aspect-video relative overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center z-10">
          <Spinner />
          <p className="text-gray-300 mt-4 text-lg font-medium">Nano Banana is thinking...</p>
        </div>
      )}
      {!isLoading && !result && (
        <div className="text-center text-gray-500">
          <p className="text-xl">Your edited image will appear here.</p>
        </div>
      )}
      {result && (
        <div className="w-full h-full flex flex-col">
            <img src={result.imageUrl} alt="Edited result" className="w-full h-full object-contain flex-grow" />
            {result.text && (
                 <p className="text-sm text-gray-400 bg-black/30 p-2 text-center backdrop-blur-sm">{result.text}</p>
            )}
        </div>
      )}
    </div>
  );
};
