import { useState } from 'react'

import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'

import { Button } from './button'

interface Props {
    page: number
    totalPages: number
    onPageChange: (page: number) => void
}


export const Pagination = ({
  page: initialPage,
  totalPages,
  onPageChange
}: Props) => {
  const [page, setPage] = useState(initialPage)

  const nextPage = () => {
    const newPage = page + 1

    if (newPage > totalPages) {
      return
    }

    setPage(newPage)
    onPageChange(newPage)
  }

  const previousPage = () => {
    const newPage = page - 1

    if (newPage <= 0) {
      return
    }

    setPage(newPage)
    onPageChange(newPage)
  }

  return (
    <div className="flex flex-row justify-between gap-4 items-center">
      <Button variant="outline" disabled={page === 1} onClick={previousPage}>
        <IconChevronLeft />
      </Button>

      <span className="text-sm font-semibold">
                Page: {page} / {totalPages}
      </span>

      <Button variant="outline" disabled={page === totalPages} onClick={nextPage}>
        <IconChevronRight />
      </Button>
    </div>
  )
}
