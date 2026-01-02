import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PC Security Guardian',
  description: 'AI-powered system security analysis platform for public PC safety',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <header className="bg-blue-600 text-white p-4">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">🛡️ PC Security Guardian</h1>
            <p className="text-sm">공용 PC 보안 상태 진단 플랫폼</p>
          </div>
        </header>
        <main className="container mx-auto p-6">
          {children}
        </main>
        <footer className="bg-gray-100 mt-auto p-4 text-center text-sm text-gray-600">
          © 2026 PC Security Guardian. All rights reserved.
        </footer>
      </body>
    </html>
  )
}
