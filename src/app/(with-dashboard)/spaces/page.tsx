'use client'

import Link from 'next/link'

import { ManagementPageLayout } from '@/app/_components/dashboard/management-page-layout'
import { LinkCardSkeleton } from '@/app/_components/link/link-card-skeleton'
import { CreateUpdateSpace } from '@/app/_components/space/create-update-space'
import { DeleteSpace } from '@/app/_components/space/delete-space'
import { SpaceCard, SpaceCardActions } from '@/app/_components/space/space-card'
import { EmptyState } from '@/app/_components/ui/empty-state'
import { Pagination } from '@/app/_components/ui/pagination'
import { ShowContent } from '@/app/_components/ui/show-content'
import { useQueryParams } from '@/app/_hooks'
import { type Space, type Style } from '@/app/_interfaces/space'
import { useModalStore } from '@/app/_store'
import { NAVIGATION } from '@/constants/navigation'
import { api } from '@/trpc/react'


const SpacePage = () => {
  const { searchParams, setParam } = useQueryParams()

  const { openModal } = useModalStore()

  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1

  const { data: response, isLoading } = api.space.searchSpace.useQuery({
    search: searchParams.get('search') ?? '',
    page: Number(searchParams.get('page') ?? 1),
    perPage: 10
  })

  const onPageChange = (newPage: number) => {
    setParam('page', newPage.toString())
  }

  const openCreateSpaceModal = () => {
    openModal({
      component: CreateUpdateSpace,
    })
  }

  const openUpdateSpaceModal = (space: Space) => {
    openModal({
      component: CreateUpdateSpace,
      props: {
        space,
      }
    })
  }

  const openDeleteSpaceModal = (space: Space) => {
    openModal({
      component: DeleteSpace,
      props: {
        space,
      }
    })
  }

  return (
    <ManagementPageLayout
      title="Spaces"
      addLabel="Add new space"
      onAddClick={openCreateSpaceModal}
    >
      <div className="flex flex-col gap-8 items-center w-full">
        <ShowContent
          empty={!response?.data?.length}
          loading={isLoading}
          fallback={<LinkCardSkeleton />} 
          emptyState={
            <EmptyState
              title="No spaces were found"
              description="Please try adding new spaces or change your search parameters"
            />
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-4 w-full">
            {response?.data.map((space) => (
              <SpaceCard 
                key={`${space.id}-item`} 
                space={{
                  ...space,
                  description: space.description ?? '',
                  style: space.style as Style
                }}
                renderTitle={() => (
                  <Link href={`${NAVIGATION.SPACES.path}/${space.id}`} className="hover:underline">             
                    <h3 className="text-3xl font-bold max-w-[200px] text-ellipsis">{space.name}</h3>
                  </Link>
                )} 
              >
                <SpaceCardActions 
                  onClickUpdate={openUpdateSpaceModal} 
                  onClickRemove={openDeleteSpaceModal} 
                />
              </SpaceCard>
            ))}
          </div>
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

export default SpacePage
