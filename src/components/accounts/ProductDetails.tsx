'use client';
import { ListingDetail } from '@/fetchApi/Social-Accounts';
import React, { useState } from 'react';
import { ShoppingCartIcon, PackageIcon, BarChart2Icon, MinusIcon, PlusIcon, LoaderIcon } from 'lucide-react';
import axios from 'axios';
import { useNotification } from '../notification/NotificationContext';
import { useRouter } from 'next/navigation';
import { getToken } from '@/lib/token';

const ProductDetails = ({ details }: { details: ListingDetail }) => {
    const [loading, setLoading] = useState(false);
    const { notify } = useNotification();
    const router = useRouter()
    const handlePurchase = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!details.id || !details.slug || quantity <= 0) return;
        setLoading(true);
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/logs/buy-logs`,
                {
                    id: details.id,
                    slug: details.slug,
                    quantity
                },
                { headers: { Authorization: `Bearer ${getToken()}` } }
            )
            console.log(data)
            notify('Purchase Successful!', 'success');
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }
    const [quantity, setQuantity] = useState<number>(1);

    const increment = () => setQuantity(q => q + 1);
    const decrement = () => setQuantity(q => Math.max(1, q - 1));
    const totalPrice = (parseFloat(details.price) * quantity).toFixed(2);

    return (
        <div className="flex flex-col gap-6 w-full animate-fade-in">
            <div className="bg-surface-secondary border border-border-subtle rounded-sm p-5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-txt-muted mb-2">
                    {details.category.title} / {details.subcategory.title}
                </p>
                <h1 className="font-heading font-semibold text-base text-txt-primary leading-snug">
                    {details.title}
                </h1>
                <div className="flex items-center gap-3 mt-4 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider bg-stock-green/10 text-stock-green border border-stock-green/20">
                        <PackageIcon size={10} />
                        {details.available_stock} in stock
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider bg-surface-tertiary text-txt-muted border border-border-subtle">
                        <BarChart2Icon size={10} />
                        {details.sold} sold
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider bg-accent/10 text-accent border border-accent/20">
                        by {details.supplier.name}
                    </span>
                </div>
            </div>
            <div className="bg-surface-secondary border border-border-subtle rounded-sm overflow-hidden">
                <div className="px-5 py-3 bg-surface-tertiary border-b border-border-subtle">
                    <h2 className="font-heading font-semibold text-sm text-txt-primary">Purchase</h2>
                </div>
                <div className="p-5 flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-txt-muted uppercase tracking-wider">
                            Price per account
                        </span>
                        <span className="font-heading font-semibold text-sm text-accent">
                            ${parseFloat(details.price).toFixed(2)}
                        </span>
                    </div>
                    <div className="h-px bg-border-subtle" />
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-txt-muted uppercase tracking-wider">
                            Quantity
                        </span>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={decrement}
                                className="w-7 h-7 flex items-center justify-center rounded-sm border border-border-subtle bg-surface-tertiary text-txt-secondary hover:border-accent hover:text-accent transition-all">
                                <MinusIcon size={12} />
                            </button>
                            <span className="font-heading font-semibold text-sm text-txt-primary w-6 text-center">
                                {quantity}
                            </span>
                            <button
                                type="button"
                                onClick={increment}
                                className="w-7 h-7 flex items-center justify-center rounded-sm border border-border-subtle bg-surface-tertiary text-txt-secondary hover:border-accent hover:text-accent transition-all">
                                <PlusIcon size={12} />
                            </button>
                        </div>
                    </div>

                    <div className="h-px bg-border-subtle" />
                    {/* Total */}
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-txt-muted uppercase tracking-wider">
                            Total
                        </span>
                        <span className="font-heading font-bold text-base text-accent">
                            ${totalPrice}
                        </span>
                    </div>
                    {/* Submit */}

                    <form action="" onSubmit={handlePurchase}>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-2 cursor-pointer bg-accent text-surface-primary font-bold text-sm py-3 rounded-sm hover:bg-accent-hover transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                            {loading ? <LoaderIcon size={14} className="animate-spin" /> : <ShoppingCartIcon size={14} />}

                            {loading ? 'Wait...' : 'Proceed to Payment'}
                        </button>
                    </form>
                </div>
            </div>

            {/* Description Card */}
            <div className="bg-surface-secondary border border-border-subtle rounded-sm overflow-hidden">
                <div className="px-5 py-3 bg-surface-tertiary border-b border-border-subtle">
                    <h2 className="font-heading font-semibold text-sm text-txt-primary">
                        Product Description
                    </h2>
                </div>
                <iframe
                    srcDoc={`
                        <style>
                            * { box-sizing: border-box; margin: 0; padding: 0; }
                            body {
                                font-family: system-ui, sans-serif;
                                font-size: 14px;
                                line-height: 1.7;
                                color: #e2e8f0;
                                background: transparent;
                                padding: 1.25rem;
                            }
                            h1,h2,h3,h4 { font-weight: 500; margin-bottom: 0.75rem; color: #f1f5f9; }
                            p { margin-bottom: 0.75rem; color: #cbd5e1; }
                            ul { padding-left: 1.25rem; margin-bottom: 0.75rem; }
                            li { margin-bottom: 0.4rem; color: #cbd5e1; }
                            a { color: #60a5fa; text-decoration: none; }
                            a:hover { text-decoration: underline; }
                            hr { border: none; border-top: 1px solid #334155; margin: 1rem 0; }
                            strong { font-weight: 500; color: #f1f5f9; }
                        </style>
                        ${details.description}
                    `}
                    className="w-full border-none"
                    style={{ minHeight: '420px' }}
                    sandbox="allow-same-origin allow-popups"
                />
            </div>

        </div>
    );
};

export default ProductDetails;