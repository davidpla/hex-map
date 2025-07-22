// components/HexMap.js
'use client'; // For Next.js App Router, indicates this is a client component

import React, { useRef, useEffect } from 'react';
import { 
    HEX_SIZE_DRAW, LINE_WIDTH, HEX_ANGLES_COUNT, 
    FLAT_TOP_START_ANGLE_DEG, HEX_ANGLE_STEP_DEG,
    TEXT_FONT, TEXT_COLOR, TERRAIN_COLORS
} from '../lib/constants';
import { getHexCenter, parseCellId, roundToHalfPixel } from '../lib/hexUtils';

/**
 * Draws a single flat-top hexagon on the canvas.
 * This function is designed to be called within the canvas rendering context.
 * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
 * @param {object} cell - The cell object containing id and type.
 * @param {string} fillStyle - CSS color string for filling the hexagon.
 */
function drawHexagon(ctx, cell, fillStyle) {
    const { id } = cell;
    const { col, row } = parseCellId(id); // Get col and row from ID

    const { x, y } = getHexCenter(col, row); // Get pixel coordinates

    // --- Draw Hexagon Shape ---
    ctx.beginPath();
    for (let i = 0; i < HEX_ANGLES_COUNT; i++) {
        const angle_deg = FLAT_TOP_START_ANGLE_DEG + HEX_ANGLE_STEP_DEG * i;
        const angle_rad = Math.PI / 180 * angle_deg;
        
        const vertexX = x + HEX_SIZE_DRAW * Math.cos(angle_rad);
        const vertexY = y + HEX_SIZE_DRAW * Math.sin(angle_rad);

        if (i === 0) {
            ctx.moveTo(roundToHalfPixel(vertexX), roundToHalfPixel(vertexY));
        } else {
            ctx.lineTo(roundToHalfPixel(vertexX), roundToHalfPixel(vertexY));
        }
    }
    ctx.closePath();

    ctx.strokeStyle = '#333333';
    ctx.lineWidth = LINE_WIDTH;
    ctx.stroke();

    ctx.fillStyle = fillStyle;
    ctx.fill();

    // --- Draw Cell ID Text ---
    ctx.font = TEXT_FONT;
    ctx.fillStyle = TEXT_COLOR;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText(id, x, y);
}

/**
 * HexMap React Component for rendering a hexagonal grid on a canvas.
 * @param {object} props - Component props.
 * @param {Array<Array<object>>} props.mapData - The 2D array of cell objects ({id: "x-y", type: "..."}).
 * @param {number} props.width - The width of the canvas.
 * @param {number} props.height - The height of the canvas.
 */
export default function HexMap({ mapData, width, height }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error("Could not get 2D rendering context for canvas.");
            return;
        }

        // --- Drawing Logic ---
        const drawMap = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            mapData.forEach((rowArray, rowIndex) => {
                rowArray.forEach((cell, colIndex) => {
                    const cellType = cell.type;
                    const color = TERRAIN_COLORS[cellType] || TERRAIN_COLORS['default']; 
                    drawHexagon(ctx, cell, color); // Pass ctx along with cell and color
                });
            });
        };

        drawMap();

    }, [mapData, width, height]); // Redraw if mapData or canvas dimensions change

    return (
        <canvas 
            ref={canvasRef} 
            width={width} 
            height={height} 
            // Basic styles for the canvas (can be moved to global CSS or Tailwind)
            style={{ display: 'block', border: '1px solid #ccc', margin: 0, padding: 0, boxSizing: 'border-box' }}
        />
    );
}