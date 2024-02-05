'use client'

import React from 'react'
import NextLink from 'next/link'

import { 
  IconChartSankey, 
  IconClipboard, 
  IconDotsVertical, 
  IconEdit, 
  IconEye, 
  IconTrash 
} from '@tabler/icons-react'

import { useToast } from '@/app/_hooks'
import { type Link } from '@/app/_interfaces/link'
import { useModalStore } from '@/app/_store'
import { getDiffTime } from '@/helpers'

import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '../ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { ImageWithFallback } from '../ui/image-fallback'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

import { CreateUpdateLink } from './create-update-link'
import { DeleteLink } from './delete-link'
import { LinkInteractions } from './link-interactions'

interface Props {
  link: Link
  showPublic?: boolean
}


export const LinkCard = ({
  link,
  showPublic = false
}: Props) => {
  const { name, originalLink, path, updatedAt, totalInteractions } = link

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

  const openInteractions = () => {
    openModal({
      component: LinkInteractions,
      props: {
        link
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

  const favIcon = `https://www.google.com/s2/favicons?domain=${link.originalLink}&sz=${32}`

  const handleCopyClipboard = () => {
    const domain = window.location.origin
    const completeLink = `${domain}/p/${link.path}`

    void navigator.clipboard.writeText(completeLink)

    toast({
      title: '✅ Link copied to clipboard',
      description: completeLink,
      duration: 2000,
    })
  }

  return (
    <Card
      className="transition relative ease-in border border-gray-800 hover:border-gray-100 hover:border"
    >
      <CardHeader>
        <CardTitle className="text-base flex flex-row justify-start items-center gap-2">
          <ImageWithFallback
            fallback="/404.png"
            src={favIcon} 
            width={32} 
            height={32} 
            alt={link.name}
            className="rounded-full border border-white/10 bg-white"
          />

          <span className="w-[150px]">{shortName}</span>

          {
            !showPublic && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
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
                  <DropdownMenuItem
                    className="cursor-pointer flex justify-start gap-2"
                    onClick={openInteractions}
                  >
                    <IconChartSankey className="h-5 w-5" /> Analytics
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
            )
          }
        </CardTitle>
      </CardHeader>
      <CardContent className="h-30 flex flex-col gap-3">
        <div className="flex flex-row justify-start items-center gap-2 rounded-xl py-1 px-1 border border-white/10">
          <Button variant="ghost" className="rounded-md px-2" onClick={handleCopyClipboard} >
            <IconClipboard />
          </Button>
          <NextLink href={`/p/${path}`} target="_blank" prefetch={false}>
            <p className="text-gray-300 font-bold text-sm hover:underline">/p/{path}</p>
          </NextLink>
        </div>

        <NextLink href={originalLink} target="_blank">
          <span className="text-gray-400 hover:underline text-sm">{shortOriginalLink}</span>
        </NextLink>
      </CardContent>
      <CardFooter className="flex flex-row justify-between items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="flex flex-row gap-2 justify-start items-center text-gray-400">
              <IconEye /> <span className="text-sm">{totalInteractions}</span>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-medium">Total link interactions</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span className="text-gray-400 text-sm" >{dateAgo}</span>
      </CardFooter>
    </Card>
  )
}
