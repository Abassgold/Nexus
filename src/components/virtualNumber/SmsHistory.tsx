import { ShoppingBagIcon } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
type activationType = {
    activationId: string;
    number: string;
    name: string;
    cost: number;
    code?: string;
    country: string;
    updatedAt: Date;
    status: string;
}
type responseType = {
    ok: boolean;
    msg?: string;
    activation?: activationType[]
}
const SmsHistory = async () => {
    const formatDate = (date: Date) =>
        new Date(date).toLocaleString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).replace(',', '');

    const token = (await cookies()).get('accessToken')?.value
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/virtual-numbers/getActivationInfo`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    if (res.status === 401) return redirect('/signin')
    if (res.status === 403) return redirect('/account-suspended')
    const data: responseType = await res.json()
    const getStatusStyles = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500';
            case 'canceled':
            case 'cancelled':
            case 'refunded':
                return 'bg-red-400/10 border-red-400/20 text-red-400';
            case 'completed':
            case 'done':
                return 'bg-stock-green/10 border-stock-green/20 text-stock-green';
            default:
                return 'bg-surface-primary border-border-subtle text-txt-primary';
        }
    };

    return (
        <div className="lg:col-span-2 bg-surface-secondary border border-border-subtle rounded-sm overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border-subtle">
                <h2 className="font-heading font-semibold text-base text-txt-primary">
                    Number Purchase History
                </h2>
                <span className="text-xs text-txt-muted">
                    {data.activation?.length} total
                </span>
            </div>
            {(data.activation?.length ?? 0) <= 0 ? (
                <div className="p-12 text-center">
                    <ShoppingBagIcon size={32} className="text-txt-muted mx-auto mb-4" />
                    <p className="font-subheading text-sm text-txt-secondary mb-2">
                        No purchases yet
                    </p>
                    <p className="text-xs text-txt-muted mb-6">
                        Start by browsing our available numbers in the market.
                    </p>
                    <button className="text-xs font-semibold text-accent hover:text-accent-hover transition-colors">
                        Browse Numbers →
                    </button>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-150">
                        <thead>
                            <tr className="bg-surface-tertiary border-b border-border-subtle text-[11px] uppercase tracking-wider text-txt-muted font-bold">
                                <th className="p-4">Ref No.</th>
                                <th className="p-4">Country</th>
                                <th className="p-4">Number</th>
                                <th className="p-4">Code</th>
                                <th className="p-4">Price</th>
                                <th className="p-4 whitespace-nowrap">Date & Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle">
                            {data.activation?.map((item) => (
                                <tr
                                    key={item.activationId}
                                    className="hover:bg-surface-tertiary transition-colors text-sm text-txt-primary"
                                >
                                    {/* Ref No. */}
                                    <td className="p-4 font-medium text-accent">
                                        #{item.activationId}
                                    </td>

                                    {/* Country */}
                                    <td className="p-4">
                                        {item.country}
                                        <div className="mt-1 text-xs">
                                            {item.name}
                                        </div>
                                    </td>

                                    {/* Number */}
                                    <td className="p-4 font-mono text-txt-secondary">
                                        +{item.number}
                                    </td>

                                    {/* Code */}
                                    <td className="p-4">
                                        <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold border uppercase tracking-wider ${getStatusStyles(item.status)}`}>
                                            {item.code ? item.code : item.status}
                                        </span>
                                    </td>

                                    {/* Price */}
                                    <td className="p-4 font-semibold">
                                        ${item.cost.toFixed(2)}
                                    </td>

                                    <td className="p-4 text-xs text-txt-muted whitespace-nowrap">
                                        {formatDate(item.updatedAt)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
            }
        </div>
    );
};

export default SmsHistory;