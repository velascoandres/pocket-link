'use client'

import React from 'react'
import { signIn } from 'next-auth/react'
import { ChevronRight } from 'lucide-react'

import { Button } from '@/app/_components/ui/button'
import DiscordIcon from '@/app/_icons/discord'
import GithubIcon from '@/app/_icons/github'
import GoogleIcon from '@/app/_icons/google'
import { REDIRECT_PATH } from '@/constants/navigation'

const CONFIG = { callbackUrl: REDIRECT_PATH }

interface SocialButtonProps {
  type: 'google' | 'discord' | 'github'
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
}

export function SigninProviders() {

  return (
    <div className="flex flex-row justify-center flex-wrap items-center gap-4">
      <SocialButton type="google" icon={GoogleIcon} />
      <SocialButton type="discord" icon={DiscordIcon} />
      <SocialButton type="github" icon={GithubIcon} />
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
      className="px-4 py-2 rounded-xl inline-flex justify-center gap-2 group"
    >
      <IconComponent className="w-6 h-6" />
      <span>Continue with {labels[type]}</span>
      <ChevronRight className="w-0 opacity-0 group-hover:w-5 group-hover:opacity-100  group-hover:translate-x-2 transition-all ease-in duration-200" />
    </Button>
  )
}