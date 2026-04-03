'use client';
import {
  WalletIcon,
  PlusIcon,
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
  ChevronRightIcon,
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
    <div className="animate-fade-in">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Primary Balance Card - Takes up 2 columns on large screens */}
        <div className="lg:col-span-2 bg-linear-to-br from-surface-tertiary to-surface-elevated border border-border-subtle rounded-sm p-8 relative overflow-hidden flex flex-col justify-between min-h-[200px]">
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>

          <div>
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="flex items-center gap-2 text-txt-secondary text-xs font-semibold uppercase tracking-widest">
                <WalletIcon size={16} className="text-accent" /> Available Balance
              </div>
              <button className="p-1 hover:bg-surface-elevated rounded-full transition-colors">
                <EyeIcon size={16} className="text-txt-muted" />
              </button>
            </div>

            <div className="font-heading font-bold text-5xl text-txt-primary mb-2 relative z-10">
              ${balance.toFixed(2)}
            </div>
            <p className="text-txt-muted text-sm relative z-10">Ready for your next order</p>
          </div>

          <div className="mt-8 relative z-10">
            <Link
              href='/fund-wallet'
              className="inline-flex items-center justify-center gap-2 bg-accent text-surface-primary font-bold text-sm px-8 py-3 rounded-sm hover:bg-accent-hover transition-all transform hover:scale-[1.01] active:scale-[0.99]"
            >
              <PlusIcon size={18} /> Fund Wallet
            </Link>
          </div>
        </div>

        {/* Quick Actions / Navigation Card */}
        <div className="bg-surface-secondary border border-border-subtle rounded-sm p-8 flex flex-col justify-center">
          <div className="mb-6">
            <h3 className="text-txt-primary font-bold text-lg mb-1">Manage Funds</h3>
            <p className="text-txt-muted text-sm">View your history and manage payments</p>
          </div>

          <Link
            href="/transactions"
            className="group flex items-center justify-between p-4 bg-surface-tertiary border border-border-subtle rounded-sm hover:border-accent/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-sm">
                <ActivityIcon size={20} className="text-accent" />
              </div>
              <span className="font-semibold text-txt-primary">Transaction History</span>
            </div>
            <ChevronRightIcon size={18} className="text-txt-muted group-hover:text-accent transition-transform group-hover:translate-x-1" />
          </Link>
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
