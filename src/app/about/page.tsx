'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import BackButton from '@/components/BackButton'
import Image from 'next/image'

interface AboutData {
  title: string
  content: string
  image?: {
    url: string
  }
}

export default function AboutPage() {
  const [about, setAbout] = useState<AboutData | null>(null)

  useEffect(() => {
    // 🚀 从 Strapi 获取关于我们页面内容
    const fetchAbout = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/abouts?filters[slug][$eq]=about&populate=*`)
        const json = await res.json()
        const data = json.data[0]?.attributes
        if (data) {
          setAbout({
            title: data.title,
            content: data.content,
            image: data.image?.data?.attributes?.url
              ? {
                  url: process.env.NEXT_PUBLIC_STRAPI_URL + data.image.data.attributes.url,
                }
              : undefined,
          })
        }
      } catch (error) {
        console.error('获取关于我们内容失败', error)
      }
    }

    fetchAbout()
  }, [])

  return (
    <main
      className="min-h-screen text-white px-6 py-12"
      style={{
        backgroundImage: "url('/images/starry-background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <Navbar />

      <div className="bg-black bg-opacity-40 backdrop-blur-lg p-6 rounded-xl shadow-lg max-w-5xl mx-auto mt-24">
        <BackButton className="mb-6" />

        {/* 标题 */}
        <h1 className="text-3xl font-bold text-cyan-400 mb-4">
          {about?.title || '关于 AstraTide Energy'}
        </h1>

        {/* 封面图（可选） */}
        {about?.image && (
          <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
            <Image
              src={about.image.url}
              alt="关于我们封面图"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        )}

        {/* 正文内容 */}
        <p className="text-gray-200 leading-relaxed whitespace-pre-line">
          {about?.content || '加载中...'}
        </p>
      </div>
    </main>
  )
}
