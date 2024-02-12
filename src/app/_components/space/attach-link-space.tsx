import React, { useState } from 'react'

import { IconLoader2 } from '@tabler/icons-react'

import { useToast } from '@/app/_hooks'
import { type Link } from '@/app/_interfaces/link'
import { type Space } from '@/app/_interfaces/space'
import { useModalStore } from '@/app/_store'
import { cn } from '@/lib/utils'
import { api } from '@/trpc/react'

import { LinkCard } from '../link/link-card'
import { LinkPicker } from '../link/link-picker'
import { Button } from '../ui/button'
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'

interface Props {
    space?: Space
}


export const AttachLinkSpace = ({
  space
}: Props) => {

  const utils = api.useUtils()
  const { closeModal } = useModalStore()

  const handleSuccess = () => {
    void utils.link.invalidate()

    toast({
      title: `✅ Link has been attached to: ${space?.name}`,
      duration: 2000,
    })

    closeModal()
  }

  const { mutate: attach, isLoading: isAttaching } = api.space.createSpaceLink.useMutation({
    onSuccess: handleSuccess
  })

  const { toast } = useToast()
  const [linkToAttatch, setLinkToAttach] = useState<Link>()

  const handleAttach =  () => {
    if (!linkToAttatch?.id){
      return
    }

    if (!space?.id){
      return
    }

    attach({
      linkId: linkToAttatch.id,
      spaceId: space.id 
    })
  }


  return (
    <DialogContent preventCloseClickOutside preventScapeKeydown>
      <DialogHeader>
        <DialogTitle>Attach link to space: {space?.name} </DialogTitle>
      </DialogHeader>
      
      <LinkPicker onLinkSelect={setLinkToAttach} />

      {
        linkToAttatch && <LinkCard link={linkToAttatch} />
      }

      <DialogFooter>
        <Button
          disabled={ isAttaching || !Boolean(linkToAttatch) }
          type="button"
          onClick={handleAttach}
        >
          <div className="flex justify-start items-center gap-2">
            <IconLoader2 
              className={cn('hidden',{
                'block animate-spin': isAttaching,
              })}
			    />
				      Attach
          </div>

        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
