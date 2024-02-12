'use client'

import React from 'react'

import { ManagementPageLayout } from '@/app/_components/dashboard/management-page-layout'
import { CreateUpdateLink } from '@/app/_components/link/create-update-link'
import { DeleteLink } from '@/app/_components/link/delete-link'
import { LinkCard, LinkCardActions } from '@/app/_components/link/link-card'
import { LinkCardSkeleton } from '@/app/_components/link/link-card-skeleton'
import { LinkInteractions } from '@/app/_components/link/link-interactions'
import { AttachLinkSpace } from '@/app/_components/space/attach-link-space'
import { DetachLinkSpace } from '@/app/_components/space/detach-link-space'
import { EmptyState } from '@/app/_components/ui/empty-state'
import { Pagination } from '@/app/_components/ui/pagination'
import { ShowContent } from '@/app/_components/ui/show-content'
import { useQueryParams } from '@/app/_hooks'
import { type Link } from '@/app/_interfaces/link'
import { useModalStore } from '@/app/_store'
import { api } from '@/trpc/react'

const SpaceLinkPage = ({ params }: {params: {id: string}}) => {
  
  const { openModal } = useModalStore()
  const { searchParams, setParam } = useQueryParams()
  const spaceId = Number(params.id)
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1


  const { data: currentSpace } = api.space.searchSpaceById.useQuery({
    id: spaceId
  })

  const { data: response, isLoading } = api.link.getUserLinks.useQuery({
    search: searchParams.get('search') ?? '',
    page: Number(searchParams.get('page') ?? 1),
    spaceId,
    perPage: 10
  })

  const onPageChange = (newPage: number) => {
    setParam('page', newPage.toString())
  }

  const openAttachModal = () => {
    openModal({
      component: AttachLinkSpace,
      props: {
        space: currentSpace
      }
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

  const openDetachModal = (link: Link) => {
    openModal({
      component: DetachLinkSpace,
      props: {
        link,
        space: currentSpace
      }
    })
  }

  return (
    <ManagementPageLayout 
      title={`${currentSpace?.name}`}  
      addLabel="Attach link" 
      onAddClick={openAttachModal}
    >
      <div className="flex flex-col gap-8 items-center w-full">
        <ShowContent
          empty={!response?.data?.length}
          loading={isLoading}
          fallback={<LinkCardSkeleton />} 
          emptyState={
            <EmptyState
              title="No links were found for this spaces"
              description="Please try attaching links or change your search parameters"
            />
          }
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {response?.data.map((link) => (
              <LinkCard 
                key={`${link.id}-item`} 
                link={link}
              >
                <LinkCardActions
                  onClickInteractions={openInteractions}
                  onClickUpdate={openUpdateModal} 
                  onClickDelete={openDeleteModal}
                  onClickDetach={openDetachModal}
                />
              </LinkCard>
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

export default SpaceLinkPage