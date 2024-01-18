import '@/styles/globals.css'

import { Onest } from 'next/font/google'

import { TRPCReactProvider } from '@/trpc/react'

import { ThemeProvider } from '@/components/theme/theme-provider'
import { AuthProvider } from '@/components/auth/auth-provider'

const inter = Onest({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata = {
  title: 'Pocket link',
  description: 'A url link shortener',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} `}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-black bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
              <TRPCReactProvider>{children}</TRPCReactProvider>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout