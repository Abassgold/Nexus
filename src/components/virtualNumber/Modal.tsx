import { Copy } from 'lucide-react';
import { useState } from 'react';
import PurchaseNumberModalSkeleton from './Skeleton';
interface PurchaseNumberModalProps {
  service?: string;
  country?: string;
  number?: string;
  otp?: string;
  timeout: number | null | string;
  onClose: () => void;
  markAsDone:()=>void;
  canCel:()=>void
  isCancelling: boolean;
}
const PurchaseNumberModal = (
  {
    service,
    country,
    number,
    otp,
    timeout,
    onClose,
    markAsDone,
    canCel,
    isCancelling
  }: PurchaseNumberModalProps
) => {
  const [copiedField, setCopiedField] = useState('');


  const done = async() => {
    await markAsDone()
    await onClose()
  }

  
  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(''), 2000);
    });
  };
  if (!number) return (
    <PurchaseNumberModalSkeleton />
  )
  return (
    <div className="p-4">
  {/* Modal Overlay - using a softer backdrop */}
  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    
    {/* Main Modal Container */}
    <div className="bg-surface-secondary border border-border-subtle rounded-sm shadow-2xl max-w-sm w-full p-6 relative">
      
      <h2 className="text-txt-primary text-lg font-bold mb-6 text-center border-b border-border-subtle pb-4">
        Number Purchase Details
      </h2>

      <div className="space-y-4 text-sm">
        {/* Service */}
        <div className="flex justify-between text-txt-secondary">
          <span>Service:</span>
          <span className="font-semibold text-txt-primary uppercase">{service}</span>
        </div>

        {/* Country */}
        <div className="flex justify-between text-txt-secondary">
          <span>Country:</span>
          <span className="font-medium text-txt-primary">{country}</span>
        </div>

        {/* Time-left */}
        <div className="flex justify-between text-txt-secondary">
          <span>Time-left:</span>
          <span className="font-mono text-accent">{timeout}</span>
        </div>

        {/* Number Section */}
        <div className="pt-2 border-t border-border-subtle">
          <div className="flex justify-between items-center">
            <span className="text-txt-muted">Number:</span>
            <div className="flex gap-2 items-center">
              <span className="font-mono text-base text-txt-primary">{number}</span>
              <button
                onClick={() => copyToClipboard(number, 'number')}
                className="p-1 hover:bg-surface-tertiary rounded-sm text-accent transition-colors cursor-pointer"
                title="Copy Number"
              >
                {copiedField === 'number' ? 
                  <span className="text-[10px] font-bold">COPIED</span> : 
                  <Copy size={18} />
                }
              </button>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="flex justify-between items-center text-txt-secondary">
          <span>Status:</span>
          <span className={`text-[11px] px-2 py-0.5 rounded-sm font-bold uppercase border ${otp ? 'bg-stock-green/10 border-stock-green/20 text-stock-green' : 'bg-surface-tertiary border-border-subtle text-txt-muted'}`}>
            {otp ? 'Success' : 'Waiting for OTP'}
          </span>
        </div>

        {/* OTP Section */}
        <div className="bg-surface-tertiary p-3 rounded-sm border border-border-subtle">
          {otp ? (
            <div className="flex justify-between items-center">
              <span className="text-txt-muted">OTP Code:</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-stock-green tracking-widest">
                  {otp}
                </span>
                <button
                  onClick={() => copyToClipboard(otp, 'otp')}
                  className="p-1 hover:bg-surface-secondary rounded-sm text-accent transition-colors cursor-pointer"
                >
                  {copiedField === 'otp' ? 
                    <span className="text-[10px] font-bold">COPIED</span> : 
                    <Copy size={18} />
                  }
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <span className="text-txt-muted">OTP:</span>
              <div className="flex gap-1">
                <div className="h-2 w-2 bg-accent rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="h-2 w-2 bg-accent rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="h-2 w-2 bg-accent rounded-full animate-bounce"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8">
        {!otp || otp === '' ? (
          <button 
            className='w-full cursor-pointer bg-red-400/10 border border-red-400/20 text-red-400 hover:bg-red-400 hover:text-white py-2.5 rounded-sm text-xs font-bold transition-all uppercase'
            onClick={canCel}
            disabled={isCancelling}
          >
            {isCancelling ? 'Processing...' : 'Cancel Order'}
          </button>
        ) : (
          <button
            onClick={done}
            className="w-full cursor-pointer bg-accent hover:bg-accent-hover text-white py-2.5 rounded-sm text-xs font-bold transition-all uppercase shadow-lg shadow-accent/20"
          >
            Done / Finished
          </button>
        )}
      </div>

    </div>
  </div>
</div>
  );
};

export default PurchaseNumberModal;
