import { motion } from "framer-motion"

// ✅ 定义服务卡片组件的 Props（属性类型）
interface ServiceCardProps {
  title: string           // 服务标题
  description: string     // 服务描述（已转为纯文本）
  imageUrl?: string       // 图标地址（可选，如果没有就不显示）
}

// ✅ 服务卡片组件
export default function ServiceCard({ title, description, imageUrl }: ServiceCardProps) {
  return (
    // 📦 使用 framer-motion 提供悬停动画效果
    <motion.div
      whileHover={{ scale: 1.03 }}                      // 悬停放大
      transition={{ type: "spring", stiffness: 300 }}   // 弹性动画
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white rounded-2xl shadow-xl p-5 flex flex-col gap-3 border border-gray-700 hover:border-cyan-400"
    >
      {/* 🖼️ 如果有图片地址就显示图标 */}
      {imageUrl && (
        <div className="w-16 h-16 p-2 bg-gray-700 rounded-xl flex items-center justify-center overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {/* 📝 标题和描述内容 */}
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-300 line-clamp-4">{description}</p>
      </div>
    </motion.div>
  )
}
