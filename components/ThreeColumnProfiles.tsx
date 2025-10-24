import ProfileCard from "./ProfileCard"

interface Profile {
  name: string
  title: string
  bio: string
}

interface ThreeColumnProfilesProps {
  profiles: Profile[]
}

export default function ThreeColumnProfiles({ profiles }: ThreeColumnProfilesProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto">
      {profiles.map((profile, index) => (
        <ProfileCard key={index} {...profile} />
      ))}
    </div>
  )
}
