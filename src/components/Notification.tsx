import React from 'react';
import { CheckCircleIcon, AlertCircleIcon, InfoIcon, XIcon } from 'lucide-react';
export interface NotificationItem {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}
interface NotificationProps {
  notifications: NotificationItem[];
  onDismiss: (id: string) => void;
}
export function Notification({ notifications, onDismiss }: NotificationProps) {
  return (
    <div className="fixed top-20 right-4 z-60 flex flex-col gap-2 pointer-events-none">
      {notifications.map((notif) =>
      <div
        key={notif.id}
        className={`
            pointer-events-auto flex items-center gap-3 w-80 p-4 bg-surface-elevated border border-border-subtle rounded-sm shadow-xl animate-fade-in
            ${notif.type === 'success' ? 'border-l-4 border-l-stock-green' : ''}
            ${notif.type === 'error' ? 'border-l-4 border-l-red-500' : ''}
            ${notif.type === 'info' ? 'border-l-4 border-l-accent' : ''}
          `}>

          <div className="shrink-0">
            {notif.type === 'success' &&
          <CheckCircleIcon size={20} className="text-stock-green" />
          }
            {notif.type === 'error' &&
          <AlertCircleIcon size={20} className="text-red-500" />
          }
            {notif.type === 'info' &&
          <InfoIcon size={20} className="text-accent" />
          }
          </div>
          <p className="flex-1 font-body text-sm text-txt-primary">
            {notif.message}
          </p>
          <button
          onClick={() => onDismiss(notif.id)}
          className="shrink-0 text-txt-muted hover:text-txt-primary transition-colors">

            <XIcon size={16} />
          </button>
        </div>
      )}
    </div>);

}