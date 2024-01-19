import React from 'react'
import NextLink from 'next/link'

import { type Link } from '@/interfaces/link'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from '../ui/card'
import { getDiffTime } from '@/helpers'

interface Props {
  link: Link
  onClick: (link: Link) => void
}


export const LinkCard = ({
  link,
  onClick
}: Props) => {
  const { name, originalLink, path, updatedAt } = link

  const shortOriginalLink = originalLink.length <= 15
    ? originalLink
    : originalLink.slice(0, 12).concat('...')

  const shortName = name.length <= 15
    ? name
    : name.slice(0, 12).concat('...')

  const dateAgo = getDiffTime(updatedAt)

  return (
    <Card
      className="transition ease-in cursor-pointer w-[150px] md:w-[200px]"
      onClick={() => onClick(link)}
    >
      <CardHeader>
        <CardTitle>{shortName}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 font-bold text-sm">{path}</p>
        <NextLink href={originalLink}>
          <span className="text-gray-400 hover:underline text-sm">{shortOriginalLink}</span>
        </NextLink>
      </CardContent>
      <CardFooter>
        <span className="text-gray-400 text-xs" >{dateAgo}</span>
      </CardFooter>
    </Card>
  )
}
