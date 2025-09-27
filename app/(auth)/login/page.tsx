import { LoginForm } from '@/components/login-form'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation';

export default async function page() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!!session) {
        redirect('/workspace/overview');
    }

    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <LoginForm />
            </div>
        </div>
    )
}
