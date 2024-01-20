'use client'

import { CreateUpdateLink } from '@/app/_components/link/create-update-link'
import { LinkSearchBox } from '@/app/_components/link/link-search-box'
import { Button } from '@/app/_components/ui/button'
import { type Link } from '@/app/_interfaces/link'
import { useModalStore } from '../_store'
import { LinkGridList } from '../_components/link/link-grid-list'
import { useQueryParams } from '../_hooks'
import { Pagination } from '../_components/ui/pagination'
import { api } from '@/trpc/react'
import { EmptyState } from '../_components/ui/empty-state'
import { Skeleton } from '../_components/ui/skeleton'
import { LinkCardSkeleton } from '../_components/link/link-card-skeleton'

const DashboardPage = () => {
	const { searchParams, setParam, removeParam } = useQueryParams()

	const { openModal } = useModalStore()

	const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1


	const { data: response, isLoading } = api.link.getUserLinks.useQuery({
		search: searchParams.get('search') ?? '',
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

	const handleUpdate = (link: Link) => {
		openModal({
			component: CreateUpdateLink,
			props: {
				link,
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

	const getContent = () => {
		if (isLoading) {
			return <LinkCardSkeleton />
		}

		if (!response?.data?.length) {
			return <EmptyState
				title="No links were found"
				description="Please start adding links or try changes with a different search"
			/>
		}


		return (
			<>
				<LinkGridList
					links={response.data} onClickUpdate={handleUpdate} />
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
			<section className="w-full flex flex-row  flex-wrap justify-start md:justify-center items-center gap-2">
				<LinkSearchBox onSearch={onSearchHandler} value={searchParams.get('search') ?? ''} />
				<Button variant="secondary" onClick={addNewLink}>
					+ Add new link
				</Button>
			</section>
			{getContent()}
		</main>
	)
}

export default DashboardPage
