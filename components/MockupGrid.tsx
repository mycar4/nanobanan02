import React from 'react';

interface MockupGridProps {
    originalImage: string | null;
    mockups: string[];
    onImageClick: (src: string) => void;
}

const handleDownload = (e: React.MouseEvent, src: string) => {
    e.stopPropagation(); // Important to prevent the modal from opening
    const link = document.createElement('a');
    link.href = src;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    link.download = `mockup-${timestamp}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const ImageCard: React.FC<{ src: string; alt: string; isOriginal?: boolean; onClick: () => void; }> = ({ src, alt, isOriginal = false, onClick }) => (
    <div 
        className={`group relative aspect-square bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 ${!isOriginal ? 'cursor-pointer' : ''}`}
        onClick={!isOriginal ? onClick : undefined}
    >
        <img src={src} alt={alt} className="w-full h-full object-contain" />
        {isOriginal && <div className="absolute top-2 left-2 bg-fuchsia-500 text-white text-xs font-bold px-2 py-1 rounded">원본</div>}
        {!isOriginal && (
            <button
                onClick={(e) => handleDownload(e, src)}
                className="absolute bottom-2 right-2 bg-black/60 text-white rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-purple-600 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
                aria-label="Download mockup"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
            </button>
        )}
    </div>
);


export const MockupGrid: React.FC<MockupGridProps> = ({ originalImage, mockups, onImageClick }) => {
    if (mockups.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center text-gray-500 h-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-xl">AI가 생성한 목업이 여기에 표시됩니다.</p>
                <p className="text-sm mt-1">이미지를 업로드하고 생성 버튼을 눌러주세요! 😉</p>
            </div>
        );
    }
    
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
            {originalImage && (
                <div className="md:col-span-1">
                    <ImageCard src={originalImage} alt="Original product" isOriginal onClick={() => {}} />
                </div>
            )}
            {mockups.map((mockup, index) => (
                <div key={index} className="md:col-span-1">
                    <ImageCard src={mockup} alt={`Generated mockup ${index + 1}`} onClick={() => onImageClick(mockup)} />
                </div>
            ))}
        </div>
    );
};
import React from 'react';

interface MockupGridProps {
    originalImage: string | null;
    mockups: string[];
    onImageClick: (src: string) => void;
}

export const MockupGrid: React.FC<MockupGridProps> = ({ originalImage, mockups, onImageClick }) => {
    if (!originalImage && mockups.length === 0) {
        return (
            <div className="text-center text-gray-400">
                <p className="text-lg">이미지를 업로드하고 생성 버튼을 눌러주세요! 🚀</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            {originalImage && (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-300">원본 이미지</h3>
                    <div className="flex justify-center">
                        <img
                            src={originalImage}
                            alt="Original product"
                            className="max-w-xs max-h-48 object-contain rounded-lg border border-gray-600 cursor-pointer hover:border-purple-500 transition-colors"
                            onClick={() => onImageClick(originalImage)}
                        />
                    </div>
                </div>
            )}

            {mockups.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-300">생성된 목업 ({mockups.length}개)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {mockups.map((mockup, index) => (
                            <div key={index} className="relative group">
                                <img
                                    src={mockup}
                                    alt={`Generated mockup ${index + 1}`}
                                    className="w-full h-48 object-cover rounded-lg border border-gray-600 cursor-pointer hover:border-cyan-500 transition-colors"
                                    onClick={() => onImageClick(mockup)}
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">클릭하여 확대</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
