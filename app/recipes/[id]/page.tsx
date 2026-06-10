"use client";

import { use, useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

type Recipe = {
  id: number;
  name: string;
  selling_price: number;
};

type Ingredient = {
  id: number;
  name: string;
};

type RecipeIngredient = {
  id: number;
  quantity: number;
  ingredients: {
    name: string;
    cost: number;
    unit: string;
    }[];
};

export default function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [recipe, setRecipe] = useState<Recipe | null>(null);

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [ingredientId, setIngredientId] = useState("");
  const [quantity, setQuantity] = useState("");


  const [recipeIngredients, setRecipeIngredients] =
    useState<RecipeIngredient[]>([]);

    const [editPrice, setEditPrice] = useState("");

  useEffect(() => {
    fetchRecipe();
    fetchIngredients();
    fetchRecipeIngredients();
  }, []);

  async function fetchRecipe() {
    const { data, error } = await supabase
      .from("recipes")
      .select("*")
      .eq("id", id)
      .single();

    console.log("ID =", id);
    console.log("DATA =", data);
    console.log("ERROR =", error);

    if (error) {
      alert(JSON.stringify(error));
      return;
    }

    setRecipe(data);
    setEditPrice(String(data.selling_price));
  }

  async function fetchIngredients() {
    const { data, error } = await supabase
      .from("ingredients")
      .select("id, name")
      .order("name");

    if (error) {
      alert(JSON.stringify(error));
      return;
    }

    setIngredients(data || []);
  }

  async function fetchRecipeIngredients() {
    const { data, error } = await supabase
      .from("recipe_ingredients")
      .select(`
        id,
        quantity,
        ingredients (
          name,
          cost,
          unit
        )
      `)
      .eq("recipe_id", Number(id));

    if (error) {
      alert(JSON.stringify(error));
      return;
    }

    setRecipeIngredients((data as RecipeIngredient[]) || []);
  }

  async function addIngredientToRecipe() {
    const { error } = await supabase
      .from("recipe_ingredients")
      .insert([
        {
          recipe_id: Number(id),
          ingredient_id: Number(ingredientId),
          quantity: Number(quantity),
        },
      ]);

    if (error) {
      alert(JSON.stringify(error));
      return;
    }

    alert("เพิ่มวัตถุดิบเข้าสูตรสำเร็จ");

    setIngredientId("");
    setQuantity("");

    fetchRecipeIngredients();
  }

  async function deleteRecipeIngredient(id: number) {
  const confirmDelete = confirm(
    "ต้องการลบวัตถุดิบออกจากสูตรนี้ใช่ไหม?"
  );

  if (!confirmDelete) return;

  const { error } = await supabase
    .from("recipe_ingredients")
    .delete()
    .eq("id", id);

  if (error) {
    alert(JSON.stringify(error));
    return;
  }

  alert("ลบวัตถุดิบออกจากสูตรสำเร็จ");

  fetchRecipeIngredients();
}

async function updateRecipeIngredient(
  id: number,
  quantity: number
) {
  const newQuantity = prompt(
    "ปริมาณใหม่ (กรัม)",
    String(quantity)
  );

  if (!newQuantity) return;

  async function updateSellingPrice() {
  const { error } = await supabase
    .from("recipes")
    .update({
      selling_price: Number(editPrice),
    })
    .eq("id", Number(id));

  if (error) {
    alert(JSON.stringify(error));
    return;
  }

  alert("อัปเดตราคาขายสำเร็จ");

  fetchRecipe();
}

  if (!recipe) {
    return (
      <main className="min-h-screen bg-black text-white p-6">
        กำลังโหลด...
      </main>
    );
  }

<p>
  {ingredient?.name} — {item.quantity} กรัม
</p>

  const profit = recipe.selling_price - totalCost;

  const foodCostPercent =
    recipe.selling_price > 0
      ? (totalCost / recipe.selling_price) * 100
      : 0;

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-red-500 mb-4">
        {recipe.name}
      </h1>

      <p className="text-zinc-400 mb-6">
        ราคาขาย: {recipe.selling_price} บาท
      </p>

      <div className="mb-8 space-y-3">
  <input
    type="number"
    value={editPrice}
    onChange={(e) => setEditPrice(e.target.value)}
    className="w-full p-3 rounded-xl bg-zinc-900"
  />

  <button
    onClick={updateSellingPrice}
    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl"
  >
    ✏️ 
  </button>
</div>

      <div className="mt-8 space-y-4">
        <h2 className="text-2xl font-bold">
          เพิ่มวัตถุดิบ
        </h2>

        <select
          value={ingredientId}
          onChange={(e) => setIngredientId(e.target.value)}
          className="w-full p-3 rounded-xl bg-zinc-900"
        >
          <option value="">เลือกวัตถุดิบ</option>

          {ingredients.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="ปริมาณ (กรัม)"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full p-3 rounded-xl bg-zinc-900"
        />

        <button
          onClick={addIngredientToRecipe}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl"
        >
          + เพิ่มเข้าสูตร
        </button>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">
          วัตถุดิบในสูตร
        </h2>

        <div className="space-y-3">
          {recipeIngredients.map((item) => {
 const itemCost =
  ((item.ingredients?.cost || 0) / 1000) *
  item.quantity;

  return (
    <div
      key={item.id}
      className="bg-zinc-900 rounded-xl p-4"
    >
     <p>
  {item.ingredients?.name} —{" "}
  {item.quantity} กรัม
</p>

      <p className="text-zinc-400">
        {itemCost.toFixed(2)} บาท
      </p>
<button
  onClick={() =>
    updateRecipeIngredient(
      item.id,
      item.quantity
    )
  }
  className="mt-3 mr-2 bg-blue-700 hover:bg-blue-800 px-3 py-2 rounded-lg"
>
  ✏️ 
</button>

      <button
        onClick={() =>
          deleteRecipeIngredient(item.id)
        }
        className="mt-3 bg-red-700 hover:bg-red-800 px-3 py-2 rounded-lg"
      >
        🗑️ 
      </button>
    </div>
  );
})}
        </div>

        <div className="mt-8 bg-zinc-900 rounded-xl p-6 space-y-2">
          <p>
            ต้นทุนรวม:{" "}
            <strong>
              {totalCost.toFixed(2)} บาท
            </strong>
          </p>

          <p>
            กำไร:{" "}
            <strong>
              {profit.toFixed(2)} บาท
            </strong>
          </p>

          <p>
            Food Cost:{" "}
            <strong>
              {foodCostPercent.toFixed(1)}%
            </strong>
          </p>
        </div>
      </div>
    </main>
  );
}
