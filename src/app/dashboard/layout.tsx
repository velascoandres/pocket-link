'use client'

import React from 'react'

import { Navbar } from '@/components/dashboard/navbar'
import { withAuth } from '@/components/auth/with-auth'

const Layout = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<>
			<div className="fixed w-screen">
				<Navbar />
			</div>
			<div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto px-4 mt-20 overflow-y-auto">
				{children}
			</div>
		</>
	)
}


export default withAuth(Layout)
