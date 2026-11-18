# PROMPTS.md — Prompt Siap-Copy

Edit [`BRIEF.md`](./BRIEF.md), lalu salin prompt di bawah ini ke AI:
- **Alur Standar:** **1 (Buat Issue)** → review singkat → **2 (Kerjakan Desain)** → **3 (Fix UI)**
- **Alur Cepat:** Langsung pakai **One-Shot** → **3 (Fix UI)**

---

## 1️⃣ Buat Issue Detail *(Tanpa Edit Kode Dulu)*
```text
Baca `AGENTS.md`, `BRIEF.md`, dan `.agent/TECH-SPEC.md`.

Jalankan Mode 1 (Buat Issue Detail) dan simpan ke `.agent/issues/01-design.md`:
- Terjemahkan arahan desain di `BRIEF.md` menjadi blueprint visual lengkap per section (palet warna, font pairing, tata letak, bingkai foto, ornamentasi SVG ringan, dan transisi GPU-only).
- Petakan seluruh data acara ke skema baku `site/config.json` (format ISO + offset zona waktu) dan static OG `<head>`.
- Jangan edit file di `site/` dulu.
```

---

## 2️⃣ Kerjakan Desain & Konten
```text
Baca `AGENTS.md`, `BRIEF.md`, `.agent/TECH-SPEC.md`, dan `.agent/issues/01-design.md`.

Jalankan Mode 2 (Eksekusi Desain & Konten):
1. Rombak total lapisan visual (`site/css/tokens.css`, `site/css/sections.css`, `site/css/motion.css`, struktur visual `site/index.html`, dan `site/js/app.js` jika layout berubah) sesuai `.agent/issues/01-design.md`.
2. Isi `site/config.json` dan static `<meta property="og:*">` URL absolut `https://...` di `site/index.html`.
3. Pertahankan utuh plumbing `site/js/api.js`, `audio.js`, `wa-sender.js`, `site/kirim/index.html`, aturan keamanan, dan budget CSS+JS `site/` < 50 KB.
4. Jalankan verifikasi & self-audit, lalu laporkan hasil dan ukuran byte total CSS+JS `site/`.
```

---

## ⚡ One-Shot *(Buat Issue + Langsung Kerjakan Sekali Jalan)*
```text
Baca `AGENTS.md`, `BRIEF.md`, dan `.agent/TECH-SPEC.md`.

Kerjakan sekaligus dalam 1 kali jalan:
1. Tulis Issue Detail visual & teknis di `.agent/issues/01-design.md` berdasarkan `BRIEF.md`.
2. Langsung implementasikan ke `site/` (`tokens.css`, `sections.css`, `motion.css`, `index.html`, `app.js`, `config.json` + static OG tags absolut) sambil mempertahankan utuh plumbing (`api.js`, `audio.js`, `wa-sender.js`, `kirim/`) dan semua aturan keamanan.
3. Validasi `site/config.json`, pastikan total CSS+JS `site/` < 50 KB dan zero `innerHTML` data user, lalu laporkan hasilnya.
```

---

## 3️⃣ Fix UI Cepat / Debug Error
```text
Baca `AGENTS.md` dan `.agent/TECH-SPEC.md`.

Jalankan Mode 3 (Fix UI / Debug):
- [TULIS KELUHAN VISUAL ATAU ERROR LOG DI SINI, contoh:
  1. Hero terlalu tinggi di layar 360px.
  2. Kartu acara buat lebih lega dengan garis hairline tipis.
  3. Ubah jarak antar section supaya lebih rapi.]

Jaga token di `site/css/tokens.css`, jangan merusak DOM IDs plumbing, pastikan 360px no horizontal scroll, input >= 16px, animasi GPU-only, dan total CSS+JS `site/` tetap < 50 KB.
```
