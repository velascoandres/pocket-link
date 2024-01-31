'use client'
import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { type z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { IconLoader2, IconTerminal } from '@tabler/icons-react'

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

  const onSubmit = (values: z.infer<typeof CreateLinkDto>) => {
    createTemporalLink({
      ...values,
    })
  }

  const hasErrors = Boolean(Object.values(form.formState.errors).length) || !form.formState.isValid

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className={cn({
          'text-green-700': isSuccess
        })}>{isSuccess ? '🎉 Link shortened!' : 'Quick short'}</DialogTitle>
      </DialogHeader>
      {
        createdLink && (
          <div className="flex flex-col justify-center gap-2">
            <LinkCard
              link={{
                ...createdLink,
                totalInteractions: 0
              }}
              showPublic
            />
            <Alert className="border-amber-400">
              <IconTerminal className="h-4 w-4 " />
              <AlertTitle className="text-amber-400">Heads up!</AlertTitle>
              <AlertDescription>
                   The shortened link will last 72 hours. Create a <strong className="text-amber-400">free account</strong> to create unlimited links
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
                    <Input placeholder="https://my-long-domain.com/long/123/post" {...field} />
                  </FormControl>
                  <FormDescription>
                     Enter the entire link
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <PathField />

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
              <div className="flex justify-start items-center gap-2">
                <IconLoader2
                  className={cn('hidden', {
                    'block animate-spin': isCreatingTemporal,
                  })}
                />
                   Save changes
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
