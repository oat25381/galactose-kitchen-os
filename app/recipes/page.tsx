"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Recipe = {
  id: number;
  name: string;
  selling_price: number;
};

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [name, setName] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchRecipes();
  }, []);

  async function fetchRecipes() {
    const { data, error } = await supabase
      .from("recipes")
      .select("*")
      .order("id");

    if (error) {
      alert(JSON.stringify(error));
      console.log(error);
      return;
    }

    setRecipes(data || []);
  }

  async function addRecipe() {
    const { error } = await supabase
      .from("recipes")
      .insert([
        {
          name,
          selling_price: Number(sellingPrice),
        },
      ]);

    if (error) {
      alert(JSON.stringify(error));
      console.log(error);
      return;
    }

    alert("เพิ่มสูตรอาหารสำเร็จ");

    setName("");
    setSellingPrice("");

    fetchRecipes();
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-red-500 mb-6">
        สูตรอาหารทั้งหมด
      </h1>

      <input
        type="text"
        placeholder="ค้นหาสูตรอาหาร..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 rounded-xl bg-zinc-900 text-white mb-6 border border-zinc-800"
      />

      <div className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="ชื่อเมนู"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800"
        />

        <input
          type="number"
          placeholder="ราคาขาย"
          value={sellingPrice}
          onChange={(e) => setSellingPrice(e.target.value)}
          className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800"
        />

        <button
          onClick={addRecipe}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl"
        >
          + เพิ่มสูตรอาหาร
        </button>
      </div>

      <div className="space-y-4">
        {recipes
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
                ราคาขาย: {item.selling_price} บาท
              </p>
            </div>
          ))}
      </div>
    </main>
  );
}