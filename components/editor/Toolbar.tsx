'use client';

import { useState } from 'react';
import {
  MousePointer2,
  Pencil,
  Minus,
  Square,
  Circle,
  Type,
  Eraser,
  Ruler,
  Palette,
  ChevronDown,
} from 'lucide-react';

export type Tool = 'select' | 'pen' | 'line' | 'rectangle' | 'circle' | 'text' | 'eraser' | 'measure';

interface ToolbarProps {
  activeTool: Tool;
  onToolChange: (tool: Tool) => void;
  color: string;
  onColorChange: (color: string) => void;
  strokeWidth: number;
  onStrokeWidthChange: (width: number) => void;
}

const tools = [
  { id: 'select' as Tool, icon: MousePointer2, label: 'Select' },
  { id: 'pen' as Tool, icon: Pencil, label: 'Pen' },
  { id: 'line' as Tool, icon: Minus, label: 'Line' },
  { id: 'rectangle' as Tool, icon: Square, label: 'Rectangle' },
  { id: 'circle' as Tool, icon: Circle, label: 'Circle' },
  { id: 'text' as Tool, icon: Type, label: 'Text' },
  { id: 'eraser' as Tool, icon: Eraser, label: 'Eraser' },
  { id: 'measure' as Tool, icon: Ruler, label: 'Measure' },
];

const presetColors = [
  { value: '#2d2d2d', name: 'Black' },
  { value: '#4a7c59', name: 'Sage Green' },
  { value: '#8b4513', name: 'Saddle Brown' },
  { value: '#c41e3a', name: 'Crimson' },
  { value: '#1e3a8a', name: 'Navy Blue' },
  { value: '#d97706', name: 'Amber' },
  { value: '#7c3aed', name: 'Violet' },
  { value: '#be185d', name: 'Rose' },
];

export function Toolbar({
  activeTool,
  onToolChange,
  color,
  onColorChange,
  strokeWidth,
  onStrokeWidthChange,
}: ToolbarProps) {
  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <div className="w-[280px] bg-panel border-r border-border flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="p-5 border-b border-border">
        <h1 className="text-lg font-semibold text-text flex items-center gap-2">
          <span className="text-xl">📓</span>
          BuJo Designer
        </h1>
        <p className="text-sm text-text-muted mt-1">Design before you draw</p>
      </div>

      {/* Drawing Tools */}
      <div className="p-5 border-b border-border">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-4">
          Drawing Tools
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const isActive = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => onToolChange(tool.id)}
                title={tool.label}
                className={`
                  aspect-square rounded-lg border flex items-center justify-center
                  transition-cozy hover:scale-105
                  ${isActive
                    ? 'bg-accent border-accent text-white shadow-md'
                    : 'bg-panel border-border text-text-muted hover:border-accent hover:text-accent'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
              </button>
            );
          })}
        </div>

        {/* Tool Options */}
        <div className="mt-5 pt-5 border-t border-border space-y-4">
          {/* Color Picker */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Color
              </span>
              <div
                className="w-5 h-5 rounded-full border-2 border-border cursor-pointer"
                style={{ backgroundColor: color }}
                onClick={() => setShowColorPicker(!showColorPicker)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {presetColors.map((c) => (
                <button
                  key={c.value}
                  onClick={() => onColorChange(c.value)}
                  title={c.name}
                  className={`
                    w-7 h-7 rounded-full border-2 transition-cozy hover:scale-110
                    ${color === c.value ? 'border-text scale-110' : 'border-transparent'}
                  `}
                  style={{ backgroundColor: c.value }}
                />
              ))}
            </div>
          </div>

          {/* Stroke Width Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Stroke Width
              </span>
              <span className="text-xs text-text-muted">{strokeWidth}px</span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              value={strokeWidth}
              onChange={(e) => onStrokeWidthChange(Number(e.target.value))}
              className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer accent-accent"
            />
          </div>
        </div>
      </div>

      {/* Quick Elements */}
      <div className="p-5 border-b border-border">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-4">
          Quick Elements
        </h2>
        <div className="space-y-2">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border border-border bg-panel hover:border-accent hover:bg-cream transition-cozy text-left">
            <span className="text-lg">📅</span>
            <span className="text-sm text-text">Monthly Calendar</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border border-border bg-panel hover:border-accent hover:bg-cream transition-cozy text-left">
            <span className="text-lg">📆</span>
            <span className="text-sm text-text">Weekly Spread</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border border-border bg-panel hover:border-accent hover:bg-cream transition-cozy text-left">
            <span className="text-lg">✓</span>
            <span className="text-sm text-text">Habit Tracker</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border border-border bg-panel hover:border-accent hover:bg-cream transition-cozy text-left">
            <span className="text-lg">😊</span>
            <span className="text-sm text-text">Mood Tracker</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border border-border bg-panel hover:border-accent hover:bg-cream transition-cozy text-left">
            <span className="text-lg">▦</span>
            <span className="text-sm text-text">Grid Section</span>
          </button>
        </div>
      </div>

      {/* Journal Presets */}
      <div className="p-5 flex-1">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-4">
          Journal Presets
        </h2>
        <div className="grid grid-cols-2 gap-2">
          <button className="p-3 rounded-lg border border-accent bg-accent/5 text-left transition-cozy">
            <span className="text-xs font-medium text-text block">Leuchtturm1917</span>
            <span className="text-xs text-text-muted">A5 · 5mm</span>
          </button>
          <button className="p-3 rounded-lg border border-border bg-panel hover:border-accent hover:bg-cream text-left transition-cozy">
            <span className="text-xs font-medium text-text block">Scribbles</span>
            <span className="text-xs text-text-muted">A5 · 5mm</span>
          </button>
          <button className="p-3 rounded-lg border border-border bg-panel hover:border-accent hover:bg-cream text-left transition-cozy">
            <span className="text-xs font-medium text-text block">Rhodia</span>
            <span className="text-xs text-text-muted">A5 · 5mm</span>
          </button>
          <button className="p-3 rounded-lg border border-border bg-panel hover:border-accent hover:bg-cream text-left transition-cozy">
            <span className="text-xs font-medium text-text block">Moleskine</span>
            <span className="text-xs text-text-muted">L · 5mm</span>
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="p-5 border-t border-border space-y-2">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-panel hover:bg-cream text-text text-sm font-medium transition-cozy">
          🗑️ Clear Page
        </button>
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-accent hover:bg-accent-light text-white text-sm font-medium transition-cozy shadow-sm">
          💾 Export PDF
        </button>
      </div>
    </div>
  );
}
