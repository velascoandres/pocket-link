'use client'

import React from 'react'
import { SessionProvider } from 'next-auth/react'

import { Navbar } from '@/components/dashboard/navbar'

const Layout = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<>
			<SessionProvider >
				<div className="fixed w-screen">
					<Navbar />
				</div>
				<div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto px-4 mt-20 overflow-y-auto">
					{children}
				</div>
			</SessionProvider>
		</>
	)
}


export default Layout

