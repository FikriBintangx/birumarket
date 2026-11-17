# DESIGN.md — BiruMarket Architectural Direction

## Identity & Purpose
- **Product**: BiruMarket (`birumarket.web.id`)
- **Role**: Marketplace Source Code, Turnkey Web Apps, AI SaaS & Portfolio Showcase oleh Fikri Bintang Purnomo.
- **Dial**: `ENERGY 2 / RHYTHM 3 / MOTION 2`

## Color Palette (Capped: 2 Core + 1 Accent + Neutrals)
- **Deep Navy Core**: `#0B2545` (Primary dark surface, high-contrast footer, structural headers, key badges)
- **Architectural Royal Blue (Accent)**: `#1D4ED8` (Primary CTA, active nav/filter state, pricing emphasis)
- **Sky Tint (Subtle Surface)**: `#EFF6FF` (Selected license option & technical callout tint)
- **Neutrals**: `#F4F6F9` (outer canvas), `#FFFFFF` (elevated sheets & product cards), `#0F172A` (primary ink), `#475569` (secondary ink), `#E2E8F0` (hairline borders)

## Typography
- **Display**: `Syne` (700, 800) — Architectural storefront headlines and modal titles.
- **Body / UI**: `Plus Jakarta Sans` (400, 500, 600, 700, 800) — Clear product descriptions, feature specs, and buttons.
- **Technical Metadata**: `JetBrains Mono` (500, 700) — SKU tags, stack pills, price figures, and handover specifications.

## Design Decisions & Rules
1. **Asymmetric Composition (RHYTHM 3)**:
   - Hero uses a 12-column split: storefront positioning & instant search on the left, interactive Live Product Stage showcasing real application screenshots on the right.
   - Catalog section uses filterable 3-column architectural cards with sharp 16px-20px framing, separated by whitespace rather than repetitive shadows.
   - Engineering Handover uses a structured 2-column technical specification matrix instead of generic 3-step icon cards.
   - Custom Request section uses a physical "Boarding Pass / Order Ticket" motif matching Fikri Bintang's portfolio identity.
2. **Evidence Over Claims**: Every product displays real screenshots (`/products/p-*.png`), verified stack tags, and working live demo URLs. Zero fabricated stats or avatars.
3. **Accessibility & Resilience**: Full keyboard support (`Tab`, `Enter`, `Escape` on modals), WCAG AA contrast on all text, and explicit Loading, Empty, and Error states on data views.
