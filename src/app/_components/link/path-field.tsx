import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { useDebounceCallback } from '@/app/_hooks'
import { api } from '@/trpc/react'

import { 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '../ui/form'
import { Input } from '../ui/input'

export const PathField = () => {
  const form = useFormContext()

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


  useEffect(() => {
    if (existingPath) {
      form.setError('path', { message: 'Path already exist' }, { shouldFocus: true })
    } else {
      form.clearErrors('path')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existingPath])

  return (
    <FormField
      control={form.control}
      name="path"
      render={({ field }) => (
        <FormItem className="w-full" >
          <FormLabel>Path</FormLabel>
          <FormControl>
            <Input
              placeholder="g/book"
              {...field}
              onChange={(evt) => {
                field.onChange(evt)
                onPathChange(evt.target.value)
              }}
            />
          </FormControl>
          <FormDescription>
			Enter a path to alias the link. If it is empty, a random path will be generated.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
