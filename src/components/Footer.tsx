import React from 'react';
import { ExternalLinkIcon } from 'lucide-react';
export function Footer() {
  return (
    <footer className="bg-surface-secondary border-t border-border-subtle mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Column 1: About */}
          <div>
            <div className="flex items-baseline gap-2 mb-4">
              <h2 className="font-heading font-bold text-xl text-txt-primary tracking-tight">
                NE<span className="text-accent">X</span>US
              </h2>
              <span className="text-txt-muted text-[10px] tracking-[0.2em] font-medium uppercase">
                Market
              </span>
            </div>
            <p className="font-body text-sm text-txt-secondary leading-relaxed">
              The premier marketplace for digital assets, software licenses, and
              premium accounts. Secure transactions, instant delivery, and 24/7
              support.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-sm text-txt-primary mb-4 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
              'Home',
              'All Products',
              'Become a Supplier',
              'FAQ',
              'Terms of Service',
              'Privacy Policy'].
              map((link) =>
              <li key={link}>
                  <a
                  href="#"
                  className="font-body text-sm text-txt-secondary hover:text-accent transition-colors">

                    {link}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="font-heading font-semibold text-sm text-txt-primary mb-4 uppercase tracking-wider">
              Connect
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 font-body text-sm text-txt-secondary hover:text-txt-primary transition-colors">

                  support@nexusmarket.io
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 font-body text-sm text-[#229ED9] hover:text-[#40b0e6] transition-colors">

                  Telegram Support <ExternalLinkIcon size={14} />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 font-body text-sm text-[#5865F2] hover:text-[#727df5] transition-colors">

                  Discord Community <ExternalLinkIcon size={14} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-txt-muted">
            &copy; {new Date().getFullYear()} Nexus Market. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-txt-muted">
            <span>
              Status:{' '}
              <span className="text-stock-green">All Systems Operational</span>
            </span>
          </div>
        </div>
      </div>
    </footer>);

}