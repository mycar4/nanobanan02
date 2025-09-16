import React, { useEffect } from 'react';

interface ImageModalProps {
    src: string;
    onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ src, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = src;
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        link.download = `ai-studio-image-${timestamp}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label="Expanded Image View"
        >
            <style>
                {`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out forwards;
                }
                `}
            </style>
            <div 
                className="relative"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the content
            >
                <div className="flex flex-col items-center gap-4">
                    <img 
                        src={src} 
                        alt="Expanded view" 
                        className="object-contain max-w-4xl w-full max-h-[80vh] rounded-lg shadow-2xl"
                    />
                     <button
                        onClick={handleDownload}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg px-6 py-3 flex items-center justify-center font-bold hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
                        aria-label="Download image"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        다운로드
                    </button>
                </div>

                <button
                    onClick={onClose}
                    className="absolute -top-4 -right-4 bg-white text-gray-900 rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold hover:bg-gray-200 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label="Close image view"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};
