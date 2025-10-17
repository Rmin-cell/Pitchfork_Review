// Ultra-Minimal Portfolio-Inspired Design System
// Deep dark backgrounds, thin typography, sophisticated spacing

export const premiumLightTheme = {
  // Clean White Backgrounds
  bgPrimary: "#FFFFFF",
  bgSecondary: "#F8F8F8",
  bgAccent: "#F0F0F0",

  // No Gradients
  gradientHero: "#0A0A0A",
  gradientAccent: "#2A2A2A",
  gradientSubtle: "#4A4A4A",
  gradientDark: "#0A0A0A",
  gradientGold: "#6B6B6B",
  gradientNeon: "#A0A0A0",
  gradientPink: "#0A0A0A",

  // Primary - Pure Black
  primary: "#0A0A0A",
  primaryDark: "#000000",
  primaryLight: "#2A2A2A",

  // Monochrome Only
  accent1: "#0A0A0A",
  accent2: "#2A2A2A",
  accent3: "#4A4A4A",
  accent4: "#6B6B6B",
  accent5: "#A0A0A0",

  // Text - High Contrast
  textPrimary: "#0A0A0A",
  textSecondary: "#6B6B6B",
  textTertiary: "#A0A0A0",
  textMuted: "#D0D0D0",
  textInverse: "#FFFFFF",

  // Card & Surface - Minimal
  cardBg: "#FFFFFF",
  cardBgHover: "#F8F8F8",
  cardBorder: "#E8E8E8",
  cardBorderHover: "#D0D0D0",

  // Ultra-Subtle Shadows
  shadowXs: "0 1px 2px rgba(0, 0, 0, 0.02)",
  shadowSm: "0 1px 2px rgba(0, 0, 0, 0.03)",
  shadowMd: "0 2px 4px rgba(0, 0, 0, 0.04)",
  shadowLg: "0 4px 8px rgba(0, 0, 0, 0.06)",
  shadowXl: "0 8px 16px rgba(0, 0, 0, 0.08)",
  shadowNeon: "0 2px 6px rgba(0, 0, 0, 0.04)",

  // Overlays
  overlay: "rgba(10, 10, 10, 0.5)",
  overlayLight: "rgba(255, 255, 255, 0.9)",

  // Borders - Minimal
  borderLight: "#F0F0F0",
  borderMedium: "#E8E8E8",
  borderDark: "#D0D0D0",

  // Score Colors - Monochrome
  scorePerfect: "#0A0A0A",
  scoreExcellent: "#2A2A2A",
  scoreGreat: "#4A4A4A",
  scoreGood: "#6B6B6B",
};

export const premiumDarkTheme = {
  // Deep Dark Backgrounds (Portfolio Style)
  bgPrimary: "#0A0A0A",
  bgSecondary: "#121212",
  bgAccent: "#1A1A1A",

  // No Gradients
  gradientHero: "#FFFFFF",
  gradientAccent: "#E8E8E8",
  gradientSubtle: "#D0D0D0",
  gradientDark: "#FFFFFF",
  gradientGold: "#A0A0A0",
  gradientNeon: "#6B6B6B",
  gradientPink: "#FFFFFF",

  // Primary - Pure White
  primary: "#FFFFFF",
  primaryDark: "#E8E8E8",
  primaryLight: "#D0D0D0",

  // Monochrome Only
  accent1: "#FFFFFF",
  accent2: "#E8E8E8",
  accent3: "#D0D0D0",
  accent4: "#A0A0A0",
  accent5: "#6B6B6B",

  // Text - Soft Contrast
  textPrimary: "#FFFFFF",
  textSecondary: "#A0A0A0",
  textTertiary: "#6B6B6B",
  textMuted: "#4A4A4A",
  textInverse: "#0A0A0A",

  // Card & Surface - Subtle Elevation
  cardBg: "#141414",
  cardBgHover: "#1A1A1A",
  cardBorder: "#242424",
  cardBorderHover: "#303030",

  // Minimal Shadows
  shadowXs: "0 1px 2px rgba(0, 0, 0, 0.4)",
  shadowSm: "0 1px 2px rgba(0, 0, 0, 0.5)",
  shadowMd: "0 2px 4px rgba(0, 0, 0, 0.6)",
  shadowLg: "0 4px 8px rgba(0, 0, 0, 0.7)",
  shadowXl: "0 8px 16px rgba(0, 0, 0, 0.8)",
  shadowNeon: "0 2px 6px rgba(0, 0, 0, 0.6)",

  // Overlays
  overlay: "rgba(0, 0, 0, 0.8)",
  overlayLight: "rgba(20, 20, 20, 0.95)",

  // Borders - Subtle
  borderLight: "#1A1A1A",
  borderMedium: "#242424",
  borderDark: "#303030",

  // Score Colors - Monochrome
  scorePerfect: "#FFFFFF",
  scoreExcellent: "#E8E8E8",
  scoreGreat: "#D0D0D0",
  scoreGood: "#A0A0A0",
};

export type PremiumTheme = typeof premiumLightTheme;
