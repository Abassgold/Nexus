'use client';
import { Product } from '../data/mockData';
import { ShoppingCartIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
interface ProductRowProps {
  product: Product;
  index: number;
}

export function ProductRow({ product, index }: ProductRowProps) {
  const id = 3;
  const router = useRouter();
  const isEven = index % 2 === 0;
  return (
    <div
      className={`
      group flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_auto] md:items-center p-4 gap-4 md:gap-6
      border-b border-border-subtle last:border-b-0 transition-all duration-150
      ${isEven ? 'bg-surface-primary' : 'bg-surface-secondary'}
      hover:bg-accent-muted hover:border-l-2 hover:border-l-accent border-l-2 border-l-transparent
    `}>

      {/* Product Info */}
      <div className="flex md:items-center gap-4">
        <div className="w-10 h-10 shrink-0 bg-surface-tertiary border border-border-subtle rounded-sm flex items-center justify-center text-txt-muted font-heading font-bold text-lg">
          {product.title.charAt(0)}
        </div>
        <div className="min-w-0"
        title={product.slug}
        >
          <p className="font-subheading md:font-medium text-sm text-txt-primary">
            {product.title}
          </p>
        </div>
      </div>

      {/* Stock */}
      <div className='flex gap-2 items-center md:justify-between'>
        <div className="flex items-center md:justify-start">
          <span
            className={`
          inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider
          ${product.available_stock > 0 ? 'bg-stock-green/10 text-stock-green border border-stock-green/20' : 'bg-stock-grey/10 text-stock-grey border border-stock-grey/20'}
        `}>
            {product.available_stock > 0 ? `${product.available_stock} in stock` : 'Out of stock'}
          </span>
        </div>
        {/* Price */}
        <div className="flex items-center md:justify-start">
          <span className="text-xs text-txt-secondary mr-1">from</span>
          <span className="font-subheading font-medium text-sm text-accent">
            ${parseFloat(product.price)}
          </span>
        </div>
      </div>
      {/* Action */}
      <div className="flex items-center justify-end mt-2 md:mt-0">
        <button
          onClick={e => router.push(`/user/accounts/${product.slug}`)}
          disabled={product.available_stock <= 0}
          className={`
            flex items-center gap-2 px-4 py-1.5 cursor-pointer rounded-sm text-xs font-semibold transition-all duration-150 w-full md:w-auto justify-center
            ${product.available_stock > 0 ? 'bg-accent text-surface-primary hover:bg-accent-hover' : 'bg-surface-tertiary text-txt-muted cursor-not-allowed border border-border-subtle'}
          `}>
          <ShoppingCartIcon size={14} />
          {product.available_stock > 0 ? 'Buy Now' : 'Sold Out'}
        </button>
      </div>
    </div>
  );

}