'use client'

import { CreateUpdateLink } from '@/app/_components/link/create-update-link'
import { DeleteLink } from '@/app/_components/link/delete-link'
import { LinkCard, LinkCardActions } from '@/app/_components/link/link-card'
import { LinkCardSkeleton } from '@/app/_components/link/link-card-skeleton'
import { LinkInteractions } from '@/app/_components/link/link-interactions'
import { EmptyState } from '@/app/_components/ui/empty-state'
import { ShowContent } from '@/app/_components/ui/show-content'
import { useQueryParams } from '@/app/_hooks'
import { type Link } from '@/app/_interfaces/link'
import { useModalStore } from '@/app/_store'
import { api } from '@/trpc/react'


const FavoritesPage = () => {
  const { searchParams } = useQueryParams()

  const { openModal } = useModalStore()

  const { data: response, isLoading } = api.link.getUserFavoriteLinks.useQuery({
    search: searchParams.get('search') ?? '',
  })

  const openUpdateModal = (link: Link) => {
    openModal({
      component: CreateUpdateLink,
      props: {
        link,
      }
    })
  }

  const openInteractions = (link: Link) => {
    openModal({
      component: LinkInteractions,
      props: {
        link
      }
    })
  }

  const openDeleteModal = (link: Link) => {
    openModal({
      component: DeleteLink,
      props: {
        link,
      }
    })
  }

  return (
    <div className="flex flex-col gap-8 items-center md:items-start w-full">
      <ShowContent
        empty={!response?.data?.length}
        loading={isLoading}
        fallback={<LinkCardSkeleton />} 
        emptyState={
          <div className="self-center">
            <EmptyState
              title="No links were found"
              description="Please try adding favorites or change your search parameters"
            />
          </div>
        }
      >
        <section className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 justify-start mt-10 w-full">
          {
            response?.data.map((link) => (
              <LinkCard
                key={link.id}
                link={link as Link}
              >
                <LinkCardActions
                  onClickInteractions={openInteractions}
                  onClickUpdate={openUpdateModal} 
                  onClickDelete={openDeleteModal}
                />
              </LinkCard>
            ))
          }
        </section>
      </ShowContent>
    </div>
  )
}

export default FavoritesPage
