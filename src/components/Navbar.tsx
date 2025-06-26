'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: '首页' },
    { href: '/fleet', label: '舰船展示' },
    { href: '/technology', label: '核心技术' },
    { href: '/services', label: '服务项目' },
    { href: '/contact', label: '联系我们' },
    { href: '/about', label: '关于我们' }, // ✅ 新增的导航项
  ]

  return (
    <nav className="bg-black bg-opacity-60 backdrop-blur-sm px-6 py-4 fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-white text-2xl font-bold tracking-wide">AstraTide</h1>
        <div className="flex space-x-6">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-white hover:text-cyan-400 transition ${
                pathname === href ? 'border-b-2 border-cyan-400 pb-1' : ''
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
