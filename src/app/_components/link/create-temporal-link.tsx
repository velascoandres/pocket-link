'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { type z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { IconAlertTriangle, IconLoader2 } from '@tabler/icons-react'

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
import { useModalStore } from '@/app/_store'
import { CreateLinkDto } from '@/dtos'
import { cn } from '@/lib/utils'
import { api } from '@/trpc/react'

import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { Button } from '../ui/button'
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../ui/dialog'

import { LinkCard } from './link-card'
import { LinkPreview } from './link-preview'
import { PathField } from './path-field'

export const CreateTemporalLink = () => {
  const { closeModal } = useModalStore()

  const utils = api.useUtils()

  const handleSuccess = () => {
    void utils.link.getTemporalLinks.invalidate()
  }


  const {
    data: createdLink,
    mutate: createTemporalLink,
    isLoading: isCreatingTemporal,
    isSuccess
  } = api.link.createTemporalLink.useMutation({
    onSuccess: handleSuccess,
  })

  const form = useForm<z.infer<typeof CreateLinkDto>>({
    resolver: zodResolver(CreateLinkDto),
    defaultValues: {
      name: '',
      originalLink: '',
      path: '',
    },
    mode: 'onChange'
  })

  const watchedUrl = form.watch('originalLink') || ''

  const onSubmit = (values: z.infer<typeof CreateLinkDto>) => {
    createTemporalLink({
      ...values,
    })
  }

  const hasErrors = Boolean(Object.values(form.formState.errors).length) || !form.formState.isValid

  return (
    <DialogContent 
      className="h-screen overflow-y-auto md:h-auto md:max-w-xl"
      preventCloseClickOutside
      preventScapeKeydown
    >
      <DialogHeader>
        <DialogTitle>{isSuccess ? '🎉 Link shortened!' : 'Quick short'}</DialogTitle>
      </DialogHeader>
      {
        createdLink && (
          <div className="flex flex-col justify-center gap-2  max-w-sm md:max-w-md lg:max-w-lg">
            <LinkCard
              link={{
                ...createdLink,
                totalInteractions: 0
              }}
            />
            <Alert className="border-amber-400">
              <IconAlertTriangle className="h-4 w-4" />
              <AlertTitle className="text-amber-400">Heads up!</AlertTitle>
              <AlertDescription className="[&>strong]:text-amber-400">
                   The shortened link will last <strong>72 hours</strong>. 
                   Create a <strong>free account</strong> to short <strong>unlimited links</strong>  
              </AlertDescription>
            </Alert>
          </div>
        )
      }
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className={cn('flex flex-col items-start gap-4 w-full', {
            'hidden': isSuccess
          })}>
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
                    <Input placeholder="https://a-very-long-domain/long/123/post" {...field} />
                  </FormControl>
                  <FormDescription>
                     Enter or paste the entire link
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <PathField />
            {
              watchedUrl && <LinkPreview url={watchedUrl} />
            }
          </div>
          <DialogFooter>
            <Button
              disabled={
                isCreatingTemporal || hasErrors
              }
              type="submit"
              className={cn('block', {
                'hidden': isSuccess
              })}
            >
              <div className="flex justify-center md:justify-start items-center gap-2">
                <IconLoader2
                  className={cn('hidden', {
                    'block animate-spin': isCreatingTemporal,
                  })}
                />
                   Short
              </div>

            </Button>

            <Button
              type='button'
              className={cn('block', {
                'hidden': !isSuccess
              })}
              onClick={closeModal}
            >
                Close
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent >
  )
}
