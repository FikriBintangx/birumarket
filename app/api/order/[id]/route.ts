// app/api/order/[id]/route.ts — cek status order (dipolling widget)
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function supabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { data, error } = await supabase()
    .from("orders")
    .select("id, items, total, buyer_name, buyer_contact, status, created_at")
    .eq("id", id)
    .single();

  if (error || !data)
    return NextResponse.json({ error: "order tidak ditemukan" }, { status: 404 });

  return NextResponse.json({ order: data });
}
