'use client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { type z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { IconLoader2 } from '@tabler/icons-react'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/_components/ui/form'
import { Input } from '@/app/_components/ui/input'
import { useDebounceCallback, useToast } from '@/app/_hooks'
import { type Space } from '@/app/_interfaces/space'
import { useModalStore } from '@/app/_store'
import { COLORS, GRADIENT_COLORS, GRADIENT_COLORS_MAP } from '@/constants/colors'
import { CreateSpaceDto } from '@/dtos'
import { getTextColor } from '@/helpers'
import { cn } from '@/lib/utils'
import { api } from '@/trpc/react'

import { Button } from '../ui/button'
import { ColorSelector } from '../ui/color-selector'
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Textarea } from '../ui/textarea'

import { SpaceCard } from './space-card'

interface Props {
	space?: Space
}

export const CreateUpdateSpace = ({ 
  space,
}: Props) => {
  const utils = api.useUtils()

  const { toast } = useToast()
  const [nameWatched, setNameWatched] = useState('')
  const debounce = useDebounceCallback()
  const { closeModal } = useModalStore()

  const handleSuccess = () => {
    void utils.space.searchSpace.invalidate()

    toast({
      title: `✅ Space ${space ? 'updated' : 'created'}`,
      duration: 2000,
    })

    closeModal()
  }

  const {
    mutate: createSpace,
    isLoading: isCreating,
  } = api.space.createSpace.useMutation({
    onSuccess: handleSuccess,
  })
  const {
    mutate: updateSpace,
    isLoading: isUpdating,
  } = api.space.updateSpace.useMutation({
    onSuccess: handleSuccess,
  })

  
  const form = useForm<z.infer<typeof CreateSpaceDto>>({
    resolver: zodResolver(CreateSpaceDto),
    defaultValues: {
      name: space?.name ?? '',
      description: space?.description ?? '',
      style: space?.style ?? {
        background: {
          type: 'color',
          value: COLORS[4] ?? ''
        },
        textColor: 'black'
      }
    },
  })

  const onSubmit = (values: z.infer<typeof CreateSpaceDto>) => {
    if (space) {
      updateSpace({
        ...values,
        id: space.id,
      })

      return
    }

    createSpace({
      ...values,
    })
  }

  const { data: existingSpace } = api.space.searchSpaceByName.useQuery({
    name: nameWatched,
  }, {
    enabled: Boolean(nameWatched)
  })

  const onNameChange = (path: string) => {

    debounce(() => setNameWatched(path))
  }


  const handleColorSelection = (selectedColor: string) => {
    form.setValue('style.background.value', selectedColor)
    if (form.getValues('style.background.type') === 'color'){
      form.setValue('style.textColor', getTextColor(selectedColor))
    } else {
      form.setValue('style.textColor', GRADIENT_COLORS_MAP.get(selectedColor)?.textColor)
    }
  }


  useEffect(() => {
    if (existingSpace) {
      form.setError('name', { message: `${existingSpace.name} already exist` }, { shouldFocus: true })
    } else {
      form.clearErrors('name')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existingSpace])

  const hasErrors = Boolean(Object.values(form.formState.errors).length) || !form.formState.isValid

  return (
    <DialogContent 
      className="h-screen xl:h-auto md:max-w-3xl overflow-y-auto" 
      preventCloseClickOutside
      preventScapeKeydown
    >
      <DialogHeader>
        <DialogTitle>{space ? 'Space information' : 'Add new Space'} </DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
          <div className="flex flex-col items-start gap-4 w-full">
            <div className="flex flex-col md:flex-row justify-between w-full gap-2">
              <div className="flex flex-col w-full">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Name*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Frontend links"
                          {...field}
                          onChange={(evt) => {
                            field.onChange(evt)
                            onNameChange(evt.target.value)
                          }}
                        />
                      </FormControl>
                      <FormDescription>
					              This is your space name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="style.background.type"
                  render={({ field }) => (
                    <FormItem className="w-full" >
                      <FormLabel>Background type</FormLabel>
                      <FormControl>
                        <Select {...field} onValueChange={(type: 'color' | 'gradient') => form.setValue('style.background.type', type) }>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Background type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="color">Color</SelectItem>
                            <SelectItem value="gradient">Gradient</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
					              Select a background type
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full" >
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea rows={6} placeholder="my great space for..." {...field} />
                    </FormControl>
                    <FormDescription>
					            Enter the space description
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="overflow-y-auto max-h-64 p-2">
              <ColorSelector 
                value={form.getValues('style.background.value')}
                onSelect={handleColorSelection} 
                options={form.watch('style.background.type') === 'gradient' ? GRADIENT_COLORS : COLORS} 
              />
            </div>   
          </div>

          <h3 className="font-bold">Space preview</h3>

          <div className="flex flex-row justify-center w-full">
            <SpaceCard 
              space={{
                id: 0,
                name: form.watch('name') || '⚽️ Space name 🏈',
                // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                description: form.watch('description') || 'my great space for...',
                style: form.watch('style')
              }}  
            />
          </div>
          

          <DialogFooter>
            <Button
              disabled={ isCreating || isUpdating || hasErrors }
              type="submit"

            >
              <div className="flex justify-start items-center gap-2">
                <IconLoader2 
                  className={cn('hidden',{
                    'block animate-spin': isCreating || isUpdating,
                  })}
			    />
				      Save changes
              </div>

            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent >
  )
}
