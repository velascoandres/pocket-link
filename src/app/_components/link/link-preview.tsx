'use client'

import React, { useMemo } from 'react'
import Link from 'next/link'

import { useQuery } from '@tanstack/react-query'

import { getWebsiteMetadata } from '@/helpers'
import { cn } from '@/lib/utils'

import { ImageWithFallback } from '../ui/image-fallback'
import { Skeleton } from '../ui/skeleton'

interface Props {
    url: string
}


export const LinkPreview = ({
  url,
}: Props) => {
  const { data: metadata, isLoading } = useQuery({
    queryFn: () => getWebsiteMetadata(url),
    queryKey: ['meta', url],
  })

  const pageData = useMemo(() => {
    if (!metadata){
      return
    }

    const shortTitle = metadata.title.length > 30 ? metadata.title.substring(0, 30).concat('...'): metadata.title
    const shortDescription = metadata.description.length > 100 ? metadata.description.substring(0, 100).concat('...'): metadata.description


    return {
      title: shortTitle,
      description: shortDescription,
      image: metadata.image,
      domain: metadata.domain,
    }
  }, [metadata])


  return (
    <>
      <Skeleton 
        className={cn('block w-full h-[150px] rounded-md', {
          'hidden': !isLoading
        })} 
      />

      {
        pageData && (
          <article className="flex flex-col md:flex-row justify-start rounded-md border border-gray-800 gap-2 w-full">
            <div className="flex flex-col items-center justify-center rounded-t-md md:rounded-t-none md:rounded-tl-md md:rounded-bl-md p-2 bg-white/55">
              <ImageWithFallback
                className="w-[128px] h-[128px]"
                fallback="/404.png" 
                src={pageData.image} 
                width={128} 
                height={128} 
                alt={pageData.title}
              />
            </div>
            <div className="flex flex-col items-start gap-2 flex-1 justify-center p-2">
              <h3 className="text-2xl font-bold">{pageData.title}</h3>
              <p className="font-medium">{pageData.description}</p>
              <Link className="text-sm text-gray-400 hover:underline" href={pageData.domain} target="_blank">{pageData.domain}</Link>
            </div>
          </article>)
      }

    </>
  )
}
