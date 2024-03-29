'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { NAVIGATION } from '@/constants/navigation'
import { cn } from '@/lib/utils'

import { ProfileCard } from '../auth/profile-card'
import { ProfileMenu } from '../auth/profile-menu'

const menuItems = Object.values(NAVIGATION)

export const SideNavigation = () => {
  const pathname = usePathname()

  return (
    <aside className="md:py-4 bottom-2 md:w-[200px] fixed z-20 bg-gradient-to-br from-slate-950 to-neutral-950 backdrop-blur left-[15%] right-[15%] rounded-full border border-gray-800 md:min-h-screen md:left-0 md:rounded-none md:backdrop-blur-none md:right-auto md:border-transparent md:border-r-gray-800">
      <Link href="/" className="hidden md:block md:mb-5 px-6 text-2xl font-semibold whitespace-nowrap text-white">
        <strong className="text-amber-400">Pocket</strong> <strong className="text-gray-400">link</strong>
      </Link>

      <div className="hidden md:px-2 md:block">
        <ProfileCard />
      </div>
      <nav className="flex flex-col items-center justify-center h-full py-4 px-6 md:items-start md:justify-start md:px-2">
        
        <ul className="inline-flex items-center gap-10 justify-center md:flex md:flex-col md:justify-start md:items-start md:w-full md:gap-5">
          {
            menuItems.map(({ name, icon: IconComponent, path }) => (
              <li 
                key={`menu-${name}`}
                className={cn('group transition ease-in relative list-none flex items-center md:w-full md:border md:border-transparent md:text-gray-400 md:hover:border-gray-700 md:px-4 md:py-2 md:rounded-xl md:hover:bg-zinc-800', {
                  'border-gray-800 md:text-amber-400': pathname === path 
                })}
              >
                <Link href={path} className=" group-hover:text-amber-400 inline-flex gap-2 items-center md:justify-start md:gap-1 md:w-full">
                  <IconComponent />
                  <span className="hidden -top-10 -left-6 bg-neutral-900 group-hover:transition ease-in  absolute group-hover:block py-1 px-2 rounded-xl border border-gray-700 md:relative md:block md:border-none md:bg-transparent md:top-0 md:left-0">{name}</span>
                </Link>
              </li>
            ))      
          }
          <li className="block md:hidden">
            <ProfileMenu />
          </li>
        </ul>
      </nav>
    </aside>
  )
}
