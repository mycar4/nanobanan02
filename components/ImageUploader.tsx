import React, { useCallback } from 'react';

interface ImageUploaderProps {
    onFileSelect: (file: File) => void;
    previewUrl: string | null;
    id: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onFileSelect, previewUrl, id }) => {
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onFileSelect(file);
        }
    };
    
    return (
        <div className="mt-4">
            <label 
                htmlFor={id} 
                className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-500 rounded-lg cursor-pointer bg-gray-700/50 hover:bg-gray-700 transition-colors"
            >
                {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="object-contain h-full w-full rounded-lg" />
                ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-400">
                        <svg className="w-10 h-10 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-4-4V6a4 4 0 014-4h10a4 4 0 014 4v6a4 4 0 01-4 4H7z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15l-4-4m0 0l4-4m-4 4h12"></path></svg>
                        <p className="mb-2 text-sm"><span className="font-semibold">클릭하여 업로드</span> 또는 드래그 앤 드롭</p>
                        <p className="text-xs">PNG, JPG, WEBP (배경 없는 이미지 권장)</p>
                    </div>
                )}
                <input id={id} type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
            </label>
        </div>
    );
};