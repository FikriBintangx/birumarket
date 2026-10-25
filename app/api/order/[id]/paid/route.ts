// app/api/order/[id]/paid/route.ts
// Pembeli klik "Saya sudah bayar" -> kirim notif Telegram ke admin + tombol Uda/Belom
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function supabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

const rupiah = (n: number) => "Rp" + Number(n).toLocaleString("id-ID");

async function tg(method: string, body: unknown) {
  const r = await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/${method}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );
  return r.json();
}

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = supabase();

  const { data: order, error } = await db
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !order)
    return NextResponse.json({ error: "order tidak ditemukan" }, { status: 404 });
  if (order.status !== "awaiting_payment")
    return NextResponse.json({ order });

  await db.from("orders").update({ status: "verifying" }).eq("id", id);

  const items = (order.items as { name: string; price: number }[]) || [];
  const itemLines = items.map((i) => `• ${i.name} — ${rupiah(i.price)}`).join("\n");

  const text =
    `🧾 <b>Pesanan baru menunggu verifikasi</b>\n\n` +
    `<b>ID:</b> ${order.id}\n` +
    `<b>Pembeli:</b> ${order.buyer_name || "-"} (${order.buyer_contact || "-"})\n` +
    `<b>Total:</b> ${rupiah(order.total)}\n\n` +
    `${itemLines}\n\n` +
    `ada yg beli ni, uda masuk belom saldo nya?`;

  const sent = await tg("sendMessage", {
    chat_id: process.env.TELEGRAM_ADMIN_CHAT_ID,
    text,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          { text: "✅ Uda", callback_data: `confirm:${order.id}` },
          { text: "❌ Belom", callback_data: `reject:${order.id}` },
        ],
      ],
    },
  });

  if (sent?.result?.message_id) {
    await db
      .from("orders")
      .update({ telegram_message_id: sent.result.message_id })
      .eq("id", id);
  }

  return NextResponse.json({ order: { ...order, status: "verifying" } });
}
