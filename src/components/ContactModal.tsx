import React, { useState } from 'react';
import { MailIcon, UserIcon, XIcon, SendIcon, LoaderIcon } from 'lucide-react';
interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}
export function ContactModal({
  isOpen,
  onClose,
  onSuccess
}: ContactModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  if (!isOpen) return null;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 1500);
  };
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}>
      </div>

      <div className="relative w-full max-w-lg bg-surface-secondary border border-border-subtle rounded-sm shadow-2xl animate-fade-in flex flex-col">
        <div className="flex items-center justify-between border-b border-border-subtle p-6">
          <h2 className="font-heading font-bold text-lg text-txt-primary">
            Contact Support
          </h2>
          <button
            onClick={onClose}
            className="text-txt-muted hover:text-txt-primary">

            <XIcon size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-txt-secondary mb-1.5 uppercase tracking-wider">
                Name
              </label>
              <div className="relative">
                <UserIcon
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-txt-muted" />

                <input
                  required
                  type="text"
                  className="w-full bg-surface-tertiary border border-border-subtle text-txt-primary text-sm rounded-sm py-2.5 pl-10 pr-4 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                  placeholder="Your name" />

              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-txt-secondary mb-1.5 uppercase tracking-wider">
                Email
              </label>
              <div className="relative">
                <MailIcon
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-txt-muted" />

                <input
                  required
                  type="email"
                  className="w-full bg-surface-tertiary border border-border-subtle text-txt-primary text-sm rounded-sm py-2.5 pl-10 pr-4 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                  placeholder="you@example.com" />

              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-txt-secondary mb-1.5 uppercase tracking-wider">
              Subject
            </label>
            <select
              required
              className="w-full bg-surface-tertiary border border-border-subtle text-txt-primary text-sm rounded-sm py-2.5 px-4 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all appearance-none">

              <option value="">Select a subject...</option>
              <option value="general">General Inquiry</option>
              <option value="order">Order Issue</option>
              <option value="supplier">Supplier Inquiry</option>
              <option value="bug">Bug Report</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-txt-secondary mb-1.5 uppercase tracking-wider">
              Message
            </label>
            <textarea
              required
              rows={4}
              className="w-full bg-surface-tertiary border border-border-subtle text-txt-primary text-sm rounded-sm py-2.5 px-4 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all resize-none"
              placeholder="How can we help you?">
            </textarea>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-accent text-surface-primary font-bold text-sm py-3 rounded-sm hover:bg-accent-hover transition-colors flex items-center justify-center gap-2 disabled:opacity-70">

            {isLoading ?
            <LoaderIcon size={16} className="animate-spin" /> :

            <SendIcon size={16} />
            }
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>);

}