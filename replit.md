# Overview

This is a Korean AI-powered image generation web application called "차성종의 AI 스튜디오" (Seongjong Cha's AI Studio). The application allows users to upload product images and generate professional advertising mockups and model advertisements using Google's Gemini AI API. The app offers two main modes: product mockup generation (creating artistic scenes with products) and AI model advertising (generating lifestyle/fashion advertisements with human models).

**Status**: Successfully imported from GitHub and configured for Replit environment. The application is fully operational with proper Vite configuration, environment variables, and deployment settings.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 19 with TypeScript, built using Vite
- **Styling**: TailwindCSS with custom Korean fonts (Jua and Poppins)
- **Component Structure**: Modular component-based architecture with clear separation of concerns
- **State Management**: Local React state using hooks (useState, useEffect, useCallback)
- **UI Patterns**: Modal-based image viewing, grid layouts for image display, drag-and-drop file upload interface

## Core Features
- **Dual Mode Operation**: Toggle between product mockup generation and model advertising modes
- **Image Processing**: File upload with preview functionality, base64 encoding for API transmission
- **AI Integration**: Direct integration with Google Gemini API for image generation
- **User Experience**: Loading states with rotating messages, error handling, image download functionality

## Design Patterns
- **Component Composition**: Reusable components (ImageUploader, MockupGrid, TryOnResult) with props-based configuration
- **Service Layer**: Dedicated Gemini service module for API interactions with retry logic
- **Constants Management**: Centralized prompt templates and loading messages
- **Error Boundaries**: Comprehensive error handling for API failures and edge cases

## Build Configuration
- **Module System**: ES modules with import maps for CDN-based React dependencies
- **Development Server**: Vite dev server configured for cloud deployment (host 0.0.0.0, HMR over HTTPS)
- **Environment Handling**: Environment variables for API key management
- **TypeScript Configuration**: Modern ES2022 target with React JSX support

# External Dependencies

## AI Services
- **Google Gemini API**: Core image generation service using the @google/genai SDK
- **API Authentication**: Environment variable-based API key management (GEMINI_API_KEY)

## Frontend Libraries
- **React Ecosystem**: React 19.1.1 and React DOM for UI rendering
- **Build Tools**: Vite 6.3.6 for development server and build process
- **TypeScript**: Version 5.8.2 for type safety and development experience

## Styling and Fonts
- **TailwindCSS**: CDN-loaded utility-first CSS framework
- **Google Fonts**: Korean font (Jua) and English font (Poppins) loaded via CDN
- **Icons**: SVG icons embedded directly in components for UI elements

## Development Tools
- **Vite Plugins**: @vitejs/plugin-react for React support
- **Type Definitions**: @types/react and @types/react-dom for TypeScript support
- **Node Types**: @types/node for Node.js type definitions

## Deployment Platform
- **AI Studio Integration**: Configured for Google's AI Studio platform with specific metadata and frame permissions
- **Cloud Environment**: Optimized for cloud deployment with appropriate server configuration