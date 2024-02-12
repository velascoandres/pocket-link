import React from 'react'

import { useToast } from '@/app/_hooks'
import { type Link } from '@/app/_interfaces/link'
import { type Space } from '@/app/_interfaces/space'
import { useModalStore } from '@/app/_store'
import { api } from '@/trpc/react'

import { Button } from '../ui/button'
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'

interface Props {
	link: Link
    space: Space
}


export const DetachLinkSpace = ({
  link,
  space
}: Props) => {

  const { closeModal } = useModalStore()
  const { toast } = useToast()
  const utils = api.useUtils()

  const { mutate: detach } = api.space.detachSpaceLink.useMutation({
    onSuccess() {
      void utils.link.getUserLinks.invalidate()

      toast({
        title: '🚨 Deleted from space',
        description: `Link "${link.name}" was deleted from space: "${space.name}"`,
        duration: 5000,
      })
      closeModal()
    }
  })


  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-xl">Detach: <strong className="text-amber-400" >{link.name}</strong></DialogTitle>
      </DialogHeader>

      <p className="px-2 font-semibold text-lg">
        Are you sure to <strong className="text-red-500">detach</strong> the link from the space?
      </p>

      <DialogFooter>
        <Button
          variant="destructive"
          onClick={() => detach({ spaceId: space.id, linkId: link.id })}
        >
			Yes
        </Button>
        <Button
          variant="ghost"
          onClick={closeModal}
        >
			No
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
