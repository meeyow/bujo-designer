# Authentication & Database Setup

This project uses Supabase for authentication and database management.

## Setup Instructions

### 1. Supabase Project Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API to get your credentials:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Copy `.env.local.example` to `.env.local` and fill in your credentials

### 2. Database Schema

Run the SQL in `supabase/schema.sql` in your Supabase SQL Editor:

1. Go to SQL Editor in your Supabase dashboard
2. Click "New Query"
3. Paste the contents of `supabase/schema.sql`
4. Click "Run"

This will create:
- `profiles` table - stores user profile information
- `layouts` table - stores user journal layouts
- Row Level Security (RLS) policies for data protection
- Trigger to auto-create profile on user signup

### 3. Authentication Configuration

In your Supabase dashboard, configure authentication providers:

1. Go to Authentication > Providers
2. Enable Email provider (enabled by default)
3. Optionally enable:
   - Google OAuth (requires Google credentials)
   - GitHub OAuth (requires GitHub App setup)

### 4. Install Dependencies

```bash
npm install
```

### 5. Run the Development Server

```bash
npm run dev
```

## Project Structure

```
├── app/
│   ├── auth/callback/route.ts  # OAuth callback handler
│   ├── login/page.tsx          # Login page
│   └── layout.tsx              # Root layout with AuthProvider
├── components/
│   └── auth/
│       ├── AuthForm.tsx        # Login/Signup form
│       ├── LogoutButton.tsx    # Sign out button
│       ├── AuthProvider.tsx    # Auth context provider
│       ├── ProtectedRoute.tsx  # Route protection component
│       └── index.ts            # Auth exports
├── lib/supabase/
│   ├── client.ts               # Browser Supabase client
│   ├── server.ts               # Server Supabase client
│   └── middleware.ts           # Session refresh middleware
├── supabase/
│   └── schema.sql              # Database schema
└── middleware.ts               # Next.js middleware
```

## Authentication Flow

1. **Login/Signup**: Users can sign in with email/password or OAuth providers (Google, GitHub)
2. **Session Management**: Middleware automatically refreshes sessions on each request
3. **Protected Routes**: Routes under `/dashboard`, `/editor`, `/settings`, `/layouts` require authentication
4. **Profile Creation**: When a user signs up, a profile is automatically created via database trigger

## Database Schema

### Profiles Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key, references auth.users |
| username | TEXT | Unique username |
| avatar_url | TEXT | Profile image URL |
| subscription_tier | TEXT | 'free', 'pro', or 'premium' |
| created_at | TIMESTAMPTZ | Account creation date |

### Layouts Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Owner reference |
| title | TEXT | Layout name |
| data | JSONB | Layout configuration |
| is_public | BOOLEAN | Public visibility |
| created_at | TIMESTAMPTZ | Creation date |
| updated_at | TIMESTAMPTZ | Last update date |

## Security

- Row Level Security (RLS) is enabled on all tables
- Users can only access their own data (unless marked public)
- All database operations respect RLS policies
- Environment variables are never exposed to the client

## Using Auth in Components

### Check if user is authenticated
```tsx
import { useAuth } from '@/components/auth';

function MyComponent() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please sign in</div>;

  return <div>Welcome, {user.email}!</div>;
}
```

### Protect a route
```tsx
import { ProtectedRoute } from '@/components/auth';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>Dashboard content</div>
    </ProtectedRoute>
  );
}
```

### Sign out
```tsx
import { LogoutButton } from '@/components/auth';

function Header() {
  return <LogoutButton />;
}
```
