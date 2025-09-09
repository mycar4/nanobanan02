
import React, { useState, useCallback } from 'react';
import { ImageUpload } from './components/ImageUpload';
import { ResultDisplay } from './components/ResultDisplay';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { editImageWithGemini } from './services/geminiService';
import type { EditedImageResult } from './types';
import { fileToGenerativePart } from './utils/fileUtils';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImagePreview, setOriginalImagePreview] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [editedResult, setEditedResult] = useState<EditedImageResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (file: File) => {
    setOriginalImage(file);
    setEditedResult(null);
    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = useCallback(async () => {
    if (!originalImage || !prompt) {
      setError('Please upload an image and provide a prompt.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setEditedResult(null);

    try {
      const imagePart = await fileToGenerativePart(originalImage);
      const result = await editImageWithGemini(imagePart, prompt);
      setEditedResult(result);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, prompt]);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col items-center p-4 sm:p-6 md:p-8">
      <header className="w-full max-w-6xl text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          Nano Banana Image Editor
        </h1>
        <p className="text-gray-400 mt-2 text-lg">
          Powered by Gemini's `gemini-2.5-flash-image-preview` model.
        </p>
      </header>
      
      <main className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-lg flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-gray-200 border-b border-gray-600 pb-3">1. Upload your image</h2>
          <ImageUpload onImageSelect={handleImageSelect} previewUrl={originalImagePreview} />
          
          <h2 className="text-2xl font-bold text-gray-200 border-b border-gray-600 pb-3">2. Describe your edit</h2>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 'Add a birthday hat on the cat', 'make the sky look like a van gogh painting', 'turn this into a cyberpunk city at night'..."
            className="w-full h-32 p-4 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all resize-none text-gray-300 placeholder-gray-500"
            disabled={!originalImage}
          />
          
          <button
            onClick={handleSubmit}
            disabled={!originalImage || !prompt || isLoading}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg text-lg"
          >
            <SparklesIcon className="w-6 h-6" />
            {isLoading ? 'Generating...' : 'Generate Edit'}
          </button>
        </div>

        <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-lg flex flex-col">
           <h2 className="text-2xl font-bold text-gray-200 border-b border-gray-600 pb-3 mb-6">3. See the result</h2>
           {error && <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg">{error}</div>}
           <ResultDisplay result={editedResult} isLoading={isLoading} />
        </div>
      </main>
       <footer className="w-full max-w-6xl text-center mt-12 text-gray-500">
        <p>This is a demo application. Generated images may not always be perfect.</p>
      </footer>
    </div>
  );
};

export default App;
