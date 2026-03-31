'use client';
import {
  WalletIcon,
  PlusIcon,
  ArrowRightIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  KeyIcon,
  MonitorIcon,
  SmartphoneIcon,
  Gamepad2Icon,
  CreditCardIcon,
  GlobeIcon,
  ClockIcon,
  CheckCircle2Icon,
  XCircleIcon,
  ArrowUpRightIcon,
  DownloadIcon,
  ShoppingBagIcon,
  EyeIcon,
  ActivityIcon,
} from 'lucide-react'
import Link from 'next/link';
interface Transaction {
  id: string
  type: 'purchase' | 'deposit' | 'refund'
  description: string
  amount: number
  date: string
  status: 'completed' | 'pending' | 'failed'
}
interface DashboardProps {
  user: {
    username: string
    email: string
  }
  balance: number
  transactions: Transaction[]
  onFundWallet: () => void
  onBrowseMarketplace: () => void
}

const mockUser = {
  username: 'alexriver',
  email: 'alex.river@example.com',
}
 
const mockTransactions: Transaction[] = [
  {
    id: 'txn_001',
    type: 'deposit',
    description: 'Wallet top-up via credit card',
    amount: 50.00,
    date: 'Jun 12, 2025',
    status: 'completed',
  },
  {
    id: 'txn_002',
    type: 'purchase',
    description: 'Netflix Premium – 1 month account',
    amount: 14.99,
    date: 'Jun 11, 2025',
    status: 'completed',
  },
  {
    id: 'txn_003',
    type: 'purchase',
    description: 'NordVPN – 6-month subscription key',
    amount: 8.49,
    date: 'Jun 10, 2025',
    status: 'completed',
  },
  {
    id: 'txn_004',
    type: 'refund',
    description: 'Refund – duplicate Spotify order',
    amount: 5.99,
    date: 'Jun 9, 2025',
    status: 'completed',
  },
  {
    id: 'txn_005',
    type: 'purchase',
    description: 'Steam – Elden Ring key (PC)',
    amount: 39.99,
    date: 'Jun 8, 2025',
    status: 'pending',
  },
  {
    id: 'txn_006',
    type: 'purchase',
    description: 'US Virtual Phone Number – 30 days',
    amount: 3.50,
    date: 'Jun 7, 2025',
    status: 'completed',
  },
  {
    id: 'txn_007',
    type: 'deposit',
    description: 'Wallet top-up via PayPal',
    amount: 25.00,
    date: 'Jun 5, 2025',
    status: 'completed',
  },
  {
    id: 'txn_008',
    type: 'purchase',
    description: 'Microsoft Office 365 – 1 year key',
    amount: 29.99,
    date: 'Jun 3, 2025',
    status: 'failed',
  },
]
 
