'use client';

import { useNotification } from "@/components/notification/NotificationContext";
import { trackTikTokEvent } from "@/lib/tiktok";
import { setToken } from "@/lib/token";
import { useAppDispatch } from "@/redux/hooks";
import { addUser } from "@/redux/slice/auth";
import axios from "axios";
import { EyeIcon, EyeOffIcon, LoaderIcon, LockIcon, MailIcon, UserIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

const Page = () => {
    const dispatch = useAppDispatch()
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    // Form states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [terms, setTerms] = useState(false);
    const { notify } = useNotification();

    const clearInput = () => {
        setEmail('');
        setPassword('');
        setUserName('');
        setConfirmPassword('');
        setTerms(false)
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        if (!email || !password)
            return setError('Email and password are required');

        setIsLoading(true);

        try {


            // Replace with your actual login API call
            const { data } = await axios.post(`/api/signin`, {
                email,
                password
            });
            // email: string;
            // userName: string;
            // _id: string;
            // role ?: string;
            // Only runs if the request succeeded
            console.log('the data result ;', data)
            if (!data.ok)
                return;
            clearInput();
            dispatch(addUser(data.user!));
            setToken(data.token ?? '');
            notify('Login successful!', 'success')
        } catch (err: any) {
            setError(err?.response?.data?.message ?? 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <section className="h-screen flex items-center justify-center">
            <div className="w-full">
                <div className="flex items-center justify-center p-4">
                    <div className="relative w-full max-w-md bg-surface-secondary border border-border-subtle rounded-sm shadow-2xl animate-fade-in flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-border-subtle px-6 pt-6 pb-0">
                            <div className="flex gap-6">
                                <div className="pb-3 font-heading font-semibold text-sm text-accent border-b-2 border-accent">
                                    Reset Password
                                </div>
                            </div>
                        </div>

                        {/* Form Body */}
                        <div className="p-6">
                            <p className="text-sm text-txt-secondary mb-6 leading-relaxed">
                                Enter your email address below. We will send you a link to reset your password.
                            </p>
                            {error && (
                                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-sm text-red-500 text-xs font-medium">
                                    {error}
                                </div>
                            )}
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
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full mt-2 cursor-pointer bg-accent text-surface-primary font-bold text-sm py-3 rounded-sm hover:bg-accent-hover transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">

                                    {isLoading && <LoaderIcon size={16} className="animate-spin" />}
                                    {isLoading ? 'Sending link...' : 'Send Reset Link'}
                                </button>
                            </form>
                            <div className="mt-6 text-center">
                                <p className="text-sm text-txt-secondary">
                                    Remember your password?{' '}
                                    <Link
                                        href='/signin'
                                        className="text-accent hover:text-accent-hover font-semibold transition-colors">
                                        Back to Sign In
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

export default Page;