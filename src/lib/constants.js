// lib/constants.js

// --- Configuration for Flat-Top Hexagons ---
export const HEX_SIZE = 40; // Radius from center to vertex (base size for calculations)
export const LINE_WIDTH = 1; // Border line width (recommended to keep at 1 for crispness with half-pixel rendering)

// --- Empirical Adjustments (tuned for visual perfection on your display) ---
// These values compensate for browser rendering quirks (anti-aliasing, sub-pixel rendering).
// They are derived from your successful adjustments to achieve the desired visual look.
// If HEX_SIZE or LINE_WIDTH changes, or on different browsers/displays, these might need re-tuning.

// HEX_SIZE_DRAW_ADJUSTMENT: This value is added to HEX_SIZE specifically for drawing
// the hexagon's vertices. It makes the drawn hexagon slightly larger than its
// mathematical footprint, which helps to visually cover tiny gaps.
export const HEX_SIZE_DRAW_ADJUSTMENT = 2; 
export const HEX_SIZE_DRAW = HEX_SIZE + HEX_SIZE_DRAW_ADJUSTMENT; 

// HORIZONTAL_SPACING_MULTIPLIER: Multiplier for HEX_SIZE to determine horizontal
// distance between hex centers. Standard mathematical is 1.5. Your 1.82 compensates
// for visual spacing to prevent column overlap.
export const HORIZONTAL_SPACING_MULTIPLIER = 1.82;
export const HORIZONTAL_SPACING = HEX_SIZE * HORIZONTAL_SPACING_MULTIPLIER; 

// VERTICAL_SPACING_OFFSET: This value is subtracted from the standard vertical spacing.
// Standard mathematical is Math.sqrt(3) * HEX_SIZE. Your -6 creates a vertical
// overlap between rows to eliminate perceived white lines/gaps.
export const VERTICAL_SPACING_OFFSET = 6;
export const VERTICAL_SPACING = Math.sqrt(3) * HEX_SIZE - VERTICAL_SPACING_OFFSET; 

// ODD_ROW_X_OFFSET_MULTIPLIER: Multiplier for HEX_SIZE to determine the X-offset
// for odd rows. Standard mathematical is 0.75 (half of 1.5). Your 0.90 helps
// with the visual alignment of staggered columns.
export const ODD_ROW_X_OFFSET_MULTIPLIER = 0.90;

// INITIAL_PADDING: Padding added to the top-left of the entire map grid to
// center it visually and prevent edges from being cut off.
export const INITIAL_PADDING = 20;

// --- Core Geometrical Constants ---
// These values define the hexagon's shape and angles.
export const HEX_ANGLES_COUNT = 6; // A hexagon has 6 vertices
export const HEX_ANGLE_STEP_DEG = 60; // 360 degrees / 6 vertices = 60 degrees per step
export const FLAT_TOP_START_ANGLE_DEG = 30; // Start angle for flat-top hexagons (30 degrees from x-axis)

// --- Text Drawing Constants ---
export const TEXT_FONT = '12px Arial';
export const TEXT_COLOR = '#FFFFFF'; // White color for text

// Define colors for each terrain type
export const TERRAIN_COLORS = {
    'grass': '#55aa55',
    'water': '#5588cc',
    'forest': '#226622',
    'default': '#888888' // Fallback color
};