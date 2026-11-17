# Project Context — Digital Wedding Invitation

> Ringkasan konteks hidup project ini. Setelah meng-clone template repo, isi konsep & data klien di [`DESIGN-BRIEF.md`](./DESIGN-BRIEF.md), lalu eksekusi lewat [`PROMPTS.md`](./PROMPTS.md).

---

## Tentang Project Ini

Website undangan pernikahan digital (*Done-For-You Service*, 1 repo hasil clone = 1 project undangan klien) yang dibangun dengan fokus pada **estetika visual editorial, performa ringan di WhatsApp In-App Browser, privasi data tamu, dan biaya infrastruktur Rp0**.

---

## Status Project Ini

- [ ] **1. Customize `DESIGN-BRIEF.md`** — Tentukan konsep visual, palet warna, tipografi, dan isi data pasangan.
- [ ] **2. Generate Issue Detail** — Jalankan **Prompt 1** (`PROMPTS.md`) → output `.agent/artifacts/issues/01-build-invitation.md`.
- [ ] **3. Implementasi Full** — Jalankan **Prompt 2** (`PROMPTS.md`) → bangun `site/` + `gas/Code.gs` + verifikasi `< 50 KB`.
- [ ] **4. Fix UI & Optimasi Aset** — Poles tampilan di browser HP (`Prompt 3`) & isi `site/assets/` (`og-image.jpg`, `*.webp`, `bgm.mp3`).
- [ ] **5. Deploy & Verifikasi Live** — Setup Google Sheet + GAS Web App + Cloudflare Pages (`site/`) + uji preview OG WhatsApp nyata.

---

## Tech Stack Mengikat (Ringkasan `.agent/DESIGN.md`)

- **Frontend:** HTML5, CSS3 (Custom Properties), Vanilla JS (ES6+). **Zero framework, zero build step, total CSS+JS di `site/` wajib < 50 KB.**
- **Hosting:** Git + GitHub → Cloudflare Pages Free (`Build command`: kosong, `Build output directory`: `site`).
- **Backend Form & DB:** 1 Google Apps Script Web App (`gas/Code.gs`) + Google Sheets (Master Registry Sheet `Registry` memetakan `slug -> spreadsheet_id` + Client Sheet 2 tab `RSVP` & `Guestbook`). **Dilarang Supabase / SQL / ORM.**
- **WA Sender (`site/kirim/index.html`):** 100% lokal di `localStorage` perangkat pasangan (`wedding_wa_guests_<slug>`, `wedding_wa_templates_<slug>`) + `<meta name="robots" content="noindex, nofollow">`.
- **Keamanan Wajib:** `POST text/plain` + `hp_field` + `CacheService` 30s + `LockService` + sanitasi `'` anti-formula injection; `doGet` hanya baca `Guestbook` (exclude `is_hidden=TRUE`); anti-XSS pakai `textContent` (no `innerHTML` untuk `?to=` & Guestbook); static `<meta property="og:*">` hardcoded URL absolut `https://...`.
