'use client'

import React, { createContext, useContext } from 'react'
import NextLink from 'next/link'
import { BarChartIcon ,Split } from 'lucide-react'

import { 
  IconChartSankey, 
  IconClipboard, 
  IconDotsVertical, 
  IconEdit, 
  IconTrash 
} from '@tabler/icons-react'

import { useToast } from '@/app/_hooks'
import { type Link } from '@/app/_interfaces/link'
import { NAVIGATION } from '@/constants/navigation'
import { getDiffTime, getTinyFavicon } from '@/helpers'

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
        className="group transition-all relative ease-in border border-border hover:border-primary"
      >
        <CardHeader>
          <CardTitle className="text-base flex flex-row justify-start items-center gap-2 pt-2">
            <ImageWithFallback
              fallback="/404.png"
              src={favIcon} 
              width={32} 
              height={32} 
              alt={link.name}
              className="rounded-full border border-border bg-white select-none"
              draggable={false}
            />

            <span className="text-ellipsis line-clamp-1 text-pretty text-base">{name}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-16 flex flex-col gap-3 mb-10 flex-1">
          <div className="flex flex-row justify-start items-center gap-2 rounded-xl py-1 px-1 border border-border/45">
            <Button variant="ghost" className="rounded-md px-2" onClick={handleCopyClipboard} >
              <IconClipboard />
            </Button>
            <NextLink href={`/p/${path}`} target="_blank" prefetch={false}>
              <p className="text-gray-300 font-bold text-sm hover:underline">/p/{path}</p>
            </NextLink>
          </div>

          <NextLink href={originalLink} target="_blank">
            <span className="text-gray-400 hover:underline text-xs text-ellipsis line-clamp-1">{originalLink}</span>
          </NextLink>
          { children }
        </CardContent>
        <CardFooter className="flex flex-row justify-between items-center w-full">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="flex flex-row gap-2 justify-start items-center text-gray-400">
                <BarChartIcon /> <span className="text-base">{totalInteractions}</span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-medium text-xs">Total link interactions</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="text-gray-400 text-sm" >{dateAgo}</span>
        </CardFooter>
        {
          link.space && (
            <NextLink href={`${NAVIGATION.SPACES.path}/${link.space.id}`} 
              className="absolute font-semibold top-0 left-0 py-1 px-2 text-xs rounded-tl-md rounded-br-md text-ellipsis w-2/3" 
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
    <div className="absolute top-1 right-1 text-white">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-full px-2 bg-transparent border-none">
            <IconDotsVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-border">
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
              className="cursor-pointer flex justify-start gap-2 text-destructive"
            >
              <Split className="h-5 w-5" /> Detach
            </DropdownMenuItem>
          ) }
          <DropdownMenuItem
            onClick={() => onClickDelete(link)}
            className="cursor-pointer flex justify-start gap-2 text-destructive"
          >
            <IconTrash className="h-5 w-5" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    
  )
}