import { type Metadata } from 'next'
import { Onest } from 'next/font/google'

import { AuthProvider } from '@/app/_components/auth/auth-provider'
import { ThemeProvider } from '@/app/_components/theme/theme-provider'
import { ModalContainer } from '@/app/_components/ui/modal-container'
import { Toaster } from '@/app/_components/ui/toaster'
import { TRPCReactProvider } from '@/trpc/react'

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
        <div className="absolute top-0 bottom-0  z-[-2] min-h-screen w-full bg-black 
        bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
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