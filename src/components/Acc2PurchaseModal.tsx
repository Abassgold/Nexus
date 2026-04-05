import React, { useState } from 'react';
import { ShoppingCartIcon, XIcon, InfoIcon, WalletIcon } from 'lucide-react';
import { MTPAccount } from '@/fetchApi/Social-Accounts';
interface Acc2Interface {
  product: MTPAccount;
  isOpen: () => void; // Controls if the modal shows or not
}
const Acc2PurchaseModal = ({ product, isOpen }:Acc2Interface) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading]= useState(false)
const handleConfirm = async()=>{
try {
    
} catch (error) {
    
}finally{setLoading(false)}
}
  if (!isOpen) return null;
  const unitPrice = parseFloat(product.price);
  const totalToPay = unitPrice * quantity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-primary/80 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-surface-secondary border border-border-subtle rounded-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border-subtle bg-surface-tertiary">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-accent/10 rounded-sm">
              <ShoppingCartIcon size={18} className="text-accent" />
            </div>
            <h2 className="font-heading font-bold text-txt-primary tracking-tight">Confirm Purchase</h2>
          </div>
          <button onClick={isOpen} className="text-txt-muted hover:text-txt-primary transition-colors">
            <XIcon size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Product Preview */}
          <div className="flex gap-4 p-4 bg-surface-tertiary border border-border-subtle rounded-sm">
             <div className="w-12 h-12 shrink-0 bg-surface-elevated border border-border-subtle rounded-sm flex items-center justify-center text-accent font-heading font-bold text-xl">
                {product.name.charAt(0).toUpperCase()}
             </div>
             <div className="min-w-0">
                <p className="text-xs text-txt-muted uppercase font-bold tracking-widest mb-1">Item</p>
                <h3 className="text-txt-primary font-bold text-sm truncate">{product.name}</h3>
             </div>
          </div>

          {/* Description Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-txt-secondary uppercase tracking-wider">
              <InfoIcon size={14} className="text-accent" /> Description
            </div>
            <p className="text-sm text-txt-muted leading-relaxed italic border-l-2 border-accent/20 pl-3">
              {product.description || "No specific instructions provided for this account type."}
            </p>
          </div>

          {/* Quantity and Math Section */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border-subtle">
            <div>
              <label className="block text-[10px] font-bold text-txt-muted uppercase mb-2">Quantity</label>
              <div className="flex items-center bg-surface-tertiary border border-border-subtle rounded-sm overflow-hidden">
                <input 
                  type="number" 
                  min="1" 
                  max={product.amount}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-transparent p-2 text-sm text-txt-primary font-bold focus:outline-none text-center"
                />
              </div>
              <p className="text-[10px] text-txt-muted mt-1">{product.amount} available</p>
            </div>

            <div className="text-right">
              <label className="block text-[10px] font-bold text-txt-muted uppercase mb-2">Total to Pay</label>
              <div className="text-2xl font-heading font-bold text-accent">
                ${totalToPay.toFixed(2)}
              </div>
              <p className="text-[10px] text-txt-muted mt-1">${unitPrice.toFixed(2)} / unit</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <form action="" onSubmit={handleConfirm}></form>
        <div className="p-6 bg-surface-tertiary flex gap-3">
          <button 
            onClick={isOpen}
            className="flex-1 px-4 py-3 text-xs font-bold uppercase text-txt-secondary hover:text-txt-primary transition-colors border border-border-subtle rounded-sm"
          >
            Cancel
          </button>
          <button 
          disabled={loading}
          type='submit'
            className="flex-2 flex items-center justify-center gap-2 px-8 py-3 bg-accent text-surface-primary text-xs font-bold uppercase rounded-sm hover:bg-accent-hover transition-all shadow-lg shadow-accent/10"
          >
            <WalletIcon size={14} /> Complete Payment
          </button>
        </div>

      </div>
    </div>
  );
};

export default Acc2PurchaseModal;