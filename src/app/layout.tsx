import { type Metadata } from 'next'
import { Onest } from 'next/font/google'

import { AuthProvider } from '@/app/_components/auth/auth-provider'
import { ThemeProvider } from '@/app/_components/theme/theme-provider'
import { ModalContainer } from '@/app/_components/ui/modal-container'
import { Toaster } from '@/app/_components/ui/toaster'
import { TRPCReactProvider } from '@/trpc/react'

import { ProgressBar } from './_components/dashboard/progress-bar'

import '@/styles/globals.css'

const inter = Onest({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Pocket link',
  description: 'Pocket link is a platform where you can manage your URLs efficiently',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
  openGraph: {
    title: 'Pocket link a smart url shortener',
    description: 'Pocket link is a platform where you can manage your URLs efficiently',
    url: 'https://pkin.vercel.app',
    siteName: 'Pocket link',
    images: [
      {
        url: 'https://pkin.vercel.app/pocket.svg',
        width: 1200,
        height: 630,
      }
    ],
  },
}

const RootLayout = ({
  children,
}: {
	children: React.ReactNode;
}) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans relative flex ${inter.variable} flex-col`}>        
        <ProgressBar />
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <TRPCReactProvider>
              <ModalContainer />
              <Toaster />
              {children}
            </TRPCReactProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout