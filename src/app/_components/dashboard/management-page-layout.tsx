'use client'

import React from 'react'

import { IconPlus } from '@tabler/icons-react'

import { useQueryParams } from '@/app/_hooks'

import { Button } from '../ui/button'
import { Footer } from '../ui/footer'
import { SearchBox } from '../ui/search-box'

interface Props {
    title: string
    searchPlaceholder?: string
    children: React.ReactNode
    addLabel: string
    onAddClick: () => void
}

export const ManagementPageLayout = ({
  title, 
  searchPlaceholder = 'Search',
  children,
  addLabel,
  onAddClick,
}: Props) => {
  const { searchParams, setParam, removeParam } = useQueryParams()


  const onSearchHandler = (search: string) => {
    if (search) {
      setParam('search', search)
    } else {
      removeParam('search')
    }
  }


  return (
    <main className="overflow-y-auto py-2 flex flex-col items-start min-h-screen">
      <header className="px-4 py-2 z-10 fixed top-0 w-full flex flex-row flex-wrap items-center border border-transparent border-b-border gap-2">
        <h1 className="text-2xl font-bold text-pretty">{title}</h1>
        <div className="w-2/3 flex flex-col md:flex-row flex-wrap justify-start md:justify-center items-center gap-2">
          <SearchBox placeholder={searchPlaceholder} onSearch={onSearchHandler} value={searchParams.get('search') ?? ''} />
          <Button variant="outline" onClick={onAddClick} className="hidden z-0 p-2 px-4 w-auto md:flex flex-row gap-2 justify-center items-center rounded-md">
            <IconPlus className="w-auto md:h-auto" /> <span className="hidden md:block">{addLabel}</span>
          </Button>
        </div>
      </header>
      <section className="flex-1 px-4 pt-20 w-full h-full">
        {children}
      </section>  
      <Footer />
      <Button variant="secondary" onClick={onAddClick} className="bg-background md:hidden fixed bottom-24 right-4 border border-border z-10 p-2 py-8 flex flex-row justify-center items-center rounded-full">
        <IconPlus className="w-12 h-12 md:hidden" /> <span className="hidden md:block">{addLabel}</span>
      </Button>
    </main>
  )
}
