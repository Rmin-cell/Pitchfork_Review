import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import App from './App';
import './index.css';

// Beautiful Coolors Pastel Palette - Sophisticated Gradient Theme
const colorPalette = {
  // Coolors Palette Colors
  pink: '#E9B7CE',          // Soft pink
  lavender: '#E5C1D4',      // Lavender pink
  mauve: '#E2CBDA',          // Mauve
  lilac: '#DED5E0',          // Lilac
  periwinkle: '#DADFE5',     // Periwinkle
  sky: '#D7E9EB',           // Sky blue
  mint: '#D3F3F1',          // Mint green
  
  // Primary Colors
  primary: '#E2CBDA',        // Mauve as primary
  primaryHover: '#DED5E0',   // Lilac for hover
  primaryLight: '#E5C1D4',   // Lavender for accents
  
  // Score Colors - Using palette colors
  scorePerfect: '#D3F3F1',   // Mint for 9.0+
  scoreExcellent: '#E9B7CE',  // Pink for 8.5-8.9
  scoreGreat: '#D7E9EB',     // Sky for 8.0-8.4
  
  // Background Palette
  background: '#F8F9FA',     // Very light background
  surface: '#FFFFFF',        // Pure white for cards
  surfaceHover: '#F5F6F7',   // Light gray for hover
  surfaceLight: '#F1F3F4',   // Even lighter for accents
  
  // Text Colors
  textPrimary: '#2C3E50',      // Dark blue-gray
  textSecondary: '#5D6D7E',   // Medium gray
  textTertiary: '#85929E',    // Light gray
  textMuted: '#BDC3C7',       // Very light gray
  
  // Accent Colors from palette
  accent: '#D3F3F1',         // Mint
  accentSecondary: '#D7E9EB', // Sky
  accentTertiary: '#E9B7CE',  // Pink
  
  // Glass Effects
  glassBg: 'rgba(255, 255, 255, 0.8)',
  glassBorder: 'rgba(226, 203, 218, 0.3)',
  glassHover: 'rgba(255, 255, 255, 0.9)',
};

const theme = {
  token: {
    colorPrimary: colorPalette.primary,
    colorSuccess: colorPalette.scorePerfect,
    colorWarning: colorPalette.accentTertiary,
    colorError: colorPalette.accentTertiary,
    colorInfo: colorPalette.accentSecondary,
    colorBgBase: colorPalette.background,
    colorBgContainer: colorPalette.surface,
    colorText: colorPalette.textPrimary,
    colorTextSecondary: colorPalette.textSecondary,
    borderRadius: 16,
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: 14,
    lineHeight: 1.6,
  },
  components: {
    Card: {
      borderRadius: 20,
      boxShadow: '0 8px 32px rgba(226, 203, 218, 0.15)',
      colorBgContainer: colorPalette.glassBg,
      colorBorder: colorPalette.glassBorder,
    },
    Button: {
      borderRadius: 12,
      fontWeight: 600,
      colorPrimary: colorPalette.primary,
      colorPrimaryHover: colorPalette.primaryHover,
    },
    Tag: {
      borderRadius: 20,
      colorBgContainer: `${colorPalette.primary}30`,
      colorText: colorPalette.primary,
    },
    Typography: {
      colorText: colorPalette.textPrimary,
      colorTextSecondary: colorPalette.textSecondary,
      colorTextTertiary: colorPalette.textTertiary,
    },
    Statistic: {
      colorText: colorPalette.textPrimary,
      colorTextDescription: colorPalette.textSecondary,
    },
  },
};

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);

