import React from 'react'

import { Skeleton } from '@/app/_components/ui/skeleton'

const Loading = () => {
  return (
    <div className="h-screen overflow-y-auto">
      <div className="fixed w-screen top-0 z-10 px-8 py-2">
        <Skeleton className="w-full h-[50px]" />
      </div>
      <div className="max-w-screen-2xl flex flex-col gap-4 items-center flex-wrap justify-between mx-auto px-8 mt-20">
        <Skeleton className="w-1/2 h-[50px] px-8" />
        <Skeleton className="w-full h-[500px]" />
      </div>
    </div>
  )
}

export default Loading