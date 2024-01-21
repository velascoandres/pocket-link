import React from 'react'

import { useToast } from '@/app/_hooks'
import { type Link } from '@/app/_interfaces/link'
import { useModalStore } from '@/app/_store'
import { api } from '@/trpc/react'

import { DialogContent, DialogHeader, DialogFooter, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'

interface Props {
	link: Link
}


export const DeleteLink = ({
	link
}: Props) => {

	const { closeModal } = useModalStore()
	const { toast } = useToast()
	const utils = api.useUtils()

	const { mutate: deleteLink } = api.link.deleteUserLink.useMutation({
		onSuccess() {
			void utils.link.getUserLinks.invalidate()

			toast({
				title: '🚨 Deleted',
				description: `Link "${link.name}" was deleted`,
				duration: 5000,
			})
			closeModal()
		}
	})


	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle className="text-xl">Delete link</DialogTitle>
			</DialogHeader>

			<p className="px-2 font-semibold text-lg">
				Do you want to <strong className="text-red-700">delete</strong> the link <strong className="text-indigo-600" >{link.name}</strong> ?
			</p>

			<DialogFooter>
				<Button
					variant="destructive"
					onClick={() => deleteLink({ id: link.id })}
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
