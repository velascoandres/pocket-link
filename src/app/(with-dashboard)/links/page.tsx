'use client'

import { ManagementPageLayout } from '@/app/_components/dashboard/management-page-layout'
import { CreateUpdateLink } from '@/app/_components/link/create-update-link'
import { DeleteLink } from '@/app/_components/link/delete-link'
import { LinkCard, LinkCardActions } from '@/app/_components/link/link-card'
import { LinkCardSkeleton } from '@/app/_components/link/link-card-skeleton'
import { LinkInteractions } from '@/app/_components/link/link-interactions'
import { EmptyState } from '@/app/_components/ui/empty-state'
import { Pagination } from '@/app/_components/ui/pagination'
import { ShowContent } from '@/app/_components/ui/show-content'
import { useQueryParams } from '@/app/_hooks'
import { type Link } from '@/app/_interfaces/link'
import { useModalStore } from '@/app/_store'
import { api } from '@/trpc/react'


const DashboardPage = () => {
  const { searchParams, setParam } = useQueryParams()

  const { openModal } = useModalStore()

  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1

  const { data: response, isLoading } = api.link.getUserLinks.useQuery({
    search: searchParams.get('search') ?? '',
    page: Number(searchParams.get('page') ?? 1),
    perPage: 10
  })

  const onPageChange = (newPage: number) => {
    setParam('page', newPage.toString())
  }

  const addNewLink = () => {
    openModal({
      component: CreateUpdateLink,
    })
  }

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
    <ManagementPageLayout
      title="Links"
      addLabel="Add new link"
      onAddClick={addNewLink}
    >
      <div className="flex flex-col gap-8 items-center md:items-start w-full">
        <ShowContent
          empty={!response?.data?.length}
          loading={isLoading}
          fallback={<LinkCardSkeleton />} 
          emptyState={
            <EmptyState
              title="No links were found"
              description="Please try adding new links or change your search parameters"
            />
          }
        >
          <section className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 justify-start mt-10">
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
          <div className="self-center">
            <Pagination
              page={page}
              totalPages={response?.totalPages ?? 0}
              onPageChange={onPageChange}
            />
          </div>
          
        </ShowContent>
      </div>
    </ManagementPageLayout>
    
  )
}

export default DashboardPage
