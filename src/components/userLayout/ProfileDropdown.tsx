'use client';
import React, { useEffect, useState, useRef } from 'react';
import { UserIcon, SettingsIcon, UserStar, LogOutIcon, ChevronDownIcon } from 'lucide-react';
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { deleteToken } from '@/lib/token';
const ProfileDropdown: React.FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const logOut = async () => {
      try {
        sessionStorage.removeItem('numberInfo');
        sessionStorage.removeItem('otp');
        deleteToken();
        router.push('/login');
      } catch (err) {
        console.error('Logout failed:', err);
      }
    };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const user = useAppSelector((state) => state.auth)

 return (
  <div className="relative" ref={dropdownRef}>
    <button 
      onClick={() => setIsOpen(!isOpen)} 
      className="flex items-center space-x-2 focus:outline-none group"
    >
      {/* Avatar using your accent brand color */}
      <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-white">
        <UserIcon size={16} />
      </div>
      
      <div className="hidden md:block text-left">
        <p className="text-sm font-medium text-txt-primary capitalize leading-none">
          {user.userName}
        </p>
        <p className="text-[10px] text-txt-muted mt-1 uppercase font-bold tracking-wider">
          Member
        </p>
      </div>
      
      <ChevronDownIcon size={14} className="text-txt-muted group-hover:text-txt-primary transition-colors" />
    </button>

    {isOpen && (
      <div className="absolute right-0 mt-2 w-52 bg-surface-secondary border border-border-subtle rounded-sm shadow-xl z-50 overflow-hidden">
        {/* User Info Header */}
        <div className="p-4 border-b border-border-subtle bg-surface-tertiary">
          <p className="text-sm font-semibold text-txt-primary capitalize">
            {user.userName}
          </p>
          <p className="text-xs text-txt-muted truncate mt-0.5">
            {user?.email}
          </p>
        </div>

        {/* Menu Links */}
        <div className="py-1">
          <Link 
            href="#" 
            className="flex items-center px-4 py-2.5 text-sm text-txt-secondary hover:bg-surface-tertiary hover:text-txt-primary transition-colors"
          >
            <UserIcon size={16} className="mr-3 text-txt-muted" />
            Profile
          </Link>
          
          {user?.role === 'admin' && (
            <Link 
              href="/admin" 
              className="flex items-center px-4 py-2.5 text-sm text-txt-secondary hover:bg-surface-tertiary hover:text-txt-primary transition-colors"
            >
              <UserStar size={16} className="mr-3 text-txt-muted" />
              Admin Panel
            </Link>
          )}
          
          <Link 
            href="/user/account" 
            className="flex items-center px-4 py-2.5 text-sm text-txt-secondary hover:bg-surface-tertiary hover:text-txt-primary transition-colors"
          >
            <SettingsIcon size={16} className="mr-3 text-txt-muted" />
            Account Settings
          </Link>
        </div>

        {/* Logout Section */}
        <div className="py-1 border-t border-border-subtle bg-surface-primary/50">
          <Link
            onClick={logOut}
            href="#" 
            className="flex items-center px-4 py-2.5 text-sm text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <LogOutIcon size={16} className="mr-3" />
            Log Out
          </Link>
        </div>
      </div>
    )}
  </div>
);
};

export default ProfileDropdown;