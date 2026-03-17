import  { useState } from 'react';
import { MessageCircleIcon, XIcon, SendIcon } from 'lucide-react';
export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Panel */}
      {isOpen &&
      <div className="mb-4 w-70 h-90 bg-surface-elevated border border-border-subtle rounded-sm shadow-2xl flex flex-col animate-fade-in origin-bottom-right">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border-subtle bg-surface-tertiary">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-stock-green animate-pulse"></div>
              <span className="font-heading font-semibold text-sm text-txt-primary">
                Support Chat
              </span>
            </div>
            <button
            onClick={() => setIsOpen(false)}
            className="text-txt-muted hover:text-txt-primary transition-colors">

              <XIcon size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 p-4 flex flex-col justify-center items-center text-center bg-surface-primary">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
              <MessageCircleIcon size={24} className="text-accent" />
            </div>
            <h4 className="font-subheading font-medium text-sm text-txt-primary mb-2">
              Need help?
            </h4>
            <p className="font-body text-xs text-txt-secondary mb-6">
              Connect with our support team on Telegram for instant assistance
              with your orders.
            </p>
            <a
            href="#"
            className="flex items-center gap-2 bg-[#229ED9] hover:bg-[#1e8cc0] text-white text-xs font-semibold px-4 py-2 rounded-sm transition-colors w-full justify-center">

              <SendIcon size={14} />
              Open Telegram
            </a>
          </div>
        </div>
      }

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-200
          ${isOpen ? 'bg-surface-tertiary text-txt-primary border border-border-subtle' : 'bg-accent text-surface-primary hover:scale-105 hover:bg-accent-hover'}
        `}>

        {isOpen ? <XIcon size={24} /> : <MessageCircleIcon size={24} />}
      </button>
    </div>);

}