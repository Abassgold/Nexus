'use client';
import React, { forwardRef } from 'react';
import { ChevronRightIcon } from 'lucide-react';
import { MTPAccount } from '@/fetchApi/Social-Accounts';
import { Acc2ProductRow } from './Acc2ProductRow';

interface ProductSectionProps {
  title: string;
  category: string;
  products: MTPAccount[];
  accentLabel?: string;
}

export const Acc2ProductSection = forwardRef<HTMLElement, ProductSectionProps>(
  ({ title, category, products, accentLabel }, ref) => {
    return (
      <section ref={ref} className="mb-8 scroll-mt-32">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="font-heading font-semibold md:font-bold  md:text-lg text-txt-primary tracking-tight">
             {category} - {title}
            </h2>
            {accentLabel && (
              <span className="bg-accent/10 text-accent border border-accent/20 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                {accentLabel}
              </span>
            )}
          </div>
        </div>

        <div className="border border-border-subtle rounded-sm bg-surface-primary overflow-hidden">
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_auto] gap-6 p-4 bg-surface-tertiary border-b border-border-subtle">
            <div className="text-xs font-heading font-semibold text-txt-muted uppercase tracking-wider">Product</div>
            <div className="text-xs font-heading font-semibold text-txt-muted uppercase tracking-wider">Stock</div>
            <div className="text-xs font-heading font-semibold text-txt-muted uppercase tracking-wider">Price</div>
            <div className="text-xs font-heading font-semibold text-txt-muted uppercase tracking-wider text-right">Action</div>
          </div>

          <div className="flex flex-col">
            {products.map((product, idx) => (
              <Acc2ProductRow
                key={product.id}
                product={product}
                index={idx}
              />
            ))}
          </div>

          <div className="bg-surface-tertiary border-t border-border-subtle p-3 flex justify-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent-hover transition-colors"
            >
              Back to Top <ChevronRightIcon size={14} />
            </button>
          </div>
        </div>
      </section>
    );
  }
);