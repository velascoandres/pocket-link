'use client'

import React from 'react'

import { withAuth } from '@/app/_components/auth/with-auth'
import { Navbar } from '@/app/_components/dashboard/navbar'
import { SideNavigation } from '@/app/_components/dashboard/side-navigation'

const Layout = ({
  children,
}: {
	children: React.ReactNode;
}) => {
  return (
    <div className="h-[calc(100dvh-85px)] relative flex flex-col items-start justify-between overflow-y-auto">
      <div className="fixed w-screen top-0 z-10">
        <Navbar />
      </div>
      <SideNavigation />
      <div className="flex-1 w-full flex flex-col items-start flex-wrap justify-between mx-auto px-4 pt-20 mb-8 md:pl-[200px]">
        {children}
      </div>
    </div>
  )
}


export default withAuth(Layout)

