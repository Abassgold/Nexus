import { Header } from '@/components/userLayout/Header';
import Sidebar from '@/components/userLayout/Sidebar';
import React from 'react'
const UserLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='flex min-h-screen bg-surface-primary'>
      <div className='hidden md:flex w-64 flex-col border-r border-border-subtle'>
        <Sidebar />
      </div>
      <div className='flex-1 flex flex-col min-w-0 relative'>
        <div className='fixed top-0 right-0 z-50 w-full md:w-[calc(100%-16rem)] transition-all duration-150'>
          <Header />
        </div>
        <main className='flex-1 pt-20 pb-6 px-4 md:px-6'>
          {children}
        </main>
      </div>
    </div>
  )
}

export default UserLayout