const mockBalance = 22.04   
export default function Dashboard({
  user = mockUser,
  balance = mockBalance,
  transactions = mockTransactions,
  onFundWallet = () => alert('Fund wallet clicked'),
}: DashboardProps) {
  const totalSpent = transactions
    .filter((t) => t.type === 'purchase' && t.status === 'completed')
    .reduce((s, t) => s + Math.abs(t.amount), 0)
  const totalDeposited = transactions
    .filter((t) => t.type === 'deposit' && t.status === 'completed')
    .reduce((s, t) => s + t.amount, 0)
  const orderCount = transactions.filter((t) => t.type === 'purchase').length
  const quickServices = [
    {
      icon: <KeyIcon size={24} className="text-accent" />,
      label: 'Accounts',
      link: '/user/accounts',
    },
    {
      icon: <MonitorIcon size={24} className="text-accent" />,
      label: 'Account Boosting',
      link: '/user/account-boosting',
    },
    {
      icon: <SmartphoneIcon size={24} className="text-accent" />,
      label: 'SMS Numbers',
      link: 'sms-numbers',
    },
    {
      icon: <Gamepad2Icon size={24} className="text-accent" />,
      label: 'Game Keys',
      link: '/game',
    },
    {
      icon: <CreditCardIcon size={24} className="text-accent" />,
      label: 'Gift Cards',
      link: '/gift-cards',
    },
    {
      icon: <GlobeIcon size={24} className="text-accent" />,
      label: 'VPN & Security',
      link: '/vpn-security',
    },
  ]
  const getStatusIcon = (status: string) => {
    if (status === 'completed')
      return <CheckCircle2Icon size={14} className="text-stock-green" />
    if (status === 'pending')
      return <ClockIcon size={14} className="text-yellow-500" />
    return <XCircleIcon size={14} className="text-red-500" />
  }
  const getStatusClass = (status: string) => {
    if (status === 'completed')
      return 'bg-stock-green/10 text-stock-green border-stock-green/20'
    if (status === 'pending')
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
    return 'bg-red-500/10 text-red-500 border-red-500/20'
  }
  const getTypeIcon = (type: string) => {
    if (type === 'purchase')
      return <ShoppingBagIcon size={14} className="text-accent" />
    if (type === 'deposit')
      return <DownloadIcon size={14} className="text-stock-green" />
    return <ArrowUpRightIcon size={14} className="text-yellow-500" />
  }
  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 pt-10 md:pt-12 pb-16 animate-fade-in">
      {/* Welcome Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p className="text-sm text-txt-muted font-body mb-1">{greeting},</p>
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-txt-primary tracking-tight flex items-center gap-3">
            {user.username}
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-stock-green/10 border border-stock-green/20 rounded-sm text-stock-green text-[10px] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-stock-green"></span>{' '}
              Active
            </span>
          </h1>
          <p className="text-sm text-txt-secondary mt-1">{user.email}</p>
        </div>
        
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Balance Card — Primary */}
        <div className="sm:col-span-2 lg:col-span-1 bg-linear-to-br from-surface-tertiary to-surface-elevated border border-border-subtle rounded-sm p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-2 text-txt-secondary text-xs font-semibold uppercase tracking-wider">
              <WalletIcon size={14} className="text-accent" /> Wallet Balance
            </div>
            <EyeIcon size={14} className="text-txt-muted" />
          </div>
          <div className="font-heading font-bold text-3xl text-txt-primary mb-4 relative z-10">
            ${balance.toFixed(2)}
          </div>
          <button
            onClick={onFundWallet}
            className="w-full bg-accent text-surface-primary font-bold text-xs py-2.5 rounded-sm hover:bg-accent-hover transition-colors flex items-center justify-center gap-2 relative z-10"
          >
            <PlusIcon size={14} /> Fund Wallet
          </button>
        </div>

        {/* Total Spent */}
        <div className="bg-surface-secondary border border-border-subtle rounded-sm p-6">
          <div className="flex items-center gap-2 text-txt-secondary text-xs font-semibold uppercase tracking-wider mb-3">
            <TrendingDownIcon size={14} className="text-red-400" /> Total Spent
          </div>
          <div className="font-heading font-bold text-2xl text-txt-primary mb-1">
            ${totalSpent.toFixed(2)}
          </div>
          <p className="text-xs text-txt-muted">{orderCount} orders placed</p>
        </div>

        {/* Total Deposited */}
        <div className="bg-surface-secondary border border-border-subtle rounded-sm p-6">
          <div className="flex items-center gap-2 text-txt-secondary text-xs font-semibold uppercase tracking-wider mb-3">
            <TrendingUpIcon size={14} className="text-stock-green" /> Deposited
          </div>
          <div className="font-heading font-bold text-2xl text-txt-primary mb-1">
            ${totalDeposited.toFixed(2)}
          </div>
          <p className="text-xs text-txt-muted">Lifetime deposits</p>
        </div>

        {/* Activity */}
        <div className="bg-surface-secondary border border-border-subtle rounded-sm p-6">
          <div className="flex items-center gap-2 text-txt-secondary text-xs font-semibold uppercase tracking-wider mb-3">
            <ActivityIcon size={14} className="text-accent" /> Activity
          </div>
          <div className="font-heading font-bold text-2xl text-txt-primary mb-1">
            {transactions.length}
          </div>
          <p className="text-xs text-txt-muted">Total transactions</p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="">
                {/* Quick Services — 1 col */}
        <div className="bg-surface-secondary mb-8 border border-border-subtle rounded-sm overflow-hidden">
          <div className="p-5 border-b border-border-subtle">
            <h2 className="font-heading font-semibold text-base text-txt-primary">
              Quick Access
            </h2>
          </div>
          <div className='p-2'>
            <div className="  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-around items-center gap-2">
            {quickServices.map((svc, idx) => (
              <Link
              href={svc.link}
                key={idx}
                className="w-full flex flex-col items-center border border-border-subtle rounded-sm gap-3 p-4 hover:bg-surface-tertiary transition-colors text-left"
              >
                <div className="w-9 h-9 shrink-0 bg-surface-primary border border-border-subtle rounded-sm flex items-center justify-center">
                  {svc.icon}
                </div>
                <div className="flex-1">
                  <div className="font-subheading font-medium text-sm text-txt-primary">
                    {svc.label}
                  </div>
                 
                </div>
              </Link>
            ))}
          </div>
          </div>
        </div>
        {/* Transactions — 2 cols */}
        <div className="lg:col-span-2 bg-surface-secondary border border-border-subtle rounded-sm overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-border-subtle">
            <h2 className="font-heading font-semibold text-base text-txt-primary">
              Recent Transactions
            </h2>
            <span className="text-xs text-txt-muted">
              {transactions.length} total
            </span>
          </div>

          {transactions.length === 0 ? (
            <div className="p-12 text-center">
              <ShoppingBagIcon
                size={32}
                className="text-txt-muted mx-auto mb-4"
              />
              <p className="font-subheading text-sm text-txt-secondary mb-2">
                No transactions yet
              </p>
              <p className="text-xs text-txt-muted mb-6">
                Start by funding your wallet and browsing the marketplace.
              </p>
              <button
                 className="text-xs font-semibold text-accent hover:text-accent-hover transition-colors"
              >
                Browse Products →
              </button>
            </div>
          ) : (
            <div className="divide-y divide-border-subtle">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center gap-4 p-4 hover:bg-surface-tertiary transition-colors"
                >
                  <div className="w-9 h-9 shrink-0 bg-surface-primary border border-border-subtle rounded-sm flex items-center justify-center">
                    {getTypeIcon(tx.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-subheading font-medium text-sm text-txt-primary truncate">
                      {tx.description}
                    </div>
                    <div className="text-xs text-txt-muted mt-0.5">
                      {tx.date}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div
                      className={`font-subheading font-semibold text-sm ${tx.type === 'purchase' ? 'text-red-400' : tx.type === 'refund' ? 'text-yellow-500' : 'text-stock-green'}`}
                    >
                      {tx.type === 'purchase' ? '-' : '+'}$
                      {Math.abs(tx.amount).toFixed(2)}
                    </div>
                    <div
                      className={`inline-flex items-center gap-1 mt-1 px-1.5 py-0.5 rounded-sm text-[10px] font-bold uppercase border ${getStatusClass(tx.status)}`}
                    >
                      {getStatusIcon(tx.status)} {tx.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
