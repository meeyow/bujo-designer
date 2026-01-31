# Bujo Designer

A modern bullet journal layout designer web application built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Visual Layout Designer** - Create beautiful bullet journal layouts with an intuitive drag-and-drop interface
- **User Accounts** - Secure authentication and user management powered by Supabase
- **Cloud Saves** - Save and sync your layouts across all your devices
- **Subscription Plans** - Premium features available via Stripe subscription management

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Authentication**: [Supabase Auth](https://supabase.com/docs/guides/auth)
- **Database**: [Supabase](https://supabase.com/)
- **Payments**: [Stripe](https://stripe.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm
- Supabase account
- Stripe account (for payments)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/meeyow/bujo-designer.git
cd bujo-designer
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Add your Supabase and Stripe credentials to `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
bujo-designer/
├── app/                 # Next.js App Router pages
├── components/          # React components
├── lib/                 # Utility functions and configurations
├── types/               # TypeScript type definitions
├── hooks/               # Custom React hooks
├── public/              # Static assets
└── ...
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE)
