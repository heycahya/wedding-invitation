# AGENTS.md — Aturan & Panduan AI untuk Template Ini

Repo ini adalah **pre-scaffolded template** website undangan pernikahan digital (*static-first, zero framework, zero build step*).  
Seluruh plumbing teknis di `site/` dan `gas/Code.gs` sudah tersedia. Fokus pengerjaan di setiap project hasil clone adalah **merancang desain visual unik + menyinkronkan data undangan** berdasarkan `BRIEF.md`.

---

## Aturan Mutlak (`NEVER`)

1. **Low-Framework & Ringan:** Hanya HTML5, CSS3 Custom Properties, dan Vanilla JS ES6+. Dilarang memakai React/Vue/Next/Tailwind/bundler atau library animasi eksternal. Total seluruh file `.css` + `.js` di dalam `site/` wajib **< 50 KB** (uncompressed).
2. **Backend Tanpa Biaya & Tanpa Supabase:** Backend hanya menggunakan `gas/Code.gs` (Google Apps Script) + Google Sheets. Dilarang mengusulkan Supabase atau database SQL/berbayar.
3. **Isolasi Mutlak RSVP vs Guestbook:** `doGet` di `gas/Code.gs` **hanya** boleh membaca tab `Guestbook` (mengecualikan `is_hidden === true`). Dilarang keras membaca atau mengekspos tab `RSVP`.
4. **Privasi WA Sender 100% Lokal:** Halaman `site/kirim/index.html` wajib memasang `<meta name="robots" content="noindex, nofollow">` dan menyimpan data tamu 100% di `localStorage` browser (`wedding_wa_guests_<slug>`, `wedding_wa_templates_<slug>`). Dilarang mengirim daftar tamu ke server, Git, `config.json`, atau analytics.
5. **Anti-XSS & Anti-Formula Injection:** Parameter `?to=` dan daftar ucapan Guestbook wajib dirender memakai `textContent` (dilarang `innerHTML`). Link dinamis eksternal (`mapUrl`, `instagram`, `videoUrl`) hanya izinkan protokol `https://`/`http://`. Input ke Google Sheets wajib disanitasi awalan `'` untuk karakter `=`, `+`, `-`, `@`, `\t`, `\r`.
6. **Open Graph Statis & Kebersihan Repo:** Tag `<meta property="og:*">` wajib hardcoded di `<head>` `site/index.html` dengan URL absolut `https://...` (`og-image.jpg` berformat `.jpg` sRGB `< 250 KB`). Dilarang menyimpan `spreadsheet_id` atau kredensial di `site/config.json` maupun repository.

---

## Pemisahan Lapisan Kode (Penting Saat Mendesain Ulang)

- **Lapisan Desain & Konten *(Wajib Dirombak Total Sesuai `BRIEF.md`)*:**
  - `site/css/tokens.css` (palet warna, font pairing, skala, radius, shadow)
  - `site/css/sections.css` (layout, komposisi kartu/foto, ornamentasi SVG ringan, hierarki visual)
  - `site/css/motion.css` (karakter transisi GPU-only: `transform`, `opacity`)
  - `site/index.html` (komposisi struktur visual 12 section + static OG `<head>`)
  - `site/js/app.js` (penyesuaian render layout bila struktur visual berubah)
  - `site/config.json` (data undangan & toggle `features.*`)
  - *Catatan:* Jangan sekadar mengubah 2–3 warna hex jika `BRIEF.md` meminta tema berbeda. Ubah komposisi, proporsi foto, framing, tipografi, dan ritme antar-section agar tampil khas.
- **Lapisan Plumbing *(Pertahankan Kontrak & Keamanan)*:**
  - `gas/Code.gs`, `site/js/api.js`, `site/js/audio.js`, `site/js/wa-sender.js`, `site/kirim/index.html`, `site/css/wa-sender.css`, dan `site/css/base.css` (pertahankan kanvas max `480px`, `input >= 16px`, `tap target >= 44px`, dan no-horizontal-scroll di `360px`).
  - Kontrak ID DOM & key `config.json` baku tercantum di `.agent/TECH-SPEC.md`.

---

## 3 Mode Eksekusi

1. **Buat Issue Detail (`.agent/skills/make_issue.md`):**
   Baca `BRIEF.md` + `.agent/TECH-SPEC.md`, lalu tulis blueprint desain visual & teknis ke `.agent/issues/01-design.md`. Tidak mengedit kode aplikasi di langkah ini.
2. **Eksekusi Desain & Implementasi (`.agent/skills/apply_design.md`):**
   Terapkan `.agent/issues/01-design.md` (atau langsung `BRIEF.md` pada mode one-shot) ke seluruh `site/` secara utuh, pertahankan plumbing & keamanan, cek budget `< 50 KB`, dan verifikasi `config.json`.
3. **Fix UI Cepat & Debug (`.agent/skills/fix_ui.md`):**
   Poles CSS/layout/animasi secara langsung pasca-preview tanpa membuat issue baru, atau lakukan Root Cause Analysis (RCA) jika terjadi error console, CORS/GAS, layout `360px` meluber, atau OG WhatsApp gagal.
