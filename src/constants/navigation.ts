import { Group, Link, Star } from 'lucide-react'


export const NAVIGATION = {
  LINKS: {
    path: '/links',
    name: 'Links',
    icon: Link
  },
  SPACES: {
    path: '/spaces',
    name: 'Spaces',
    icon: Group
  },
  FAVORITES: {
    path: '/favorites',
    name: 'Favorites',
    icon: Star
  }
} as const


export const REDIRECT_PATH = NAVIGATION.LINKS.path