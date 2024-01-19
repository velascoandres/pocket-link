/* eslint-disable react/display-name */
'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type PageProps = {
	children: React.ReactNode;
}

type PageComponent = (props: PageProps) => React.ReactNode

export const withAuth = (Page: PageComponent) => {

	return ({ children }: PageProps) => {
		const { status } = useSession()
		const router = useRouter()

		const [isAllowed, setIsAllowed] = useState(false)

		useEffect(() => {
			if (status === 'unauthenticated') {
				router.push('/')

				return
			}

			if (status === 'authenticated') {
				setIsAllowed(true)
			}

		}, [router, status])

		if (!isAllowed) {
			return null
		}


		return (
			<Page >
				{children}
			</Page>
		)
	}
}

