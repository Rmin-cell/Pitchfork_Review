import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import App from './App';
import './index.css';

// Harmonious Color Palette - Professional Music Platform Theme
const colorPalette = {
  // Primary Colors
  primary: '#00d4aa',        // Teal green - modern and vibrant
  primaryHover: '#00b894',   // Darker teal for hover states
  primaryLight: '#55efc4',   // Light teal for accents
  
  // Secondary Colors
  secondary: '#6c5ce7',      // Purple - complementary to teal
  secondaryHover: '#5f3dc4', // Darker purple
  secondaryLight: '#a29bfe', // Light purple
  
  // Neutral Colors
  background: '#0a0a0a',     // Deep black
  surface: '#1a1a1a',        // Dark gray
  surfaceLight: '#2a2a2a',   // Lighter gray
  surfaceHover: '#333333',   // Hover gray
  
  // Text Colors
  textPrimary: '#ffffff',    // Pure white
  textSecondary: '#cccccc',  // Light gray
  textTertiary: '#999999',   // Medium gray
  textMuted: '#666666',      // Dark gray
  
  // Accent Colors
  success: '#00d4aa',        // Same as primary
  warning: '#fdcb6e',        // Warm yellow
  error: '#e17055',          // Warm red
  info: '#74b9ff',           // Cool blue
  
  // Glass Effects
  glassBg: 'rgba(255, 255, 255, 0.08)',
  glassBorder: 'rgba(255, 255, 255, 0.12)',
  glassHover: 'rgba(255, 255, 255, 0.12)',
};

const theme = {
  token: {
    colorPrimary: colorPalette.primary,
    colorSuccess: colorPalette.success,
    colorWarning: colorPalette.warning,
    colorError: colorPalette.error,
    colorInfo: colorPalette.info,
    colorBgBase: colorPalette.background,
    colorBgContainer: colorPalette.surface,
    colorText: colorPalette.textPrimary,
    colorTextSecondary: colorPalette.textSecondary,
    borderRadius: 12,
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: 14,
    lineHeight: 1.6,
  },
  components: {
    Card: {
      borderRadius: 16,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      colorBgContainer: colorPalette.glassBg,
      colorBorder: colorPalette.glassBorder,
    },
    Button: {
      borderRadius: 24,
      fontWeight: 600,
      colorPrimary: colorPalette.primary,
      colorPrimaryHover: colorPalette.primaryHover,
    },
    Tag: {
      borderRadius: 20,
      colorBgContainer: `${colorPalette.primary}20`,
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);

