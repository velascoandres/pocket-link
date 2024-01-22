import { unstable_noStore as noStore } from 'next/cache'
import Link from 'next/link'

import { getServerAuthSession } from '@/server/auth'

import { SigninProviders } from './_components/auth/signin-providers'

export default async function Home() {
  noStore()
  const session = await getServerAuthSession()

  return (
    <main className="flex flex-col h-screen items-center justify-center gap-4">
      <div className="space-y-2 flex flex-col items-center gap-4">
        <h1 className="text-white text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
          <strong className="text-amber-400">Pocket</strong> link
        </h1>
        <p className="max-w-[300px] md:max-w-[600px] text-gray-200 md:text-xl/relaxed dark:text-gray-400">
          Discover a <strong className="text-amber-400">user-friendly</strong> platform designed to effortlessly manage <strong className="text-amber-400">all your links</strong>.
          Say goodbye to <strong className="text-amber-400">link clutter</strong> with our streamlined solution, offering easy organization and monitoring.
          Tailor your digital presence with <strong className="text-amber-400">personalized branding</strong>.
        </p>
      </div>
      {
        session ? (
          <Link
            href="/dashboard"
            className="text-black rounded-full bg-white px-10 py-3 font-semibold no-underline transition hover:bg-white/70"
          >
          Continue to dashboard
          </Link>) : (
          <SigninProviders />
        )
      }

    </main>
  )
}