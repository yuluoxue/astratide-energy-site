// components/ShipCard.tsx

interface ShipCardProps {
  name: string
  type: string
  description: string
  image?: string
}

export default function ShipCard({ name, type, description, image }: ShipCardProps) {
  return (
    <div className="flex flex-col gap-2">
      {image && (
        <img
          src={image}
          alt={name}
          className="w-full h-40 object-cover rounded-xl"
        />
      )}
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-sm text-cyan-400">类型：{type}</p>
      <p className="text-gray-300 text-sm line-clamp-3">{description}</p>
    </div>
  )
}
