'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { IconPlus } from '@tabler/icons-react'

import { LinkCardSkeleton } from '@/app/_components/link/link-card-skeleton'
import { CreateUpdateSpace } from '@/app/_components/space/create-update-space'
import { DeleteSpace } from '@/app/_components/space/delete-space'
import { SpaceAnalytics, SpaceCard, SpaceCardActions } from '@/app/_components/space/space-card'
import { Button } from '@/app/_components/ui/button'
import { EmptyState } from '@/app/_components/ui/empty-state'
import { Pagination } from '@/app/_components/ui/pagination'
import { SearchBox } from '@/app/_components/ui/search-box'
import { ShowContent } from '@/app/_components/ui/show-content'
import { useQueryParams } from '@/app/_hooks'
import { type Space, type Style } from '@/app/_interfaces/space'
import { useModalStore } from '@/app/_store'
import { NAVIGATION } from '@/constants/navigation'
import { api } from '@/trpc/react'


const SpacePage = () => {
  const { searchParams, setParam, removeParam } = useQueryParams()

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

  const onSearchHandler = (search: string) => {
    if (search) {
      setParam('search', search)
    } else {
      removeParam('search')
    }
  }

  return (
    <main className="flex flex-col gap-8 items-center w-full">
      <section className="w-full flex flex-col md:flex-row flex-wrap justify-start md:justify-center items-center gap-2">
        <SearchBox placeholder="Search your spaces" onSearch={onSearchHandler} value={searchParams.get('search') ?? ''} />
        <Button variant="secondary" onClick={openCreateSpaceModal} className="fixed md:relative bottom-32 right-4 md:bottom-0 md:right-0 border border-white md:border-none z-10 md:z-0  p-2 py-8 md:p-0 md:px-4 md:w-auto flex flex-row md:gap-2 justify-center items-center rounded-full md:rounded-md">
          <IconPlus className="w-12 h-12 md:w-auto md:h-auto" /> <span className="hidden md:block">Add new space</span>
        </Button>
      </section>
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
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
          {response?.data.map((space) => (
            <SpaceCard 
              key={`${space.id}-item`} 
              space={{
                ...space,
                description: space.description ?? '',
                style: space.style as Style
              }} 
            >
              <Link href={`${NAVIGATION.SPACES.path}/${space.id}`} className="absolute top-1 right-12 text p-2 text-blue-400 rounded-full bg-slate-800/60">
                <ArrowUpRight />
              </Link>
              <SpaceCardActions 
                onClickUpdate={openUpdateSpaceModal} 
                onClickRemove={openDeleteSpaceModal} 
              />
              <SpaceAnalytics interactions={20} links={15} />
            </SpaceCard>
          ))}
        </div>
        <Pagination
          page={page}
          totalPages={response?.totalPages ?? 0}
          onPageChange={onPageChange}
        />
      </ShowContent>
    </main>
  )
}

export default SpacePage
