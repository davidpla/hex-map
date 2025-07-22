// lib/hexUtils.js

import {
    HEX_SIZE,
    HORIZONTAL_SPACING,
    VERTICAL_SPACING,
    ODD_ROW_X_OFFSET_MULTIPLIER,
    INITIAL_PADDING
} from './constants'

/**
 * Helper for rounding to half-pixels.
 * This is crucial for crisp 1px lines and preventing anti-aliasing artifacts.
 * For a 1px line, drawing at X.5 coordinates ensures it aligns perfectly with the pixel grid.
 * @param {number} coord - The coordinate to round.
 * @returns {number} The coordinate rounded to the nearest half-pixel.
 */
export function roundToHalfPixel(coord) {
    return Math.floor(coord) + 0.5
}

/**
 * Parses a cell ID string "col-row" into an object { col, row }.
 * @param {string} id - The cell ID string (e.g., "0-0").
 * @returns {{col: number, row: number}} An object with column and row as numbers.
 */
export function parseCellId(id) {
    const parts = id.split('-')
    return {
        col: parseInt(parts[0], 10), // Use radix 10 for parseInt
        row: parseInt(parts[1], 10)
    }
}

/**
 * Converts offset coordinates (col, row) from an odd-r flat-top grid
 * to cube coordinates (x, y, z). Cube coordinates satisfy x + y + z = 0.
 * This conversion is essential for accurate hexagonal distance calculations.
 * @param {number} col - The column index in the offset grid.
 * @param {number} row - The row index in the offset grid.
 * @returns {{x: number, y: number, z: number}} An object with cube coordinates.
 */
export function offsetToCube(col, row) {
    // For odd-r flat-top:
    const x = col - (row - (row & 1)) / 2 // (row & 1) is a bitwise way to check if row is odd (1) or even (0)
    const z = row
    const y = -x - z // x + y + z = 0
    return { x, y, z }
}

/**
 * Calculates the distance in cells between two hexagonal cells using cube coordinates.
 * The distance is defined as the minimum number of steps to get from one hex to another.
 * @param {object} cellA - The first cell object (e.g., { id: "0-0", type: "grass" }).
 * @param {object} cellB - The second cell object.
 * @returns {number} The distance in cells between cellA and cellB.
 */
export function getHexDistance(cellA, cellB) {
    const { col: colA, row: rowA } = parseCellId(cellA.id)
    const { col: colB, row: rowB } = parseCellId(cellB.id)

    const cubeA = offsetToCube(colA, rowA)
    const cubeB = offsetToCube(colB, rowB)

    // Hexagonal distance in cube coordinates is (abs(dx) + abs(dy) + abs(dz)) / 2
    const dx = Math.abs(cubeA.x - cubeB.x)
    const dy = Math.abs(cubeA.y - cubeB.y)
    const dz = Math.abs(cubeA.z - cubeB.z)

    return (dx + dy + dz) / 2
}

/**
 * Calculates the pixel coordinates of a hexagon's center on the canvas.
 * Uses a Flat-Top, Odd-Row (odd-r) offset coordinate system.
 * @param {number} col - The column index of the hexagon in the grid.
 * @param {number} row - The row index of the grid.
 * @returns {{x: number, y: number}} The pixel coordinates of the center.
 */
export function getHexCenter(col, row) {
    let x = col * HORIZONTAL_SPACING
    let y = row * VERTICAL_SPACING

    // Apply the offset for odd rows: shift right.
    if (row % 2 !== 0) { // If it's an odd row (1, 3, 5, ...)
        x += HEX_SIZE * ODD_ROW_X_OFFSET_MULTIPLIER
    }
    
    // Add initial padding to center the map on the canvas
    x += HEX_SIZE + INITIAL_PADDING 
    y += HEX_SIZE + INITIAL_PADDING

    // Round the final center coordinates to half-pixels for crisp rendering
    x = roundToHalfPixel(x)
    y = roundToHalfPixel(y)

    return { x, y }
}