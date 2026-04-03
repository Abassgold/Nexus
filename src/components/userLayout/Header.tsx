'use client';
import { useEffect, useRef, useState } from 'react';
import { MenuIcon, XIcon, Palette, ShoppingCart, CreditCard, RotateCcw, FileText, LogOutIcon, UserIcon, ChevronDownIcon } from 'lucide-react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addUser, clearUser } from '@/redux/slice/auth';
import { deleteToken, getToken } from '@/lib/token';
import { useNotification } from '../notification/NotificationContext';
import { flatCategoryLinks } from '@/data/mockData';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { findUser } from '@/redux/type';


const Menu = [
  { name: 'Profile', link: '/', icon: <UserIcon size={14} /> },
  { name: 'Dashboard', link: '/dashboard', icon: <Palette size={14} /> },
  { name: 'My Orders', link: '/orders', icon: <ShoppingCart size={14} /> },
  { name: 'Add Funds', link: '/add-funds', icon: <CreditCard size={14} /> },
  { name: 'Transaction History', link: '/transaction-history', icon: <RotateCcw size={14} /> },
  { name: 'Balance History', link: '/balance-history', icon: <FileText size={14} /> },
]

export function Header() {
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
  const router = useRouter();
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
  useEffect(() => {
    if (user?.email !== '') return;
    const fetchUser = async () => {
      try {
        const { data } = await axios.get<findUser>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`
            }
          }
        )
        console.log('the data is :', data)
          dispatch(addUser(data))
      } catch (err) {
        console.error('Failed to fetch user info:', err)
      }
    }
    fetchUser()
  }, [])
  return (
    <>

      <header
        className={`h-14 border-b border-border-subtle flex items-center px-4 md:px-6
          bg-surface-secondary/80 backdrop-blur-md' 
        `}>

        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          {/* Logo */}
          <div
            className="md:hidden flex items-baseline gap-2 cursor-pointer"
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

          {user && user.email ?  (
            <div className="border-b border-border-subtle bg-surface-secondary">

              {/* Trigger */}
              <button
                onClick={() => setIsMobileUserOpen((prev) => !prev)}
                className="w-full flex items-center justify-between p-4 hover:bg-surface-tertiary transition-colors"
              >
                <div className="flex items-center gap-3 z-100">
                  <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent font-bold text-lg uppercase">
                    {user.userName.charAt(0)}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-subheading text-txt-primary capitalize">
                      {user.userName}
                    </div>
                    <div className="text-xs text-txt-secondary">
                      {user.email}
                      </div>
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
                        className="w-full  flex items-center gap-2 px-4 py-3 text-sm text-txt-secondary hover:bg-surface-elevated transition-colors"
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
              <Link
                href='signin'
                className="w-full text-sm font-semibold text-txt-primary bg-surface-tertiary border border-border-subtle px-4 py-2.5 rounded-sm"
              >
                Login
              </Link>
              <Link
                href='signup'
                className="w-full text-sm font-semibold text-accent border border-accent/30 px-4 py-2.5 rounded-sm"
              >
                Sign Up
              </Link>
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
        </div>
      )}
    </>
  );
}