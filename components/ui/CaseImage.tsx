'use client'

import Image from 'next/image'
import type { LightboxImage } from '@/components/ui/Lightbox'

interface CaseImageProps {
  src: string
  alt: string
  width: number
  height: number
  onOpen: (image: LightboxImage) => void
}

export default function CaseImage({ src, alt, width, height, onOpen }: CaseImageProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen({ src, alt, width, height })}
      className="block w-full p-0 text-left"
    >
      <Image src={src} alt={alt} width={width} height={height} className="h-auto w-full" />
    </button>
  )
}
