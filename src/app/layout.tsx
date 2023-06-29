import './globals.css'
import { Open_Sans } from 'next/font/google'
import Header from '@/components/Header'
import { AuthContext } from '@/context/AuthContext'
import SWRConfigContext from '@/context/SWRConfigContext'

const openSans = Open_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-neutral-50 text-gray-900 dark:bg-[#0a0a0a] dark:text-gray-200">
      <body className={`${openSans.className} flex h-screen w-full flex-col overflow-y-auto px-2`}>
        <AuthContext>
          <Header />
          <main className="flex h-full w-full justify-center bg-neutral-50 p-2">
            <SWRConfigContext>{children}</SWRConfigContext>
          </main>
        </AuthContext>
      </body>
    </html>
  )
}
