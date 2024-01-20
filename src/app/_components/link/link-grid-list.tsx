import React from 'react'
import { LinkCard } from './link-card'
import { type Link } from '@/app/_interfaces/link'

interface Props {
	links: Link[]
	onClickUpdate: (link: Link) => void
	onClickDelete?: (link: Link) => void
}


export const LinkGridList = ({
	links,
	onClickUpdate,
}: Props) => {

	return (
		<section className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center mt-10">
			{
				links.map((link) => (
					<LinkCard
						key={link.id}
						onClick={onClickUpdate}
						link={link}
					/>
				))
			}
		</section>
	)
}
