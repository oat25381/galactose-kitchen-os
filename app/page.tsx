"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [ingredientCount, setIngredientCount] = useState(0);
  const [recipeCount, setRecipeCount] = useState(0);
  const [totalSellingPrice, setTotalSellingPrice] = useState(0);
  const [lowStockItems, setLowStockItems] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  function printLowStockReport() {
  const reportWindow = window.open("", "_blank");

  if (!reportWindow) return;

  const currentDate = new Date().toLocaleString("th-TH");

  reportWindow.document.write(`
    <html>
      <head>
        <title>รายงานวัตถุดิบใกล้หมด</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 30px;
          }

          h1 {
            text-align: center;
          }

          .item {
            margin-bottom: 15px;
          }

          hr {
            margin: 20px 0;
          }
        </style>
      </head>

      <body>
        <h1>GALACTOSE Kitchen OS</h1>

        <h2>รายงานวัตถุดิบใกล้หมด</h2>

        <p>วันที่: ${currentDate}</p>

        <hr />

        ${
          lowStockItems.length === 0
            ? "<p>ไม่มีวัตถุดิบที่ต้องแจ้งเตือน</p>"
            : lowStockItems
                .map(
                  (item, index) => `
                    <div class="item">
                      <strong>${index + 1}. ${item.name}</strong><br/>
                      คงเหลือ: ${item.stock_quantity} ${item.unit}<br/>
                      ขั้นต่ำ: ${item.minimum_stock} ${item.unit}
                    </div>
                  `
                )
                .join("")
        }

        <hr />

        <p>รวมทั้งหมด ${lowStockItems.length} รายการ</p>

        <br/><br/>

        <p>ผู้ตรวจสอบ: _____________________</p>
      </body>
    </html>
  `);

  reportWindow.document.close();

  reportWindow.print();
}

  async function fetchDashboard() {
    // จำนวนวัตถุดิบ
    const { count: ingredientTotal } = await supabase
      .from("ingredients")
      .select("*", { count: "exact", head: true });

    // จำนวนสูตรอาหาร
    const { count: recipeTotal } = await supabase
      .from("recipes")
      .select("*", { count: "exact", head: true });

    // ราคารวมของทุกเมนู
    const { data: recipes } = await supabase
      .from("recipes")
      .select("selling_price");

    const totalPrice =
      recipes?.reduce(
        (sum, item) => sum + Number(item.selling_price),
        0
      ) || 0;

    setIngredientCount(ingredientTotal || 0);
    setRecipeCount(recipeTotal || 0);
    setTotalSellingPrice(totalPrice);

    const { data: lowStock } = await supabase
  .from("ingredients")
  .select("*");

const warningItems =
  lowStock?.filter(
    (item) =>
      item.stock_quantity <= item.minimum_stock
  ) || [];

setLowStockItems(warningItems);
  
}

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
            <p className="text-zinc-400">
              📦 วัตถุดิบ
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {ingredientCount}
            </h2>

            <p className="text-zinc-500">
              รายการ
            </p>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-6">
            <p className="text-zinc-400">
              📖 สูตรอาหาร
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {recipeCount}
            </h2>

            <p className="text-zinc-500">
              เมนู
            </p>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-6">
            <p className="text-zinc-400">
              💰 ราคารวมทุกเมนู
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {totalSellingPrice.toFixed(0)}
            </h2>

            <p className="text-zinc-500">
              บาท
            </p>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-6">
            <p className="text-zinc-400">
              🚀 ระบบพร้อมใช้งาน
            </p>

            <h2 className="text-3xl font-bold mt-2">
              100%
            </h2>

            <p className="text-zinc-500">
              Galactose v1.1
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/ingredients"
            className="bg-red-600 hover:bg-red-700 rounded-2xl p-6 transition"
          >
            <h3 className="text-2xl font-bold">
              📦 วัตถุดิบ
            </h3>

            <p className="text-red-100 mt-2">
              จัดการวัตถุดิบทั้งหมด
            </p>
          </Link>

          <Link
            href="/recipes"
            className="bg-blue-600 hover:bg-blue-700 rounded-2xl p-6 transition"
          >
            <h3 className="text-2xl font-bold">
              🍳 สูตรอาหาร
            </h3>

            <p className="text-blue-100 mt-2">
              จัดการสูตรและต้นทุน
            </p>
          </Link>
        </div>

        <div className="mt-8 bg-zinc-900 rounded-2xl p-6">
  <h3 className="text-xl font-semibold mb-4 text-red-400">
    ⚠️ วัตถุดิบใกล้หมด
  </h3>

  <button
  onClick={printLowStockReport}
  className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl"
>
  🖨️ พิมพ์
</button>

  {lowStockItems.length === 0 ? (
    <p className="text-zinc-400">
      ไม่มีวัตถุดิบที่ต้องแจ้งเตือน
    </p>
  ) : (
    <ul className="space-y-2">
      {lowStockItems.map((item) => (
        <li key={item.id}>
          • {item.name} เหลือ{" "}
          {item.stock_quantity} {item.unit}
        </li>
      ))}
    </ul>
  )}
</div>


        <div className="mt-8 bg-zinc-900 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">
            กิจกรรมล่าสุด
          </h3>

          <ul className="space-y-2 text-zinc-400">
            <li>
              • ระบบเชื่อม Supabase สำเร็จ
            </li>

            <li>
              • ระบบคำนวณต้นทุนพร้อมใช้งาน
            </li>

            <li>
              • Galactose Kitchen OS เปิดใช้งานแล้ว
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
