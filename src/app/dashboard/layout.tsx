'use client'

import React from 'react'

import { withAuth } from '@/app/_components/auth/with-auth'
import { Navbar } from '@/app/_components/dashboard/navbar'

const Layout = ({
  children,
}: {
	children: React.ReactNode;
}) => {
  return (
    <div className="h-screen overflow-y-auto">
      <div className="fixed w-screen top-0 z-10">
        <Navbar />
      </div>
      <div className="max-w-screen-2xl flex flex-col items-start flex-wrap justify-between mx-auto px-4 mt-20">
        {children}
      </div>
    </div>
  )
}


export default withAuth(Layout)

