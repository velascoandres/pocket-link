/* eslint-disable react/display-name */
'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

type PageProps = {
	children: React.ReactNode;
}

type PageComponent = (props: PageProps) => React.ReactNode

export const withAuth = (Page: PageComponent) => {

	return ({ children}: PageProps) => {
		const { data: session } = useSession()
		const router = useRouter()

		if (!session) {
			router.replace('/')

			return
		}

		return (
			<Page >
				{children}
			</Page>
		)
	}
}

