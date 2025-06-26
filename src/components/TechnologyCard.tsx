import { motion } from "framer-motion"

// 定义传入的技术卡片属性类型
interface TechnologyCardProps {
  title: string           // 技术名称
  description: string     // 技术描述
  icon?: string           // 图标图片地址（可选）
}

// 技术卡片组件
export default function TechnologyCard({ title, description, icon }: TechnologyCardProps) {
  return (
    // 使用 framer-motion 添加悬停缩放动效
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white rounded-2xl shadow-xl p-5 flex flex-col gap-3 border border-gray-700 hover:border-purple-400"
    >
      {/* 图标区域（如果有） */}
      {icon && (
        <div className="w-16 h-16 p-2 bg-gray-700 rounded-xl flex items-center justify-center overflow-hidden">
          <img
            src={icon}
            alt={title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {/* 内容区域 */}
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-300 line-clamp-4">{description}</p>
      </div>
    </motion.div>
  )
}
