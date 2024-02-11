'use client'

import { ManagementPageLayout } from '@/app/_components/dashboard/management-page-layout'
import { CreateUpdateLink } from '@/app/_components/link/create-update-link'
import { LinkCardSkeleton } from '@/app/_components/link/link-card-skeleton'
import { LinkGridList } from '@/app/_components/link/link-grid-list'
import { EmptyState } from '@/app/_components/ui/empty-state'
import { Pagination } from '@/app/_components/ui/pagination'
import { ShowContent } from '@/app/_components/ui/show-content'
import { useQueryParams } from '@/app/_hooks'
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

  return (
    <ManagementPageLayout
      title="Links"
      addLabel="Add new link"
      onAddClick={addNewLink}
    >
      <div className="flex flex-col gap-8 items-center w-full">
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
          <LinkGridList links={response?.data ?? []} />
          <Pagination
            page={page}
            totalPages={response?.totalPages ?? 0}
            onPageChange={onPageChange}
          />
        </ShowContent>
      </div>
    </ManagementPageLayout>
    
  )
}

export default DashboardPage
