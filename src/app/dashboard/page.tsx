'use client'

import { IconPlus } from '@tabler/icons-react'

import { CreateUpdateLink } from '@/app/_components/link/create-update-link'
import { LinkCardSkeleton } from '@/app/_components/link/link-card-skeleton'
import { LinkGridList } from '@/app/_components/link/link-grid-list'
import { LinkSearchBox } from '@/app/_components/link/link-search-box'
import { Button } from '@/app/_components/ui/button'
import { EmptyState } from '@/app/_components/ui/empty-state'
import { Pagination } from '@/app/_components/ui/pagination'
import { useQueryParams } from '@/app/_hooks'
import { useModalStore } from '@/app/_store'
import { api } from '@/trpc/react'


const DashboardPage = () => {
  const { searchParams, setParam, removeParam } = useQueryParams()

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

  const onSearchHandler = (search: string) => {
    if (search) {
      setParam('search', search)
    } else {
      removeParam('search')
    }
  }

  const getContent = () => {
    if (isLoading) {
      return <LinkCardSkeleton />
    }

    if (!response?.data?.length) {
      return <EmptyState
        title="No links were found"
        description="Please try adding new links or change your search parameters"
      />
    }


    return (
      <>
        <LinkGridList links={response.data} />
        <Pagination
          page={page}
          totalPages={response?.totalPages ?? 0}
          onPageChange={onPageChange}
        />
      </>
    )
  }

  return (
    <main className="flex flex-col gap-8 items-center w-full">
      <section className="w-full flex flex-col md:flex-row flex-wrap justify-start md:justify-center items-center gap-2">
        <LinkSearchBox onSearch={onSearchHandler} value={searchParams.get('search') ?? ''} />
        <Button variant="secondary" onClick={addNewLink} className="fixed bottom-32 border border-white md:border-none z-10 right-4 md:relative p-2 py-8 md:p-0 md:px-4 md:w-auto flex flex-row md:gap-2 justify-center items-center rounded-full md:rounded-md">
          <IconPlus className="w-12 h-12 md:w-auto md:h-auto" /> <span className="hidden md:block">Add new link</span>
        </Button>
      </section>
      {getContent()}
    </main>
  )
}

export default DashboardPage
