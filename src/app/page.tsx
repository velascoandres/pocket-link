import { unstable_noStore as noStore } from 'next/cache'
import Link from 'next/link'

import { IconChevronRight } from '@tabler/icons-react'

import { NAVIGATION } from '@/constants/navigation'
import { getServerAuthSession } from '@/server/auth'

import { SigninProviders } from './_components/auth/signin-providers'
import { PublicLinksSection } from './_components/link/public-links-section'
import { AnimatedBagde } from './_components/ui/animated-bagde'
import { Footer } from './_components/ui/footer'


export default async function Home() {
  noStore()
  const session = await getServerAuthSession()

  return (
    <main className="py-16 flex flex-col items-center justify-around gap-4">
      <section className="space-y-2 flex flex-col items-center gap-2 justify-center flex-1">
        <h1 className="text-white text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
          <strong className="text-primary">Pocket</strong> <strong className="text-gray-400">link</strong>
        </h1>
        <p className="max-w-[300px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[850px] text-gray-200 text-lg/relaxed md:text-xl/relaxed dark:text-gray-400 text-pretty">
          Discover an <strong className="text-primary">user-friendly</strong> platform designed to effortlessly manage <strong className="text-primary">all your links</strong>.
          Say goodbye to <strong className="text-primary">link clutter</strong> with our streamlined solution, offering easy organization and monitoring.
          Tailor your digital presence with <strong className="text-primary">personalized branding</strong>.
        </p>

        {
          session ? (
            <Link
              href={NAVIGATION.LINKS.path}
              className="flex items-center transition ease-in group rounded-full text-white pl-4 pr-2 py-3 font-semibold no-underline "
            >   
              <AnimatedBagde className="p-[1px]">
                <span className="group-hover:text-primary">Continue to dashboard</span>
                <IconChevronRight className="transition ease-out duration-200 group-hover:translate-x-1 group-hover:text-primary" />
              </AnimatedBagde>
            </Link>) : (
            <SigninProviders />
          )
        }
      </section>
      <PublicLinksSection />
      <div className="fixed bottom-0 w-full bg-background">
        <Footer />
      </div>
    </main>
  )
}