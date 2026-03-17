import React from 'react';
import {
  XIcon,
  ShoppingCartIcon,
  TrashIcon,
  ArrowRightIcon } from
'lucide-react';
import { Product } from '../data/mockData';
export interface CartItem {
  product: Product;
  quantity: number;
  addedAt: Date;
}
interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}
export function CartDrawer({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onCheckout
}: CartDrawerProps) {
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  return (
    <>
      {/* Overlay */}
      {isOpen &&
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-80 transition-opacity"
        onClick={onClose}>
      </div>
      }

      {/* Drawer */}
      <div
        className={`
        fixed top-0 right-0 h-full w-full sm:w-100 bg-surface-secondary border-l border-border-subtle shadow-2xl z-90
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-subtle shrink-0">
          <div className="flex items-center gap-3">
            <ShoppingCartIcon size={20} className="text-txt-primary" />
            <h2 className="font-heading font-bold text-lg text-txt-primary">
              Your Cart
            </h2>
            <span className="bg-accent/10 text-accent text-xs font-bold px-2 py-0.5 rounded-sm">
              {items.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-txt-muted hover:text-txt-primary transition-colors">

            <XIcon size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ?
          <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-surface-tertiary flex items-center justify-center mb-4">
                <ShoppingCartIcon size={24} className="text-txt-muted" />
              </div>
              <h3 className="font-heading font-semibold text-txt-primary mb-2">
                Your cart is empty
              </h3>
              <p className="text-sm text-txt-secondary mb-6">
                Looks like you haven't added any products yet.
              </p>
              <button
              onClick={onClose}
              className="text-sm font-semibold text-accent border border-accent/30 hover:border-accent hover:bg-accent/10 px-6 py-2 rounded-sm transition-all">

                Browse Products
              </button>
            </div> :

          <div className="flex flex-col gap-4">
              {items.map((item) =>
            <div
              key={item.product.id}
              className="flex gap-4 p-4 bg-surface-tertiary border border-border-subtle rounded-sm group">

                  <div className="w-12 h-12 shrink-0 bg-surface-elevated border border-border-subtle rounded-sm flex items-center justify-center text-txt-muted font-heading font-bold">
                    {item.product.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="font-subheading font-medium text-sm text-txt-primary truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-txt-secondary mt-0.5">
                        {item.product.category}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-txt-muted">
                          Qty: {item.quantity}
                        </span>
                        <span className="font-subheading font-semibold text-accent text-sm">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="text-txt-muted hover:text-red-500 transition-colors p-1"
                    title="Remove item">

                        <TrashIcon size={14} />
                      </button>
                    </div>
                  </div>
                </div>
            )}
            </div>
          }
        </div>

        {/* Footer */}
        {items.length > 0 &&
        <div className="p-6 border-t border-border-subtle bg-surface-tertiary shrink-0">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-txt-secondary uppercase tracking-wider">
                Total
              </span>
              <span className="font-heading font-bold text-xl text-txt-primary">
                ${total.toFixed(2)}
              </span>
            </div>
            <button
            onClick={onCheckout}
            className="w-full bg-accent text-surface-primary font-bold text-sm py-3.5 rounded-sm hover:bg-accent-hover transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,180,216,0.2)] hover:shadow-[0_0_20px_rgba(0,180,216,0.4)]">
              Proceed to Checkout
              <ArrowRightIcon size={16} />
            </button>
          </div>
        }
      </div>
    </>);

}