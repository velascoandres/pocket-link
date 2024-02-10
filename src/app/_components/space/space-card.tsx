import React, { createContext, useContext } from 'react'
import { Link, MousePointerClick } from 'lucide-react'

import { IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react'

import { type Space } from '@/app/_interfaces/space'
import { COLORS } from '@/constants/colors'
import { shortText } from '@/helpers'

import { Button } from '../ui/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '../ui/dropdown-menu'


interface SpaceCardContextType {
  space: Omit<Space, 'createdById'>
}

interface Props {
    space: Omit<Space, 'createdById'>
    children?: React.ReactNode | React.ReactNode[]
}


interface SpaceCardStadisticsProps {
  links: number;
  interactions: number;
}
interface SpaceCardActions {
  onClickRemove: (space: Omit<Space, 'createdById'>) => void
  onClickUpdate: (space: Omit<Space, 'createdById'>) => void
}


const SpaceCardContext = createContext<SpaceCardContextType | null>(null)

export const SpaceCard = ({
  space,
  children
}: Props) => {

  const shortName = shortText(space.name, 20)
  const shortDescription = shortText(space.description ?? '', 180)

  return (
    <SpaceCardContext.Provider value={{ space }}>
      <article  
        className="relative select-none min-w-80 h-56 max-w-sm transition ease-in flex flex-col items-start gap-2 justify-start rounded-lg px-3 py-5 border-2 border-neutral-800 hover:border-white"
        style={{ background: space.style?.background.value ?? COLORS[0], color: space.style?.textColor }}  
      >
        <h3 className="text-3xl font-bold text-ellipsis">{shortName}</h3>
        <p className="text-md mb-6">{shortDescription}</p>

        {children}
      </article>
    </SpaceCardContext.Provider>
  )
}

export const SpaceCardActions = ({
  onClickRemove,
  onClickUpdate,
}: SpaceCardActions) => { 
  const { space } = useContext<SpaceCardContextType | null>(SpaceCardContext)!

  return (
    <div className="absolute top-1 right-1 text-white">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-full border-none px-2 bg-slate-800/70">
            <IconDotsVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => onClickUpdate(space)}
            className="cursor-pointer flex justify-start gap-2"
          >
            <IconEdit className="h-5 w-5" /> Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => onClickRemove(space)}
            className="cursor-pointer flex justify-start gap-2 text-red-600"
          >
            <IconTrash className="h-5 w-5" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}


export const SpaceAnalytics = ({
  interactions,
  links
}: SpaceCardStadisticsProps) => {
  return (
    <ul className="absolute [&>ul]:list-none bottom-2 mt-2 flex justify-start gap-2 bg-slate-800/70 rounded-2xl text-gray-300 text-sm p-1 px-2">
      <li className="flex justify-start items-center gap-2">
        <Link className="w-4 h-4" /> <span>{links}</span>
      </li>
      <li  className="flex justify-start items-center gap-2">
        <MousePointerClick className="w-4 h-4" /> <span>{interactions}</span>
      </li>
    </ul>
  )
}