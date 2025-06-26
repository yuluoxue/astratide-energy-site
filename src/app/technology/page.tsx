import Image from 'next/image'
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import BackButton from '@/components/BackButton'

// ✅ 技术数据结构定义
interface Technology {
  id: number
  attributes: {
    title: string
    slug: string
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

// ✅ 提取 Strapi 富文本为纯文本
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

export default function TechnologyPage() {
  const [technologies, setTechnologies] = useState<Technology[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:1338/api/technologies?populate=*')
        const data = await res.json()
        setTechnologies(data.data || [])
      } catch (error) {
        console.error('获取技术数据失败:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <main
      className="min-h-screen text-white pt-20 px-4"
      style={{
        backgroundImage: "url('/images/starry-background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <Navbar />
      <div className="max-w-6xl mx-auto py-12 backdrop-blur-md bg-black/40 rounded-xl shadow-xl">
        <BackButton className="mb-6" />

        <h1 className="text-4xl font-bold text-center mb-10">核心能源技术</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {technologies.map((tech) => (
            <Link key={tech.id} href={`/technology/${tech.attributes.slug}`}>
              <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white rounded-2xl shadow-xl p-5 flex flex-col gap-3 border border-gray-700 hover:border-cyan-400 transition-transform transform hover:scale-105 cursor-pointer">
                {/* 图标展示 */}
                {tech.attributes.icon?.data?.attributes?.url && (
                  <div className="w-16 h-16 p-2 bg-gray-700 rounded-xl flex items-center justify-center overflow-hidden">
                    <Image
                      src={`http://localhost:1338${tech.attributes.icon.data.attributes.url}`}
                      alt={tech.attributes.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}

                {/* 标题与描述 */}
                <h3 className="text-lg font-semibold">{tech.attributes.title}</h3>
                <p className="text-sm text-gray-300 line-clamp-3">
                  {extractPlainText(tech.attributes.description)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
