import { Group,LayoutDashboard, Link } from 'lucide-react'

export const NAVIGATION = {
  DASHBOARD: {
    path: '/dashboard',
    name: 'Dashboard',
    icon: LayoutDashboard
  },
  LINKS: {
    path: '/dashboard/links',
    name: 'Links',
    icon: Link
  },
  SPACES: {
    path: '/dashboard/spaces',
    name: 'Spaces',
    icon: Group
  },
} as const