import Image from 'next/image'
import type { ReactNode } from 'react'

interface CommentProps {
  lead?: string
  children: ReactNode
}

export default function Comment({ lead, children }: CommentProps) {
  return (
    <div className="flex justify-center px-6">
      <div className="inline-flex max-w-full items-center gap-3 rounded-[24px_24px_24px_0px] border border-border-light bg-cs-bg p-4 shadow-md">
        <Image
          src="/images/profile-picture.webp"
          alt="Diego Suarez"
          width={96}
          height={96}
          className="h-12 w-12 shrink-0 rounded-full object-cover"
        />
        <p className="font-sans text-body3 text-pure-black">
          {lead && <span className="font-semibold">{lead} </span>}
          {children}
        </p>
      </div>
    </div>
  )
}
