import { Header } from '@/components/Header'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col h-screen overflow-hidden bg-gray-50 dark:bg-gray-950'>
      <Header />
      <div className="flex-1 flex overflow-y-auto">
        {children}
      </div>
    </div>
  )
}

export default Layout