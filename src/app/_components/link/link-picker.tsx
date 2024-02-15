import React, { useState } from 'react'

import { IconSearch } from '@tabler/icons-react'

import { useDebounceCallback } from '@/app/_hooks'
import { type Link } from '@/app/_interfaces/link'
import { getTinyFavicon } from '@/helpers'
import { cn } from '@/lib/utils'
import { api } from '@/trpc/react'

import { EmptyState } from '../ui/empty-state'
import { ImageWithFallback } from '../ui/image-fallback'
import { Input } from '../ui/input'
import { ShowContent } from '../ui/show-content'
import { Skeleton } from '../ui/skeleton'

interface Props {
 attachedSpace?: boolean
 selectedLink?: Link

 onLinkSelect: (link: Link | undefined) => void
}


export const LinkPicker = ({
  attachedSpace,
  selectedLink: initialLink,
  onLinkSelect
}:Props) => {
  const [selectedLink, setSelectedLink] = useState(initialLink)
  const [search, setSearch] = useState('')
  const debounce = useDebounceCallback()

  const { data: response, isLoading } = api.link.getUserLinks.useQuery({
    spaceId: attachedSpace ? undefined : null,
    page: 1,
    perPage: 10,
    search
  })

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      setSearch(evt.target.value) 
      handleSelectLink(undefined)
    })
  }


  const handleSelectLink = (link: Link | undefined) => {
    setSelectedLink(link)
    onLinkSelect(link)
  }
      

  return (
    <div className="flex flex-col items-center gap-2 justify-start w-full">
      <div className="relative w-full">
        <IconSearch className="absolute z-10 left-2 top-2" />
        <Input className="w-full pl-10" placeholder="Search links" onChange={handleInputChange} /> 
      </div>
 

      <ShowContent
        emptyState={<EmptyState title="No links were found" description="Possibly there are no links available or try changing your search" />}
        empty={!Boolean(response?.data.length)}
        loading={isLoading}
        fallback={<Skeleton className="h-[300px] w-full" />}
      >
        <h3 className="ml-2 mt-2 font-semibold text-sm self-start text-gray-400">Available links: </h3>
        <ul className="list-none w-full p-2 overflow-y-auto max-h-[300px] border border-gray-800 rounded-md">
          {response?.data.map((link) => 
            <li
              className={cn('my-1 flex flex-row justify-start items-center gap-2 transition ease-in cursor-pointer select-none px-3 py-2 hover:bg-neutral-700 border border-gray-800 rounded-md',{
                'bg-neutral-800': selectedLink?.id === link.id
              })} 
              onClick={() => handleSelectLink(link as Link)} 
              key={link.id}
            >
              <ImageWithFallback
                fallback="/404.png"
                src={getTinyFavicon(link.originalLink)} 
                width={32} 
                height={32} 
                alt={link.name}
                className="rounded-full border border-white/10 bg-white"
              /> 
              <span>{link.name}</span>
            </li>
          )}


        </ul>

      </ShowContent>



    </div>
  )
}
