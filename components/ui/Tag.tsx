interface TagProps {
  children: React.ReactNode
}

export default function Tag({ children }: TagProps) {
  return (
    <span className="inline-block border border-border-dark text-caption uppercase font-sans font-normal text-light-gray px-2 py-1">
      {children}
    </span>
  )
}
