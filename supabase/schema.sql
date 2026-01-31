-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE,
    avatar_url TEXT,
    subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'premium')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Layouts table
CREATE TABLE IF NOT EXISTS layouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT 'Untitled Layout',
    data JSONB NOT NULL DEFAULT '{}',
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to layouts table
CREATE TRIGGER update_layouts_updated_at
    BEFORE UPDATE ON layouts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security on both tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE layouts ENABLE ROW LEVEL SECURITY;

-- Profiles RLS Policies

-- Allow users to view their own profile
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Allow users to insert their own profile
CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Layouts RLS Policies

-- Allow users to view their own layouts
CREATE POLICY "Users can view own layouts" ON layouts
    FOR SELECT USING (auth.uid() = user_id);

-- Allow users to view public layouts
CREATE POLICY "Anyone can view public layouts" ON layouts
    FOR SELECT USING (is_public = TRUE);

-- Allow users to insert their own layouts
CREATE POLICY "Users can insert own layouts" ON layouts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own layouts
CREATE POLICY "Users can update own layouts" ON layouts
    FOR UPDATE USING (auth.uid() = user_id);

-- Allow users to delete their own layouts
CREATE POLICY "Users can delete own layouts" ON layouts
    FOR DELETE USING (auth.uid() = user_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, username)
    VALUES (NEW.id, NEW.email);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_layouts_user_id ON layouts(user_id);
CREATE INDEX IF NOT EXISTS idx_layouts_is_public ON layouts(is_public);
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
