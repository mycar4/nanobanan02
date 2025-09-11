import React from 'react';

interface TryOnResultProps {
    productImage: string | null;
    modelImage: string | null;
    resultImages: string[];
    onImageClick: (src: string) => void;
}

const handleDownload = (e: React.MouseEvent, src: string) => {
    e.stopPropagation(); // Important to prevent the modal from opening
    const link = document.createElement('a');
    link.href = src;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    link.download = `model-ad-${timestamp}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const ImageCard: React.FC<{ src: string; alt: string; label: string }> = ({ src, alt, label }) => (
    <div className="relative aspect-square bg-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col items-center justify-center">
        <img src={src} alt={alt} className="w-full h-full object-contain" />
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs font-bold px-2 py-1 text-center">{label}</div>
    </div>
);

const ResultImageCard: React.FC<{ src: string; alt: string; onClick: () => void; }> = ({ src, alt, onClick }) => (
     <div 
        className="group relative aspect-square bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer"
        onClick={onClick}
    >
        <img src={src} alt={alt} className="w-full h-full object-contain" />
        <button
            onClick={(e) => handleDownload(e, src)}
            className="absolute bottom-2 right-2 bg-black/60 text-white rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-purple-600 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
            aria-label="Download ad image"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
        </button>
    </div>
);


export const TryOnResult: React.FC<TryOnResultProps> = ({ productImage, modelImage, resultImages, onImageClick }) => {
    if (resultImages.length === 0) {
        return (
             <div className="flex flex-col items-center justify-center text-gray-500 h-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                <p className="text-xl">AI 모델 광고 결과가 여기에 표시됩니다.</p>
                <p className="text-sm mt-1">제품과 모델 이미지를 업로드하고 생성 버튼을 눌러주세요! ✨</p>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col gap-6">
            <div>
                <h3 className="text-center text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500 mb-2">입력 이미지</h3>
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                    {productImage && <ImageCard src={productImage} alt="Product" label="제품" />}
                    {modelImage && <ImageCard src={modelImage} alt="Model" label="모델" />}
                </div>
            </div>
            
            <div className="border-t border-gray-700/50 my-2"></div>

            <div>
                <h3 className="text-center text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-fuchsia-500 mb-2">생성된 광고 이미지</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {resultImages.map((image, index) => (
                        <ResultImageCard key={index} src={image} alt={`Generated Ad ${index + 1}`} onClick={() => onImageClick(image)} />
                    ))}
                </div>
            </div>
        </div>
    );
};
