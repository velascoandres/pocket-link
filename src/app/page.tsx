import { unstable_noStore as noStore } from 'next/cache'
import Link from 'next/link'

import { IconChevronRight } from '@tabler/icons-react'

import { getServerAuthSession } from '@/server/auth'

import { SigninProviders } from './_components/auth/signin-providers'
import { Card, CardDescription, CardHeader, CardTitle } from './_components/ui/card'
import { Footer } from './_components/ui/footer'
import { FEATURES } from './_landing/features'

export default async function Home() {
  noStore()
  const session = await getServerAuthSession()

  return (
    <main className="flex flex-col items-center md:h-screen justify-center py-2">
      <div className="space-y-2 flex flex-col items-center gap-4 flex-1 justify-center">
        <h1 className="text-white text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
          <strong className="text-amber-400">Pocket</strong> <strong className="text-gray-400">link</strong>
        </h1>
        <p className="max-w-[300px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[850px] text-gray-200 text-lg/relaxed md:text-xl/relaxed dark:text-gray-400">
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

        <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-4">
          {
            FEATURES.map(({ icon, title, description }, index) => (

              <Card key={`feat-${index}`} className="w-[350px] md:w-[300px] group rounded-lg transition ease-in hover:scale-105 border-gray-800 bg-gray-950/25 p-2 cursor-pointer hover:bg-gradient-to-r from-gray-800 to-slate-950 hover:border-amber-400">
                <CardHeader className="flex flex-col gap-2 items-center">
                  <div className="group-hover:text-amber-400">
                    {icon}
                  </div>
                  <CardTitle className="transition ease-out duration-200 group-hover:text-amber-400 text-xl font-bold self-center text-gray-400">
                    {title}
                  </CardTitle>
                  <CardDescription className="transition ease-out duration-200 group-hover:text-gray-200 text-base/relaxed text-gray-400">
                    {description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))
          }
          
        </section>

      </div>
      
      <div className="self-end w-screen">
        <Footer />
      </div>
    </main>
  )
}