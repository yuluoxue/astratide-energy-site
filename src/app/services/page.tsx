'use client'

import { useEffect, useState } from 'react'
import ServiceCard from '@/components/ServiceCard'
import Navbar from '@/components/Navbar'
import BackButton from '@/components/BackButton'
import Link from 'next/link' // ✅ 引入 Link 组件

// 类型定义
interface Service {
  id: number
  attributes: {
    title: string
    slug: string               // ✅ 添加 slug 字段
    description: any
    icon?: {
      data?: {
        attributes: {
          url: string
        }
      }
    }
  }
}

// 提取富文本为纯文本
function extractPlainText(richText: any): string {
  if (Array.isArray(richText)) {
    return richText
      .map((block: any) =>
        block.children?.map((child: any) => child.text).join('') || ''
      )
      .join('\n')
  }
  return typeof richText === 'string' ? richText : ''
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('http://localhost:1338/api/services?populate=*')
        const data = await res.json()
        setServices(data.data || [])
      } catch (err) {
        console.error('获取服务内容失败:', err)
      }
    }

    fetchServices()
  }, [])

  return (
    <main
      className="min-h-screen text-white"
      style={{
        backgroundImage: "url('/images/starry-background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <Navbar />
      <BackButton className="mb-6" />

      <div className="max-w-6xl mx-auto px-6 py-12 backdrop-blur-md bg-black/40 rounded-xl shadow-xl">
        <h1 className="text-4xl font-bold text-center mb-10">我们的服务</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.attributes.slug}`} // ✅ 跳转详情页
              className="hover:shadow-lg transition-shadow"
            >
              <ServiceCard
                title={service.attributes.title}
                description={extractPlainText(service.attributes.description)}
                imageUrl={
                  service.attributes.icon?.data?.attributes?.url
                    ? `http://localhost:1338${service.attributes.icon.data.attributes.url}`
                    : undefined
                }
              />
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
