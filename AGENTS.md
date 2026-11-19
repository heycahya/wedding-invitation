# AGENTS.md — Aturan & Panduan AI

Repo ini adalah **pre-scaffolded static website template** undangan pernikahan digital (`site/`).  
Seluruh plumbing teknis di `site/` sudah tersedia. Tugas utama di tiap project adalah **merombak desain visual & menyinkronkan data** berdasarkan `.agent/customize/design.md` dan `.agent/customize/data.md`.

---

## Aturan Mutlak (`NEVER`)

1. **Low-Framework & Ringan:** Hanya HTML5, CSS3 Custom Properties, dan Vanilla JS ES6+. Dilarang memakai React/Vue/Next/Tailwind/bundler atau library animasi eksternal. Total seluruh file `.css` + `.js` di `site/` wajib **< 50 KB** (uncompressed).
2. **Static Hosting + Endpoint GAS Eksternal:** Website disajikan statis dari `site/` (Cloudflare Pages). Form RSVP/Guestbook hanya memanggil URL eksternal `api.endpointUrl` (Google Apps Script) — dilarang mengusulkan Supabase, database SQL, atau menambah server backend ke repo ini.
3. **Isolasi RSVP vs Guestbook & Anti-XSS:** `api.js` hanya membaca Guestbook via `GET ?slug=...` dan tidak pernah mengekspos data RSVP. Parameter `?to=` (maks 60 char) & daftar ucapan Guestbook wajib dirender lewat `textContent` (**dilarang `innerHTML`**). Link eksternal (`mapUrl`, `instagram`, `videoUrl`) hanya izinkan protokol `https://`/`http://`.
4. **Privasi WA Sender 100% Lokal:** `site/kirim/index.html` wajib memuat `<meta name="robots" content="noindex, nofollow">` dan menyimpan data tamu 100% di `localStorage` (`wedding_wa_guests_<slug>`, `wedding_wa_templates_<slug>`). Dilarang mengirim daftar tamu ke server, Git, `config.json`, atau analytics.
5. **Open Graph Statis & Repo Bersih:** Tag `<meta property="og:*">` wajib hardcoded di `<head>` `site/index.html` dengan URL absolut `https://...` (`og-image.jpg` `.jpg` sRGB `< 250 KB`). Dilarang menyimpan `spreadsheet_id` atau kredensial di `config.json` maupun repo.

---

## Pemisahan Lapisan Kode

- **Lapisan Desain & Konten *(Wajib Dirombak Sesuai `.agent/customize/`)*:**
  - `site/css/tokens.css`, `site/css/sections.css`, `site/css/motion.css`, struktur visual `<main>` & `<head>` OG di `site/index.html`, render layout di `site/js/app.js`, dan `site/config.json`.
  - Jangan hanya ganti 2–3 warna hex jika `.agent/customize/design.md` meminta tema berbeda — ubah komposisi layout, tipografi, framing foto, ritme spacing, dan ornamentasi SVG ringan (`< 1 KB`).
- **Lapisan Plumbing *(Pertahankan Kontrak di `.agent/TECH-SPEC.md`)*:**
  - `site/js/api.js`, `site/js/audio.js`, `site/js/wa-sender.js`, `site/kirim/index.html`, `site/css/wa-sender.css`, dan `site/css/base.css` (`max-width: 480px`, `input >= 16px`, tap target `>= 44px`, no horizontal scroll di `360px`).

---

## 3 Mode Kerja

1. **Mode 1 — Buat Issue Detail:** Baca `.agent/customize/design.md`, `.agent/customize/data.md`, dan `.agent/TECH-SPEC.md` → tulis blueprint visual per section (warna, font, layout, motion GPU-only) + pemetaan `config.json` & OG statis ke `.agent/issues/01-design.md`. Jangan edit `site/` pada mode ini.
2. **Mode 2 — Eksekusi Desain & Konten:** Terapkan `.agent/issues/01-design.md` (atau langsung `.agent/customize/` pada One-Shot) ke `site/`. Pertahankan plumbing, validasi JSON `site/config.json`, pastikan total `.css` + `.js` di `site/` `< 50 KB` dan `0` pemakaian `innerHTML` pada data user, lalu laporkan hasilnya jujur.
3. **Mode 3 — Fix UI Cepat & Debug:** Untuk poles tampilan, edit CSS/HTML/copy langsung sambil menjaga `tokens.css`, DOM IDs, `360px` anti-overflow, GPU-only motion (`prefers-reduced-motion`), dan `< 50 KB`. Jika ada error console/CORS/OG/layout, lakukan Root Cause Analysis pada file terkait sebelum memperbaiki kode.

> Jika user langsung memberi arahan singkat (*"bikinin sesuai customize"* / *"bikinin sesuai arahan"*) tanpa menyebut mode, jalankan **Mode 1** terlebih dahulu (tulis `.agent/issues/01-design.md`) kecuali user meminta langsung dikerjakan sekaligus (*One-Shot*).
