// app/services/[slug]/page.tsx
import { notFound } from 'next/navigation'
import BackButton from '@/components/BackButton'
import Navbar from '@/components/Navbar'

// 定义 Props 类型
interface ServiceDetailProps {
  params: {
    slug: string
  }
}

// 获取指定服务详情
async function fetchServiceBySlug(slug: string) {
  const res = await fetch(
    `http://localhost:1338/api/services?filters[slug][$eq]=${slug}&populate=*`,
    { cache: 'no-store' }
  )
  const data = await res.json()
  return data.data?.[0] || null
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

// 页面组件
export default async function ServiceDetailPage({ params }: ServiceDetailProps) {
  const service = await fetchServiceBySlug(params.slug)
  if (!service) notFound()

  const { title, description, icon, gallery } = service.attributes

  const imageUrl = icon?.data?.attributes?.url
    ? `http://localhost:1338${icon.data.attributes.url}`
    : null

  const galleryImages = gallery?.data?.map(
    (img: any) => `http://localhost:1338${img.attributes.url}`
  ) || []

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
      <div className="max-w-5xl mx-auto px-6 py-12 pt-24 backdrop-blur-md bg-black/40 rounded-xl shadow-xl">
        <BackButton className="mb-6" />
        <h1 className="text-4xl font-bold mb-4">{title}</h1>

        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="w-32 h-32 object-contain mb-6 rounded-xl bg-gray-800 p-2"
          />
        )}

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-2">服务内容</h2>
          <p className="text-gray-200 whitespace-pre-line">
            {extractPlainText(description)}
          </p>
        </section>

        {/* 图集展示 */}
        {galleryImages.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-green-400 mb-2">图集展示</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((url: string, index: number) => (
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
