import { ReactNode } from 'react'

interface CaseStudyLayoutProps {
  sidebar: ReactNode
  children: ReactNode
}

export default function CaseStudyLayout({ sidebar, children }: CaseStudyLayoutProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-0 max-w-[1440px] mx-auto px-6 py-6 bg-cs-bg">
      <aside className="bg-cs-bg text-pure-black min-w-0 md:fixed md:top-20 md:left-0 md:w-1/3 md:h-[calc(100vh-80px)] md:overflow-hidden md:px-6 md:pt-6 md:pb-6 [&>*]:flex [&>*]:h-full [&>*]:flex-col [&>*>*:last-child]:mt-auto">
        {sidebar}
      </aside>

      <main className="bg-cs-bg text-pure-black min-w-0 md:fixed md:top-20 md:left-1/3 md:right-0 md:h-[calc(100vh-80px)] md:overflow-y-scroll md:px-6 md:py-6">
        {children}
      </main>
    </div>
  )
}
