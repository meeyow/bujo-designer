import { AuthForm } from '@/components/auth/AuthForm';

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Bujo Designer
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Sign in to create and manage your bullet journal layouts
                    </p>
                </div>
                <AuthForm redirectTo="/dashboard" />
            </div>
        </div>
    );
}
