// app/api/order/route.ts — buat order baru
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function supabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

const genId = () =>
  "ORD-" +
  Date.now().toString(36).toUpperCase() +
  Math.random().toString(36).slice(2, 6).toUpperCase();

export async function POST(req: NextRequest) {
  try {
    const { items = [], total = 0, buyer = {} } = await req.json();
    const id = genId();

    const { error } = await supabase().from("orders").insert({
      id,
      items,
      total,
      buyer_name: buyer.name || null,
      buyer_contact: buyer.contact || null,
      status: "awaiting_payment",
    });
    if (error) throw error;

    return NextResponse.json({
      order: { id, items, total, buyer, status: "awaiting_payment" },
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "gagal buat order";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
