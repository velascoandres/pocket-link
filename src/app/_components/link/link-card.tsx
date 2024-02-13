'use client'

import React, { createContext, useContext } from 'react'
import NextLink from 'next/link'
import { Split } from 'lucide-react'

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
import { NAVIGATION } from '@/constants/navigation'
import { getDiffTime, getTinyFavicon, shortText } from '@/helpers'

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

interface Props {
  link: Link
  children?: React.ReactNode
}

interface LinkCardContextType {
  link: Link
}

interface LinkCardActionsProps {
  onClickInteractions: (link: Link) => void
  onClickUpdate: (link: Link) => void
  onClickDelete: (link: Link) => void
  onClickDetach?: (link: Link) => void
}


const LinkCardContext = createContext<LinkCardContextType | null>(null)

export const LinkCard = ({
  link,
  children
}: Props) => {
  const { name, originalLink, path, updatedAt, totalInteractions } = link

  const { toast } = useToast()

  const shortOriginalLink = shortText(originalLink, 30)

  const shortName = shortText(name, 15)

  const dateAgo = getDiffTime(updatedAt)


  const favIcon = getTinyFavicon(link.originalLink)

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
    <LinkCardContext.Provider value={{ link }}>
      <Card
        className="group w-full transition relative ease-in border border-gray-800 hover:border-gray-100 hover:border"
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

            <span className="w-[150px] text-ellipsis">{shortName}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-30 flex flex-col gap-3 mb-10">
          <div className="flex flex-row justify-start items-center gap-2 rounded-xl py-1 px-1 border border-white/10">
            <Button variant="ghost" className="rounded-md px-2" onClick={handleCopyClipboard} >
              <IconClipboard />
            </Button>
            <NextLink href={`/p/${path}`} target="_blank" prefetch={false}>
              <p className="text-gray-300 font-bold text-sm hover:underline">/p/{path}</p>
            </NextLink>
          </div>

          <NextLink href={originalLink} target="_blank">
            <span className="text-gray-400 hover:underline text-sm text-ellipsis">{shortOriginalLink}</span>
          </NextLink>
          { children }
        </CardContent>
        <CardFooter className="flex flex-row justify-between items-center w-full absolute bottom-1">
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
        {
          link.space && (
            <NextLink href={`${NAVIGATION.SPACES.path}/${link.space.id}`} 
              className="transition ease-in hidden group-hover:block absolute font-semibold bottom-0 left-0 py-1 px-2 text-xs rounded-b-md text-ellipsis w-full" 
              style={{
                background: link.space.style?.background.value, 
                color: link.space.style?.textColor
              }}>
              <p>{link.space.name}</p>
            </NextLink>
          )
        }
      </Card>
    </LinkCardContext.Provider>
  )
}


export const LinkCardActions = ({
  onClickDelete,
  onClickUpdate,
  onClickDetach,
  onClickInteractions,
}: LinkCardActionsProps) => {
  
  const { link } = useContext(LinkCardContext)!


  return (
    <div className="absolute top-4 right-3 text-white">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-full px-2 base-bg">
            <IconDotsVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="base-bg border-neutral-700">
          <DropdownMenuItem
            onClick={() => onClickUpdate(link)}
            className="cursor-pointer flex justify-start gap-2"
          >
            <IconEdit className="h-5 w-5" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer flex justify-start gap-2"
            onClick={() => onClickInteractions(link)}
          >
            <IconChartSankey className="h-5 w-5" /> Analytics
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {onClickDetach && (
            <DropdownMenuItem
              onClick={() => onClickDetach(link)}
              className="cursor-pointer flex justify-start gap-2 text-red-600"
            >
              <Split className="h-5 w-5" /> Detach
            </DropdownMenuItem>
          ) }
          <DropdownMenuItem
            onClick={() => onClickDelete(link)}
            className="cursor-pointer flex justify-start gap-2 text-red-600"
          >
            <IconTrash className="h-5 w-5" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    
  )
}