'use'

import React from 'react'

import { Skeleton } from '../ui/skeleton'

export const LinkCardSkeleton = () => {
  return (
    <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center mt-10">
      <Skeleton className="h-[230px] w-[250px]" />
      <Skeleton className="h-[230px] w-[250px]" />
      <Skeleton className="h-[230px] w-[250px]" />
    </div>
  )
}
