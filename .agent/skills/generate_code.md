# Skill: generate_code
> Digunakan oleh: `@engineer` (AI Coder Implementer)

## Objective
Eksekusi Issue Detail `.agent/artifacts/issues/[N]-[slug].md` dalam **satu kali implementasi utuh**, jalankan verifikasi nyata di Termux + self-audit keamanan & budget `< 50 KB`, lalu tulis handoff ringkas.

---

## Steps

### 1. Baca Issue Detail, DESIGN-BRIEF & DESIGN.md
- Baca `.agent/artifacts/issues/[N]-[slug].md` sebagai blueprint utama.
- Baca `DESIGN-BRIEF.md` (untuk nilai teks/data klien & nuansa visual) dan `.agent/DESIGN.md` (untuk kontrak baku key JSON, GAS, `localStorage`, dan aturan mutlak).

### 2. Implementasi Utuh (`site/` + `gas/Code.gs`)
Bangun seluruh file secara lengkap tanpa placeholder atau `TODO`:
- **HTML (`site/index.html`, `site/kirim/index.html`):**
  - Tag `<title>`, `<meta name="description">`, `<meta property="og:*">` ditulis hardcoded dengan URL absolut `https://...`.
  - Gunakan path relatif (`./css/...`, `./js/...` di `site/index.html`; `../css/...`, `../js/...` di `site/kirim/index.html`).
  - `site/kirim/index.html` wajib memuat `<meta name="robots" content="noindex, nofollow">`.
- **CSS (`site/css/{tokens,base,sections,motion,wa-sender}.css`):**
  - Semua warna, font, spacing, radius, z-index didefinisikan via CSS Custom Properties di `tokens.css`.
  - `base.css`: mobile-first centered canvas `480px` (`720px` untuk `/kirim/`), input `font-size >= 1rem` (`16px`), tap target `min-height: 44px`, no horizontal scroll di `360px`.
  - `motion.css`: animasi GPU-only (`transform`, `opacity`), `.reveal`, Cover Gate `1000ms`, dan `@media (prefers-reduced-motion: reduce)`.
- **JS (`site/js/{app,api,audio,wa-sender}.js`) & `site/icons/*.svg`:**
  - `app.js`: parse `?to=` (trim, maks 60 char, fallback `defaultGuestLabel`), fetch `./config.json` (dengan error UI + tombol Muat Ulang), terapkan `theme.overrides`, sembunyikan section nonaktif (`hidden`), render semua section pakai `textContent` untuk input/URL/ucapan, Countdown 3 status, Google Calendar URL, Gallery Lightbox, dan Copy Rekening + fallback `execCommand`.
  - `audio.js`: `<audio preload="none" loop>`, pemicu saat klik `#btn-open-invitation`, `.play().catch()` senyap, dan `visibilitychange` auto-pause/resume.
  - `api.js`: `POST` dengan `Content-Type: text/plain;charset=utf-8` + `redirect: "follow"`, client cooldown 30s, non-blocking `GET ?slug=...` Guestbook, skeleton/empty/error state, optimistic prepend, Load More.
  - `wa-sender.js`: parser paste/CSV, normalisasi `628...`, template editor `{{nama}}` & `{{link}}`, `localStorage` (`wedding_wa_guests_<slug>`, `wedding_wa_templates_<slug>`), ekspor CSV, Contact Picker opsional.
  - Jika gambar di `site/assets/` belum tersedia saat build awal, siapkan handler `onerror` / CSS placeholder elegan agar layout tidak rusak.
- **Backend (`gas/Code.gs`):**
  - `doPost` & `doGet` lengkap dengan Master Registry + `CacheService` 15m, `LockService` 10s, `hp_field` silent drop, rate-limit `CacheService` 30s, validasi field & panjang teks, sanitasi `'` anti-formula injection, dan isolasi mutlak `doGet` (hanya `Guestbook`, exclude `is_hidden === true`).

### 3. Verifikasi Termux & Self-Audit (Wajib Sebelum Lapor Selesai)
1. **Validasi JSON & Ukuran Budget (`< 50 KB`):**
   - Hitung total byte seluruh file `.css` + `.js` di `site/` (harus `< 51200` bytes / `< 50 KB`).
   - Validasi `site/config.json` (pakai `jq empty site/config.json` atau `python3 -m json.tool` / `node -e` jika tool tersedia).
   - Cek syntax JS (`node --check site/js/*.js` jika `node` terpasang).
2. **Self-Audit Checklist (`.agent/skills/audit_code.md`):**
   - Cek zero `innerHTML` untuk `?to=` atau data Guestbook (`textContent` only).
   - Cek `doGet` di `gas/Code.gs` tidak pernah membaca tab `RSVP`.
   - Cek `wa-sender.js` tidak memiliki request jaringan (`fetch`/XHR) yang mengirim daftar tamu.
   - Cek `site/config.json` bebas `spreadsheet_id` dan data sensitif.
   - Cek static `<meta property="og:*">` URL absolut `https://...` di `site/index.html`.
3. **Laporkan Jujur Cakupan Verifikasi:**
   - Jika tool seperti `python3`/`node`/`jq` belum terpasang di Termux atau `gas/Code.gs` belum dideploy live, catat jujur mana yang sudah terverifikasi statis vs yang siap diuji saat preview browser / live GAS.

### 4. Tulis Handoff & Instruksi Preview
Simpan ringkasan ke `.agent/handoffs/[N]-[slug].md`:
- File yang dibuat & fungsi intinya
- Total ukuran CSS + JS `site/` (dalam bytes/KB)
- Hasil pemeriksaan self-audit & validasi yang dijalankan
- Daftar file aset yang perlu diisi di `site/assets/` (`og-image.jpg`, `cover.webp`, `hero.webp`, dst.)
- Cara cepat preview di Termux (`python3 -m http.server 8080 --directory site`).

*(Jika Git aktif, boleh commit perubahan secara rapi sesuai preferensi repo.)*

---

## Larangan
- Tidak membiarkan total CSS + JS `site/` melebihi `50 KB`.
- Tidak menggunakan framework JS, bundler, atau `innerHTML` untuk data user/tamu.
- Tidak mengklaim live GAS/WhatsApp OG sudah teruji sebelum benar-benar diuji.
