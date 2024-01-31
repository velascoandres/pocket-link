'use client'

import React from 'react'

import { IconUnlink } from '@tabler/icons-react'

import { useModalStore } from '@/app/_store'
import { api } from '@/trpc/react'

import { Button } from '../ui/button'

import { CreateUpdateLink } from './create-update-link'
import { LinkCard } from './link-card'

export const PublicLinksSection = () => {
  const { data: response } = api.link.getTemporalLinks.useQuery({
    search: '',
    page: 1,
    perPage: 20,
  })

  const { openModal } = useModalStore()

  const addNewLink = () => {
    openModal({
      component: CreateUpdateLink,
      props: {
        isTemporal: true,
      }
    })
  }

  return (
    <section className="flex flex-col w-full items-center mx-auto max-w-[300px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[850px] py-8 gap-4">
      <h3 className="text-4xl font-bold text-gray-400"> 
        Recently <strong className="text-amber-400">shortened</strong>
      </h3>
      <div className=" w-full flex flex-col md:flex-row flex-wrap justify-start md:justify-center items-center gap-2">
        {/* <LinkSearchBox onSearch={onSearchHandler} value={searchParams.get('search') ?? ''} /> */}
        <Button variant="secondary" onClick={addNewLink} className="border border-white flex gap-2">
          <IconUnlink /> Quick short a link
        </Button>
      </div>
      
      {
        response?.data?.length ? (
          <div className="self-start flex flex-row flex-wrap gap-2 justify-start">
            {
              response.data.map((link) => (
                <LinkCard key={link.id} link={link} showPublic />
              ))
            }
          </div>
        ): null 
      }
    </section>
  )
}
