import React from 'react'
import { 
  LayoutDashboard, 
  UserCircle, 
  Settings, 
  LogOut, 
  Bell, 
  ShieldCheck 
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', active: true },
    { icon: <UserCircle size={20} />, label: 'Profile', active: false },
    { icon: <Bell size={20} />, label: 'Notifications', active: false },
    { icon: <ShieldCheck size={20} />, label: 'Security', active: false },
    { icon: <Settings size={20} />, label: 'Settings', active: false },
  ];

  return (
    <aside className="h-screen fixed top-0 w-64 bg-surface-secondary border-r border-border-subtle flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-border-subtle">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center text-surface-primary font-bold">
            A
          </div>
          <span className="font-heading font-bold text-txt-primary tracking-tight">
            APP NAME
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 flex flex-col gap-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-all text-sm font-medium
              ${item.active 
                ? 'bg-accent/10 text-accent border-l-2 border-accent' 
                : 'text-txt-secondary hover:bg-surface-tertiary hover:text-txt-primary'
              }`}
          >
            <span className={item.active ? 'text-accent' : 'text-txt-muted'}>
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Bottom Profile / Logout Section */}
      <div className="p-4 border-t border-border-subtle bg-surface-tertiary/30">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-txt-secondary hover:text-red-500 transition-colors text-sm font-medium">
          <LogOut size={20} className="text-txt-muted group-hover:text-red-500" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;