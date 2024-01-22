'use client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { type z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'

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
import { type Link } from '@/app/_interfaces/link'
import { useModalStore } from '@/app/_store'
import { CreateLinkDto } from '@/dtos'
import { api } from '@/trpc/react'

import { Button } from '../ui/button'
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../ui/dialog'

interface Props {
	link?: Link
}

export const CreateUpdateLink = ({ link }: Props) => {
  const utils = api.useUtils()

  const { toast } = useToast()

  const {
    mutate: createLink,
    isLoading: isCreating,
    isSuccess: isCreateSuccess,
  } = api.link.create.useMutation()
  const {
    mutate: updateLink,
    isLoading: isUpdating,
    isSuccess: isUpdateSuccess,
  } = api.link.update.useMutation()

  const [pathWatched, setPathWatched] = useState('')
  const debounce = useDebounceCallback()

  const { data: existingPath } = api.link.searchLinkByPath.useQuery({
    path: pathWatched,
  }, {
    enabled: Boolean(pathWatched)
  })

  const onPathChange = (path: string) => {

    debounce(() => setPathWatched(path))
  }

  const { closeModal } = useModalStore()

  const form = useForm<z.infer<typeof CreateLinkDto>>({
    resolver: zodResolver(CreateLinkDto),
    defaultValues: {
      ...link ?? {}
    },
  })

  const onSubmit = (values: z.infer<typeof CreateLinkDto>) => {
    if (link) {
      updateLink({
        ...values,
        id: link.id,
      })
    } else {
      createLink({
        ...values,
      })
    }
  }

  useEffect(() => {
    if (existingPath) {
      form.setError('path', { message: 'Path already exist' })
    }
  }, [existingPath, form])

  useEffect(() => {
    if (isCreateSuccess || isUpdateSuccess) {
      void utils.link.getUserLinks.invalidate()

      toast({
        title: `✅ Link ${isCreateSuccess ? 'created' : 'updated'}`,
        duration: 2000,
      })

      closeModal()
    }

  }, [isCreateSuccess, isUpdateSuccess, utils, closeModal, toast])

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{link ? 'Link information' : 'Add new link'} </DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="flex flex-col items-start gap-4 w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Name*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Free books"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
										This is your link name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="originalLink"
              render={({ field }) => (
                <FormItem className="w-full" >
                  <FormLabel>Original link*</FormLabel>
                  <FormControl>
                    <Input placeholder="https://my-long-domain.com/long/123/post" {...field} />
                  </FormControl>
                  <FormDescription>
										Paste your complete url.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="path"
              render={({ field }) => (
                <FormItem className="w-full" >
                  <FormLabel>Path</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="/g/book"
                      {...field}
                      onChange={(evt) => {
                        field.onChange(evt)
                        onPathChange(evt.target.value)
                      }}
                    />
                  </FormControl>
                  <FormDescription>
										Enter a path to alias the url. If empty a random url path should be generated
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <DialogFooter>
            <Button
              disabled={isCreating || isUpdating}
              type="submit"
            >
							Save changes
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent >
  )
}
