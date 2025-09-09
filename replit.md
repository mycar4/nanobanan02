# Nano Banana Image Editor

## Overview
This is a React + TypeScript + Vite application that uses Google's Gemini AI for image editing. Users can upload images and provide text prompts to generate edited versions using the Gemini 2.0 Flash model.

## Project Architecture
- **Frontend**: React 18+ with TypeScript
- **Build System**: Vite 6.x
- **AI Service**: Google Gemini API (@google/genai)
- **Styling**: Tailwind CSS classes
- **Host Configuration**: Configured for Replit with 0.0.0.0:5000

## Key Features
- Image upload and preview
- Text prompt input for image editing
- AI-powered image generation using Gemini 2.0 Flash
- Modern UI with gradient designs
- Error handling and loading states

## Environment Setup
- **Node.js**: Version 20
- **Development Server**: Vite dev server on port 5000
- **Required Secret**: GEMINI_API_KEY (configured in Replit Secrets)

## Project Structure
```
├── components/
│   ├── icons/           # SVG icon components
│   ├── ImageUpload.tsx  # File upload component
│   ├── ResultDisplay.tsx # Result display component
│   └── Spinner.tsx      # Loading spinner
├── services/
│   └── geminiService.ts # Gemini AI API integration
├── utils/
│   └── fileUtils.ts     # File handling utilities
├── App.tsx             # Main application component
├── index.tsx           # Application entry point
├── types.ts            # TypeScript type definitions
└── vite.config.ts      # Vite configuration

```

## Recent Changes
- **2025-09-09**: Initial setup for Replit environment
  - Configured Vite server for 0.0.0.0:5000 with HMR
  - Set up GEMINI_API_KEY environment variable
  - Fixed Gemini API integration issues
  - Configured deployment for autoscale target

## Configuration Notes
- Vite server configured to allow all hosts for Replit proxy
- HMR client port set to 443 for HTTPS compatibility
- Environment variables properly configured for both dev and build
- TypeScript configured with React JSX support