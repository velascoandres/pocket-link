import { api } from '@/trpc/react'

import { type Link } from '../_interfaces/link'

import { useToast } from './use-toast'

export const useToggleLinkFavorite = () => {
  const utils = api.useUtils()
  const { toast } = useToast()

  const { mutate } = api.link.update.useMutation({
    onSuccess: ({ name, isFavorite }) => {
      void utils.link.getUserLinks.invalidate()
    
      toast({
        title: `✅ "${name}" ${isFavorite ? 'Added to favorites' : 'Remove from favorites'}`,
        duration: 2000,
      })
    }
  })

  const toggleFavorite = (link: Link) => {
    mutate({
      ...link,
      isFavorite: !link.isFavorite
    })
  }

  
  return toggleFavorite
}
