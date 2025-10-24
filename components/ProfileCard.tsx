interface ProfileCardProps {
  name: string
  title: string
  bio: string
}

export default function ProfileCard({ name, title, bio }: ProfileCardProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-1.5 sm:space-y-2 md:space-y-3 p-3 sm:p-4 md:p-5 rounded-xl bg-neutral-950/50 border border-neutral-800/50 hover:border-accent/30 transition-all duration-200 group">
      <div className="relative">
        <div className="absolute inset-0 bg-accent/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
        <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-accent via-accent/80 to-accent/60 flex items-center justify-center text-black text-sm sm:text-base md:text-lg font-bold shadow-lg">
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
      </div>

      <div className="space-y-0.5">
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight">{name}</h3>
        <p className="text-[10px] sm:text-xs md:text-sm text-accent font-semibold uppercase tracking-wider">{title}</p>
      </div>

      <p className="text-xs sm:text-sm md:text-base text-neutral-200 leading-relaxed font-normal line-clamp-2">{bio}</p>
    </div>
  )
}
