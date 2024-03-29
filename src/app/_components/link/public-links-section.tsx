'use client'

import React from 'react'

import { IconUnlink } from '@tabler/icons-react'

import { type Link } from '@/app/_interfaces/link'
import { useModalStore } from '@/app/_store'
import { api } from '@/trpc/react'

import { AnimatedBagde } from '../ui/animated-bagde'

import { CreateTemporalLink } from './create-temporal-link'
import { LinkCard } from './link-card'

export const PublicLinksSection = () => {
  const { data: response } = api.link.getTemporalLinks.useQuery({
    search: '',
    page: 1,
    perPage: 10,
  })

  const { openModal } = useModalStore()

  const addNewLink = () => {
    openModal({
      component: CreateTemporalLink,
    })
  }

  return (
    <section className="flex flex-col w-full items-center mx-auto max-w-[300px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[850px] py-8 gap-4">
      <h2 className="text-3xl font-bold text-gray-400 sm:text-4xl md:text-5xl lg:text-6xl/none"> 
        Recently <strong className="text-amber-400">shortened</strong>
      </h2>
      <div className=" w-full flex flex-col group md:flex-row flex-wrap justify-start md:justify-center items-center gap-2">
        <AnimatedBagde role="button" onClick={addNewLink} className="transition ease-in cursor-pointer active:scale-105">
          <div className="flex gap-2 group-hover:text-amber-400 items-center">
            <IconUnlink className="transition ease-out duration-200 group-hover:text-amber-400" /> Quick short a link
          </div>
        </AnimatedBagde>
      </div>
      
      {
        response?.data?.length ? (
          <div className="flex flex-row flex-wrap gap-2 justify-center max-w-sm md:max-w-md lg:max-w-lg">
            {
              response.data.map((link) => (
                <LinkCard key={link.id} link={link as Link} />
              ))
            }
          </div>
        ): null 
      }
    </section>
  )
}
