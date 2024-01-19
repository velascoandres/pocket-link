'use client'

import { CreateUpdateLink } from '@/app/_components/link/create-update-link'
import { LinkCard } from '@/app/_components/link/link-card'
import { LinkSearchBox } from '@/app/_components/link/link-search-box'
import { Button } from '@/app/_components/ui/button'
import { Dialog } from '@/app/_components/ui/dialog'
import { type Link } from '@/app/_interfaces/link'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useModalStore } from '../_store'

const links: Link[] = [
    {
        id: 1,
        name: 'test link 2',
        path: '/g/test',
        originalLink: 'https:/google/news/sports/test',
        createdAt: new Date(),
        updatedAt: new Date('2023/04/21'),
    },
    {
        id: 1,
        name: 'test link 3',
        path: '/g/test',
        originalLink: 'https:/google/news/sports/test',
        createdAt: new Date(),
        updatedAt: new Date('2024/01/15'),
    },
    {
        id: 1,
        name: 'test link 4',
        path: '/g/test',
        originalLink: 'https:/google/news/sports/test',
        createdAt: new Date(),
        updatedAt: new Date('2023/12/15'),
    },
    {
        id: 1,
        name: 'test link 4',
        path: '/g/test',
        originalLink: 'https:/google/news/sports/test',
        createdAt: new Date(),
        updatedAt: new Date('2024/01/18 20:48:00'),
    },
    {
        id: 1,
        name: 'test link 4',
        path: '/g/test',
        originalLink: 'https:/google/news/sports/test',
        createdAt: new Date(),
        updatedAt: new Date('2024/01/18 19:58:00'),
    },
    {
        id: 1,
        name: 'test link 4',
        path: '/g/test',
        originalLink: 'https:/google/news/sports/test',
        createdAt: new Date(),
        updatedAt: new Date('2021/01/18 19:58:00'),
    }
]


const DashboardPage = () => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const { openModal } = useModalStore()

    const addNewLink = () => {
        // setSelectedLink(undefined)

        // setOpenModal(true)
        openModal({
            component: CreateUpdateLink,
        })
    }

    const updateLink = (link: Link) => {
        openModal({
            component: CreateUpdateLink,
            props: {
                link,
            }
        })
    }

    const onSearchHandler = (search: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('search', search)

        const queryParams = params.toString()

        router.push('/dashboard' + '?' + queryParams)
    }

    return (
        <main className="flex flex-col gap-4 items-center w-full">
            <section className="w-full flex flex-row  flex-wrap justify-start md:justify-center items-center gap-2">
                <LinkSearchBox onSearch={onSearchHandler} value={searchParams.get('search') ?? ''} />
                <Button variant="secondary" onClick={addNewLink}>
                    + Add new link
                </Button>
            </section>

            <section className="grid grid-cols-4 gap-4 justify-center mt-10">
                {
                    links.map((link) => (
                        <LinkCard
                            key={link.id}
                            onClick={updateLink}
                            link={link}
                        />
                    ))
                }
            </section>
        </main>
    )
}

export default DashboardPage
