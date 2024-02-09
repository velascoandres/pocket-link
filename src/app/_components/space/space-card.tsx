import React from 'react'

import { type Space } from '@/app/_interfaces/space'
import { COLORS } from '@/constants/colors'

interface Props {
    space: Omit<Space, 'createdById'>
}

export const SpaceCard = ({
  space
}: Props) => {
  console.log(space)  

  return (
    <article  
      className="min-h-40 min-w-80 hover:scale-105 transition ease-in max-w-sm flex flex-col items-start gap-2 justify-start rounded-lg px-3 py-5 border-2 border-gray-700 hover:border-amber-400"
      style={{ background: space.style?.background.value ?? COLORS[0], color: space.style?.textColor }}  
    >
      <h3 className="text-3xl font-bold">{space.name}</h3>
      <p className="text-">{space.description}</p>
    </article>
  )
}
