// Apple Notes-inspired Design System
// Premium dark theme matching iOS Notes app

export const COLORS = {
  // Primary accent - Apple Notes yellow/orange
  ACCENT: '#FFD60A',         // Apple Notes folder yellow
  ACCENT_LIGHT: '#FFE066',
  ACCENT_DARK: '#D4A600',
  
  // iOS System Colors
  BLUE: '#007AFF',
  GREEN: '#30D158',
  RED: '#FF453A',
  ORANGE: '#FF9F0A',
  YELLOW: '#FFD60A',
  TEAL: '#64D2FF',
  PURPLE: '#BF5AF2',
  PINK: '#FF2D55',
  INDIGO: '#5E5CE6',
  
  // Backgrounds - Apple dark mode
  BG_PRIMARY: '#000000',
  BG_ELEVATED: '#1C1C1E',
  BG_SECONDARY: '#2C2C2E',
  BG_TERTIARY: '#3A3A3C',
  BG_GROUPED: '#1C1C1E',
  
  // Glass effect backgrounds
  GLASS_BG: 'rgba(28, 28, 30, 0.92)',
  GLASS_BORDER: 'rgba(255, 255, 255, 0.05)',
  
  // Text colors - iOS gray scale
  TEXT_PRIMARY: '#FFFFFF',
  TEXT_SECONDARY: 'rgba(235, 235, 245, 0.6)',
  TEXT_TERTIARY: 'rgba(235, 235, 245, 0.3)',
  TEXT_QUATERNARY: 'rgba(235, 235, 245, 0.18)',
  
  // Separators
  SEPARATOR: 'rgba(84, 84, 88, 0.65)',
  SEPARATOR_OPAQUE: '#38383A',
  
  // System
  SUCCESS: '#30D158',
  ERROR: '#FF453A',
  WARNING: '#FF9F0A',
};

// Folder colors for variety (like Apple Notes)
export const FOLDER_COLORS = [
  '#FFD60A', // Yellow (default)
  '#FF9F0A', // Orange
  '#30D158', // Green
  '#64D2FF', // Cyan
  '#BF5AF2', // Purple
  '#FF2D55', // Pink
  '#007AFF', // Blue
];

// For backward compatibility
export const ACCENT = COLORS.ACCENT;
export const ACCENT_LIGHT = COLORS.ACCENT_LIGHT;
export const ACCENT_DARK = COLORS.ACCENT_DARK;

// Typography scale (iOS San Francisco)
export const TYPOGRAPHY = {
  largeTitle: { fontSize: 34, fontWeight: '700', letterSpacing: 0.37 },
  title1: { fontSize: 28, fontWeight: '700', letterSpacing: 0.36 },
  title2: { fontSize: 22, fontWeight: '700', letterSpacing: 0.35 },
  title3: { fontSize: 20, fontWeight: '600', letterSpacing: 0.38 },
  headline: { fontSize: 17, fontWeight: '600', letterSpacing: -0.41 },
  body: { fontSize: 17, fontWeight: '400', letterSpacing: -0.41 },
  callout: { fontSize: 16, fontWeight: '400', letterSpacing: -0.32 },
  subheadline: { fontSize: 15, fontWeight: '400', letterSpacing: -0.24 },
  footnote: { fontSize: 13, fontWeight: '400', letterSpacing: -0.08 },
  caption1: { fontSize: 12, fontWeight: '400', letterSpacing: 0 },
  caption2: { fontSize: 11, fontWeight: '400', letterSpacing: 0.07 },
};

// Spacing system
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

// Border radius
export const RADIUS = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
  full: 999,
};

// Common shadows
export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 8,
    elevation: 6,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  glow: (color) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  }),
};

// For backward compatibility
export const commonStyles = {
  ...COLORS,
  BG_PRIMARY: COLORS.BG_PRIMARY,
  BG_SECONDARY: COLORS.BG_ELEVATED,
  BG_TERTIARY: COLORS.BG_SECONDARY,
  BORDER_COLOR: COLORS.SEPARATOR,
  BORDER_LIGHT: COLORS.SEPARATOR,
  TEXT_MUTED: COLORS.TEXT_SECONDARY,
};

