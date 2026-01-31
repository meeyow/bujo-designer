'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/auth';
import { Toolbar, Tool } from '@/components/editor/Toolbar';
import { Canvas } from '@/components/editor/Canvas';
import { PropertiesPanel } from '@/components/editor/PropertiesPanel';
import { EditorHeader } from '@/components/editor/EditorHeader';
import { TemplateBrowser } from '@/components/editor/TemplateBrowser';

export default function EditorPage() {
  const [activeTool, setActiveTool] = useState<Tool>('pen');
  const [color, setColor] = useState('#2d2d2d');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [zoom, setZoom] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
  const [showRuler, setShowRuler] = useState(false);
  const [showTemplateBrowser, setShowTemplateBrowser] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number } | undefined>();

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev * 1.2, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev / 1.2, 0.3));
  };

  const handleZoomFit = () => {
    // Calculate fit zoom based on viewport
    setZoom(0.8);
  };

  const handleCursorPositionChange = (x: number, y: number) => {
    setCursorPosition({ x, y });
  };

  const handleSelectTemplate = (templateId: string) => {
    console.log('Selected template:', templateId);
    setShowTemplateBrowser(false);
    // TODO: Apply template to canvas
  };

  return (
    <ProtectedRoute>
      <div className="h-screen w-screen flex flex-col overflow-hidden bg-background">
        {/* Top Navigation */}
        <EditorHeader
          zoom={zoom}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onZoomFit={handleZoomFit}
          onToggleGrid={() => setShowGrid(!showGrid)}
          onToggleRuler={() => setShowRuler(!showRuler)}
          showGrid={showGrid}
          showRuler={showRuler}
          onOpenTemplateBrowser={() => setShowTemplateBrowser(true)}
          cursorPosition={cursorPosition}
        />

        {/* Main Editor Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Toolbar */}
          <Toolbar
            activeTool={activeTool}
            onToolChange={setActiveTool}
            color={color}
            onColorChange={setColor}
            strokeWidth={strokeWidth}
            onStrokeWidthChange={setStrokeWidth}
          />

          {/* Center - Canvas */}
          <Canvas
            tool={activeTool}
            color={color}
            strokeWidth={strokeWidth}
            zoom={zoom}
            showGrid={showGrid}
            onCursorPositionChange={handleCursorPositionChange}
          />

          {/* Right Sidebar - Properties */}
          <PropertiesPanel
            selectedElement={null}
            onPageSettingsChange={(settings) => console.log('Page settings:', settings)}
          />
        </div>

        {/* Template Browser Modal */}
        <TemplateBrowser
          isOpen={showTemplateBrowser}
          onClose={() => setShowTemplateBrowser(false)}
          onSelectTemplate={handleSelectTemplate}
        />
      </div>
    </ProtectedRoute>
  );
}
