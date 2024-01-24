import { unstable_noStore as noStore } from 'next/cache'
import Link from 'next/link'

import { IconChevronRight } from '@tabler/icons-react'

import { getServerAuthSession } from '@/server/auth'

import { SigninProviders } from './_components/auth/signin-providers'
import { Footer } from './_components/ui/footer'

export default async function Home() {
  noStore()
  const session = await getServerAuthSession()

  return (
    <main className="flex flex-col h-screen items-center justify-center">
      <div className="space-y-2 flex flex-col items-center gap-4 flex-1 justify-center">
        <h1 className="text-white text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
          <strong className="text-amber-400">Pocket</strong> <strong className="text-gray-400">link</strong>
        </h1>
        <p className="max-w-[300px] sm:max-w-[400px] md:max-w-[600px] text-gray-200 text-lg/relaxed md:text-xl/relaxed dark:text-gray-400">
          Discover a <strong className="text-amber-400">user-friendly</strong> platform designed to effortlessly manage <strong className="text-amber-400">all your links</strong>.
          Say goodbye to <strong className="text-amber-400">link clutter</strong> with our streamlined solution, offering easy organization and monitoring.
          Tailor your digital presence with <strong className="text-amber-400">personalized branding</strong>.
        </p>

        {
          session ? (
            <Link
              href="/dashboard"
              className="transition ease-in group rounded-full border flex border-white text-white pl-4 pr-2 py-3 font-semibold no-underline hover:border-amber-400"
            >
              <span className="group-hover:text-amber-400">Continue to dashboard </span>
              <IconChevronRight className="transition ease-out duration-200 group-hover:translate-x-1 group-hover:text-amber-400" />
            </Link>) : (
            <SigninProviders />
          )
        }
      </div>
      
      <div className="self-end">
        <Footer />
      </div>
    </main>
  )
}