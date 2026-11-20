# AGENTS.md — Aturan & Panduan AI

Repo ini adalah **HTML-scaffolded static website template** untuk undangan pernikahan digital (`site/`).  
Di repo template ini, kerangka semantik HTML (`site/index.html`) sudah tersedia dengan seluruh konten dirender langsung secara statis di HTML (tanpa `config.json`), sedangkan file CSS (`site/css/base.css`) dan JS (`site/js/*`) **sengaja dikosongkan** agar setiap project baru dibangun bersih sesuai `.agent/customize/design.md`, `.agent/customize/data.md`, dan `.agent/TECH-SPEC.md`.

---

## Aturan Mutlak (`NEVER`)

1. **Low-Framework & Ringan:** Hanya HTML5, CSS3 Custom Properties, dan Vanilla JS ES6+. Dilarang memakai React/Vue/Next/Tailwind/bundler atau library animasi eksternal. Total seluruh file `.css` + `.js` di `site/` wajib **< 50 KB** (uncompressed).
2. **Static Hosting + Endpoint GAS Opsional:** Website disajikan statis dari `site/` (Cloudflare Pages). Form RSVP/Guestbook hanya memanggil URL eksternal `data-api-url` (Google Apps Script) bila diisi — dilarang mengusulkan Supabase, database SQL, atau menambah server backend ke repo ini. Bila `data-api-url=""` kosong, `api.js` tetap aman tanpa `fetch()` error mengikuti kontrak mode non-backend di `.agent/TECH-SPEC.md`.
3. **Isolasi RSVP vs Guestbook & Anti-XSS:** `api.js` hanya membaca Guestbook via `GET ?slug=...` dan tidak pernah mengekspos data RSVP. Parameter `?to=` (maks 60 char) & daftar ucapan Guestbook wajib dirender lewat `textContent` (**dilarang `innerHTML`**). `?to=` hanya untuk sapaan personal pada `#guest-name`, **dilarang** auto-fill ke `#rsvp-name` atau `#guestbook-name`. Link eksternal (`mapUrl`, `calendarUrl`, `instagram`, `videoUrl`) hanya izinkan protokol `https://`/`http://`.
4. **Open Graph Statis & Repo Bersih:** Tag `<meta property="og:*">` wajib hardcoded di `<head>` `site/index.html` dengan URL absolut `https://...` (`og-image.jpg` `.jpg` sRGB `< 250 KB`). Dilarang menyimpan `spreadsheet_id`, daftar tamu pribadi, atau kredensial di dalam repo.

---

## Pembagian File di `site/` (Saat Implementasi Mode 2)

- **Kerangka HTML & Aset:**
  - `site/index.html` — isi langsung konten undangan dari `.agent/customize/data.md`, perbarui Google Fonts, static `<meta property="og:*">`, `data-slug`/`data-api-url`/`data-target-iso`/`data-audio-src`, ikon inline `<svg>` ringan (`< 1 KB`), serta pertahankan seluruh DOM ID 12 section & `#audio-control` di `.agent/TECH-SPEC.md` (section opsional yang dinonaktifkan cukup diberi atribut `hidden`, jangan dihapus fondasinya).
  - `site/assets/` — klasifikasi aset media: `site/assets/img/` (`./assets/img/...`) dan `site/assets/audio/` (`./assets/audio/...`).
- **Lapisan Desain CSS *(Isi Penuh di `site/css/base.css` Sesuai `.agent/customize/design.md`)*:**
  - `site/css/base.css` — berisi CSS Custom Properties (`:root`) dengan kontras WCAG AA ($\ge 4.5:1$ teks) & WCAG 1.4.11 ($\ge 3.0:1$ `--border-control`), reset + `[hidden] { display: none !important; }`, kanvas max `480px`, `input >= 16px`, tap target `>= 44px`, anti-overflow `360px`, styling seluruh 12 section, serta animasi GPU-only (`transform`/`opacity`) + `@media (prefers-reduced-motion: reduce)`.
- **Lapisan Fungsional JS *(Isi Sesuai Kontrak `.agent/TECH-SPEC.md`)*:**
  - `site/js/app.js`, `site/js/api.js`, dan `site/js/audio.js`.

---

## 3 Mode Kerja

> Pada **Mode 1, 2, dan 3**, wajib patuhi 3 skill UI di `.agent/skills/`:
> - [`.agent/skills/anti-ai-slop.md`](./.agent/skills/anti-ai-slop.md) — filter anti-desain generik (*Hard Gate, Purpose-Gate, Quality Locks*)
> - [`.agent/skills/ui-layout-patterns.md`](./.agent/skills/ui-layout-patterns.md) — variasi pola layout modern & ornamen SVG `< 1 KB`
> - [`.agent/skills/mobile-webview-qa.md`](./.agent/skills/mobile-webview-qa.md) — standar `360px` & WhatsApp In-App Browser

1. **Mode 1 — Buat Issue Detail:** Baca `.agent/customize/design.md`, `.agent/customize/data.md`, `.agent/TECH-SPEC.md`, dan `.agent/skills/*` → tulis blueprint visual per section (pilih variasi layout, warna, font, motion GPU-only) + arsitektur CSS/JS & pemetaan data statis ke `.agent/issues/01-design.md`. Jangan edit `site/` pada mode ini.
2. **Mode 2 — Eksekusi Implementasi (HTML, CSS & JS):** Terapkan `.agent/issues/01-design.md` (atau langsung `.agent/customize/` pada One-Shot) ke `site/` dengan mematuhi seluruh `.agent/skills/*` dan kontrak `.agent/TECH-SPEC.md`. Pastikan total `.css` + `.js` di `site/` `< 50 KB` dan `0` pemakaian `innerHTML` pada data user, lalu laporkan hasilnya jujur.
3. **Mode 3 — Fix UI Cepat & Debug:** Untuk poles tampilan, edit `site/css/base.css` atau `site/index.html` langsung sambil menjaga `:root` tokens, DOM IDs, standar `.agent/skills/*`, `360px` anti-overflow, GPU-only motion (`prefers-reduced-motion`), dan `< 50 KB`. Jika ada error console/CORS/OG/layout, lakukan Root Cause Analysis pada file terkait sebelum memperbaiki kode.

> Jika user langsung memberi arahan singkat (*"bikinin sesuai customize"* / *"bikinin sesuai arahan"*) tanpa menyebut mode, jalankan **Mode 1** terlebih dahulu (tulis `.agent/issues/01-design.md`) kecuali user meminta langsung dikerjakan sekaligus (*One-Shot*).
