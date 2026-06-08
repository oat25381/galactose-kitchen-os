export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold text-red-500">
          GALACTOSE
        </h1>

        <p className="text-zinc-400 mt-1">
          Kitchen OS
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="bg-zinc-900 rounded-2xl p-6">
            <p className="text-zinc-400">📦 วัตถุดิบ</p>
            <h2 className="text-3xl font-bold mt-2">132</h2>
            <p className="text-zinc-500">รายการ</p>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-6">
            <p className="text-zinc-400">📖 สูตรอาหาร</p>
            <h2 className="text-3xl font-bold mt-2">108</h2>
            <p className="text-zinc-500">เมนู</p>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-6">
            <p className="text-zinc-400">📋 SOP</p>
            <h2 className="text-3xl font-bold mt-2">108</h2>
            <p className="text-zinc-500">รายการ</p>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-6">
            <p className="text-zinc-400">⚠️ ใกล้หมด</p>
            <h2 className="text-3xl font-bold mt-2">5</h2>
            <p className="text-zinc-500">รายการ</p>
          </div>

        </div>

        <div className="mt-8 bg-zinc-900 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">
            กิจกรรมล่าสุด
          </h3>

          <ul className="space-y-2 text-zinc-400">
            <li>• เพิ่มหมูสับ</li>
            <li>• เพิ่มคอหมูย่าง</li>
            <li>• ปรับสต๊อกพริก</li>
          </ul>
        </div>
      </div>
    </main>
  );
}