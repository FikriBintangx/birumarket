// app/api/telegram/webhook/route.ts
// Menerima update dari Telegram: tombol Uda/Belom + /start
import { NextRequest, NextResponse } from "next/server";
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

export async function POST(req: NextRequest) {
  // Validasi secret biar cuma Telegram yang bisa hit endpoint ini
  const secret = req.headers.get("x-telegram-bot-api-secret-token");
  if (!process.env.TELEGRAM_WEBHOOK_SECRET || secret !== process.env.TELEGRAM_WEBHOOK_SECRET) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const update = await req.json();
  const db = supabase();

  // /start -> sapaan, biar admin tau bot hidup
  if (update.message?.text?.trim() === "/start") {
    await tg("sendMessage", {
      chat_id: update.message.chat.id,
      text:
        "Halo kak! 👋 Bot notifikasi toko aktif.\n\n" +
        'Tiap ada pembeli klik "Saya sudah bayar", notif + tombol Uda/Belom bakal masuk ke chat ini.',
    });
    return NextResponse.json({ ok: true });
  }

  // Tombol inline Uda / Belom
  const cb = update.callback_query;
  if (!cb?.data) return NextResponse.json({ ok: true });

  const [action, orderId] = String(cb.data).split(":");
  if (action !== "confirm" && action !== "reject")
    return NextResponse.json({ ok: true });

  const { data: order } = await db
    .from("orders")
    .select("id, total, telegram_message_id")
    .eq("id", orderId)
    .single();
  if (!order) {
    await tg("answerCallbackQuery", {
      callback_query_id: cb.id,
      text: "Order tidak ditemukan",
    });
    return NextResponse.json({ ok: true });
  }

  const status = action === "confirm" ? "paid" : "rejected";
  await db
    .from("orders")
    .update({ status, verified_at: new Date().toISOString() })
    .eq("id", orderId);

  await tg("answerCallbackQuery", {
    callback_query_id: cb.id,
    text: action === "confirm" ? "Ditandai LUNAS ✅" : "Ditolak ❌",
  });

  if (order.telegram_message_id) {
    await tg("editMessageText", {
      chat_id: process.env.TELEGRAM_ADMIN_CHAT_ID,
      message_id: order.telegram_message_id,
      text:
        `${action === "confirm" ? "✅ <b>LUNAS</b>" : "❌ <b>DITOLAK</b>"} — ${order.id}\n` +
        `Total: ${rupiah(order.total)}`,
      parse_mode: "HTML",
    });
  }

  return NextResponse.json({ ok: true });
}
