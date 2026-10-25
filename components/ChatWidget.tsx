"use client";

import { useEffect, useRef, useState } from "react";

/* ============================================================
 * ChatWidget — chatbot + alur checkout (versi Next.js App Router)
 * Taruh di: components/ChatWidget.tsx
 * Pakai di layout:  <ChatWidget products={[...]} qrisImageUrl="/qris.png" />
 * ============================================================ */

export interface Product {
  id: string;
  name: string;
  price: number;
  kind: "codingan" | "project" | "canva";
}

interface ChatWidgetProps {
  apiBase?: string; // default "" -> pakai relative path /api/...
  qrisImageUrl: string;
  products: Product[];
  botName?: string;
}

interface Msg {
  from: "bot" | "user";
  text: string;
}

type Stage = "idle" | "awaiting_payment" | "verifying" | "done";

const rupiah = (n: number) => "Rp" + n.toLocaleString("id-ID");

const QUICK_REPLIES = ["Cara beli", "Metode bayar", "Lihat produk", "Bantuan admin"];

export default function ChatWidget({
  apiBase = "",
  qrisImageUrl,
  products,
  botName = "ArBot",
}: ChatWidgetProps) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "bot", text: `Halo kak! 👋 Aku ${botName}, siap bantu. Mau tanya-tanya dulu atau langsung beli?` },
  ]);
  const [input, setInput] = useState("");
  const [stage, setStage] = useState<Stage>("idle");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderTotal, setOrderTotal] = useState(0);
  const [buyer, setBuyer] = useState({ name: "", contact: "" });
  const [askField, setAskField] = useState<"name" | "contact" | null>(null);
  const [pendingProduct, setPendingProduct] = useState<Product | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, open]);

  useEffect(() => () => { if (pollRef.current) clearInterval(pollRef.current); }, []);

  const say = (text: string, from: "bot" | "user" = "bot") =>
    setMsgs((m) => [...m, { from, text }]);

  function botReply(raw: string) {
    const t = raw.toLowerCase();

    if (askField === "name") {
      setBuyer((b) => ({ ...b, name: raw.trim() }));
      setAskField("contact");
      say(`Oke ${raw.trim()}! Terakhir, nomor WA / Telegram kakak berapa?`);
      return;
    }
    if (askField === "contact") {
      const b = { ...buyer, contact: raw.trim() };
      setBuyer(b);
      setAskField(null);
      createOrder(b);
      return;
    }

    if (t.includes("cara beli") || t.includes("beli")) {
      say("Gampang kak! Pilih produk di bawah ini, terus scan QRIS buat bayar. Setelah bayar, klik tombol 'Saya sudah bayar' ya.");
      showProducts();
    } else if (t.includes("bayar") || t.includes("qris") || t.includes("metode")) {
      say("Pembayarannya via QRIS kak, bisa dari m-banking / e-wallet apa aja (BCA, DANA, GoPay, OVO, dll). Scan kodenya, masukin nominal pas, terus klik 'Saya sudah bayar'.");
    } else if (t.includes("produk") || t.includes("lihat") || t.includes("katalog")) {
      showProducts();
    } else if (t.includes("admin") || t.includes("bantuan") || t.includes("cs")) {
      say("Siap! Admin bakal dihubungi. Sementara itu kakak bisa tanya-tanya dulu di sini, atau lanjut pilih produk ya.");
    } else if (t.includes("halo") || t.includes("hai") || t.includes("pagi") || t.includes("siang") || t.includes("malam")) {
      say("Halo juga kak! 👋 Mau cari codingan, project, atau template Canva?");
    } else if (t.includes("makasih") || t.includes("thanks") || t.includes("thank")) {
      say("Sama-sama kak! 🙏 Ditunggu orderannya ya.");
    } else {
      say("Hmm, aku kurang paham kak 😅 Coba pilih salah satu tombol di bawah, atau ketik 'produk' buat lihat katalog.");
    }
  }

  function showProducts() {
    const list = products.map((p) => `${p.name} — ${rupiah(p.price)}`).join("\n");
    say(`Ini katalognya kak:\n${list}\n\nKlik tombol produk di bawah buat pilih ya.`);
  }

  async function createOrder(b: { name: string; contact: string }) {
    const p = pendingProduct;
    if (!p) return;
    try {
      const r = await fetch(`${apiBase}/api/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{ name: p.name, price: p.price }],
          total: p.price,
          buyer: b,
        }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "gagal buat order");
      setOrderId(data.order.id);
      setOrderTotal(data.order.total);
      setStage("awaiting_payment");
      say(`Order ${data.order.id} dibuat! 🎉\n\nSilakan scan QRIS di bawah sebesar ${rupiah(data.order.total)} (nominal harus pas ya). Kalau udah bayar, klik tombol "Saya sudah bayar".`);
    } catch {
      say("Waduh, server lagi gangguan kak. Coba lagi sebentar ya 🙏");
    }
  }

  async function markPaid() {
    if (!orderId) return;
    try {
      await fetch(`${apiBase}/api/order/${orderId}/paid`, { method: "POST" });
      setStage("verifying");
      say("Sip! Lagi dicek admin dulu ya, bentar... ⏳");
      pollRef.current = setInterval(async () => {
        try {
          const r = await fetch(`${apiBase}/api/order/${orderId}`);
          const data = await r.json();
          if (data.order.status === "paid") {
            if (pollRef.current) clearInterval(pollRef.current);
            setStage("done");
            say("✅ Pembayaran terverifikasi! Makasih banyak kak 🙏\n\nFile/produknya bakal dikirim ke kontak yang kakak isi tadi. Ditunggu ya!");
          } else if (data.order.status === "rejected") {
            if (pollRef.current) clearInterval(pollRef.current);
            setStage("idle");
            say("❌ Yah, pembayaran belum masuk kak. Coba cek lagi mutasinya, pastiin nominalnya pas. Kalau udah bener tapi masih ditolak, hubungi admin ya.");
          }
        } catch { /* abaikan, coba lagi */ }
      }, 3000);
    } catch {
      say("Waduh, server lagi gangguan kak. Coba lagi ya 🙏");
    }
  }

  function send() {
    const text = input.trim();
    if (!text) return;
    say(text, "user");
    setInput("");
    setTimeout(() => botReply(text), 400);
  }

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999, fontFamily: "system-ui, sans-serif" }}>
      {open && (
        <div style={{
          width: 340, height: 480, background: "#fff", borderRadius: 16,
          boxShadow: "0 8px 32px rgba(0,0,0,.18)", display: "flex",
          flexDirection: "column", overflow: "hidden", marginBottom: 12,
        }}>
          <div style={{ background: "#1a1a2e", color: "#fff", padding: "12px 16px", fontWeight: 700 }}>
            💬 {botName} <span style={{ fontWeight: 400, fontSize: 12, opacity: .7 }}>· online</span>
          </div>

          <div ref={bodyRef} style={{ flex: 1, overflowY: "auto", padding: 12, background: "#f4f4f8" }}>
            {msgs.map((m, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start",
                marginBottom: 8,
              }}>
                <div style={{
                  maxWidth: "80%", padding: "8px 12px", borderRadius: 12, fontSize: 13.5,
                  whiteSpace: "pre-line", lineHeight: 1.45,
                  background: m.from === "user" ? "#1a1a2e" : "#fff",
                  color: m.from === "user" ? "#fff" : "#222",
                  boxShadow: m.from === "bot" ? "0 1px 3px rgba(0,0,0,.08)" : undefined,
                }}>{m.text}</div>
              </div>
            ))}

            {stage === "idle" && !askField && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, margin: "4px 0 8px" }}>
                {products.map((p) => (
                  <button key={p.id} onClick={() => {
                    setPendingProduct(p);
                    say(`Siap! Kakak pilih: ${p.name} (${rupiah(p.price)})`, "user");
                    setTimeout(() => say("Boleh tau nama kakak siapa?"), 300);
                    setAskField("name");
                  }} style={chipStyle}>
                    🛒 {p.name}
                  </button>
                ))}
              </div>
            )}

            {stage === "awaiting_payment" && (
              <div style={{ background: "#fff", borderRadius: 12, padding: 12, textAlign: "center", marginBottom: 8 }}>
                <img src={qrisImageUrl} alt="QRIS" style={{ width: 180, height: 180, objectFit: "contain" }} />
                <div style={{ fontWeight: 700, margin: "8px 0", fontSize: 15 }}>{rupiah(orderTotal)}</div>
                <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>Order: {orderId}</div>
                <button onClick={markPaid} style={primaryBtn}>Saya sudah bayar ✅</button>
              </div>
            )}
            {stage === "verifying" && (
              <div style={{ textAlign: "center", fontSize: 13, color: "#666", marginBottom: 8 }}>
                ⏳ Menunggu verifikasi admin...
              </div>
            )}
          </div>

          {stage === "idle" && !askField && (
            <div style={{ display: "flex", gap: 6, padding: "8px 12px", overflowX: "auto", background: "#fff", borderTop: "1px solid #eee" }}>
              {QUICK_REPLIES.map((q) => (
                <button key={q} onClick={() => { say(q, "user"); setTimeout(() => botReply(q), 400); }} style={chipStyle}>
                  {q}
                </button>
              ))}
            </div>
          )}

          <div style={{ display: "flex", borderTop: "1px solid #eee", background: "#fff" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder={askField === "name" ? "Ketik nama kakak..." : askField === "contact" ? "Ketik nomor WA..." : "Ketik pesan..."}
              style={{ flex: 1, border: "none", outline: "none", padding: "12px 14px", fontSize: 14 }}
            />
            <button onClick={send} style={{ border: "none", background: "#1a1a2e", color: "#fff", padding: "0 18px", cursor: "pointer", fontSize: 16 }}>
              ➤
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: 56, height: 56, borderRadius: "50%", border: "none", cursor: "pointer",
          background: "#1a1a2e", color: "#fff", fontSize: 24,
          boxShadow: "0 4px 16px rgba(0,0,0,.25)",
        }}
        aria-label="Buka chat"
      >
        {open ? "✕" : "💬"}
      </button>
    </div>
  );
}

const chipStyle: React.CSSProperties = {
  border: "1px solid #1a1a2e", background: "#fff", color: "#1a1a2e",
  borderRadius: 20, padding: "6px 12px", fontSize: 12.5, cursor: "pointer",
  whiteSpace: "nowrap",
};

const primaryBtn: React.CSSProperties = {
  background: "#16a34a", color: "#fff", border: "none", borderRadius: 10,
  padding: "10px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer", width: "100%",
};
