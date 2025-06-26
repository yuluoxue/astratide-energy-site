// app/fleet/page.tsx

import Link from 'next/link'
import { notFound } from 'next/navigation'
import BackButton from '@/components/BackButton'
import ShipCard from '@/components/ShipCard'
import Navbar from '@/components/Navbar'

// ✅ 定义舰船类型（与 Strapi 后端结构匹配）
interface Ship {
  id: number
  attributes: {
    name: string
    description: string
    shipClass: string
    slug: string
    thumbnail?: {
      data?: {
        attributes: {
          url: string
        }
      }[]
    }
  }
}

// ✅ 获取所有舰船数据
async function fetchShips(): Promise<Ship[]> {
  const res = await fetch('http://localhost:1338/api/ships?populate=*', {
    cache: 'no-store',
  })

  const data = await res.json()
  return data.data || []
}

// ✅ 页面组件
export default async function FleetPage() {
  const ships = await fetchShips()

  if (!ships || ships.length === 0) {
    notFound()
  }

  return (
    <main
  className="min-h-screen text-white"
  style={{
    backgroundImage: "url('/images/starry-background.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  }}
>
  <Navbar />

      <BackButton className="mb-8" />

      <h1 className="text-3xl font-bold mb-8 text-center tracking-wide">
        舰船展示
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {ships.map((ship) => {
          const thumbnailUrl = ship.attributes.thumbnail?.data?.[0]?.attributes?.url
            ? `http://localhost:1338${ship.attributes.thumbnail.data[0].attributes.url}`
            : undefined

          return (
            <Link
              key={ship.id}
              href={`/fleet/${ship.attributes.slug}`}
              className="block"
            >
              <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl shadow-md p-4 hover:border-cyan-400 transition">
                <ShipCard
                  name={ship.attributes.name}
                  type={ship.attributes.shipClass}
                  description={ship.attributes.description}
                  image={thumbnailUrl}
                />
              </div>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
