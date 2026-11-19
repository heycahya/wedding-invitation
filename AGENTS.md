# AGENTS.md — Aturan & Panduan AI

Repo ini adalah **HTML-scaffolded static website template** untuk undangan pernikahan digital (`site/`).  
Di repo template ini, kerangka semantik HTML (`site/index.html`, `site/kirim/index.html`), `site/config.json`, dan `site/icons/` sudah tersedia, sedangkan seluruh file CSS (`site/css/*`) dan JS (`site/js/*`) **sengaja dikosongkan** agar setiap project baru dibangun bersih sesuai `.agent/customize/design.md`, `.agent/customize/data.md`, dan `.agent/TECH-SPEC.md`.

---

## Aturan Mutlak (`NEVER`)

1. **Low-Framework & Ringan:** Hanya HTML5, CSS3 Custom Properties, dan Vanilla JS ES6+. Dilarang memakai React/Vue/Next/Tailwind/bundler atau library animasi eksternal. Total seluruh file `.css` + `.js` di `site/` wajib **< 50 KB** (uncompressed).
2. **Static Hosting + Endpoint GAS Eksternal:** Website disajikan statis dari `site/` (Cloudflare Pages). Form RSVP/Guestbook hanya memanggil URL eksternal `api.endpointUrl` (Google Apps Script) — dilarang mengusulkan Supabase, database SQL, atau menambah server backend ke repo ini.
3. **Isolasi RSVP vs Guestbook & Anti-XSS:** `api.js` hanya membaca Guestbook via `GET ?slug=...` dan tidak pernah mengekspos data RSVP. Parameter `?to=` (maks 60 char) & daftar ucapan Guestbook wajib dirender lewat `textContent` (**dilarang `innerHTML`**). Link eksternal (`mapUrl`, `instagram`, `videoUrl`) hanya izinkan protokol `https://`/`http://`.
4. **Privasi WA Sender 100% Lokal:** `site/kirim/index.html` wajib memuat `<meta name="robots" content="noindex, nofollow">` dan menyimpan data tamu 100% di `localStorage` (`wedding_wa_guests_<slug>`, `wedding_wa_templates_<slug>`). Dilarang mengirim daftar tamu ke server, Git, `config.json`, atau analytics.
5. **Open Graph Statis & Repo Bersih:** Tag `<meta property="og:*">` wajib hardcoded di `<head>` `site/index.html` dengan URL absolut `https://...` (`og-image.jpg` `.jpg` sRGB `< 250 KB`). Dilarang menyimpan `spreadsheet_id` atau kredensial di `config.json` maupun repo.

---

## Pembagian File di `site/` (Saat Implementasi Mode 2)

- **Kerangka & Konfigurasi (Sudah Ada di Template):**
  - `site/index.html` & `site/kirim/index.html` — perbarui Google Fonts, static `<meta property="og:*">`, serta class visual sesuai desain tanpa menghilangkan DOM IDs wajib di `.agent/TECH-SPEC.md`.
  - `site/config.json` — sinkronkan dengan `.agent/customize/data.md`.
  - `site/icons/*.svg` — starter ikon opsional (bebas diganti/disesuaikan per desain atau pakai inline SVG `< 1 KB`).
  - `site/img/` & `site/assets/` — folder gambar (`./img/...`) dan audio (`./assets/...`).
- **Lapisan Desain CSS *(Isi Penuh dari Nol Sesuai `.agent/customize/design.md`)*:**
  - `site/css/tokens.css`, `site/css/sections.css`, `site/css/motion.css` (GPU-only `transform`/`opacity` + `prefers-reduced-motion`), dan `site/css/base.css` (kanvas max `480px`, `input >= 16px`, tap target `>= 44px`, anti-overflow `360px`).
- **Lapisan Fungsional JS & WA Sender *(Isi Sesuai Kontrak `.agent/TECH-SPEC.md`)*:**
  - `site/js/app.js`, `site/js/api.js`, `site/js/audio.js`, `site/js/wa-sender.js`, dan `site/css/wa-sender.css`.

---

## 3 Mode Kerja

> Pada **Mode 1, 2, dan 3**, wajib patuhi 3 skill UI di `.agent/skills/`:
> - [`.agent/skills/anti-ai-slop.md`](./.agent/skills/anti-ai-slop.md) — filter anti-desain generik (*Hard Gate, Purpose-Gate, Quality Locks*)
> - [`.agent/skills/ui-layout-patterns.md`](./.agent/skills/ui-layout-patterns.md) — variasi pola layout modern & ornamen SVG `< 1 KB`
> - [`.agent/skills/mobile-webview-qa.md`](./.agent/skills/mobile-webview-qa.md) — standar `360px` & WhatsApp In-App Browser

1. **Mode 1 — Buat Issue Detail:** Baca `.agent/customize/design.md`, `.agent/customize/data.md`, `.agent/TECH-SPEC.md`, dan `.agent/skills/*` → tulis blueprint visual per section (pilih variasi layout, warna, font, motion GPU-only) + arsitektur CSS/JS & pemetaan `config.json` / OG statis ke `.agent/issues/01-design.md`. Jangan edit `site/` pada mode ini.
2. **Mode 2 — Eksekusi Implementasi (CSS, JS, HTML & Config):** Terapkan `.agent/issues/01-design.md` (atau langsung `.agent/customize/` pada One-Shot) ke `site/` dengan mematuhi seluruh `.agent/skills/*` dan kontrak `.agent/TECH-SPEC.md`. Validasi JSON `site/config.json`, pastikan total `.css` + `.js` di `site/` `< 50 KB` dan `0` pemakaian `innerHTML` pada data user, lalu laporkan hasilnya jujur.
3. **Mode 3 — Fix UI Cepat & Debug:** Untuk poles tampilan, edit CSS/HTML/copy langsung sambil menjaga `tokens.css`, DOM IDs, standar `.agent/skills/*`, `360px` anti-overflow, GPU-only motion (`prefers-reduced-motion`), dan `< 50 KB`. Jika ada error console/CORS/OG/layout, lakukan Root Cause Analysis pada file terkait sebelum memperbaiki kode.

> Jika user langsung memberi arahan singkat (*"bikinin sesuai customize"* / *"bikinin sesuai arahan"*) tanpa menyebut mode, jalankan **Mode 1** terlebih dahulu (tulis `.agent/issues/01-design.md`) kecuali user meminta langsung dikerjakan sekaligus (*One-Shot*).
