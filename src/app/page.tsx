'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import ShipCard from '@/components/ShipCard'
import EnergyTechCard from '@/components/TechnologyCard'
import ServiceCard from '@/components/ServiceCard'
import Link from 'next/link'

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

interface Technology {
  id: number
  attributes: {
    title: string
    description: Record<string, any>
    icon?: {
      data?: {
        attributes: {
          url: string
        }
      }
    }
  }
}

interface Service {
  id: number
  attributes: {
    title: string
    description: Record<string, any>
    icon?: {
      data?: {
        attributes: {
          url: string
        }
      }
    }
  }
}

function extractPlainText(richText: Record<string, any>): string {
  if (Array.isArray(richText)) {
    return richText
      .map((block: Record<string, any>) =>
        block.children?.map((child: Record<string, any>) => child.text).join('') || ''
      )
      .join('\n')
  }
  return typeof richText === 'string' ? richText : ''
}

export default function Home() {
  const [ships, setShips] = useState<Ship[]>([])
  const [technologies, setTechnologies] = useState<Technology[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [shipRes, techRes, serviceRes] = await Promise.all([
          fetch('http://localhost:1338/api/ships?populate=*'),
          fetch('http://localhost:1338/api/technologies?populate=*'),
          fetch('http://localhost:1338/api/services?populate=*'),
        ])

        const [shipData, techData, serviceData] = await Promise.all([
          shipRes.json(),
          techRes.json(),
          serviceRes.json(),
        ])

        setShips(shipData.data || [])
        setTechnologies(techData.data || [])
        setServices(serviceData.data || [])
      } catch (err) {
        console.error('获取首页数据失败:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [])

  return (
    <main
      className="min-h-screen text-white text-white px-6 pt-24 pb-12"
      style={{
        backgroundImage: "url('/images/starry-background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <Navbar />

      <div
        className="px-8 py-12"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '1rem',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6 tracking-wide">AstraTide Energy</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Powering the Cosmos — 星际潮汐能源，致力于为银河系提供下一代太空能源解决方案。
          </p>
          <div className="mt-12">
            <Link
              href="/fleet"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-lg transition"
            >
              查看舰船展示 →
            </Link>
          </div>
        </section>

        <section id="fleet" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">舰船展示</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {ships.map((ship) => (
              <Link
                key={ship.id}
                href={`/fleet/${ship.attributes.slug}`}
                className="block"
              >
                <ShipCard
                  name={ship.attributes.name}
                  type={ship.attributes.shipClass}
                  description={ship.attributes.description}
                  image={
                    ship.attributes.thumbnail?.data?.[0]?.attributes?.url
                      ? `http://localhost:1338${ship.attributes.thumbnail.data[0].attributes.url}`
                      : undefined
                  }
                />
              </Link>
            ))}
          </div>
        </section>

        <section id="energy" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">核心能源技术</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {technologies.map((tech) => (
              <EnergyTechCard
                key={tech.id}
                title={tech.attributes.title}
                description={extractPlainText(tech.attributes.description)}
                icon={
                  tech.attributes.icon?.data?.attributes?.url
                    ? `http://localhost:1338${tech.attributes.icon.data.attributes.url}`
                    : undefined
                }
              />
            ))}
          </div>
        </section>

        <section id="services" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">服务项目</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.attributes.title}
                description={extractPlainText(service.attributes.description)}
                imageUrl={
                  service.attributes.icon?.data?.attributes?.url
                    ? `http://localhost:1338${service.attributes.icon.data.attributes.url}`
                    : undefined
                }
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
