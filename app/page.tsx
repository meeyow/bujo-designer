'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Sparkles, PenTool, Layout, Palette, Download, Shield, Check } from 'lucide-react';
import { useAuth } from '@/components/auth';

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  // Redirect logged-in users to editor
  useEffect(() => {
    if (!loading && user) {
      router.push('/editor');
    }
  }, [user, loading, router]);

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
          <p className="text-text-muted">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't show landing page if user is logged in (will redirect)
  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                <span className="text-xl">🦋</span>
              </div>
              <span className="font-semibold text-text text-lg">Luna Moth Studio</span>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-text-muted hover:text-text transition-cozy text-sm font-medium">
                Features
              </a>
              <a href="#templates" className="text-text-muted hover:text-text transition-cozy text-sm font-medium">
                Templates
              </a>
              <a href="#pricing" className="text-text-muted hover:text-text transition-cozy text-sm font-medium">
                Pricing
              </a>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-text-muted hover:text-text transition-cozy text-sm font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-accent hover:bg-accent-light text-white text-sm font-medium transition-cozy"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Now in Beta</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text leading-tight mb-6">
                Design Your Perfect
                <span className="text-accent block">Bullet Journal</span>
              </h1>
              <p className="text-lg text-text-muted max-w-xl mx-auto lg:mx-0 mb-8">
                Plan before you pen. Create beautiful bullet journal layouts with our intuitive designer. 
                Export and print your custom spreads.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent hover:bg-accent-light text-white font-medium transition-cozy shadow-lg shadow-accent/20"
                >
                  Start Designing Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button
                  onClick={() => {
                    const el = document.getElementById('features');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border hover:border-accent hover:bg-white text-text font-medium transition-cozy"
                >
                  Learn More
                </button>
              </div>

              {/* Social Proof */}
              <div className="mt-10 flex items-center gap-4 justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-accent/20 border-2 border-cream flex items-center justify-center text-xs font-medium text-accent"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-text-muted">
                  <span className="font-semibold text-text">1,000+</span> journalers designing
                </p>
              </div>
            </div>

            {/* Right - Preview Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 rounded-3xl blur-3xl" />
              <div className="relative bg-white rounded-2xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-cozy duration-500">
                <div className="aspect-[3/4] bg-cream rounded-lg border border-border overflow-hidden relative">
                  {/* Mock Journal Page */}
                  <div className="absolute inset-0 p-6">
                    {/* Header */}
                    <div className="h-8 w-32 bg-accent/20 rounded mb-4" />
                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-2 mb-4">
                      {Array.from({ length: 28 }).map((_, i) => (
                        <div
                          key={i}
                          className={`aspect-square rounded ${
                            i === 15 ? 'bg-accent text-white' : 'bg-white border border-border'
                          } flex items-center justify-center text-xs`}
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                    {/* Habit Tracker */}
                    <div className="space-y-2">
                      <div className="h-4 w-24 bg-text/10 rounded" />
                      <div className="grid grid-cols-10 gap-1">
                        {Array.from({ length: 20 }).map((_, i) => (
                          <div
                            key={i}
                            className={`aspect-square rounded ${
                              i % 3 === 0 ? 'bg-accent/30' : 'bg-white border border-border'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Floating Badge */}
                <div className="absolute -bottom-4 -right-4 bg-accent text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  ✨ Export to PDF
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text mb-4">Everything You Need</h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              From quick templates to precise drawing tools, create layouts that match your journaling style.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Layout,
                title: 'Smart Templates',
                description: 'Start with monthly, weekly, habit, and mood tracker templates. Customize to your heart\'s content.',
              },
              {
                icon: PenTool,
                title: 'Drawing Tools',
                description: 'Pen, lines, shapes, and text tools designed for bullet journaling precision.',
              },
              {
                icon: Palette,
                title: 'Beautiful Colors',
                description: 'Curated color palettes inspired by cozy aesthetics and popular journal themes.',
              },
              {
                icon: Download,
                title: 'Export & Print',
                description: 'Export your layouts as PDF or PNG. Print and transfer to your physical journal.',
              },
              {
                icon: Shield,
                title: 'Cloud Sync',
                description: 'Your layouts are safely stored in the cloud. Access from anywhere.',
              },
              {
                icon: Sparkles,
                title: 'Pro Features',
                description: 'Unlock premium templates, advanced tools, and priority support with Pro.',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl bg-cream border border-border hover:border-accent hover:shadow-lg transition-cozy group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-cozy">
                  <feature.icon className="w-6 h-6 text-accent group-hover:text-white" />
                </div>
                <h3 className="text-lg font-semibold text-text mb-2">{feature.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section id="templates" className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text mb-4">Popular Templates</h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Choose from dozens of professionally designed templates to jumpstart your journaling.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Monthly Calendar', emoji: '📅', color: 'bg-blue-100' },
              { name: 'Weekly Spread', emoji: '📆', color: 'bg-green-100' },
              { name: 'Habit Tracker', emoji: '✓', color: 'bg-purple-100' },
              { name: 'Mood Tracker', emoji: '😊', color: 'bg-yellow-100' },
              { name: 'Gratitude Log', emoji: '🙏', color: 'bg-pink-100' },
              { name: 'Reading List', emoji: '📚', color: 'bg-orange-100' },
              { name: 'Sleep Tracker', emoji: '😴', color: 'bg-indigo-100' },
              { name: 'Year in Pixels', emoji: '▦', color: 'bg-red-100' },
            ].map((template) => (
              <div
                key={template.name}
                className="bg-white rounded-xl p-6 border border-border hover:border-accent hover:shadow-lg transition-cozy cursor-pointer group"
              >
                <div className={`w-16 h-16 rounded-xl ${template.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-cozy`}>
                  {template.emoji}
                </div>
                <h3 className="font-medium text-text">{template.name}</h3>
                <p className="text-sm text-text-muted mt-1">Click to preview</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text mb-4">Simple Pricing</h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Start free and upgrade when you need more power.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="p-8 rounded-2xl bg-cream border border-border">
              <h3 className="text-xl font-semibold text-text mb-2">Free</h3>
              <p className="text-text-muted mb-6">Perfect for getting started</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-text">$0</span>
                <span className="text-text-muted">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  '5 layouts per month',
                  'Basic templates',
                  'Standard export (PNG)',
                  'Email support',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-text">
                    <Check className="w-5 h-5 text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/login"
                className="block w-full text-center px-6 py-3 rounded-xl border border-border hover:border-accent hover:bg-white text-text font-medium transition-cozy"
              >
                Get Started
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="p-8 rounded-2xl bg-accent text-white relative overflow-hidden">
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/20 text-xs font-medium">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <p className="text-white/70 mb-6">For serious journalers</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$5</span>
                <span className="text-white/70">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  'Unlimited layouts',
                  'All templates + premium',
                  'PDF & PNG export',
                  'Cloud sync',
                  'Priority support',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <Check className="w-5 h-5" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/login"
                className="block w-full text-center px-6 py-3 rounded-xl bg-white text-accent font-medium hover:bg-white/90 transition-cozy"
              >
                Upgrade to Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Design Your Journal?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of journalers who plan before they pen. Start creating beautiful layouts today.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-accent font-medium hover:bg-white/90 transition-cozy shadow-lg"
          >
            Start Designing Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-text text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🦋</span>
                <span className="font-semibold">Luna Moth Studio</span>
              </div>
              <p className="text-white/60 text-sm">
                Design beautiful bullet journal layouts with ease.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#features" className="hover:text-white transition-cozy">Features</a></li>
                <li><a href="#templates" className="hover:text-white transition-cozy">Templates</a></li>
                <li><a href="#pricing" className="hover:text-white transition-cozy">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition-cozy">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-cozy">Tutorials</a></li>
                <li><a href="#" className="hover:text-white transition-cozy">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition-cozy">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-cozy">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-sm text-white/60">
            © {new Date().getFullYear()} Luna Moth Studio. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
