'use client'

import React from 'react'
import { Star } from 'lucide-react'

import { Footer } from '@/app/_components/ui/footer'
import { SearchBox } from '@/app/_components/ui/search-box'
import { useQueryParams } from '@/app/_hooks'



const Layout = ({ children }: {children: React.ReactNode}) => {
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
        <h1 className="text-2xl font-bold text-pretty inline-flex gap-2 items-center">
          <Star /> Favorite links
        </h1>
        <SearchBox placeholder="Search on favorites" onSearch={onSearchHandler} value={searchParams.get('search') ?? ''} />
      </header>
      <section className="flex-1 px-4 pt-20 w-full h-full">
        {children}
      </section>  
      <Footer />
    </main>
  )
}

export default Layout