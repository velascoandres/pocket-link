import { 
  IconChartSankey,
  IconLayoutDashboard, 
  IconPencilCog, 
  IconScissors
} from '@tabler/icons-react'

export const FEATURES = [
  {
    title: 'Quick Shortening',
    description: 'Transform long links with just a few clicks',
    icon: <IconScissors className="w-8 h-8" />
  },
  {
    title: 'Intuitive Dashboard',
    description: 'Save, organize, and manage your links efficiently.',
    icon: <IconLayoutDashboard className="w-8 h-8" />
  },
  {
    title: 'Customization',
    description: 'Personalize shortened URLs according to your preferences.',
    icon: <IconPencilCog className="w-8 h-8" />
  },
  {
    title: 'Analytics',
    description: 'Track your shortened URLs click interactions',
    icon: <IconChartSankey className="w-8 h-8" />
  }
]