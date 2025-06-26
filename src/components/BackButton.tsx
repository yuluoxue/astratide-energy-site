'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import React from 'react'

interface BackButtonProps {
  className?: string
}

export default function BackButton({ className = '' }: BackButtonProps) {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className={`inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow transition duration-300 ${className}`}
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      返回上一页
    </button>
  )
}
