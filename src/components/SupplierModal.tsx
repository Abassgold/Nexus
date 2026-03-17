import React, { useState } from 'react';
import {
  XIcon,
  SendIcon,
  LoaderIcon,
  BriefcaseIcon,
  MailIcon,
  LinkIcon,
  FileTextIcon } from
'lucide-react';
interface SupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}
export function SupplierModal({
  isOpen,
  onClose,
  onSuccess
}: SupplierModalProps) {
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

      <div className="relative w-full max-w-lg bg-surface-secondary border border-border-subtle rounded-sm shadow-2xl animate-fade-in flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between border-b border-border-subtle p-6 shrink-0">
          <div>
            <h2 className="font-heading font-bold text-lg text-txt-primary">
              Become a Supplier
            </h2>
            <p className="text-xs text-txt-secondary mt-1">
              Join NEXUS and sell your digital products to thousands of buyers.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-txt-muted hover:text-txt-primary">

            <XIcon size={20} />
          </button>
        </div>

        <div className="overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-txt-secondary mb-1.5 uppercase tracking-wider">
                Business / Store Name
              </label>
              <div className="relative">
                <BriefcaseIcon
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-txt-muted" />

                <input
                  required
                  type="text"
                  className="w-full bg-surface-tertiary border border-border-subtle text-txt-primary text-sm rounded-sm py-2.5 pl-10 pr-4 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                  placeholder="e.g. Nexus Keys" />

              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-txt-secondary mb-1.5 uppercase tracking-wider">
                Contact Email
              </label>
              <div className="relative">
                <MailIcon
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-txt-muted" />

                <input
                  required
                  type="email"
                  className="w-full bg-surface-tertiary border border-border-subtle text-txt-primary text-sm rounded-sm py-2.5 pl-10 pr-4 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                  placeholder="supplier@example.com" />

              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-txt-secondary mb-1.5 uppercase tracking-wider">
                Primary Product Type
              </label>
              <select
                required
                className="w-full bg-surface-tertiary border border-border-subtle text-txt-primary text-sm rounded-sm py-2.5 px-4 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all appearance-none">

                <option value="">Select product type...</option>
                <option value="accounts">Premium Accounts</option>
                <option value="software">Software Licenses</option>
                <option value="giftcards">Gift Cards</option>
                <option value="gamekeys">Game Keys</option>
                <option value="other">Other Digital Goods</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-txt-secondary mb-1.5 uppercase tracking-wider">
                Website / Portfolio (Optional)
              </label>
              <div className="relative">
                <LinkIcon
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-txt-muted" />

                <input
                  type="url"
                  className="w-full bg-surface-tertiary border border-border-subtle text-txt-primary text-sm rounded-sm py-2.5 pl-10 pr-4 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                  placeholder="https://" />

              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-txt-secondary mb-1.5 uppercase tracking-wider">
                Tell us about your products
              </label>
              <div className="relative">
                <FileTextIcon
                  size={16}
                  className="absolute left-3 top-3 text-txt-muted" />

                <textarea
                  required
                  rows={4}
                  className="w-full bg-surface-tertiary border border-border-subtle text-txt-primary text-sm rounded-sm py-2.5 pl-10 pr-4 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all resize-none"
                  placeholder="Where do you source them? What is your monthly volume?">
                </textarea>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-accent text-surface-primary font-bold text-sm py-3 rounded-sm hover:bg-accent-hover transition-colors flex items-center justify-center gap-2 disabled:opacity-70 shrink-0">

              {isLoading ?
              <LoaderIcon size={16} className="animate-spin" /> :

              <SendIcon size={16} />
              }
              {isLoading ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </div>
    </div>);

}