'use client';
import { useState } from 'react'
import {
  ArrowRightIcon,
  ShieldCheckIcon,
  ZapIcon,
  GlobeIcon,
  SmartphoneIcon,
  KeyIcon,
  CreditCardIcon,
  MonitorIcon,
  Gamepad2Icon,
  CheckCircle2Icon,
  UserPlusIcon,
  SearchIcon,
  ChevronDownIcon,
  StarIcon,
  ClockIcon,
  HeadphonesIcon,
  LockIcon,
  RefreshCwIcon,
  TrendingUpIcon,
  UsersIcon,
  MessageSquareIcon,
  WalletIcon,
} from 'lucide-react'
interface LandingPageProps {
}
 function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const services = [
    {
      icon: <KeyIcon size={24} className="text-accent" />,
      title: 'Premium Accounts',
      description:
        'Aged social media, streaming, and gaming accounts with full access and replacement warranty.',
    },
    {
      icon: <MonitorIcon size={24} className="text-accent" />,
      title: 'Software Licenses',
      description:
        'Genuine Windows, Office, Adobe, and developer tool licenses at wholesale prices.',
    },
    {
      icon: <SmartphoneIcon size={24} className="text-accent" />,
      title: 'Virtual Numbers',
      description:
        'Disposable and semi-permanent virtual phone numbers for SMS verification on 600+ platforms.',
    },
    {
      icon: <Gamepad2Icon size={24} className="text-accent" />,
      title: 'Game Keys',
      description:
        'AAA and indie game keys for Steam, GOG, Epic Games, and console platforms worldwide.',
    },
    {
      icon: <CreditCardIcon size={24} className="text-accent" />,
      title: 'Gift Cards',
      description:
        'Amazon, Apple, Google Play, Steam, and PlayStation gift cards with instant digital delivery.',
    },
    {
      icon: <GlobeIcon size={24} className="text-accent" />,
      title: 'VPN & Security',
      description:
        'NordVPN, ExpressVPN, Surfshark, and ProtonVPN subscriptions at unbeatable prices.',
    },
    {
      icon: <TrendingUpIcon size={24} className="text-accent" />,
      title: 'Subscriptions',
      description:
        'ChatGPT Plus, Canva Pro, Grammarly Premium, YouTube Premium, and more.',
    },
    {
      icon: <WalletIcon size={24} className="text-accent" />,
      title: 'Digital Services',
      description:
        'SEO tools, email marketing platforms, cloud storage upgrades, and other SaaS products.',
    },
  ]
  const stats = [
    {
      value: '50K+',
      label: 'Products Listed',
    },
    {
      value: '12,500+',
      label: 'Active Users',
    },
    {
      value: '99.9%',
      label: 'Uptime',
    },
    {
      value: '< 30s',
      label: 'Avg. Delivery',
    },
  ]
  const steps = [
    {
      num: '01',
      icon: <UserPlusIcon size={24} className="text-accent" />,
      title: 'Create Account',
      description:
        'Sign up in seconds with just an email. No KYC or identity verification required.',
    },
    {
      num: '02',
      icon: <SearchIcon size={24} className="text-accent" />,
      title: 'Browse & Select',
      description:
        'Explore our catalog of 50,000+ digital products across all categories.',
    },
    {
      num: '03',
      icon: <WalletIcon size={24} className="text-accent" />,
      title: 'Pay Securely',
      description:
        'Multiple payment methods including crypto, cards, and digital wallets.',
    },
    {
      num: '04',
      icon: <ZapIcon size={24} className="text-accent" />,
      title: 'Instant Delivery',
      description:
        'Receive your product credentials or keys instantly in your dashboard.',
    },
  ]
  const testimonials = [
    {
      name: 'Alex K.',
      role: 'Reseller',
      rating: 5,
      text: 'Best platform for bulk software keys. Delivery is instant and prices are unmatched. Been using it for 8 months.',
      avatar: 'A',
    },
    {
      name: 'Sarah M.',
      role: 'Developer',
      rating: 5,
      text: 'The virtual numbers saved me hours of work. API integration was seamless and support responded in minutes.',
      avatar: 'S',
    },
    {
      name: 'James R.',
      role: 'Gamer',
      rating: 4,
      text: 'Got Elden Ring for half the retail price. Key worked perfectly on Steam. Will definitely buy again.',
      avatar: 'J',
    },
    {
      name: 'Priya D.',
      role: 'Marketer',
      rating: 5,
      text: 'Canva Pro and Grammarly subscriptions at a fraction of the cost. The escrow system gives me confidence.',
      avatar: 'P',
    },
  ]
  const faqs = [
    {
      q: 'How does instant delivery work?',
      a: 'Once your payment is confirmed, your product (license key, account credentials, or virtual number) is delivered directly to your dashboard within seconds. No manual processing required.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept Bitcoin, Ethereum, USDT, major credit/debit cards (Visa, Mastercard), PayPal, and various regional payment methods. Crypto payments are processed instantly.',
    },
    {
      q: 'Is there a warranty or replacement policy?',
      a: "Yes. All products come with a minimum 24-hour replacement warranty. Premium accounts include up to 30-day warranty. If a product doesn't work as described, we replace it or issue a full refund.",
    },
    {
      q: 'How do virtual verification numbers work?',
      a: 'You select a country and platform (e.g., WhatsApp, Google, Telegram), receive a temporary phone number, and we forward the SMS verification code to your dashboard in real-time. Numbers are available from 50+ countries.',
    },
    {
      q: 'Can I become a supplier on NEXUS?',
      a: 'Absolutely. Click "Become a Supplier" to submit your application. We review all applications within 48 hours. Suppliers get access to our seller dashboard, analytics, and automated delivery tools.',
    },
    {
      q: 'Is my personal information safe?',
      a: "We use end-to-end encryption for all transactions. We don't store payment details, and accounts can be created with minimal personal information. Your privacy is our priority.",
    },
    {
      q: 'What if I have an issue with my order?',
      a: 'Our 24/7 support team is available via Telegram and Discord. Most issues are resolved within 15 minutes. You can also open a dispute through the escrow system for automatic mediation.',
    },
  ]
  const trustBadges = [
    {
      icon: <LockIcon size={16} className="text-accent" />,
      label: 'SSL Encrypted',
    },
    {
      icon: <ShieldCheckIcon size={16} className="text-accent" />,
      label: 'Escrow Protection',
    },
    {
      icon: <RefreshCwIcon size={16} className="text-accent" />,
      label: 'Replacement Warranty',
    },
    {
      icon: <ClockIcon size={16} className="text-accent" />,
      label: 'Instant Delivery',
    },
    {
      icon: <HeadphonesIcon size={16} className="text-accent" />,
      label: '24/7 Support',
    },
    {
      icon: <UsersIcon size={16} className="text-accent" />,
      label: '12K+ Trusted Users',
    },
  ]
  return (
    <div className="w-full flex flex-col items-center pt-20 md:pt-32">
      {/* ── Hero ── */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-center text-center mb-24 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider mb-8">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
          Nexus Market is Live
        </div>
        <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl text-txt-primary tracking-tight mb-6 max-w-4xl leading-tight">
          The Premier Terminal for <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-accent to-[#0077b6]">
            Digital Assets
          </span>
        </h1>
        <p className="font-body text-lg md:text-xl text-txt-secondary mb-10 max-w-2xl leading-relaxed">
          Software licenses, premium accounts, game keys, gift cards, virtual
          numbers, and more — sourced from verified suppliers and delivered in
          seconds.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            className="w-full sm:w-auto bg-accent text-surface-primary font-bold text-sm md:text-base px-8 py-4 rounded-sm hover:bg-accent-hover transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,180,216,0.3)] hover:shadow-[0_0_30px_rgba(0,180,216,0.5)]"
          >
            Enter Marketplace <ArrowRightIcon size={18} />
          </button>
          <button
            className="w-full sm:w-auto bg-surface-tertiary text-txt-primary border border-border-subtle font-semibold text-sm md:text-base px-8 py-4 rounded-sm hover:bg-surface-elevated hover:border-border-hover transition-all duration-200"
          >
            Become a Supplier
          </button>
        </div>
      </section>

      {/* ── Trust Badges Bar ── */}
      <section className="w-full border-y border-border-subtle bg-surface-secondary mb-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {trustBadges.map((badge, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-xs font-semibold text-txt-secondary"
              >
                {badge.icon}
                {badge.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-6 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-surface-secondary border border-border-subtle rounded-sm p-6 text-center"
            >
              <span className="font-heading font-bold text-3xl md:text-4xl text-accent block mb-1">
                {stat.value}
              </span>
              <span className="font-subheading text-xs text-txt-muted uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-6 mb-24">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-txt-primary mb-4">
            What We Offer
          </h2>
          <p className="font-body text-txt-secondary max-w-2xl mx-auto">
            A full spectrum of digital products and services, all verified and
            delivered through our automated platform.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, idx) => (
            <button
              key={idx}
              className="text-left bg-surface-secondary border border-border-subtle p-6 rounded-sm hover:border-accent/40 transition-all duration-200 group"
            >
              <div className="w-11 h-11 bg-surface-primary border border-border-subtle rounded-sm flex items-center justify-center mb-5 group-hover:border-accent/30 transition-colors">
                {service.icon}
              </div>
              <h3 className="font-heading font-semibold text-base text-txt-primary mb-2">
                {service.title}
              </h3>
              <p className="font-body text-xs text-txt-secondary leading-relaxed">
                {service.description}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="w-full bg-surface-secondary border-y border-border-subtle mb-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-txt-primary mb-4">
              How It Works
            </h2>
            <p className="font-body text-txt-secondary max-w-xl mx-auto">
              From sign-up to delivery in under a minute. Our fully automated
              system handles everything.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-surface-primary border border-border-subtle rounded-sm flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 bg-accent text-surface-primary text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center">
                    {step.num}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-base text-txt-primary mb-2">
                  {step.title}
                </h3>
                <p className="font-body text-xs text-txt-secondary leading-relaxed">
                  {step.description}
                </p>
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] border-t border-dashed border-border-hover"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-6 mb-24">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-txt-primary mb-4">
            What Our Users Say
          </h2>
          <p className="font-body text-txt-secondary max-w-xl mx-auto">
            Trusted by thousands of buyers and resellers worldwide.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-surface-secondary border border-border-subtle rounded-sm p-6 flex flex-col"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({
                  length: 5,
                }).map((_, i) => (
                  <StarIcon
                    key={i}
                    size={14}
                    className={
                      i < t.rating
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-txt-muted'
                    }
                  />
                ))}
              </div>
              <p className="font-body text-sm text-txt-secondary leading-relaxed mb-6 flex-1">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border-subtle">
                <div className="w-8 h-8 rounded-full bg-accent/15 border border-accent/20 flex items-center justify-center text-accent font-bold text-xs">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-subheading font-medium text-sm text-txt-primary">
                    {t.name}
                  </div>
                  <div className="text-xs text-txt-muted">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Security & Trust ── */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-6 mb-24">
        <div className="bg-linear-to-br from-surface-tertiary to-surface-elevated border border-border-subtle rounded-sm p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-1 h-full bg-accent animate-pulse-glow"></div>

          <div className="flex-1 z-10">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-txt-primary mb-4">
              Enterprise-Grade Security
            </h2>
            <p className="font-body text-txt-secondary mb-8 leading-relaxed max-w-lg">
              Every transaction on NEXUS is protected by our multi-layer
              security system. Funds are held in escrow until delivery is
              confirmed, and all data is encrypted end-to-end.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: <ShieldCheckIcon size={18} className="text-accent" />,
                  title: 'Escrow System',
                  desc: 'Funds released only after delivery confirmation',
                },
                {
                  icon: <LockIcon size={18} className="text-accent" />,
                  title: 'E2E Encryption',
                  desc: 'All credentials and data fully encrypted',
                },
                {
                  icon: <RefreshCwIcon size={18} className="text-accent" />,
                  title: 'Auto-Replacement',
                  desc: 'Instant replacement if product is invalid',
                },
                {
                  icon: <HeadphonesIcon size={18} className="text-accent" />,
                  title: '24/7 Dispute Resolution',
                  desc: 'Human support for any order issues',
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-9 h-9 shrink-0 bg-surface-primary border border-border-subtle rounded-sm flex items-center justify-center mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-subheading font-semibold text-sm text-txt-primary">
                      {item.title}
                    </h4>
                    <p className="text-xs text-txt-secondary">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 w-full max-w-sm bg-surface-primary border border-border-subtle rounded-sm p-6 shadow-2xl z-10">
            <div className="flex items-center justify-between border-b border-border-subtle pb-4 mb-4">
              <span className="font-heading font-semibold text-sm text-txt-primary">
                Live Activity
              </span>
              <span className="flex items-center gap-2 text-xs text-stock-green font-medium">
                <span className="w-2 h-2 rounded-full bg-stock-green animate-pulse"></span>{' '}
                Online
              </span>
            </div>
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-surface-secondary rounded-sm border-l-2 border-stock-green">
                <span className="text-txt-muted">[10:42:05]</span>{' '}
                <span className="text-stock-green">✓</span>{' '}
                <span className="text-txt-primary">
                  Windows 11 Pro Key delivered
                </span>
              </div>
              <div className="p-3 bg-surface-secondary rounded-sm border-l-2 border-accent">
                <span className="text-txt-muted">[10:41:52]</span>{' '}
                <span className="text-accent">→</span>{' '}
                <span className="text-txt-primary">
                  SMS code sent: Telegram
                </span>
              </div>
              <div className="p-3 bg-surface-secondary rounded-sm border-l-2 border-border-subtle opacity-70">
                <span className="text-txt-muted">[10:41:12]</span>{' '}
                <span className="text-stock-green">✓</span>{' '}
                <span className="text-txt-primary">NordVPN 2yr activated</span>
              </div>
              <div className="p-3 bg-surface-secondary rounded-sm border-l-2 border-border-subtle opacity-50">
                <span className="text-txt-muted">[10:40:44]</span>{' '}
                <span className="text-stock-green">✓</span>{' '}
                <span className="text-txt-primary">Steam key: Elden Ring</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-6 mb-24">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-txt-primary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="font-body text-txt-secondary max-w-xl mx-auto">
            Everything you need to know before getting started.
          </p>
        </div>
        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-border-subtle rounded-sm bg-surface-secondary overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-surface-tertiary"
              >
                <span className="font-subheading font-medium text-sm text-txt-primary pr-4">
                  {faq.q}
                </span>
                <ChevronDownIcon
                  size={18}
                  className={`text-txt-muted shrink-0 transition-transform duration-200 ${openFaq === idx ? 'rotate-180' : ''}`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 animate-fade-in">
                  <p className="font-body text-sm text-txt-secondary leading-relaxed border-t border-border-subtle pt-4">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="w-full bg-surface-secondary border-y border-border-subtle mb-0">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 text-center">
          <MessageSquareIcon size={32} className="text-accent mx-auto mb-6" />
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-txt-primary mb-4">
            Ready to Get Started?
          </h2>
          <p className="font-body text-txt-secondary max-w-xl mx-auto mb-10">
            Join 12,500+ users on the most trusted digital marketplace. Create
            your free account and start buying in under a minute.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              className="w-full sm:w-auto bg-accent text-surface-primary font-bold text-sm px-8 py-4 rounded-sm hover:bg-accent-hover transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,180,216,0.3)] hover:shadow-[0_0_30px_rgba(0,180,216,0.5)]"
            >
              Browse Marketplace <ArrowRightIcon size={18} />
            </button>
            <button
              className="w-full sm:w-auto bg-surface-tertiary text-txt-primary border border-border-subtle font-semibold text-sm px-8 py-4 rounded-sm hover:bg-surface-elevated hover:border-border-hover transition-all duration-200"
            >
              Create Free Account
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home;
