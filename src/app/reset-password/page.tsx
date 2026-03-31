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

export interface findUser {
    email: string;
    userName: string;
    _id: string;
    role?: string;
};

export interface AuthResponse {
    ok: boolean;
    user?: findUser;
    token?: string;
    msg?: string;
}

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

        if (!userName || !email || !password || !confirmPassword)
            return setError('All fields are required');

        if (password !== confirmPassword)
            return setError('Passwords do not match');

        if (password.length < 6)
            return setError('Password must be at least 6 characters');

        if (!terms)
            return setError('You must agree to the terms');

        setIsLoading(true);

        try {
            let data;

            // Replace with your actual signup API call
            data = await axios.post<AuthResponse>('/api/signup', {
                userName,
                email,
                password,
                confirmPassword
            });
            trackTikTokEvent('CompleteRegistration');

            // email: string;
            // userName: string;
            // _id: string;
            // role ?: string;
            // Only runs if the request succeeded
            console.log('the data result ;', data.data)
            if (!data.data.ok)
                return;
            clearInput();
            dispatch(addUser(data.data.user!));
            setToken(data.data.token ?? '');
            notify('Registration successful!', 'success')


        } catch (err: any) {
            // Show a meaningful error to the user
            setError(err?.response?.data?.message ?? 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false); // always stop the loader
        }
    };
    return (
        <section className="h-screen flex items-center justify-center">
            <div className="w-full p-4">
                <div className="flex items-center justify-center p-4">
                    <div className="relative w-full max-w-md bg-surface-secondary border border-border-subtle rounded-sm shadow-2xl animate-fade-in flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-border-subtle px-6 pt-6 pb-0">
                            <div className="flex gap-6">
                                <div className="pb-3 font-heading font-semibold text-sm text-accent border-b-2 border-accent">
                                    New Password
                                </div>
                            </div>
                        </div>

                        {/* Form Body */}
                        <div className="p-6">
                            <p className="text-sm text-txt-secondary mb-6 leading-relaxed">
                                Please enter a strong new password for your account.
                            </p>

                            {error && (
                                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-sm text-red-500 text-xs font-medium">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                {/* New Password */}
                                <div>
                                    <label className="block text-xs font-semibold text-txt-secondary mb-1.5 uppercase tracking-wider">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <LockIcon
                                            size={16}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-txt-muted" />

                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            required
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full bg-surface-tertiary border border-border-subtle text-txt-primary text-sm rounded-sm py-2.5 pl-10 pr-10 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all placeholder:text-txt-muted"
                                            placeholder="••••••••" />

                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-txt-muted hover:text-txt-primary">
                                            {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm New Password */}
                                <div>
                                    <label className="block text-xs font-semibold text-txt-secondary mb-1.5 uppercase tracking-wider">
                                        Confirm New Password
                                    </label>
                                    <div className="relative">
                                        <LockIcon
                                            size={16}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-txt-muted" />

                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={confirmPassword}
                                            required
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full bg-surface-tertiary border border-border-subtle text-txt-primary text-sm rounded-sm py-2.5 pl-10 pr-4 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all placeholder:text-txt-muted"
                                            placeholder="••••••••" />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full mt-4 cursor-pointer bg-accent text-surface-primary font-bold text-sm py-3 rounded-sm hover:bg-accent-hover transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">

                                    {isLoading && <LoaderIcon size={16} className="animate-spin" />}
                                    {isLoading ? 'Updating...' : 'Update Password'}
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-sm text-txt-secondary">
                                    Wait, I remember it!{' '}
                                    <Link
                                        href='/signin'
                                        className="text-accent hover:text-accent-hover font-semibold transition-colors">
                                        Go to Login
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