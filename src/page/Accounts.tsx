'use client';
import Server1 from "@/components/accounts/Acc1";
import Server2 from "@/components/accounts/Server2";
import { Cat, MTPListResourceResponse } from "@/fetchApi/Social-Accounts";
import { useState } from "react";

interface AccountsProps {
    acc1: Cat[];
    acc2: MTPListResourceResponse
}

const Accounts = ({acc1, acc2}: AccountsProps) => {
    const [activeTab, setActiveTab] = useState<'server1' | 'server2'>('server1');
    return (
        <div className="space-y-4">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-end pb-4 border-b border-border-subtle gap-6">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-txt-primary tracking-tight">
                        Buy Accounts
                    </h1>
                    <p className="text-txt-muted text-sm mt-1">
                        Select a preferred server to browse available inventory
                    </p>
                </div>

                {/* Modern Tab Switcher */}
                <div className="flex p-1 bg-surface-secondary border border-border-subtle rounded-sm">
                    <button
                        onClick={() => setActiveTab('server1')}
                        className={`px-6 py-2 text-xs font-bold uppercase tracking-wider transition-all rounded-sm ${activeTab === 'server1'
                                ? 'bg-accent text-surface-primary shadow-lg'
                                : 'text-txt-secondary hover:text-txt-primary'
                            }`}
                    >
                        Server 01
                    </button>
                    <button
                        onClick={() => setActiveTab('server2')}
                        className={`px-6 py-2 text-xs font-bold uppercase tracking-wider transition-all rounded-sm ${activeTab === 'server2'
                                ? 'bg-accent text-surface-primary shadow-lg'
                                : 'text-txt-secondary hover:text-txt-primary'
                            }`}
                    >
                        Server 02
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="relative min-h-100">
                {activeTab === 'server1' ? (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <Server1 categories={acc1} />
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <Server2 categories={acc2} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Accounts;