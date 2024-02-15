'use client'

import React from 'react'

import { withAuth } from '@/app/_components/auth/with-auth'
import { SideNavigation } from '@/app/_components/dashboard/side-navigation'

const Layout = ({
  children,
}: {
	children: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen relative flex flex-col items-start justify-between overflow-y-auto">
      <SideNavigation />
      <div className="md:pl-[200px] w-full">
        {children}
      </div>
    </div>
  )
}


export default withAuth(Layout)

