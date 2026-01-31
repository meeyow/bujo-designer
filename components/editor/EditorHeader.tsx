'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FileText,
  Save,
  Download,
  FolderOpen,
  Plus,
  ZoomIn,
  ZoomOut,
  Maximize,
  Undo,
  Redo,
  Grid3X3,
  Ruler,
  Settings,
  ChevronDown,
  User,
  LogOut,
  Sparkles,
  Layout,
} from 'lucide-react';
import { useAuth } from '@/components/auth';

interface EditorHeaderProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomFit: () => void;
  onToggleGrid: () => void;
  onToggleRuler: () => void;
  showGrid: boolean;
  showRuler: boolean;
  onOpenTemplateBrowser: () => void;
  cursorPosition?: { x: number; y: number };
}

export function EditorHeader({
  zoom,
  onZoomIn,
  onZoomOut,
  onZoomFit,
  onToggleGrid,
  onToggleRuler,
  showGrid,
  showRuler,
  onOpenTemplateBrowser,
  cursorPosition,
}: EditorHeaderProps) {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [showFileMenu, setShowFileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <header className="h-14 bg-panel border-b border-border flex items-center justify-between px-4 shrink-0">
      {/* Left - Logo & File Menu */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
            <span className="text-lg">🦋</span>
          </div>
          <span className="font-semibold text-text hidden sm:block">Luna Moth Studio</span>
        </div>

        {/* File Menu */}
        <div className="relative">
          <button
            onClick={() => setShowFileMenu(!showFileMenu)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-cream text-text transition-cozy"
          >
            <span className="text-sm font-medium">File</span>
            <ChevronDown className="w-4 h-4 text-text-muted" />
          </button>

          {showFileMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowFileMenu(false)}
              />
              <div className="absolute top-full left-0 mt-1 w-56 bg-panel rounded-xl shadow-lg border border-border z-50 py-2">
                <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-cream text-left text-text transition-cozy">
                  <Plus className="w-4 h-4 text-text-muted" />
                  <span className="text-sm">New Layout</span>
                  <span className="ml-auto text-xs text-text-muted">Ctrl+N</span>
                </button>
                <button
                  onClick={() => {
                    setShowFileMenu(false);
                    onOpenTemplateBrowser();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-cream text-left text-text transition-cozy"
                >
                  <Layout className="w-4 h-4 text-text-muted" />
                  <span className="text-sm">Browse Templates</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-cream text-left text-text transition-cozy">
                  <FolderOpen className="w-4 h-4 text-text-muted" />
                  <span className="text-sm">Open...</span>
                  <span className="ml-auto text-xs text-text-muted">Ctrl+O</span>
                </button>
                <div className="my-2 border-t border-border" />
                <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-cream text-left text-text transition-cozy">
                  <Save className="w-4 h-4 text-text-muted" />
                  <span className="text-sm">Save</span>
                  <span className="ml-auto text-xs text-text-muted">Ctrl+S</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-cream text-left text-text transition-cozy">
                  <Save className="w-4 h-4 text-text-muted" />
                  <span className="text-sm">Save As...</span>
                  <span className="ml-auto text-xs text-text-muted">Ctrl+Shift+S</span>
                </button>
                <div className="my-2 border-t border-border" />
                <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-cream text-left text-text transition-cozy">
                  <Download className="w-4 h-4 text-text-muted" />
                  <span className="text-sm">Export PDF</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-cream text-left text-text transition-cozy">
                  <Download className="w-4 h-4 text-text-muted" />
                  <span className="text-sm">Export PNG</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={onOpenTemplateBrowser}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-cozy"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Templates</span>
          </button>
        </div>
      </div>

      {/* Center - Toolbar */}
      <div className="flex items-center gap-1">
        {/* Undo/Redo */}
        <div className="flex items-center gap-1 pr-3 border-r border-border">
          <button
            disabled={!canUndo}
            className="p-2 rounded-lg hover:bg-cream disabled:opacity-30 disabled:cursor-not-allowed text-text transition-cozy"
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            disabled={!canRedo}
            className="p-2 rounded-lg hover:bg-cream disabled:opacity-30 disabled:cursor-not-allowed text-text transition-cozy"
            title="Redo"
          >
            <Redo className="w-4 h-4" />
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 px-3 border-r border-border">
          <button
            onClick={onZoomOut}
            className="p-2 rounded-lg hover:bg-cream text-text transition-cozy"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="w-14 text-center text-sm text-text-muted font-medium">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={onZoomIn}
            className="p-2 rounded-lg hover:bg-cream text-text transition-cozy"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={onZoomFit}
            className="p-2 rounded-lg hover:bg-cream text-text transition-cozy ml-1"
            title="Fit to Screen"
          >
            <Maximize className="w-4 h-4" />
          </button>
        </div>

        {/* View Toggles */}
        <div className="flex items-center gap-1 px-3">
          <button
            onClick={onToggleGrid}
            className={`p-2 rounded-lg transition-cozy ${
              showGrid
                ? 'bg-accent/10 text-accent'
                : 'hover:bg-cream text-text-muted'
            }`}
            title="Toggle Grid"
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={onToggleRuler}
            className={`p-2 rounded-lg transition-cozy ${
              showRuler
                ? 'bg-accent/10 text-accent'
                : 'hover:bg-cream text-text-muted'
            }`}
            title="Toggle Ruler"
          >
            <Ruler className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Right - User & Cursor Position */}
      <div className="flex items-center gap-4">
        {/* Cursor Position */}
        {cursorPosition && (
          <div className="hidden md:flex items-center gap-1 text-xs text-text-muted font-mono">
            <span>{cursorPosition.x.toFixed(1)}mm</span>
            <span>,</span>
            <span>{cursorPosition.y.toFixed(1)}mm</span>
          </div>
        )}

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-cream transition-cozy"
          >
            <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center">
              <User className="w-4 h-4 text-accent" />
            </div>
            <span className="text-sm text-text hidden sm:block">
              {user?.email?.split('@')[0] || 'User'}
            </span>
            <ChevronDown className="w-4 h-4 text-text-muted" />
          </button>

          {showUserMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute top-full right-0 mt-1 w-56 bg-panel rounded-xl shadow-lg border border-border z-50 py-2">
                <div className="px-4 py-2 border-b border-border">
                  <p className="text-sm font-medium text-text">{user?.email}</p>
                  <p className="text-xs text-text-muted">Free Plan</p>
                </div>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-cream text-left text-text transition-cozy">
                  <Settings className="w-4 h-4 text-text-muted" />
                  <span className="text-sm">Settings</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-cream text-left text-text transition-cozy">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span className="text-sm">Upgrade to Pro</span>
                </button>
                <div className="my-2 border-t border-border" />
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 text-left text-red-500 transition-cozy"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Sign Out</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
