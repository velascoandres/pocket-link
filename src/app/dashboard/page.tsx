'use client'

import { CreateUpdateLink } from '@/components/link/create-update-link'
import { LinkCard } from '@/components/link/link-card'
import { LinkSearchBox } from '@/components/link/link-search-box'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { type Link } from '@/interfaces/link'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'

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

    const [selectedLink, setSelectedLink] = useState<Link | undefined>(undefined)
    const [openModal, setOpenModal] = useState(false)

    const addNewLink = () => {
        setSelectedLink(undefined)

        setOpenModal(true)
    }

    const updateLink = (link: Link) => {
        setSelectedLink(link)

        setOpenModal(true)
    }

    const onSearchHandler = (search: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('search', search)

        const queryParams = params.toString()

        router.push('/dashboard' + '?' + queryParams)
    }

    const handleOpenChange = (open: boolean) => {
        setOpenModal(open)

        if (!open) {
            setSelectedLink(undefined)
        }
    }

    return (
        <main className="flex flex-col gap-4 items-start w-full">
            <section className="w-full flex flex-row  flex-wrap justify-start md:justify-center items-center gap-2">
                <LinkSearchBox onSearch={onSearchHandler} value={searchParams.get('search') ?? ''} />
                <Button variant="secondary" onClick={addNewLink}>
                    + Add new link
                </Button>
            </section>

            <section className="flex flex-row flex-wrap gap-4 justify-center mt-10">
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
            <Dialog open={openModal} onOpenChange={handleOpenChange}>
                <CreateUpdateLink key={selectedLink?.id} link={selectedLink} />
            </Dialog>
        </main>
    )
}

export default DashboardPage
