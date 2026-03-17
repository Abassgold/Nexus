import React from 'react';
export function PromoBanner() {
  return (
    <div className="w-full mb-8 relative overflow-hidden rounded-sm border border-border-subtle bg-linear-to-r from-surface-tertiary to-surface-elevated group">
      {/* Subtle animated glow overlay */}
      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-1 h-full bg-accent animate-pulse-glow"></div>

      <div className="px-6 py-8 md:py-6 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="text-center md:text-left">
          <h3 className="font-heading font-bold text-xl text-txt-primary mb-1">
            Summer Sale — Up to 40% Off
          </h3>
          <p className="font-body text-sm text-txt-secondary">
            Massive discounts on premium software licenses and aged accounts.
            Limited time only.
          </p>
        </div>

        <button className="shrink-0 bg-accent text-surface-primary font-bold text-sm px-6 py-2.5 rounded-sm hover:bg-accent-hover transition-colors shadow-[0_0_15px_rgba(0,180,216,0.3)] hover:shadow-[0_0_20px_rgba(0,180,216,0.5)]">
          Shop Now
        </button>
      </div>
    </div>);

}