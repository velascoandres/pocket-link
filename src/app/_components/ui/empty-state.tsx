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
    <div className="flex flex-col gap-2 items-center justify-between select-none">
      <Image
        src={IMAGES.EMPTY_STATE}
        alt={title}
        width={300}
        height={300}
        className="w-[200px] md:w-[250px] lg:w-[270px]"
        draggable={false}
      />

      <h2 className="text-2xl md:text-4xl font-bold text-amber-400">
        {title}
      </h2>
      <p className="text-gray-300 font-semibold text-base md:text-lg text-center">
        {description}
      </p>
    </div>
  )
}
