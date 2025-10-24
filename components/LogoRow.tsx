export default function LogoRow() {
  // Placeholder logos - replace with actual partner logos
  const logos = Array.from({ length: 6 }, (_, i) => i + 1)

  return (
    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-40 grayscale">
      {logos.map((logo) => (
        <div key={logo} className="w-24 h-16 md:w-32 md:h-20 bg-gray-200 rounded-lg flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
          </svg>
        </div>
      ))}
    </div>
  )
}
