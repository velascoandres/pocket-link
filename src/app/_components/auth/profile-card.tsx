import React from 'react'
import { signOut, useSession } from 'next-auth/react'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export const ProfileCard = () => {
  const { data } = useSession()

  if (!data?.user) {
    return null
  }

  return (
    <div className="select-none flex flex-row flex-wrap gap-2 items-start p-2 border border-border rounded-lg">
      <Avatar>
        <AvatarImage src={data.user.image!} />
        <AvatarFallback>
          {data.user.name}
        </AvatarFallback>
      </Avatar>
      <div className="mx-2 [&>span]:block text-start text-sm">
        <span>{data.user.name}</span>
        <div role="button" className="cursor-pointer text-foreground/25 hover:underline" onClick={() => signOut({ callbackUrl: '/' })}>
          <span className="text-xs">Sign out</span>
        </div>
      </div>
    </div>
  )
}
