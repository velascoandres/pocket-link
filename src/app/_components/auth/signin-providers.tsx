'use client'

import React from 'react'
import { signIn } from 'next-auth/react'

import { IconBrandDiscordFilled, IconBrandGithubFilled, IconBrandGoogleFilled } from '@tabler/icons-react'

import { Button } from '@/app/_components/ui/button'
import { REDIRECT_PATH } from '@/constants/navigation'

const CONFIG = { callbackUrl: REDIRECT_PATH }

interface SocialButtonProps {
  type: 'google' | 'discord' | 'github'
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
}

export function SigninProviders() {

  return (
    <div className="flex flex-row justify-center flex-wrap items-center gap-4">
      <SocialButton type="google" icon={IconBrandGoogleFilled} />
      <SocialButton type="discord" icon={IconBrandDiscordFilled} />
      <SocialButton type="github" icon={IconBrandGithubFilled} />
    </div>
  )
}


const SocialButton = ({ icon: IconComponent, type }: SocialButtonProps) => {
  const labels: Record<typeof type, string> = {
    google: 'Google',
    discord: 'Discord',
    github: 'Github'
  }

  return (
    <Button
      variant="outline"
      onClick={() => signIn(type, CONFIG)}
      className="px-4 py-2 rounded-xl inline-flex justify-center gap-1"
    >
      <IconComponent />
      <span>Continue with {labels[type]}</span>
    </Button>
  )
}