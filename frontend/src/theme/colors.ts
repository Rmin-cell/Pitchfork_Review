export const lightTheme = {
  // Background Gradients
  bgGradient:
    "linear-gradient(180deg, #E9B7CE 0%, #E2CBDA 15%, #DED5E0 30%, #DADFE5 45%, #D7E9EB 60%, #D3F3F1 75%, #F8F9FA 100%)",

  // Base Colors
  primary: "#E2CBDA",
  primaryHover: "#DED5E0",
  primaryLight: "#E5C1D4",

  // Text Colors
  textPrimary: "#2C3E50",
  textSecondary: "#5D6D7E",
  textTertiary: "#85929E",
  textMuted: "#BDC3C7",

  // Background Colors
  cardBg: "rgba(255, 255, 255, 0.8)",
  cardBgHover: "rgba(255, 255, 255, 0.95)",
  cardBorder: "rgba(226, 203, 218, 0.3)",
  cardBorderHover: "rgba(226, 203, 218, 0.5)",

  // Score Colors
  scorePerfect: "#D3F3F1",
  scoreExcellent: "#E9B7CE",
  scoreGreat: "#D7E9EB",

  // Accents
  accent: "#D3F3F1",
  accentSecondary: "#D7E9EB",
  accentTertiary: "#E9B7CE",

  // Shadows
  shadowSm: "0 4px 16px rgba(226, 203, 218, 0.15)",
  shadowMd: "0 8px 32px rgba(226, 203, 218, 0.2)",
  shadowLg: "0 16px 48px rgba(226, 203, 218, 0.3)",

  // Glass Effect
  glassBg: "rgba(255, 255, 255, 0.8)",
  glassHover: "rgba(255, 255, 255, 0.95)",
};

export const darkTheme = {
  // Background Gradients
  bgGradient:
    "linear-gradient(180deg, #1a1625 0%, #221930 15%, #2a1f3a 30%, #312545 45%, #352b50 60%, #3a315a 75%, #2d2d3d 100%)",

  // Base Colors
  primary: "#A67FB5",
  primaryHover: "#B892C7",
  primaryLight: "#C8A4D8",

  // Text Colors
  textPrimary: "#E8E6F0",
  textSecondary: "#B8B4C8",
  textTertiary: "#8B84A0",
  textMuted: "#6B6580",

  // Background Colors
  cardBg: "rgba(40, 35, 55, 0.8)",
  cardBgHover: "rgba(50, 45, 65, 0.95)",
  cardBorder: "rgba(166, 127, 181, 0.3)",
  cardBorderHover: "rgba(166, 127, 181, 0.5)",

  // Score Colors
  scorePerfect: "#4ECDC4",
  scoreExcellent: "#C77DFF",
  scoreGreat: "#7B68EE",

  // Accents
  accent: "#4ECDC4",
  accentSecondary: "#7B68EE",
  accentTertiary: "#C77DFF",

  // Shadows
  shadowSm: "0 4px 16px rgba(0, 0, 0, 0.3)",
  shadowMd: "0 8px 32px rgba(0, 0, 0, 0.4)",
  shadowLg: "0 16px 48px rgba(0, 0, 0, 0.5)",

  // Glass Effect
  glassBg: "rgba(40, 35, 55, 0.8)",
  glassHover: "rgba(50, 45, 65, 0.95)",
};

export type Theme = typeof lightTheme;
