'use client';

import { useState } from 'react';
import {
  Layers,
  Settings,
  Type,
  Move,
  Palette,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Trash2,
  Copy,
  Grid3X3,
  FileText,
  Calendar,
  CheckSquare,
  Smile,
} from 'lucide-react';

interface Layer {
  id: string;
  name: string;
  type: 'text' | 'shape' | 'calendar' | 'habit' | 'mood' | 'grid';
  visible: boolean;
  locked: boolean;
}

interface PropertiesPanelProps {
  selectedElement?: {
    id: string;
    type: string;
    x: number;
    y: number;
    width?: number;
    height?: number;
    color?: string;
  } | null;
  onPageSettingsChange?: (settings: PageSettings) => void;
}

interface PageSettings {
  preset: string;
  width: number;
  height: number;
  dotSpacing: number;
  dotSize: number;
  orientation: 'portrait' | 'landscape';
}

const journalPresets = [
  { id: 'leuchtturm', name: 'Leuchtturm1917', width: 145, height: 210, dotSpacing: 5 },
  { id: 'scribbles', name: 'Scribbles That Matter', width: 145, height: 210, dotSpacing: 5 },
  { id: 'rhodia', name: 'Rhodia Webnotebook', width: 148, height: 210, dotSpacing: 5 },
  { id: 'moleskine', name: 'Moleskine Classic', width: 130, height: 210, dotSpacing: 5 },
  { id: 'custom', name: 'Custom Size', width: 148, height: 210, dotSpacing: 5 },
];

