'use client'

import React from 'react'

import { IconUnlink } from '@tabler/icons-react'

import { useModalStore } from '@/app/_store'
import { api } from '@/trpc/react'

import { Button } from '../ui/button'

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
      <div className=" w-full flex flex-col md:flex-row flex-wrap justify-start md:justify-center items-center gap-2">
        <Button variant="secondary" onClick={addNewLink} className="border border-white flex gap-2">
          <IconUnlink /> Quick short a link
        </Button>
      </div>
      
      {
        response?.data?.length ? (
          <div className="flex flex-row flex-wrap gap-2 justify-center">
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
