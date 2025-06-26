'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import BackButton from '@/components/BackButton'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    setError('')
    try {
      const res = await fetch('http://localhost:1338/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: form }),
      })
      if (!res.ok) throw new Error('提交失败')
      setSuccess(true)
      setForm({ name: '', email: '', message: '' })
    } catch {
      setError('提交失败，请稍后再试。')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main
      className="min-h-screen text-white px-8 py-12"
      style={{
        backgroundImage: "url('/images/starry-background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <Navbar />
      <div className="bg-black bg-opacity-40 backdrop-blur-lg p-6 rounded-xl shadow-lg max-w-2xl mx-auto mt-24">
        <BackButton className="mb-6" />
        <h1 className="text-3xl font-bold mb-6">联系我们</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1">姓名</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">邮箱</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">留言</label>
            <textarea
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded transition"
          >
            {loading ? '提交中...' : '提交留言'}
          </button>

          {success && <p className="text-green-400 mt-2">提交成功！感谢您的留言。</p>}
          {error && <p className="text-red-400 mt-2">{error}</p>}
        </form>
      </div>
    </main>
  )
}
