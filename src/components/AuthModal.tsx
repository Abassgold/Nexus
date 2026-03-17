import React, { useState } from 'react';
import {
  MailIcon,
  LockIcon,
  UserIcon,
  EyeIcon,
  EyeOffIcon,
  XIcon,
  LoaderIcon } from
'lucide-react';
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab: 'signin' | 'signup';
  onAuthSuccess: (user: {username: string;email: string;}) => void;
}
export function AuthModal({
  isOpen,
  onClose,
  initialTab,
  onAuthSuccess
}: AuthModalProps) {
  const [tab, setTab] = useState<'signin' | 'signup'>(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [terms, setTerms] = useState(false);
  if (!isOpen) return null;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (tab === 'signup') {
      if (!username || !email || !password || !confirmPassword) {
        setError('All fields are required');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
      if (!terms) {
        setError('You must agree to the terms');
        return;
      }
    } else {
      if (!email || !password) {
        setError('Email and password are required');
        return;
      }
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onAuthSuccess({
        username: tab === 'signup' ? username : email.split('@')[0],
        email
      });
    }, 1500);
  };
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}>
      </div>

      <div className="relative w-full max-w-md bg-surface-secondary border border-border-subtle rounded-sm shadow-2xl animate-fade-in flex flex-col">
        {/* Header & Tabs */}
        <div className="flex items-center justify-between border-b border-border-subtle px-6 pt-6 pb-0">
          <div className="flex gap-6">
            <button
              onClick={() => {
                setTab('signin');
                setError('');
              }}
              className={`pb-3 font-heading font-semibold text-sm transition-colors border-b-2 ${tab === 'signin' ? 'text-accent border-accent' : 'text-txt-secondary border-transparent hover:text-txt-primary'}`}>

              Sign In
            </button>
            <button
              onClick={() => {
                setTab('signup');
                setError('');
              }}
              className={`pb-3 font-heading font-semibold text-sm transition-colors border-b-2 ${tab === 'signup' ? 'text-accent border-accent' : 'text-txt-secondary border-transparent hover:text-txt-primary'}`}>

              Sign Up
            </button>
          </div>
          <button
            onClick={onClose}
            className="text-txt-muted hover:text-txt-primary pb-3">

            <XIcon size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {error &&
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-sm text-red-500 text-xs font-medium">
              {error}
            </div>
          }

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {tab === 'signup' &&
            <div>
                <label className="block text-xs font-semibold text-txt-secondary mb-1.5 uppercase tracking-wider">
                  Username
                </label>
                <div className="relative">
                  <UserIcon
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-txt-muted" />

                  <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-surface-tertiary border border-border-subtle text-txt-primary text-sm rounded-sm py-2.5 pl-10 pr-4 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all placeholder:text-txt-muted"
                  placeholder="johndoe" />

                </div>
              </div>
            }

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
                {tab === 'signin' &&
                <a
                  href="#"
                  className="text-xs text-accent hover:text-accent-hover transition-colors">

                    Forgot Password?
                  </a>
                }
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

            {tab === 'signup' &&
            <>
                <div>
                  <label className="block text-xs font-semibold text-txt-secondary mb-1.5 uppercase tracking-wider">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <LockIcon
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-txt-muted" />

                    <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-surface-tertiary border border-border-subtle text-txt-primary text-sm rounded-sm py-2.5 pl-10 pr-4 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all placeholder:text-txt-muted"
                    placeholder="••••••••" />

                  </div>
                </div>
                <label className="flex items-start gap-2 cursor-pointer mt-2">
                  <input
                  type="checkbox"
                  checked={terms}
                  onChange={(e) => setTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded-sm border-border-subtle bg-surface-tertiary text-accent focus:ring-accent/30 focus:ring-offset-surface-secondary" />

                  <span className="text-xs text-txt-secondary leading-relaxed">
                    I agree to the{' '}
                    <a href="#" className="text-accent hover:underline">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-accent hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>
              </>
            }

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 bg-accent text-surface-primary font-bold text-sm py-3 rounded-sm hover:bg-accent-hover transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">

              {isLoading ?
              <>
                  <LoaderIcon size={16} className="animate-spin" />
                  {tab === 'signin' ? 'Signing in...' : 'Creating account...'}
                </> :
              tab === 'signin' ?
              'Sign In' :

              'Create Account'
              }
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-txt-secondary">
              {tab === 'signin' ?
              "Don't have an account? " :
              'Already have an account? '}
              <button
                onClick={() => {
                  setTab(tab === 'signin' ? 'signup' : 'signin');
                  setError('');
                }}
                className="text-accent hover:text-accent-hover font-semibold transition-colors">

                {tab === 'signin' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>);

}