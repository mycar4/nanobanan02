import React, { useCallback } from 'react';

interface ImageUploaderProps {
    id: string;
    onFileSelect: (file: File) => void;
    previewUrl?: string | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ id, onFileSelect, previewUrl }) => {
    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onFileSelect(file);
        }
    }, [onFileSelect]);

    const handleDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
    }, []);

    const handleDrop = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            onFileSelect(file);
        }
    }, [onFileSelect]);

    return (
        <div className="w-full">
            <div
                className="border-2 border-dashed border-gray-500 rounded-xl p-6 text-center hover:border-purple-500 transition-colors cursor-pointer"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById(id)?.click()}
            >
                {previewUrl ? (
                    <div className="space-y-3">
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="max-w-full max-h-48 mx-auto object-contain rounded-lg"
                        />
                        <p className="text-sm text-gray-400">클릭하여 다른 이미지 선택</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <div className="text-4xl">📸</div>
                        <div>
                            <p className="text-gray-300">이미지를 드래그하거나 클릭하여 업로드</p>
                            <p className="text-sm text-gray-500 mt-1">PNG, JPG, WebP 지원</p>
                        </div>
                    </div>
                )}
            </div>
            <input
                id={id}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />
        </div>
    );
};