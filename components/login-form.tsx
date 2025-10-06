"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { EyeClosedIcon, EyeIcon, Github, OctagonAlertIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { useForm } from "react-hook-form"
import { LoginFormData, loginSchema } from "@/lib/validations/auth";
import { zodResolver } from '@hookform/resolvers/zod';
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { Alert, AlertTitle } from "./ui/alert"
import Link from "next/link"
import { Turnstile } from '@marsidev/react-turnstile';

export function LoginForm({
    isModal = false,
    className,
    ...props
}: {
    isModal?: boolean;
    className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {

    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [captchaToken, setCaptchaToken] = useState<string>('');
    const [clientIp, setClientIp] = useState<string>('');

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    useEffect(() => {
        const getClientIP = async () => {
            try {
                const response = await fetch('/api/get-ip');
                if (response.ok) {
                    const { ip } = await response.json();
                    setClientIp(ip);
                }
            } catch (error) {
                //
            }
        };

        getClientIP();
    }, []);

    const onsubmit = async (data: LoginFormData) => {
        if (!captchaToken) {
            setError("Please complete the captcha verification");
            return;
        }

        setError(null);
        setIsLoading(true);

        try {
            await authClient.signIn.email({
                email: data.email,
                password: data.password,
                fetchOptions: {
                    headers: {
                        "x-captcha-response": captchaToken,
                        "x-captcha-user-remote-ip": clientIp,
                    },
                }
            }
            );
            router.push("/workspace/overview");
        } catch (error: any) {
            setIsLoading(false);
            setError(error.message || "An unexpected error occurred");
            setCaptchaToken('');
        } finally {
            setIsLoading(false);
        }
    }

    const handleSocialLogin = {
        githubLogin: () => {
            authClient.signIn.social({
                provider: 'github',
                callbackURL: "/workspace/overview"
            })
        },
        googleLogin: () => {
            authClient.signIn.social({
                provider: "google",
                callbackURL: "/workspace/overview"
            })
        }
    }

    const handleCaptchaSuccess = (token: string) => {
        setCaptchaToken(token);
        setError(null); 
    };

    const handleCaptchaError = () => {
        setCaptchaToken('');
        setError("Captcha verification failed. Please try again.");
    };

    const handleCaptchaExpire = () => {
        setCaptchaToken('');
    };

    if (isModal) {
        return (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onsubmit)} className="p-6 md:p-8">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-center text-center">
                            <h1 className="text-2xl font-bold">Welcome back</h1>
                            <p className="text-muted-foreground text-balance">
                                Login to your account
                            </p>
                        </div>

                        <div className="grid gap-3">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="m@example.com"
                                                disabled={isLoading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid gap-3">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center">
                                            <FormLabel>Password</FormLabel>
                                            <a
                                                href="forgot-password"
                                                className="ml-auto text-sm underline-offset-2 hover:underline"
                                            >
                                                Forgot your password?
                                            </a>
                                        </div>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Enter Password"
                                                    disabled={isLoading}
                                                    {...field}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                    onClick={() => setShowPassword((prev) => !prev)}
                                                >
                                                    {showPassword ? (
                                                        <EyeIcon className="size-4" aria-hidden="true" />
                                                    ) : (
                                                        <EyeClosedIcon className="size-4" aria-hidden="true" />
                                                    )}
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-center">
                            <Turnstile
                                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                                onSuccess={handleCaptchaSuccess}
                                onError={handleCaptchaError}
                                onExpire={handleCaptchaExpire}
                            />
                        </div>

                        {!!error && (
                            <Alert className="bg-destructive/10 border-none">
                                <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                                <AlertTitle>{error}</AlertTitle>
                            </Alert>
                        )}

                        <Button
                            disabled={isLoading || !captchaToken}
                            type="submit"
                            className="w-full"
                        >
                            {isLoading ? "Signing in..." : "Login"}
                        </Button>

                        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                            <span className="bg-card text-muted-foreground relative z-10 px-2">
                                Or continue with
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Button
                                disabled={isLoading}
                                onClick={handleSocialLogin.googleLogin}
                                variant="outline"
                                type="button"
                                className="w-full"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path
                                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                        fill="currentColor"
                                    />
                                </svg>
                                <span className="sr-only">Login with Google</span>
                            </Button>
                            <Button
                                disabled={isLoading}
                                onClick={handleSocialLogin.githubLogin}
                                variant="outline"
                                type="button"
                                className="w-full"
                            >
                                <Github className="size-5" />
                                <span className="sr-only">Login with Github</span>
                            </Button>
                        </div>

                        <div className="text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href="/signup" className="underline underline-offset-4">
                                Sign up
                            </Link>
                        </div>
                    </div>
                </form>
            </Form>
        )
    }

    // Rest of your non-modal implementation with same fixes applied...
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onsubmit)} className="p-6 md:p-8">
                            {/* Same form content as modal version */}
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">Welcome back</h1>
                                    <p className="text-muted-foreground text-balance">
                                        Login to your account
                                    </p>
                                </div>

                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="m@example.com"
                                                        disabled={isLoading}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex items-center">
                                                    <FormLabel>Password</FormLabel>
                                                    <a
                                                        href="forgot-password"
                                                        className="ml-auto text-sm underline-offset-2 hover:underline"
                                                    >
                                                        Forgot your password?
                                                    </a>
                                                </div>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            type={showPassword ? "text" : "password"}
                                                            placeholder="Enter Password"
                                                            disabled={isLoading}
                                                            {...field}
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                            onClick={() => setShowPassword((prev) => !prev)}
                                                        >
                                                            {showPassword ? (
                                                                <EyeIcon className="size-4" aria-hidden="true" />
                                                            ) : (
                                                                <EyeClosedIcon className="size-4" aria-hidden="true" />
                                                            )}
                                                        </Button>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex justify-center">
                                    <Turnstile
                                        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                                        onSuccess={handleCaptchaSuccess}
                                        onError={handleCaptchaError}
                                        onExpire={handleCaptchaExpire}
                                    />
                                </div>

                                {!!error && (
                                    <Alert className="bg-destructive/10 border-none">
                                        <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                                        <AlertTitle>{error}</AlertTitle>
                                    </Alert>
                                )}

                                <Button
                                    disabled={isLoading || !captchaToken}
                                    type="submit"
                                    className="w-full"
                                >
                                    {isLoading ? "Signing in..." : "Login"}
                                </Button>

                                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                    <span className="bg-card text-muted-foreground relative z-10 px-2">
                                        Or continue with
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <Button
                                        disabled={isLoading}
                                        onClick={handleSocialLogin.googleLogin}
                                        variant="outline"
                                        type="button"
                                        className="w-full"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path
                                                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                        <span className="sr-only">Login with Google</span>
                                    </Button>
                                    <Button
                                        disabled={isLoading}
                                        onClick={handleSocialLogin.githubLogin}
                                        variant="outline"
                                        type="button"
                                        className="w-full"
                                    >
                                        <Github className="size-5" />
                                        <span className="sr-only">Login with Github</span>
                                    </Button>
                                </div>

                                <div className="text-center text-sm">
                                    Don&apos;t have an account?{" "}
                                    <a href="/signup" className="underline underline-offset-4">
                                        Sign up
                                    </a>
                                </div>
                            </div>
                        </form>
                    </Form>
                    <div className="bg-muted relative hidden md:block">
                        <img
                            src="/ai_robot.jpg"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}
