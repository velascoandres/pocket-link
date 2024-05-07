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
    <section className="flex flex-col w-full items-center mx-auto py-8 gap-4 flex-1">
      <h2 className="text-3xl font-bold text-gray-400 sm:text-2xl md:text-3xl lg:text-4xl/none"> 
        Recently <strong className="text-primary">shortened</strong>
      </h2>
      <div className="w-full flex flex-col group md:flex-row flex-wrap justify-start md:justify-center items-center gap-2">
        <AnimatedBagde role="button" onClick={addNewLink} className="transition ease-in cursor-pointer active:scale-105 p-[1px]">
          <div className="flex gap-2 group-hover:text-primary items-center">
            <IconUnlink className="transition ease-out duration-200 group-hover:text-primary" /> Quick short a link
          </div>
        </AnimatedBagde>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 justify-center px-8">
        {
          response?.data?.length ? (
            response.data.map((link) => (
              <LinkCard key={link.id} link={link as Link} />
            ))
          ): null 
        }
      </div>
    </section>
  )
}
