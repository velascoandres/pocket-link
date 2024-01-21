import React from 'react'
import Image from 'next/image'
import { IMAGES } from '@/constants/images'


interface Props {
	title: string
	description: string
}


export const EmptyState = ({
	title,
	description,
}: Props) => {
	return (
		<div className="flex flex-col gap-2 items-center justify-between">
			<Image
				src={IMAGES.EMPTY_STATE}
				alt={title}
				width={300}
				height={300}
			/>

			<h2 className="text-lg font-bold text-white">{title}</h2>
			<p className="text-gray-300 font-semibold">{description}</p>
		</div>
	)
}