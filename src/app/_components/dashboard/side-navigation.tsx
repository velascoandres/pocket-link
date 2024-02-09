'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { NAVIGATION } from '@/constants/navigation'
import { cn } from '@/lib/utils'

const menuItems = Object.values(NAVIGATION)

export const SideNavigation = () => {
  const pathname = usePathname()

  console.log(pathname)

  return (
    <aside className="fixed z-20 bg-gradient-to-br from-slate-950 to-neutral-950 backdrop-blur bottom-[10%] left-[25%] right-[25%] rounded-full border border-gray-700 md:h-[calc(100dvh-159px)] md:top-[74px] md:left-0 md:rounded-none md:backdrop-blur-none md:right-auto md:border-transparent md:border-r-gray-700">
      <nav className="flex flex-col items-center justify-center h-full py-4 px-6 md:items-start md:justify-start md:px-2">
        <ul className="inline-flex items-center gap-10 justify-center md:flex md:flex-col md:justify-start md:items-start md:w-full md:gap-5">
          {
            menuItems.map(({ name, icon: IconComponent, path }) => (
              <li 
                key={`menu-${name}`}
                className={cn('group transition ease-in relative list-none flex items-center md:w-full md:border md:border-transparent md:text-gray-400 md:hover:border-gray-700 md:px-4 md:py-2 md:rounded-xl md:hover:bg-zinc-800', {
                  'md:bg-zinc-800 md:border-gray-700 md:text-amber-400': pathname === path
                })}
              >
                <Link href={path} className=" group-hover:text-amber-400 inline-flex gap-2 items-center md:justify-start md:gap-1 md:w-full">
                  <IconComponent />
                  <span className="hidden -top-10 -left-6 bg-neutral-900 group-hover:transition ease-in  absolute group-hover:block py-1 px-2 rounded-xl border border-gray-700 md:relative md:block md:border-none md:bg-transparent md:top-0 md:left-0">{name}</span>
                </Link>
              </li>
            ))      
          }
        </ul>
      </nav>
    </aside>
  )
}
