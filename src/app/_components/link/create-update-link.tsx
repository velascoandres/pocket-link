'use client'
import React from 'react'
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
import { useToast } from '@/app/_hooks'
import { type Link } from '@/app/_interfaces/link'
import { useModalStore } from '@/app/_store'
import { CreateLinkDto } from '@/dtos'
import { cn } from '@/lib/utils'
import { api } from '@/trpc/react'

import { Button } from '../ui/button'
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../ui/dialog'
import { Switch } from '../ui/switch'

import { LinkPreview } from './link-preview'
import { PathField } from './path-field'

interface Props {
	link?: Link
}

export const CreateUpdateLink = ({ 
  link,
}: Props) => {
  const utils = api.useUtils()

  const { toast } = useToast()

  const handleSuccess = () => {
    void utils.link.getUserLinks.invalidate()

    toast({
      title: `✅ Link ${link ? 'updated' : 'created'}`,
      duration: 2000,
    })

    closeModal()
  }

  const {
    mutate: createLink,
    isLoading: isCreating,
  } = api.link.create.useMutation({
    onSuccess: handleSuccess,
  })
  const {
    mutate: updateLink,
    isLoading: isUpdating,
  } = api.link.update.useMutation({
    onSuccess: handleSuccess,
  })

  const { closeModal } = useModalStore()

  const form = useForm<z.infer<typeof CreateLinkDto>>({
    resolver: zodResolver(CreateLinkDto),
    defaultValues: {
      ...link ?? {
        name: '',
        originalLink: '',
        path: '',
        isFavorite: false,
      }
    },
  })

  const onSubmit = (values: z.infer<typeof CreateLinkDto>) => {
    if (link) {
      updateLink({
        ...values,
        id: link.id,
      })

      return
    }

    createLink({
      ...values,
    })
  }

  const hasErrors = Boolean(Object.values(form.formState.errors).length) || !form.formState.isValid
  const watchedUrl = form.watch('originalLink') || ''


  return (
    <DialogContent 
      className="h-screen overflow-y-auto md:h-auto md:max-w-xl" 
      preventCloseClickOutside
      preventScapeKeydown
    >
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
                    <Input placeholder="https://a-very-long-domain.com/long/123/post" {...field} />
                  </FormControl>
                  <FormDescription>
										Enter the entire link
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <PathField />
            {
              watchedUrl && <LinkPreview url={watchedUrl} />
            }
            <FormField
              control={form.control}
              name="isFavorite"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm w-full">
                  <div className="space-y-0.5">
                    <FormLabel>
                      Mark link as <strong className="font-bold text-primary text-base">favorite</strong>
                    </FormLabel>
                    <FormDescription> 
                      <p className="text-xs">
                        The link marked as favorite will be listed on favorites section
                      </p>
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
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
