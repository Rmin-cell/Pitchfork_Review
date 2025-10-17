// Bold, High-Contrast Color System
// Inspired by: Spotify Dark, Apple Music, Neon Aesthetics
// Features: Deep blacks, vibrant neons, strong emotional impact

export const premiumLightTheme = {
  // Clean, Bright Background
  bgPrimary: "#FFFFFF",
  bgSecondary: "#F8F9FA",
  bgAccent: "#F0F2F5",

  // Bold Vibrant Gradients
  gradientHero:
    "linear-gradient(135deg, #FF0080 0%, #FF8C00 50%, #40E0D0 100%)",
  gradientAccent: "linear-gradient(135deg, #00F5FF 0%, #FF10F0 100%)",
  gradientSubtle: "linear-gradient(135deg, #FFD93D 0%, #FF6B9D 100%)",
  gradientDark: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  gradientGold: "linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)",
  gradientNeon: "linear-gradient(135deg, #00F5FF 0%, #00CED1 100%)",
  gradientPink: "linear-gradient(135deg, #FF1493 0%, #FF69B4 100%)",

  // Primary - Bold Purple/Pink
  primary: "#FF0080",
  primaryDark: "#D6006B",
  primaryLight: "#FF4DA6",

  // Neon Accent Colors
  accent1: "#FF0080", // Neon Pink
  accent2: "#00F5FF", // Neon Cyan
  accent3: "#FFD93D", // Electric Yellow
  accent4: "#39FF14", // Neon Green
  accent5: "#C700FF", // Electric Purple

  // Text - Maximum Contrast
  textPrimary: "#0A0A0A",
  textSecondary: "#2C2C2C",
  textTertiary: "#5A5A5A",
  textMuted: "#8A8A8A",
  textInverse: "#FFFFFF",

  // Card & Surface - Clean with subtle depth
  cardBg: "rgba(255, 255, 255, 0.98)",
  cardBgHover: "rgba(255, 255, 255, 1)",
  cardBorder: "rgba(255, 0, 128, 0.15)",
  cardBorderHover: "rgba(255, 0, 128, 0.4)",

  // Bold Shadows
  shadowXs: "0 2px 4px rgba(0, 0, 0, 0.08)",
  shadowSm: "0 4px 12px rgba(255, 0, 128, 0.15)",
  shadowMd: "0 8px 24px rgba(255, 0, 128, 0.2)",
  shadowLg: "0 16px 48px rgba(255, 0, 128, 0.25)",
  shadowXl: "0 24px 64px rgba(255, 0, 128, 0.3)",
  shadowNeon: "0 0 20px rgba(0, 245, 255, 0.5)",

  // Overlays
  overlay: "rgba(10, 10, 10, 0.85)",
  overlayLight: "rgba(255, 255, 255, 0.95)",

  // Borders - Subtle but present
  borderLight: "#E8E8E8",
  borderMedium: "#D0D0D0",
  borderDark: "#A8A8A8",

  // Score Colors - Vibrant & Emotional
  scorePerfect: "#39FF14",
  scoreExcellent: "#00F5FF",
  scoreGreat: "#FFD93D",
  scoreGood: "#FF0080",
};

export const premiumDarkTheme = {
  // True Black with Deep Navy Accents
  bgPrimary: "#000000",
  bgSecondary: "#0A0A0F",
  bgAccent: "#121218",

  // Electric Neon Gradients
  gradientHero:
    "linear-gradient(135deg, #FF0080 0%, #FF8C00 50%, #40E0D0 100%)",
  gradientAccent: "linear-gradient(135deg, #00F5FF 0%, #FF10F0 100%)",
  gradientSubtle: "linear-gradient(135deg, #C700FF 0%, #FF0080 100%)",
  gradientDark:
    "linear-gradient(135deg, #000000 0%, #1A1A2E 50%, #0A0A0F 100%)",
  gradientGold: "linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)",
  gradientNeon: "linear-gradient(135deg, #00F5FF 0%, #00CED1 100%)",
  gradientPink: "linear-gradient(135deg, #FF1493 0%, #FF69B4 100%)",

  // Primary - Electric Pink
  primary: "#FF0080",
  primaryDark: "#D6006B",
  primaryLight: "#FF4DA6",

  // Neon Accents - Maximum Impact
  accent1: "#FF0080", // Neon Pink
  accent2: "#00F5FF", // Neon Cyan
  accent3: "#FFD93D", // Electric Yellow
  accent4: "#39FF14", // Neon Green
  accent5: "#C700FF", // Electric Purple

  // Text - Maximum Contrast on Black
  textPrimary: "#FFFFFF",
  textSecondary: "#E8E8E8",
  textTertiary: "#B0B0B0",
  textMuted: "#707070",
  textInverse: "#000000",

  // Card & Surface - Dark with glow
  cardBg: "rgba(18, 18, 24, 0.85)",
  cardBgHover: "rgba(18, 18, 24, 0.98)",
  cardBorder: "rgba(255, 0, 128, 0.3)",
  cardBorderHover: "rgba(255, 0, 128, 0.6)",

  // Dramatic Shadows with Neon Glow
  shadowXs: "0 2px 4px rgba(0, 0, 0, 0.5)",
  shadowSm: "0 4px 12px rgba(0, 0, 0, 0.6)",
  shadowMd: "0 8px 24px rgba(255, 0, 128, 0.3)",
  shadowLg: "0 16px 48px rgba(255, 0, 128, 0.4)",
  shadowXl: "0 24px 64px rgba(255, 0, 128, 0.5)",
  shadowNeon: "0 0 30px rgba(0, 245, 255, 0.6)",

  // Overlays
  overlay: "rgba(0, 0, 0, 0.92)",
  overlayLight: "rgba(18, 18, 24, 0.95)",

  // Borders - Visible on dark
  borderLight: "rgba(255, 255, 255, 0.1)",
  borderMedium: "rgba(255, 255, 255, 0.15)",
  borderDark: "rgba(255, 255, 255, 0.2)",

  // Score Colors - Neon Glow
  scorePerfect: "#39FF14",
  scoreExcellent: "#00F5FF",
  scoreGreat: "#FFD93D",
  scoreGood: "#FF0080",
};

export type PremiumTheme = typeof premiumLightTheme;