export function PropertiesPanel({ selectedElement, onPageSettingsChange }: PropertiesPanelProps) {
  const [activeTab, setActiveTab] = useState<'layers' | 'properties' | 'page'>('layers');
  const [layersExpanded, setLayersExpanded] = useState(true);
  const [pageSettings, setPageSettings] = useState<PageSettings>({
    preset: 'leuchtturm',
    width: 145,
    height: 210,
    dotSpacing: 5,
    dotSize: 1,
    orientation: 'portrait',
  });

  // Sample layers for demo
  const [layers, setLayers] = useState<Layer[]>([
    { id: '1', name: 'Monthly Calendar', type: 'calendar', visible: true, locked: false },
    { id: '2', name: 'Habit Tracker', type: 'habit', visible: true, locked: false },
    { id: '3', name: 'Mood Tracker', type: 'mood', visible: true, locked: false },
    { id: '4', name: 'Title Text', type: 'text', visible: true, locked: false },
    { id: '5', name: 'Border Frame', type: 'shape', visible: true, locked: true },
  ]);

  const toggleLayerVisibility = (id: string) => {
    setLayers(layers.map(l => l.id === id ? { ...l, visible: !l.visible } : l));
  };

  const toggleLayerLock = (id: string) => {
    setLayers(layers.map(l => l.id === id ? { ...l, locked: !l.locked } : l));
  };

  const deleteLayer = (id: string) => {
    setLayers(layers.filter(l => l.id !== id));
  };

  const getLayerIcon = (type: Layer['type']) => {
    switch (type) {
      case 'calendar':
        return <Calendar className="w-4 h-4" />;
      case 'habit':
        return <CheckSquare className="w-4 h-4" />;
      case 'mood':
        return <Smile className="w-4 h-4" />;
      case 'grid':
        return <Grid3X3 className="w-4 h-4" />;
      case 'text':
        return <Type className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const handlePresetChange = (presetId: string) => {
    const preset = journalPresets.find(p => p.id === presetId);
    if (preset) {
      const newSettings = {
        ...pageSettings,
        preset: presetId,
        width: preset.width,
        height: preset.height,
        dotSpacing: preset.dotSpacing,
      };
      setPageSettings(newSettings);
      onPageSettingsChange?.(newSettings);
    }
  };

  return (
    <div className="w-[280px] bg-panel border-l border-border flex flex-col h-full">
      {/* Tabs */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab('layers')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-cozy
            ${activeTab === 'layers'
              ? 'text-accent border-b-2 border-accent'
              : 'text-text-muted hover:text-text'
            }`}
        >
          <Layers className="w-4 h-4" />
          Layers
        </button>
        <button
          onClick={() => setActiveTab('properties')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-cozy
            ${activeTab === 'properties'
              ? 'text-accent border-b-2 border-accent'
              : 'text-text-muted hover:text-text'
            }`}
        >
          <Settings className="w-4 h-4" />
          Properties
        </button>
        <button
          onClick={() => setActiveTab('page')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-cozy
            ${activeTab === 'page'
              ? 'text-accent border-b-2 border-accent'
              : 'text-text-muted hover:text-text'
            }`}
        >
          <FileText className="w-4 h-4" />
          Page
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'layers' && (
          <div className="p-4">
            {/* Layer Controls */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Layers ({layers.length})
              </h3>
              <button
                onClick={() => setLayersExpanded(!layersExpanded)}
                className="p-1 rounded hover:bg-cream text-text-muted transition-cozy"
              >
                {layersExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            {/* Layer List */}
            {layersExpanded && (
              <div className="space-y-1">
                {layers.map((layer, index) => (
                  <div
                    key={layer.id}
                    className="group flex items-center gap-2 p-2 rounded-lg hover:bg-cream transition-cozy cursor-pointer"
                  >
                    <span className="text-xs text-text-muted w-5">{layers.length - index}</span>
                    <button
                      onClick={() => toggleLayerVisibility(layer.id)}
                      className={`p-1 rounded transition-cozy ${layer.visible ? 'text-text' : 'text-text-muted'}`}
                    >
                      {layer.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <div className="flex-1 flex items-center gap-2 min-w-0">
                      <span className={`text-text-muted ${layer.visible ? 'text-text' : 'text-text-muted'}`}>
                        {getLayerIcon(layer.type)}
                      </span>
                      <span className={`text-sm truncate ${layer.visible ? 'text-text' : 'text-text-muted'}`}>
                        {layer.name}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleLayerLock(layer.id)}
                      className={`p-1 rounded opacity-0 group-hover:opacity-100 transition-cozy ${layer.locked ? 'text-accent' : 'text-text-muted'}`}
                    >
                      {layer.locked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => deleteLayer(layer.id)}
                      className="p-1 rounded opacity-0 group-hover:opacity-100 text-text-muted hover:text-red-500 transition-cozy"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add Layer Button */}
            <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-dashed border-border text-text-muted hover:border-accent hover:text-accent transition-cozy">
              <span className="text-lg">+</span>
              <span className="text-sm">Add Layer</span>
            </button>
          </div>
        )}

        {activeTab === 'properties' && (
          <div className="p-4 space-y-6">
            {selectedElement ? (
              <>
                {/* Object Properties */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-4">
                    Object Properties
                  </h3>
                  <div className="space-y-4">
                    {/* Position */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-text-muted block mb-1">X Position</label>
                        <div className="flex items-center gap-2">
                          <Move className="w-4 h-4 text-text-muted" />
                          <input
                            type="number"
                            value={Math.round(selectedElement.x)}
                            className="flex-1 px-2 py-1.5 text-sm border border-border rounded bg-cream focus:border-accent outline-none"
                          />
                          <span className="text-xs text-text-muted">mm</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-text-muted block mb-1">Y Position</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={Math.round(selectedElement.y)}
                            className="flex-1 px-2 py-1.5 text-sm border border-border rounded bg-cream focus:border-accent outline-none"
                          />
                          <span className="text-xs text-text-muted">mm</span>
                        </div>
                      </div>
                    </div>

                    {/* Size */}
                    {(selectedElement.width !== undefined || selectedElement.height !== undefined) && (
                      <div className="grid grid-cols-2 gap-3">
                        {selectedElement.width !== undefined && (
                          <div>
                            <label className="text-xs text-text-muted block mb-1">Width</label>
                            <input
                              type="number"
                              value={Math.round(selectedElement.width)}
                              className="w-full px-2 py-1.5 text-sm border border-border rounded bg-cream focus:border-accent outline-none"
                            />
                          </div>
                        )}
                        {selectedElement.height !== undefined && (
                          <div>
                            <label className="text-xs text-text-muted block mb-1">Height</label>
                            <input
                              type="number"
                              value={Math.round(selectedElement.height)}
                              className="w-full px-2 py-1.5 text-sm border border-border rounded bg-cream focus:border-accent outline-none"
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Color */}
                    {selectedElement.color && (
                      <div>
                        <label className="text-xs text-text-muted block mb-2">Color</label>
                        <div className="flex items-center gap-2">
                          <Palette className="w-4 h-4 text-text-muted" />
                          <input
                            type="color"
                            value={selectedElement.color}
                            className="w-10 h-8 rounded border border-border cursor-pointer"
                          />
                          <input
                            type="text"
                            value={selectedElement.color}
                            className="flex-1 px-2 py-1.5 text-sm border border-border rounded bg-cream focus:border-accent outline-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-cream text-sm text-text transition-cozy">
                    <Copy className="w-4 h-4" />
                    Duplicate
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-red-50 hover:border-red-200 hover:text-red-500 text-sm text-text transition-cozy">
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-text-muted">
                <Type className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Select an object to edit its properties</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'page' && (
          <div className="p-4 space-y-6">
            {/* Journal Preset */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-4">
                Journal Preset
              </h3>
              <div className="space-y-2">
                {journalPresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handlePresetChange(preset.id)}
                    className={`w-full p-3 rounded-lg border text-left transition-cozy
                      ${pageSettings.preset === preset.id
                        ? 'border-accent bg-accent/5'
                        : 'border-border bg-panel hover:border-accent hover:bg-cream'
                      }`}
                  >
                    <span className={`text-sm font-medium block ${pageSettings.preset === preset.id ? 'text-accent' : 'text-text'}`}>
                      {preset.name}
                    </span>
                    <span className="text-xs text-text-muted">
                      {preset.width}×{preset.height}mm · {preset.dotSpacing}mm dots
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Size */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-4">
                Custom Size
              </h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-text-muted block mb-1">Width (mm)</label>
                    <input
                      type="number"
                      value={pageSettings.width}
                      onChange={(e) => setPageSettings({ ...pageSettings, width: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-cream focus:border-accent outline-none"
                      min={50}
                      max={300}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-text-muted block mb-1">Height (mm)</label>
                    <input
                      type="number"
                      value={pageSettings.height}
                      onChange={(e) => setPageSettings({ ...pageSettings, height: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-cream focus:border-accent outline-none"
                      min={50}
                      max={400}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-text-muted block mb-1">Dot Spacing (mm)</label>
                    <input
                      type="number"
                      value={pageSettings.dotSpacing}
                      onChange={(e) => setPageSettings({ ...pageSettings, dotSpacing: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-cream focus:border-accent outline-none"
                      min={3}
                      max={10}
                      step={0.5}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-text-muted block mb-1">Dot Size</label>
                    <select
                      value={pageSettings.dotSize}
                      onChange={(e) => setPageSettings({ ...pageSettings, dotSize: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-cream focus:border-accent outline-none"
                    >
                      <option value={0.5}>Small</option>
                      <option value={1}>Medium</option>
                      <option value={1.5}>Large</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Orientation */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-4">
                Orientation
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setPageSettings({ ...pageSettings, orientation: 'portrait' })}
                  className={`flex-1 py-2 px-4 rounded-lg border text-sm font-medium transition-cozy
                    ${pageSettings.orientation === 'portrait'
                      ? 'border-accent bg-accent/5 text-accent'
                      : 'border-border hover:border-accent'
                    }`}
                >
                  Portrait
                </button>
                <button
                  onClick={() => setPageSettings({ ...pageSettings, orientation: 'landscape' })}
                  className={`flex-1 py-2 px-4 rounded-lg border text-sm font-medium transition-cozy
                    ${pageSettings.orientation === 'landscape'
                      ? 'border-accent bg-accent/5 text-accent'
                      : 'border-border hover:border-accent'
                    }`}
                >
                  Landscape
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
