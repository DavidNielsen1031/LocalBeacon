// LocalBeacon Design Tokens
// Source of truth for the brand color palette.
// Import from here to keep styles consistent across the app.

export const colors = {
  NAVY: '#1B2A4A',
  ORANGE: '#FF6B35',
  WARM_WHITE: '#FAFAF7',
  CREAM: '#F5F0E8',
  CHARCOAL: '#2D3436',
  SLATE: '#636E72',
  MIST: '#DFE6E9',
} as const;

export type ColorKey = keyof typeof colors;
export type ColorValue = (typeof colors)[ColorKey];

export default colors;
