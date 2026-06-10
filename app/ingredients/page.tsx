"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Ingredient = {
  id: number;
  name: string;
  category: string;
  cost: number;
  unit: string;
  stock_quantity: number;
  minimum_stock: number;
};

export default function IngredientsPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [cost, setCost] = useState("");
  const [unit, setUnit] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
const [minimumStock, setMinimumStock] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchIngredients();
  }, []);

  async function fetchIngredients() {
    const { data, error } = await supabase
      .from("ingredients")
      .select("*")
      .order("id");

    if (error) {
      alert(JSON.stringify(error));
      console.log(error);
      return;
    }

    setIngredients(data || []);
  }

  async function addIngredient() {
    const { error } = await supabase
      .from("ingredients")
      .insert([
        {
  name,
  category,
  cost: Number(cost),
  unit,
  stock_quantity: Number(stockQuantity),
  minimum_stock: Number(minimumStock),
},
      ]);

    if (error) {
      alert(JSON.stringify(error));
      console.log(error);
      return;
    }

    alert("เพิ่มวัตถุดิบสำเร็จ");

    setName("");
    setCategory("");
    setCost("");
    setUnit("");
    setStockQuantity("");
    setMinimumStock("");

    fetchIngredients();
  }

  async function deleteIngredient(id: number) {
    const confirmDelete = confirm("ต้องการลบวัตถุดิบนี้ใช่ไหม?");

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("ingredients")
      .delete()
      .eq("id", id);

    if (error) {
      alert(JSON.stringify(error));
      console.log(error);
      return;
    }

    alert("ลบสำเร็จ");

    fetchIngredients();
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-red-500 mb-6">
        วัตถุดิบทั้งหมด
      </h1>

      <input
        type="text"
        placeholder="ค้นหาวัตถุดิบ..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 rounded-xl bg-zinc-900 text-white mb-6 border border-zinc-800"
      />

      <div className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="ชื่อวัตถุดิบ"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800"
        />

        <input
          type="text"
          placeholder="หมวดหมู่"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800"
        />

        <input
          type="number"
          placeholder="ต้นทุน"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800"
        />

        <input
          type="text"
          placeholder="หน่วย"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800"
        />
<input
  type="number"
  placeholder="สต๊อกคงเหลือ"
  value={stockQuantity}
  onChange={(e) => setStockQuantity(e.target.value)}
  className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800"
/>

<input
  type="number"
  placeholder="ขั้นต่ำที่ต้องแจ้งเตือน"
  value={minimumStock}
  onChange={(e) => setMinimumStock(e.target.value)}
  className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800"
/>
        <button
          onClick={addIngredient}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl"
        >
          + เพิ่มวัตถุดิบ
        </button>
      </div>

      <div className="space-y-4">
        {ingredients
          .filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((item) => (
            <div
              key={item.id}
              className="bg-zinc-900 rounded-xl p-4"
            >
              <h2 className="font-semibold text-lg">
                {item.name}
              </h2>

              <p className="text-zinc-400">
                หมวด: {item.category}
              </p>
              
              <p className="text-zinc-400">
  สต๊อก: {item.stock_quantity} {item.unit}
</p>

<p
  className={
    item.stock_quantity <= item.minimum_stock
      ? "text-red-400"
      : "text-zinc-400"
  }
>
  ขั้นต่ำ: {item.minimum_stock} {item.unit}
</p>

              <p className="text-zinc-400">
                ต้นทุน: {item.cost} บาท/{item.unit}
              </p>

              <button
                onClick={() => deleteIngredient(item.id)}
                className="mt-3 bg-red-700 hover:bg-red-800 px-3 py-2 rounded-lg"
              >
                🗑️ 
              </button>
            </div>
          ))}
      </div>
    </main>
  );
}

