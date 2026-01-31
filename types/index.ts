// User types
export interface User {
  id: string;
  email: string;
  created_at: string;
  subscription_status?: 'active' | 'inactive' | 'trialing';
  subscription_tier?: 'free' | 'pro' | 'premium';
}

// Layout types
export interface Layout {
  id: string;
  user_id: string;
  name: string;
  data: LayoutData;
  created_at: string;
  updated_at: string;
}

export interface LayoutData {
  elements: LayoutElement[];
  settings: LayoutSettings;
}

export interface LayoutElement {
  id: string;
  type: 'text' | 'checkbox' | 'habit' | 'mood' | 'calendar' | 'divider';
  position: { x: number; y: number };
  size: { width: number; height: number };
  content?: string;
  style?: Record<string, string>;
}

export interface LayoutSettings {
  pageSize: 'a4' | 'letter' | 'custom';
  orientation: 'portrait' | 'landscape';
  backgroundColor: string;
  gridEnabled: boolean;
  gridSize: number;
}

// Subscription types
export interface Subscription {
  id: string;
  user_id: string;
  stripe_subscription_id: string;
  status: string;
  tier: string;
  current_period_start: string;
  current_period_end: string;
  created_at: string;
}
