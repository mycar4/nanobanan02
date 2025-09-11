import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { MockupGrid } from './components/MockupGrid';
import { Spinner } from './components/Spinner';
import { Footer } from './components/Footer';
import { generateMockups, generateModelAds } from './services/gemini';
import { LOADING_MESSAGES } from './constants/prompts';
import { ModeSelector } from './components/ModeSelector';
import { TryOnResult } from './components/TryOnResult';
import { ImageModal } from './components/ImageModal';

export type Mode = 'mockup' | 'modelAd';

const App: React.FC = () => {
    const [mode, setMode] = useState<Mode>('mockup');

    // State for mockup generation
    const [productFile, setProductFile] = useState<File | null>(null);
    const [productPreviewUrl, setProductPreviewUrl] = useState<string | null>(null);
    const [generatedMockups, setGeneratedMockups] = useState<string[]>([]);
    
    // State for model advertising
    const [modelFile, setModelFile] = useState<File | null>(null);
    const [modelPreviewUrl, setModelPreviewUrl] = useState<string | null>(null);
    const [modelAdResults, setModelAdResults] = useState<string[]>([]);

    // Common state
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [loadingMessage, setLoadingMessage] = useState<string>(LOADING_MESSAGES[0]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);


    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (isLoading) {
            let messageIndex = 0;
            interval = setInterval(() => {
                messageIndex = (messageIndex + 1) % LOADING_MESSAGES.length;
                setLoadingMessage(LOADING_MESSAGES[messageIndex]);
            }, 2500);
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isLoading]);

    const handleModeChange = (newMode: Mode) => {
        setMode(newMode);
        // Reset all file and result states when changing modes for a clean slate
        setProductFile(null);
        setProductPreviewUrl(null);
        setGeneratedMockups([]);
        setModelFile(null);
        setModelPreviewUrl(null);
        setModelAdResults([]);
        setError(null);
    };

    const handleProductFileSelect = (file: File) => {
        setProductFile(file);
        setProductPreviewUrl(URL.createObjectURL(file));
        setError(null);
    };

    const handleModelFileSelect = (file: File) => {
        setModelFile(file);
        setModelPreviewUrl(URL.createObjectURL(file));
        setError(null);
    };

    const handleImageSelect = (src: string) => {
        setSelectedImage(src);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    const handleGenerateClick = useCallback(async () => {
        if (mode === 'mockup' && !productFile) {
            setError("먼저 제품 이미지를 업로드해주세요! 😉");
            return;
        }
        if (mode === 'modelAd' && (!productFile || !modelFile)) {
            setError("제품과 모델 이미지를 모두 업로드해주세요! 😉");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            if (mode === 'mockup') {
                setGeneratedMockups([]);
                const mockups = await generateMockups(productFile!);
                setGeneratedMockups(mockups);
            } else { // 'modelAd' mode
                setModelAdResults([]);
                const results = await generateModelAds(productFile!, modelFile!);
                setModelAdResults(results);
            }
        } catch (err) {
            console.error(err);
            setError("이미지 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요. 😢");
        } finally {
            setIsLoading(false);
        }
    }, [mode, productFile, modelFile]);
    
    const isButtonDisabled = isLoading || (mode === 'mockup' && !productFile) || (mode === 'modelAd' && (!productFile || !modelFile));

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 sm:p-6 md:p-8">
            <div className="w-full max-w-6xl mx-auto">
                <Header />
                <main className="mt-8">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        <div className="lg:col-span-2 bg-gray-800/50 p-6 rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-900/50">
                            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500 mb-4">1. 모드 선택 &amp; 이미지 업로드</h2>
                            <ModeSelector currentMode={mode} onModeChange={handleModeChange} />
                            
                            {mode === 'mockup' ? (
                                <div>
                                    <h3 className="text-lg font-semibold mb-2 text-gray-300">제품 이미지</h3>
                                    <ImageUploader id="mockup-product-image" onFileSelect={handleProductFileSelect} previewUrl={productPreviewUrl} />
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 text-gray-300">제품 이미지</h3>
                                        <ImageUploader id="tryon-product-image" onFileSelect={handleProductFileSelect} previewUrl={productPreviewUrl} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 text-gray-300">모델 이미지</h3>
                                        <ImageUploader id="tryon-model-image" onFileSelect={handleModelFileSelect} previewUrl={modelPreviewUrl} />
                                    </div>
                                </div>
                            )}

                            {error && <p className="mt-4 text-red-400 text-center">{error}</p>}
                            <button
                                onClick={handleGenerateClick}
                                disabled={isButtonDisabled}
                                className="w-full mt-6 py-3 px-6 text-lg font-bold rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
                            >
                                {isLoading ? '생성 중...' : (mode === 'mockup' ? 'AI 목업 생성하기 🚀' : 'AI 모델 광고 생성하기 ✨')}
                            </button>
                        </div>

                        <div className="lg:col-span-3 bg-gray-800/50 p-6 rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-900/50">
                             <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-fuchsia-500 mb-4">2. 결과 확인</h2>
                             <div className="flex items-center justify-center rounded-lg bg-gray-900/50 p-4 min-h-[400px]">
                                {isLoading ? (
                                    <Spinner message={loadingMessage} />
                                ) : (
                                    mode === 'mockup' ? (
                                        <MockupGrid originalImage={productPreviewUrl} mockups={generatedMockups} onImageClick={handleImageSelect} />
                                    ) : (
                                        <TryOnResult productImage={productPreviewUrl} modelImage={modelPreviewUrl} resultImages={modelAdResults} onImageClick={handleImageSelect} />
                                    )
                                )}
                             </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
            {selectedImage && <ImageModal src={selectedImage} onClose={handleCloseModal} />}
        </div>
    );
};

export default App;