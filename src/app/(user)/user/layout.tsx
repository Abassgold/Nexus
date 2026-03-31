import { Header } from '@/components/userLayout/Header';
import Sidebar from '@/components/userLayout/Sidebar';
import React from 'react'
const UserLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='flex'>
      <Sidebar/>
      <div>
        <Header/>
        {children}
      </div>
    </div>
  )
}

export default UserLayout