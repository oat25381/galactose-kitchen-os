
export default function IngredientsPage() {
  const ingredients = [
    
    {
      name: "หมูสับ",
      category: "เนื้อสัตว์",
      cost: 150,
      unit: "กิโลกรัม",
    },
    {
      name: "สันคอหมู",
      category: "เนื้อสัตว์",
      cost: 160,
      unit: "กิโลกรัม",
    },
    {
      name: "พริก",
      category: "ผัก",
      cost: 30,
      unit: "กิโลกรัม",
    },
    {
      name: "กระเทียม",
      category: "ผัก",
      cost: 40,
      unit: "กิโลกรัม",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-red-500 mb-6">
        วัตถุดิบทั้งหมด
      </h1>
      <input
  type="text"
  placeholder="ค้นหาวัตถุดิบ..."
  className="w-full p-3 rounded-xl bg-zinc-900 text-white mb-6 border border-zinc-800"
/>

<button
  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl mb-6"
>
  + เพิ่มวัตถุดิบ
</button>
<div className="space-y-4"></div>
      <div className="space-y-4">
        {ingredients.map((item) => (
          <div
            key={item.name}
            className="bg-zinc-900 rounded-xl p-4"
          >
            <h2 className="font-semibold text-lg">
              {item.name}
            </h2>

            <p className="text-zinc-400">
              หมวด: {item.category}
            </p>

            <p className="text-zinc-400">
              ต้นทุน: {item.cost} บาท/{item.unit}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}