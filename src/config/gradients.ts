export const GRADIENT_PRESETS = {
  /**
   * Bold blue hero gradient — white-overlaid blue burst fading to white.
   *
   * Derived from the layered CSS:
   *   linear-gradient(0deg, rgba(255,255,255,0.20), rgba(255,255,255,0.20)),
   *   linear-gradient(180deg, #BEDBFF 0%, #2B7FFF 18%, #BEDBFF 40%, #FFF 50%),
   *   #FFF
   *
   * Each colour stop is pre-blended with the 20 % white overlay.
   */
  heroBlue: {
    colors: ['#CBE2FF', '#5599FF', '#CBE2FF', '#FFFFFF', '#FFFFFF'] as const,
    locations: [0, 0.18, 0.4, 0.5, 1] as const,
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },

  /**
   * Subtle frost gradient — very light blue tint, ideal for secondary screens.
   *
   * Derived from:
   *   linear-gradient(180deg, #DCECF9 0%, #E5F0F7 100%)
   */
  subtle: {
    colors: ['#DCECF9', '#E5F0F7'] as const,
    locations: [0, 1] as const,
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
} as const;

export type GradientVariant = keyof typeof GRADIENT_PRESETS;
