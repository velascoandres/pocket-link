import { create } from 'zustand'
import { type Link } from '../_interfaces/link'

type State = {
	links: Link[]
}

type Action = {
	setLinks: (links: Link[]) => void
}

export const useLinkStore = create<State & Action>((set) => ({
	links: [],
	setLinks: (links) => set(() => ({ links: [...links] })),
}))
