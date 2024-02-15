import { Group, Link } from 'lucide-react'


export const NAVIGATION = {
  // DASHBOARD: {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   icon: LayoutDashboard
  // },
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
} as const


export const REDIRECT_PATH = NAVIGATION.LINKS.path