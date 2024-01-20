'use client'

import { signIn } from 'next-auth/react'
import { Button } from '@/app/_components/ui/button'
import React from 'react'

import { IconBrandDiscordFilled, IconBrandGithubFilled } from '@tabler/icons-react'

const CONFIG = { callbackUrl: '/dashboard' }

export function SigninProviders() {

    return (
        <div className="flex flex-row justify-center items-center gap-4">
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
                className="bg-black text-white"
                onClick={() => signIn('github', CONFIG)}
            >
                <IconBrandGithubFilled className="mx-2" />
                Sign in with Github
            </Button>
        </div>
    )
}
