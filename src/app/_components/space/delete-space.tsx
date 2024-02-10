import React from 'react'

import { useToast } from '@/app/_hooks'
import { type Space } from '@/app/_interfaces/space'
import { useModalStore } from '@/app/_store'
import { api } from '@/trpc/react'

import { Button } from '../ui/button'
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'

interface Props {
	space: Space
}


export const DeleteSpace = ({
  space
}: Props) => {

  const { closeModal } = useModalStore()
  const { toast } = useToast()
  const utils = api.useUtils()

  const { mutate: deleteSpace } = api.space.deleteSpace.useMutation({
    onSuccess() {
      void utils.link.getUserLinks.invalidate()

      toast({
        title: '🚨 Deleted',
        description: `Space: "${space.name}" was deleted`,
        duration: 5000,
      })
      closeModal()
    }
  })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-xl">Delete: <strong className="text-amber-400" >{space.name}</strong></DialogTitle>
      </DialogHeader>

      <p className="px-2 font-semibold text-lg">
        Are you sure to <strong className="text-red-500">delete</strong> the space?
      </p>

      <DialogFooter>
        <Button
          variant="destructive"
          onClick={() => deleteSpace({ id: space.id })}
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
