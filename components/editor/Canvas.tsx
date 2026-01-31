'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

interface CanvasProps {
  tool: string;
  color: string;
  strokeWidth: number;
  zoom: number;
  showGrid: boolean;
  onCursorPositionChange?: (x: number, y: number) => void;
}

// Journal presets (mm)
const PRESETS = {
  leuchtturm: { width: 145, height: 210, dotSpacing: 5, dotSize: 1 },
  scribbles: { width: 145, height: 210, dotSpacing: 5, dotSize: 1 },
  rhodia: { width: 148, height: 210, dotSpacing: 5, dotSize: 1 },
  moleskine: { width: 130, height: 210, dotSpacing: 5, dotSize: 1 },
};

const DPI = 96;
const MM_TO_PX = DPI / 25.4;

interface Point {
  x: number;
  y: number;
}

interface CanvasElement {
  id: string;
  type: string;
  color: string;
  strokeWidth: number;
  points?: Point[];
  x?: number;
  y?: number;
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  width?: number;
  height?: number;
  radius?: number;
  text?: string;
}

export function Canvas({
  tool,
  color,
  strokeWidth,
  zoom,
  showGrid,
  onCursorPositionChange,
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState<Point>({ x: 0, y: 0 });
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [currentElement, setCurrentElement] = useState<CanvasElement | null>(null);
  const [pageSize, setPageSize] = useState({ width: 145, height: 210, dotSpacing: 5, dotSize: 1 });

  const mmToPx = useCallback((mm: number) => mm * MM_TO_PX * zoom, [zoom]);
  const pxToMm = useCallback((px: number) => px / MM_TO_PX / zoom, [zoom]);

  // Update canvas size based on zoom and page size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const widthPx = Math.round(mmToPx(pageSize.width));
    const heightPx = Math.round(mmToPx(pageSize.height));

    canvas.width = widthPx;
    canvas.height = heightPx;
    canvas.style.width = `${widthPx}px`;
    canvas.style.height = `${heightPx}px`;

    draw();
  }, [zoom, pageSize]);

  // Redraw when elements or grid visibility changes
  useEffect(() => {
    draw();
  }, [elements, currentElement, showGrid]);

  const drawDotGrid = (ctx: CanvasRenderingContext2D) => {
    if (!showGrid) return;

    const spacingPx = mmToPx(pageSize.dotSpacing);
    const dotSize = pageSize.dotSize * zoom;

    ctx.fillStyle = '#c4c4c4';

    for (let x = spacingPx; x < ctx.canvas.width; x += spacingPx) {
      for (let y = spacingPx; y < ctx.canvas.height; y += spacingPx) {
        ctx.beginPath();
        ctx.arc(x, y, dotSize / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  const drawElement = (ctx: CanvasRenderingContext2D, el: CanvasElement, isPreview = false) => {
    ctx.save();

    if (isPreview) {
      ctx.setLineDash([5, 5]);
      ctx.globalAlpha = 0.7;
    }

    ctx.strokeStyle = el.color;
    ctx.lineWidth = el.strokeWidth * zoom;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    switch (el.type) {
      case 'pen':
        if (el.points && el.points.length > 0) {
          ctx.beginPath();
          ctx.moveTo(el.points[0].x, el.points[0].y);
          for (let i = 1; i < el.points.length; i++) {
            ctx.lineTo(el.points[i].x, el.points[i].y);
          }
          ctx.stroke();
        }
        break;

      case 'line':
        if (el.x1 !== undefined && el.y1 !== undefined && el.x2 !== undefined && el.y2 !== undefined) {
          ctx.beginPath();
          ctx.moveTo(el.x1, el.y1);
          ctx.lineTo(el.x2, el.y2);
          ctx.stroke();
        }
        break;

      case 'rectangle':
        if (el.x !== undefined && el.y !== undefined && el.width !== undefined && el.height !== undefined) {
          ctx.strokeRect(el.x, el.y, el.width, el.height);
        }
        break;

      case 'circle':
        if (el.x !== undefined && el.y !== undefined && el.radius !== undefined) {
          ctx.beginPath();
          ctx.arc(el.x, el.y, el.radius, 0, Math.PI * 2);
          ctx.stroke();
        }
        break;

      case 'text':
        if (el.x !== undefined && el.y !== undefined && el.text) {
          ctx.font = `${14 * zoom}px sans-serif`;
          ctx.fillStyle = el.color;
          ctx.fillText(el.text, el.x, el.y);
        }
        break;
    }

    ctx.restore();
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    drawDotGrid(ctx);

    // Draw elements
    elements.forEach((el) => drawElement(ctx, el));

    // Draw current element (preview)
    if (currentElement) {
      drawElement(ctx, currentElement, true);
    }
  };

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getMousePos(e);
    setIsDrawing(true);
    setStartPos(pos);

    const id = Date.now().toString();

    switch (tool) {
      case 'pen':
        setCurrentElement({
          id,
          type: 'pen',
          color,
          strokeWidth,
          points: [pos],
        });
        break;
      case 'measure':
        setCurrentElement({
          id,
          type: 'line',
          color: '#4a7c59',
          strokeWidth: 2,
          x1: pos.x,
          y1: pos.y,
          x2: pos.x,
          y2: pos.y,
        });
        break;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getMousePos(e);

    // Update cursor position
    if (onCursorPositionChange) {
      const mmX = pxToMm(pos.x);
      const mmY = pxToMm(pos.y);
      onCursorPositionChange(mmX, mmY);
    }

    if (!isDrawing) return;

    switch (tool) {
      case 'pen':
        if (currentElement && currentElement.points) {
          setCurrentElement({
            ...currentElement,
            points: [...currentElement.points, pos],
          });
        }
        break;

      case 'line':
      case 'measure':
        if (currentElement) {
          setCurrentElement({
            ...currentElement,
            x2: pos.x,
            y2: pos.y,
          });
        }
        break;

      case 'rectangle':
        if (!currentElement) {
          setCurrentElement({
            id: Date.now().toString(),
            type: 'rectangle',
            color,
            strokeWidth,
            x: Math.min(startPos.x, pos.x),
            y: Math.min(startPos.y, pos.y),
            width: Math.abs(pos.x - startPos.x),
            height: Math.abs(pos.y - startPos.y),
          });
        } else {
          setCurrentElement({
            ...currentElement,
            x: Math.min(startPos.x, pos.x),
            y: Math.min(startPos.y, pos.y),
            width: Math.abs(pos.x - startPos.x),
            height: Math.abs(pos.y - startPos.y),
          });
        }
        break;

      case 'circle':
        const radius = Math.sqrt(
          Math.pow(pos.x - startPos.x, 2) + Math.pow(pos.y - startPos.y, 2)
        );
        if (!currentElement) {
          setCurrentElement({
            id: Date.now().toString(),
            type: 'circle',
            color,
            strokeWidth,
            x: startPos.x,
            y: startPos.y,
            radius,
          });
        } else {
          setCurrentElement({
            ...currentElement,
            radius,
          });
        }
        break;
    }
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (currentElement && tool !== 'measure') {
      setElements([...elements, currentElement]);
    }
    setCurrentElement(null);
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (tool === 'text') {
      const pos = getMousePos(e);
      const text = prompt('Enter text:');
      if (text) {
        const newElement: CanvasElement = {
          id: Date.now().toString(),
          type: 'text',
          color,
          strokeWidth,
          x: pos.x,
          y: pos.y,
          text,
        };
        setElements([...elements, newElement]);
      }
    }
  };

  // Get cursor style based on tool
  const getCursorStyle = () => {
    switch (tool) {
      case 'text':
        return 'text';
      case 'select':
        return 'default';
      default:
        return 'crosshair';
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-auto flex items-center justify-center p-10 bg-grid"
      style={{ cursor: getCursorStyle() }}
    >
      <div className="relative page-shadow">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onDoubleClick={handleDoubleClick}
          className="bg-white block"
          style={{ cursor: getCursorStyle() }}
        />
      </div>
    </div>
  );
}
