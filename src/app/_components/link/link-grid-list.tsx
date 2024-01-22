import React from 'react'

import { type Link } from '@/app/_interfaces/link'

import { LinkCard } from './link-card'

interface Props {
	links: Link[]
}


export const LinkGridList = ({
  links,
}: Props) => {

  return (
    <section className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center mt-10">
      {
        links.map((link) => (
          <LinkCard
            key={link.id}
            link={link}
          />
        ))
      }
    </section>
  )
}
