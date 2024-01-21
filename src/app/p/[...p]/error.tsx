'use client'

import Link from 'next/link'
import Image from 'next/image'
import { IMAGES } from '@/constants/images'
import { IconChevronLeft } from '@tabler/icons-react'

export default function Error() {
	return (
		<main className="h-screen w-screen flex flex-col items-center justify-center gap-4 px-10">
			<Image src={IMAGES.CHEEMS} width={200} height={200} alt="Cheems meme sad" />
			<h2 className="text-4xl font-bold text-red-500">An error has occurred</h2>
			<p className="text-white font-medium text-lg">Please try to request more later</p>
			<Link href="/">
				<div className="transition ease-in pl-2 pr-4 py-2 border border-white rounded-md flex justify-between hover:border-amber-400 hover:text-amber-400">
					<IconChevronLeft /> Return
				</div>
			</Link>
		</main>
	)
}