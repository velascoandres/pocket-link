import React, { useState } from 'react'

import { useDebounceCallback } from '@/app/_hooks'
import { type Link } from '@/app/_interfaces/link'
import { getTinyFavicon } from '@/helpers'
import { cn } from '@/lib/utils'
import { api } from '@/trpc/react'

import { ImageWithFallback } from '../ui/image-fallback'
import { Input } from '../ui/input'

interface Props {
 attachedSpace?: boolean
 selectedLink?: Link

 onLinkSelect: (link: Link) => void
}


export const LinkPicker = ({
  attachedSpace,
  selectedLink: initialLink,
  onLinkSelect
}:Props) => {
  const [selectedLink, setSelectedLink] = useState(initialLink)
  const [search, setSearch] = useState('')
  const debounce = useDebounceCallback()

  const { data: response } = api.link.getUserLinks.useQuery({
    spaceId: attachedSpace ? undefined : null,
    page: 1,
    perPage: 10,
    search
  })

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    debounce(() => setSearch(evt.target.value))
  }


  const handleSelectLink = (link: Link) => {
    setSelectedLink(link)
    onLinkSelect(link)
  }
      

  return (
    <div className="flex flex-col items-center gap-2 justify-start w-full">

      <Input placeholder="Search links" onChange={handleInputChange} />  

      <ul className="list-none w-full p-2 overflow-y-auto max-h-[200px]">
        {response?.data.map((link) => 
          <li
            className={cn('my-1 flex flex-row justify-start items-center gap-2 transition ease-in cursor-pointer select-none px-3 py-2 hover:bg-gray-600 border border-neutral-700 rounded-md',{
              'bg-gray-600': selectedLink?.id === link.id
            })} 
            onClick={() => handleSelectLink(link)} 
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

    </div>
  )
}
