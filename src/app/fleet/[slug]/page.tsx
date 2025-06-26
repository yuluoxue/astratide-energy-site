import Image from 'next/image'
import { notFound } from 'next/navigation'
import BackButton from '@/components/BackButton'

// 获取指定 slug 的舰船数据
async function fetchShipBySlug(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/ships?filters[slug][$eq]=${slug}&populate=*`,
    { cache: 'no-store' }
  )
  const data = await res.json()
  return data.data?.[0] || null
}

// 提取 Strapi 富文本为纯文本
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

// ✅ 不使用 interface PageProps，直接函数参数解构
export default async function Page({
  params,
}: {
  params: { slug: string }
}) {
  const ship = await fetchShipBySlug(params.slug)
  if (!ship) notFound()

  const {
    name,
    description,
    shipClass,
    thumbnail,
    crew_full,
    crew_min,
    length,
    width,
    height,
    mass_empty,
    mass_full,
    endurance,
    launchedAt,
    generation,
    firepower,
    specialTech,
  } = ship.attributes

  const imageUrl = thumbnail?.data?.[0]?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_API_URL}${thumbnail.data[0].attributes.url}`
    : null

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
      <div
        className="p-6 sm:p-10 rounded-xl shadow-xl max-w-6xl mx-auto"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '1rem',
        }}
      >
        <BackButton className="mb-6" />
        <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">{name}</h1>
        <p className="text-cyan-400 text-lg mb-6 drop-shadow">类型：{shipClass}</p>

        {imageUrl && (
          <Image
            src={imageUrl}
            alt={name}
            className="w-full max-w-2xl rounded-xl mb-6 mx-auto"
            width={800}
            height={600}
          />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-gray-200 drop-shadow">
          <p>满载定员：{crew_full ?? '未知'} 人</p>
          <p>最小定员：{crew_min ?? '未知'} 人</p>
          <p>
            舰船尺寸：{length ?? '未知'}m × {width ?? '未知'}m × {height ?? '未知'}m
          </p>
          <p>空载质量：{mass_empty ?? '未知'} 吨</p>
          <p>满载质量：{mass_full ?? '未知'} 吨</p>
          <p>最大无补给远航时间：{endurance ?? '未知'}</p>
          <p>首航时间：{launchedAt ? new Date(launchedAt).toLocaleDateString() : '未知'}</p>
          <p>当前设计代数：{generation ?? '未知'}</p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-2 drop-shadow">舰船概述</h2>
          <p className="text-gray-100 whitespace-pre-line drop-shadow">{description}</p>
        </section>

        {firepower && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-red-400 mb-2 drop-shadow">火力配置</h2>
            <p className="text-gray-100 whitespace-pre-line drop-shadow">
              {extractPlainText(firepower)}
            </p>
          </section>
        )}

        {specialTech && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-yellow-400 mb-2 drop-shadow">特别功能</h2>
            <p className="text-gray-100 whitespace-pre-line drop-shadow">
              {extractPlainText(specialTech)}
            </p>
          </section>
        )}
      </div>
    </main>
  )
}
