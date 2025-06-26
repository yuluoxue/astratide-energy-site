export default function ContactSection() {
  return (
    <div className="max-w-xl mx-auto bg-gray-800 p-8 rounded-xl text-white">
      <h2 className="text-2xl font-bold mb-4">联系我们</h2>
      <p className="text-gray-300 mb-6">欢迎与 AstraTide Energy 联络，我们为您提供星际能源与舰船技术服务。</p>
      <form className="space-y-4">
        <input type="text" placeholder="你的名字" className="w-full p-2 rounded bg-gray-700 text-white" />
        <input type="email" placeholder="你的邮箱" className="w-full p-2 rounded bg-gray-700 text-white" />
        <textarea placeholder="你的消息" rows={4} className="w-full p-2 rounded bg-gray-700 text-white"></textarea>
        <button type="submit" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 transition">发送</button>
      </form>
    </div>
  )
}
