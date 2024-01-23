'use'

import React from 'react'

import { Skeleton } from '../ui/skeleton'

export const LinkCardSkeleton = () => {
  return (
    <div className="flex flex-row justify-start gap-4 flex-wrap z-20">
      <Skeleton className="h-[182px] w-[250px]" />
      <Skeleton className="h-[182px] w-[250px]" />
      <Skeleton className="h-[182px] w-[250px]" />
      <Skeleton className="h-[182px] w-[250px]" />
    </div>
  )
}
