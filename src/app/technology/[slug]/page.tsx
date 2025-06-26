// app/technology/[slug]/page.tsx

import { notFound } from 'next/navigation'
import BackButton from '@/components/BackButton'

// 参数类型
interface PageProps {
  params: {
    slug: string
  }
}

// 获取指定技术内容
async function fetchTechnologyBySlug(slug: string) {
  const res = await fetch(
    `http://localhost:1338/api/technologies?filters[slug][$eq]=${slug}&populate=*`,
    { cache: 'no-store' }
  )
  const data = await res.json()
  return data.data?.[0] || null
}

// 提取富文本纯文本
function extractPlainText(richText: any): string {
  if (Array.isArray(richText)) {
    return richText.map((block: any) =>
      block.children?.map((child: any) => child.text).join('') || ''
    ).join('\n')
  }
  return typeof richText === 'string' ? richText : ''
}

export default async function TechnologyDetailPage({ params }: PageProps) {
  const item = await fetchTechnologyBySlug(params.slug)
  if (!item) notFound()

  const { title, description, thumbnail, gallery } = item.attributes

  const thumbUrl = thumbnail?.data?.attributes?.url
    ? `http://localhost:1338${thumbnail.data.attributes.url}`
    : null

  const galleryImages: string[] =
    gallery?.data?.map((img: any) => `http://localhost:1338${img.attributes.url}`) || []

  return (
    <main
      className="min-h-screen text-white px-6 py-12"
      style={{
        backgroundImage: "url('/images/starry-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="bg-black bg-opacity-30 backdrop-blur-md p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
        <BackButton className="mb-6" />

        <h1 className="text-3xl font-bold mb-4">{title}</h1>

        {thumbUrl && (
          <img
            src={thumbUrl}
            alt={title}
            className="w-full max-w-3xl rounded-xl mb-6 mx-auto"
          />
        )}

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-2">技术描述</h2>
          <p className="text-gray-200 whitespace-pre-line">{extractPlainText(description)}</p>
        </section>

        {galleryImages.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-green-400 mb-2">图集</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`图 ${index + 1}`}
                  className="rounded-lg w-full object-cover"
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
