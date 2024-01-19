'use client'
import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { type Link } from '@/interfaces/link'
import {
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '../ui/dialog'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface Props {
	link?: Link
}

const formSchema = z.object({
	name: z.string().min(2, {
		message: 'Name must be at least 2 characters.',
	}),
	path: z.string().optional(),
	originalLink: z.string()
		.min(10, {
			message: 'Path must be at least 10 characters.',
		})
		.url('Path should be a valid url format'),
})

export const CreateUpdateLink = ({ link }: Props) => {

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			...link
		},
	})

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values)
	}

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
										<Input placeholder="Free books" {...field}/>
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
										<Input placeholder="/g/book" {...field} />
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
						<Button type="submit">Save changes</Button>
					</DialogFooter>
				</form>
			</Form>
		</DialogContent >
	)
}