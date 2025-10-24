interface TaglineProps {
  text: string
}

export default function Tagline({ text }: TaglineProps) {
  return <p className="text-sm sm:text-base md:text-lg text-accent font-bold uppercase tracking-widest">{text}</p>
}
