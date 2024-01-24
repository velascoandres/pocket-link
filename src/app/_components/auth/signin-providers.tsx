'use client'

import React from 'react'
import { signIn } from 'next-auth/react'

import { IconBrandDiscordFilled, IconBrandGithubFilled, IconBrandGoogleFilled } from '@tabler/icons-react'

import { Button } from '@/app/_components/ui/button'

const CONFIG = { callbackUrl: '/dashboard' }

export function SigninProviders() {

  return (
    <div className="flex flex-row justify-center flex-wrap items-center gap-4">
      <Button
        variant="ghost"
        className="bg-white text-black"
        onClick={() => signIn('google', CONFIG)}
      >
        <IconBrandGoogleFilled className="mx-2" />

                Sign in with Google
      </Button>
      <Button
        variant="ghost"
        className="bg-indigo-900 text-white"
        onClick={() => signIn('discord', CONFIG)}
      >
        <IconBrandDiscordFilled className="mx-2" />

                Sign in with Discord
      </Button>

      <Button
        variant="ghost"
        className="bg-black text-white border border-white"
        onClick={() => signIn('github', CONFIG)}
      >
        <IconBrandGithubFilled className="mx-2" />
                Sign in with Github
      </Button>
    </div>
  )
}
