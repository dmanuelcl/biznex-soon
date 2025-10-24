interface CircleGridProps {
  items: string[]
}

export default function CircleGrid({ items }: CircleGridProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center justify-center gap-2 group">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-neutral-900 border border-accent/30 flex items-center justify-center group-hover:border-accent group-hover:scale-105 transition-all duration-200">
              <span className="text-base sm:text-lg md:text-2xl font-bold text-accent">{index + 1}</span>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-neutral-200 font-medium text-center leading-relaxed max-w-[80px] sm:max-w-[100px] md:max-w-[120px] text-balance">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
