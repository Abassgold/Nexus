'use client';

import { useNotification } from "@/components/notification/NotificationContext";
import { setToken } from "@/lib/token";
import axios from "axios";
import { EyeIcon, EyeOffIcon, LoaderIcon, LockIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export interface AuthResponse {
    ok: boolean;
    token?: string;
    msg?: string;
}
const Signin = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { notify } = useNotification();

    const clearInput = () => {
        setEmail('');
        setPassword('');
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        setError('');

        if (!email || !password)
            return setError('Email or password is required');


        setIsLoading(true);

        try {
            const { data } = await axios.post<AuthResponse>('/api/signin', {
                email,
                password,
            });

            if (!data.ok)
                return setError(data.msg ?? 'Login failed. Please try again.');

            clearInput();
            setToken(data.token ?? '');
            notify('Login Successful!', 'success');
            router.push('/user/dashboard');
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message ?? 'Login failed. Please try again.');
            } else {
                setError('An unexpected error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <section className="h-screen flex items-center justify-center">
            <div className="w-full">
                <div className="flex items-center justify-center p-4">
                    <div className="relative w-full max-w-md bg-surface-secondary border border-border-subtle rounded-sm shadow-2xl animate-fade-in flex flex-col">
                        <div className="flex items-center justify-between border-b border-border-subtle px-6 pt-6 pb-0">
                            <div className="flex gap-6">
                                <button
                                    className={`pb-3 font-heading font-semibold text-sm transition-colors border-b-2  'text-accent border-accent' : 'text-txt-secondary border-transparent hover:text-txt-primary'}`}>
                                    Sign In
                                </button>
                            </div>
                        </div>

                        {/* Form Body */}
                        <div className="p-6">
                            {error &&
                                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-sm text-red-500 text-xs font-medium">
                                    {error}
                                </div>
                            }

                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                                <div>
                                    <label className="block text-xs font-semibold text-txt-secondary mb-1.5 uppercase tracking-wider">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <MailIcon
                                            size={16}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-txt-muted" />
                                        <input
                                            type="email"
                                            value={email}
                                            required
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-surface-tertiary border border-border-subtle text-txt-primary text-sm rounded-sm py-2.5 pl-10 pr-4 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all placeholder:text-txt-muted"
                                            placeholder="you@example.com" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="block text-xs font-semibold text-txt-secondary uppercase tracking-wider">
                                            Password
                                        </label>
                                        <Link
                                            href="/forgot-password"
                                            className="text-xs text-accent hover:text-accent-hover transition-colors">

                                            Forgot Password?
                                        </Link>
                                    </div>
                                    <div className="relative">
                                        <LockIcon
                                            size={16}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-txt-muted" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full bg-surface-tertiary border border-border-subtle text-txt-primary text-sm rounded-sm py-2.5 pl-10 pr-10 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all placeholder:text-txt-muted"
                                            placeholder="••••••••" />

                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-txt-muted hover:text-txt-primary">

                                            {showPassword ?
                                                <EyeOffIcon size={16} /> :
                                                <EyeIcon size={16} />
                                            }
                                        </button>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full mt-4 cursor-pointer bg-accent text-surface-primary font-bold text-sm py-3 rounded-sm hover:bg-accent-hover transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">

                                    {isLoading && <LoaderIcon size={16} className="animate-spin" />}
                                    {isLoading ? 'Signing in...' : 'signin'}
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-sm text-txt-secondary">
                                    Don't have an account?
                                    <Link
                                        href='/signup'
                                        className="text-accent hover:text-accent-hover font-semibold transition-colors">
                                        Sign Up
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Signin