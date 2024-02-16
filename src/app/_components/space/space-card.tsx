import React, { createContext, useContext } from 'react'
import { Link, MousePointerClick } from 'lucide-react'

import { IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react'

import { type Space } from '@/app/_interfaces/space'
import { COLORS } from '@/constants/colors'

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
    renderTitle?: (space: Space) => React.ReactNode
    children?: React.ReactNode | React.ReactNode[]
}

interface SpaceCardActions {
  onClickRemove: (space: Omit<Space, 'createdById'>) => void
  onClickUpdate: (space: Omit<Space, 'createdById'>) => void
}


const SpaceCardContext = createContext<SpaceCardContextType | null>(null)

export const SpaceCard = ({
  space,
  children,
  renderTitle,
}: Props) => {

  return (
    <SpaceCardContext.Provider value={{ space }}>
      <article  
        className="overflow-hidden transition ease-in group relative select-none h-56 flex flex-col items-start gap-2 justify-start rounded-lg px-3 py-5 border border-gray-800 hover:border-white"
        style={{ background: space.style?.background.value ?? COLORS[0], color: space.style?.textColor }}  
      >
        <header>
          {
            renderTitle ? renderTitle(space) : <h3 className="text-3xl font-bold max-w-[200px] text-ellipsis">{space.name}</h3>
          }

        </header>

        <p className="text-md whitespace-normal truncate overflow-ellipsis mb-4">
          {space.description}
        </p>

        {children}

        <footer className="absolute bottom-1 left-1">
          <ul className="flex list-none justify-start gap-2 rounded-2xl text-sm p-1 px-2" style={{
            color: space.style?.textColor,
          }}>
            <li className="flex justify-start items-center gap-2">
              <Link className="w-4 h-4" /> <span>{space.totalLinks}</span>
            </li>
            <li  className="flex justify-start items-center gap-2">
              <MousePointerClick className="w-4 h-4" /> <span>{space.totalInteractions}</span>
            </li>
          </ul>
        </footer>
        
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
          <Button variant="outline" className="rounded-full border-none px-2 bg-transparent hover:bg-gray-800/50" style={{
            color: space.style?.textColor
          }}>
            <IconDotsVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="base-bg border-gray-800">
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
