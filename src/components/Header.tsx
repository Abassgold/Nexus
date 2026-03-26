import { useEffect, useRef, useState } from 'react';
import { MenuIcon, XIcon, Palette, ShoppingCart, CreditCard, RotateCcw, FileText, LogOutIcon, UserIcon, ChevronDownIcon } from 'lucide-react';
import { flatCategoryLinks } from '../data/mockData';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { clearUser } from '@/redux/slice/auth';
import { deleteToken } from '@/lib/token';
import { useNotification } from './notification/NotificationContext';


const Menu = [
  { name: 'Profile', link: '/', icon: <UserIcon size={24}/> },
  { name: 'Dashboard', link: '/dashboard', icon: <Palette size={24}/> },
  { name: 'My Orders', link: '/orders', icon: <ShoppingCart size={24}/> },
  { name: 'Add Funds', link: '/add-funds', icon: <CreditCard size={24}/> },
  { name: 'Transaction History', link: '/transaction-history', icon: <RotateCcw size={24}/> },
  { name: 'Balance History', link: '/balance-history', icon: <FileText size={24}/> },
]
interface HeaderProps {
  scrolled: boolean;
  onLoginClick: () => void;
  onSignUpClick: () => void;
  onContactClick: () => void;
  onSupplierClick: () => void;
  onCategorySelect: (category: string) => void;
}
export function Header({
  scrolled,
  onLoginClick,
  onSignUpClick,
  onContactClick,
  onSupplierClick,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobileUserOpen, setIsMobileUserOpen] = useState(false);
  const handleMobileNav = (action: () => void) => {
    action();
    setMobileMenuOpen(false);
  };
  const { notify } = useNotification();
  const dispatch = useAppDispatch();
  const logOut = () => {
    deleteToken()
    dispatch(clearUser());
    notify('Logged out successfully', 'info');
  }
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const user = useAppSelector((state) => state.auth);
  return (
    <>
      <header
        className={`fixed top-0 w-full h-14 z-50 transition-all duration-150 border-b border-border-subtle flex items-center px-4 md:px-6
          ${scrolled ? 'bg-surface-secondary/80 backdrop-blur-md' : 'bg-surface-secondary'}
        `}>

        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          {/* Logo */}
          <div
            className="flex items-baseline gap-2 cursor-pointer"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              })
            }>

            <h1 className="font-heading font-bold text-xl text-txt-primary tracking-tight">
              NE<span className="text-accent">X</span>US
            </h1>
            <span className="text-txt-muted text-[10px] tracking-[0.2em] font-medium uppercase hidden sm:inline-block">
              Market
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={onContactClick}
              className="text-sm font-subheading text-txt-secondary hover:text-txt-primary transition-colors">

              Contact
            </button>

            {user && user.userName ?
              <div className="flex items-center gap-4">
                <button
                  onClick={onSupplierClick}
                  className="text-xs font-semibold text-accent border border-accent/30 hover:border-accent hover:bg-accent/10 px-4 py-1.5 rounded-sm transition-all duration-150">

                  Supplier Dashboard
                </button>
                <div className="h-4 w-px bg-border-subtle mx-1"></div>
                <div className="relative" ref={dropdownRef}>

                  {/* Trigger */}
                  <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent font-bold text-xs uppercase">
                      {user.userName.charAt(0)}
                    </div>
                    <span className="text-sm font-subheading text-txt-primary">
                      {user.userName}
                    </span>
                    <ChevronDownIcon
                      size={14}
                      className={`text-txt-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Dropdown */}
                  {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-surface-elevated border border-border-subtle rounded-sm shadow-xl z-50">

                      {/* User info */}
                      <div className="px-4 py-3 border-b border-border-subtle">
                        <p className="text-xs text-txt-muted">Signed in as</p>
                        <p className="text-sm font-subheading text-txt-primary truncate">
                          {user.userName}
                        </p>
                      </div>

                      {/* Menu items */}
                      <div className="py-1">
                        {Menu.map((link, index) => (
                          <Link
                            key={index}
                            href={link.link}
                          >
                            <button
                              onClick={() => { setIsOpen(false); }}
                              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-txt-primary hover:bg-surface transition-colors"
                            >
                              {link.icon}
                              {link.name}
                            </button>
                          </Link>
                        ))}


                        <button
                          onClick={() => { logOut(); setIsOpen(false); }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-surface transition-colors"
                        >
                          <LogOutIcon size={14} />
                          Logout
                        </button>
                      </div>

                    </div>
                  )}
                </div>
              </div> :

              <>
                <button
                  onClick={onLoginClick}
                  className="text-sm font-subheading text-txt-secondary hover:text-txt-primary transition-colors">

                  Login
                </button>
                <div className="h-4 w-px bg-border-subtle mx-2"></div>
                <button
                  onClick={onSignUpClick}
                  className="text-xs font-semibold text-accent border border-accent/30 hover:border-accent hover:bg-accent/10 px-4 py-1.5 rounded-sm transition-all duration-150">

                  Sign Up
                </button>
                <button
                  onClick={onSupplierClick}
                  className="text-xs font-semibold bg-accent text-surface-primary hover:bg-accent-hover px-4 py-1.5 rounded-sm transition-all duration-150">

                  Become a Supplier
                </button>
              </>
            }
          </nav>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-4">
            <button
              className="text-txt-secondary hover:text-txt-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 top-14 z-40 bg-surface-primary border-t border-border-subtle animate-fade-in md:hidden flex flex-col overflow-y-auto pb-8">

          {user && user.userName ? (
            <div className="border-b border-border-subtle bg-surface-secondary">

              {/* Trigger */}
              <button
                onClick={() => setIsMobileUserOpen((prev) => !prev)}
                className="w-full flex items-center justify-between p-4 hover:bg-surface-tertiary transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent font-bold text-lg uppercase">
                    {user.userName.charAt(0)}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-subheading text-txt-primary capitalize">
                      {user.userName}
                    </div>
                    <div className="text-xs text-txt-secondary">{user.email}</div>
                  </div>
                </div>
                <ChevronDownIcon
                  size={16}
                  className={`text-txt-muted transition-transform duration-200 ${isMobileUserOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown */}
              {isMobileUserOpen && (
                <div className="mx-4 mb-3 border border-border-subtle rounded-sm overflow-hidden">
                  {Menu.map((link, index) => (
                    <Link
                      key={index}
                      href={link.link}
                    >
                      <button
                        onClick={() => handleMobileNav(() => { })}
                        className="w-full flex items-center gap-2 px-4 py-3 text-sm text-txt-primary hover:bg-surface-elevated transition-colors"
                      >
                        {link.icon}
                        {link.name}
                      </button>
                      <div className="border-t border-border-subtle" />
                    </Link>
                  ))}
                  <button
                    onClick={() => handleMobileNav(logOut)}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-surface-elevated transition-colors"
                  >
                    <LogOutIcon size={15} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 border-b border-border-subtle grid grid-cols-2 gap-3">
              <button
                onClick={() => handleMobileNav(onLoginClick)}
                className="w-full text-sm font-semibold text-txt-primary bg-surface-tertiary border border-border-subtle px-4 py-2.5 rounded-sm"
              >
                Login
              </button>
              <button
                onClick={() => handleMobileNav(onSignUpClick)}
                className="w-full text-sm font-semibold text-accent border border-accent/30 px-4 py-2.5 rounded-sm"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Categories */}
          <div className="p-4">
            <h3 className="text-xs font-heading font-semibold text-txt-muted uppercase tracking-wider mb-3">
              Categories
            </h3>
            <div className="flex flex-col gap-1">
              {flatCategoryLinks.map((link) => (
                <Link
                  key={link.link}
                  href={link.link}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-left text-sm font-subheading text-txt-secondary hover:text-accent py-2.5 border-b border-border-subtle last:border-0"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Utilities */}
          <div className="p-4 mt-auto">
            <button
              onClick={() => handleMobileNav(onContactClick)}
              className="w-full text-left text-sm font-subheading text-txt-secondary hover:text-txt-primary py-3 border-b border-border-subtle"
            >
              Contact Support
            </button>
            <button
              onClick={() => handleMobileNav(onSupplierClick)}
              className="w-full mt-4 text-sm font-semibold bg-accent text-surface-primary px-4 py-3 rounded-sm"
            >
              Become a Supplier
            </button>
          </div>

        </div>
      )}
    </>
  );
}