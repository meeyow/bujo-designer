'use client';

import { useState } from 'react';
import { X, Search, Calendar, CheckSquare, Smile, Grid3X3, BookOpen, Sparkles, Star, Clock, TrendingUp } from 'lucide-react';

interface TemplateBrowserProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (templateId: string) => void;
}

interface Template {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  description: string;
  isPremium?: boolean;
  isNew?: boolean;
}

const categories = [
  { id: 'all', name: 'All Templates', icon: Sparkles },
  { id: 'monthly', name: 'Monthly', icon: Calendar },
  { id: 'weekly', name: 'Weekly', icon: Clock },
  { id: 'habit', name: 'Habit Trackers', icon: CheckSquare },
  { id: 'mood', name: 'Mood Trackers', icon: Smile },
  { id: 'collections', name: 'Collections', icon: BookOpen },
  { id: 'grids', name: 'Grids & Tables', icon: Grid3X3 },
];

const templates: Template[] = [
  // Monthly
  { id: 'm1', name: 'Classic Monthly', category: 'monthly', thumbnail: '📅', description: 'Traditional calendar grid with notes section', isPremium: false },
  { id: 'm2', name: 'Minimal Monthly', category: 'monthly', thumbnail: '📆', description: 'Clean and simple monthly overview', isPremium: false },
  { id: 'm3', name: 'Vertical Monthly', category: 'monthly', thumbnail: '🗓️', description: 'Week-by-week vertical layout', isPremium: true },
  { id: 'm4', name: 'Hobonichi Style', category: 'monthly', thumbnail: '📔', description: 'Inspired by Hobonichi Techo', isPremium: true },
  
  // Weekly
  { id: 'w1', name: 'Horizontal Weekly', category: 'weekly', thumbnail: '↔️', description: 'Days arranged horizontally', isPremium: false },
  { id: 'w2', name: 'Vertical Weekly', category: 'weekly', thumbnail: '↕️', description: 'Days arranged vertically', isPremium: false },
  { id: 'w3', name: 'Dutch Door', category: 'weekly', thumbnail: '🚪', description: 'Folded sections for flexibility', isPremium: true },
  { id: 'w4', name: 'Rolling Weekly', category: 'weekly', thumbnail: '🔄', description: 'Continuous 7-day view', isPremium: true },
  
  // Habit Trackers
  { id: 'h1', name: 'Simple Tracker', category: 'habit', thumbnail: '✓', description: 'Basic grid for daily habits', isPremium: false },
  { id: 'h2', name: 'Circular Tracker', category: 'habit', thumbnail: '◯', description: 'Radial habit wheel', isPremium: false },
  { id: 'h3', name: 'Year in Pixels', category: 'habit', thumbnail: '▦', description: 'Full year color-coded tracker', isPremium: true },
  { id: 'h4', name: 'Weekly Habit', category: 'habit', thumbnail: '📊', description: 'Week-focused habit tracking', isPremium: false },
  
  // Mood Trackers
  { id: 'mo1', name: 'Monthly Mood', category: 'mood', thumbnail: '😊', description: 'Track mood throughout the month', isPremium: false },
  { id: 'mo2', name: 'Mood Mandala', category: 'mood', thumbnail: '☸️', description: 'Beautiful mandala mood tracker', isPremium: true },
  { id: 'mo3', name: 'Weather Mood', category: 'mood', thumbnail: '🌤️', description: 'Weather-inspired mood icons', isPremium: false },
  { id: 'mo4', name: 'Gradient Mood', category: 'mood', thumbnail: '🎨', description: 'Color gradient mood scale', isPremium: true },
  
  // Collections
  { id: 'c1', name: 'Books to Read', category: 'collections', thumbnail: '📚', description: 'Reading list with progress', isPremium: false },
  { id: 'c2', name: 'Movies Watched', category: 'collections', thumbnail: '🎬', description: 'Film tracker with ratings', isPremium: false },
  { id: 'c3', name: 'Recipe Collection', category: 'collections', thumbnail: '👨‍🍳', description: 'Meal planning and recipes', isPremium: false },
  { id: 'c4', name: 'Travel Log', category: 'collections', thumbnail: '✈️', description: 'Places visited and memories', isPremium: true },
  { id: 'c5', name: 'Gratitude Log', category: 'collections', thumbnail: '🙏', description: 'Daily gratitude entries', isPremium: false },
  { id: 'c6', name: 'Sleep Tracker', category: 'collections', thumbnail: '😴', description: 'Monitor sleep patterns', isPremium: false },
  
  // Grids & Tables
  { id: 'g1', name: 'Simple Grid', category: 'grids', thumbnail: '▢', description: 'Basic customizable grid', isPremium: false },
  { id: 'g2', name: 'Weekly Schedule', category: 'grids', thumbnail: '📋', description: 'Time-based weekly grid', isPremium: false },
  { id: 'g3', name: 'Project Planner', category: 'grids', thumbnail: '📐', description: 'Project breakdown grid', isPremium: true },
  { id: 'g4', name: 'Finance Tracker', category: 'grids', thumbnail: '💰', description: 'Budget and expense table', isPremium: true },
];

export function TemplateBrowser({ isOpen, onClose, onSelectTemplate }: TemplateBrowserProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory = activeCategory === 'all' || template.category === activeCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-[900px] h-[700px] bg-panel rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-cream">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-text">Template Browser</h2>
              <p className="text-sm text-text-muted">Choose a template to get started</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-border text-text-muted hover:text-text transition-cozy"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-6 py-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-cream focus:border-accent outline-none text-sm"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar - Categories */}
          <div className="w-56 border-r border-border bg-cream/50 overflow-y-auto">
            <div className="p-4 space-y-1">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-cozy
                      ${activeCategory === category.id
                        ? 'bg-accent text-white shadow-sm'
                        : 'hover:bg-border text-text'
                      }`}
                  >
                    <Icon className={`w-4 h-4 ${activeCategory === category.id ? 'text-white' : 'text-text-muted'}`} />
                    <span className="text-sm font-medium">{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Templates Grid */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-3 gap-4">
              {filteredTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => onSelectTemplate(template.id)}
                  className="group relative p-4 rounded-xl border border-border bg-panel hover:border-accent hover:shadow-lg transition-cozy text-left"
                >
                  {/* Thumbnail */}
                  <div className="aspect-[4/3] rounded-lg bg-cream mb-3 flex items-center justify-center text-4xl group-hover:scale-105 transition-cozy">
                    {template.thumbnail}
                  </div>

                  {/* Info */}
                  <h3 className="font-medium text-text mb-1 flex items-center gap-2">
                    {template.name}
                    {template.isPremium && (
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    )}
                  </h3>
                  <p className="text-xs text-text-muted line-clamp-2">{template.description}</p>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 rounded-xl bg-accent/5 opacity-0 group-hover:opacity-100 transition-cozy pointer-events-none" />
                </button>
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="flex flex-col items-center justify-center h-64 text-text-muted">
                <Search className="w-12 h-12 mb-4 opacity-30" />
                <p className="text-sm">No templates found</p>
                <p className="text-xs mt-1">Try adjusting your search or category</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border bg-cream flex items-center justify-between">
          <p className="text-sm text-text-muted">
            {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} available
          </p>
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Pro templates marked with star</span>
          </div>
        </div>
      </div>
    </div>
  );
}
