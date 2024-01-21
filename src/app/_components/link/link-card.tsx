import React from 'react'
import NextLink from 'next/link'

import { type Link } from '@/app/_interfaces/link'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from '../ui/card'
import { getDiffTime } from '@/helpers'
import { Button } from '../ui/button'
import { IconCopy, IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { useModalStore } from '@/app/_store'
import { CreateUpdateLink } from './create-update-link'
import { useToast } from '@/app/_hooks'
import { DeleteLink } from './delete-link'

interface Props {
  link: Link
}


export const LinkCard = ({
  link,
}: Props) => {
  const { name, originalLink, path, updatedAt } = link

  const { openModal } = useModalStore()

  const { toast } = useToast()

  const shortOriginalLink = originalLink.length <= 30
    ? originalLink
    : originalLink.slice(0, 30).concat('...')

  const shortName = name.length <= 20
    ? name
    : name.slice(0, 20).concat('...')

  const dateAgo = getDiffTime(updatedAt)


  const openUpdateModal = () => {
    openModal({
      component: CreateUpdateLink,
      props: {
        link,
      }
    })
  }

  const openDeleteModal = () => {
    openModal({
      component: DeleteLink,
      props: {
        link,
      }
    })
  }

  const handleCopyClipboard = () => {
    void navigator.clipboard.writeText(link.path)
    
    toast({
      title: 'Link copied to clipboard',
      description: `Copied for: ${link.name}`,
      duration: 2000,
    })
  }

  return (
    <Card
      className="transition relative ease-in cursor-pointer border border-gray-800 hover:border-gray-100 hover:border"
    >
      <CardHeader>
        <CardTitle className="text-base flex flex-row justify-start items-center gap-2">
          <Button variant="ghost" className="rounded-md px-2" onClick={handleCopyClipboard} >
            <IconCopy />
          </Button>

          <span className="w-[150px]">{shortName}</span>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline" className="rounded-full px-2">
                <IconDotsVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={openUpdateModal}
                className="cursor-pointer flex justify-start gap-2"
              >
                <IconEdit className="h-5 w-5" /> Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={openDeleteModal}
                className="cursor-pointer flex justify-start gap-2 text-red-600"
              >
                <IconTrash className="h-5 w-5" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 font-bold text-sm">{path}</p>
        <NextLink href={originalLink} target="_blank">
          <span className="text-gray-400 hover:underline text-sm">{shortOriginalLink}</span>
        </NextLink>
      </CardContent>
      <CardFooter>
        <span className="text-gray-400 text-xs" >{dateAgo}</span>
      </CardFooter>
    </Card>
  )
}
