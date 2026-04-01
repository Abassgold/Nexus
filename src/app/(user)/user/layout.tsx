import { Header } from '@/components/userLayout/Header';
import Sidebar from '@/components/userLayout/Sidebar';
import React from 'react'
const UserLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='flex min-h-screen'>
      <div className='hidden md:flex w-64 flex-col'>
        <Sidebar />
      </div>
      <div className='flex-1 flex flex-col min-w-0'>
        <Header />
        <main className='flex-1 py-6 bg-red-600 px-4 md:p-6'>
          {children}
        </main>
      </div>
    </div>
  )
}

export default UserLayout