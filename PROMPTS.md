# PROMPTS.md — Template Prompt Siap-Copy

Pilih alur yang paling nyaman setelah mengedit [`BRIEF.md`](./BRIEF.md):
- **Alur 2 Tahap *(Rekomendasi untuk kontrol desain)*:** Pakai **Prompt 1 (Issue Detail)** → review sebentar → jalankan **Prompt 2 (Eksekusi Implementasi)**.
- **Alur 1x Prompt *(One-Shot)*:** Langsung pakai **Prompt One-Shot** di bawah.
- **Setelah Preview di HP:** Pakai **Prompt 3 (Fix UI Cepat)** berkali-kali seperlunya.

---

## 1️⃣ Prompt Buat Issue Detail (`make_issue`)
```text
Baca `AGENTS.md`, `BRIEF.md`, dan `.agent/TECH-SPEC.md`.
Ikuti `.agent/skills/make_issue.md`.

Buatkan Issue Detail lengkap dan simpan ke `.agent/issues/01-design.md` berdasarkan konsep visual & data di `BRIEF.md`.
Pastikan blueprint visual per section (tipografi, palet, komposisi layout, bingkai foto, ornamentasi SVG ringan, dan animasi GPU-only) dirinci dengan jelas, sambil tetap menjaga seluruh kontrak plumbing & aturan keamanan `AGENTS.md` / `.agent/TECH-SPEC.md`.
Jangan edit kode di `site/` atau `gas/` dulu.
```

---

## 2️⃣ Prompt Eksekusi Desain & Konten (`apply_design`)
```text
Baca `AGENTS.md`, `BRIEF.md`, `.agent/TECH-SPEC.md`, dan `.agent/issues/01-design.md`.
Ikuti `.agent/skills/apply_design.md`.

Implementasikan desain & konten dari issue tersebut ke dalam `site/`:
1. Rombak lapisan visual (`site/css/tokens.css`, `site/css/sections.css`, `site/css/motion.css`, struktur visual `site/index.html`, dan `site/js/app.js` bila layout berubah) agar benar-benar mencerminkan konsep di `BRIEF.md` — bukan sekadar mengganti sedikit warna.
2. Sinkronkan `site/config.json` dan static `<meta property="og:*">` URL absolut di `site/index.html`.
3. Pertahankan utuh plumbing `gas/Code.gs`, `site/js/api.js`, `site/js/audio.js`, `site/js/wa-sender.js`, `site/kirim/index.html`, serta semua aturan keamanan (`textContent` anti-XSS, isolasi RSVP, WA `localStorage`, < 50 KB total CSS+JS).
4. Jalankan verifikasi & self-audit di Termux, lalu laporkan hasil, total ukuran CSS+JS `site/`, dan cara preview.
```

---

## ⚡ Alternatif: Prompt One-Shot (Buat Issue + Langsung Kerjakan)
```text
Baca `AGENTS.md`, `BRIEF.md`, dan `.agent/TECH-SPEC.md`.

Kerjakan dalam 1x jalan:
1. Pertama, tulis rencana Issue Detail di `.agent/issues/01-design.md` sesuai `.agent/skills/make_issue.md` untuk menerjemahkan konsep visual & data di `BRIEF.md`.
2. Langsung lanjut eksekusi sesuai `.agent/skills/apply_design.md`: rombak desain `site/css/{tokens,sections,motion}.css`, `site/index.html`, `site/js/app.js`, dan `site/config.json` (plus static OG tags absolut). Pertahankan utuh plumbing `gas/Code.gs`, `api.js`, `audio.js`, `wa-sender.js`, dan `kirim/`.
3. Jalankan validasi JSON `site/config.json`, pastikan total CSS+JS `site/` < 50 KB, audit keamanan (no innerHTML user data, isolasi RSVP, WA localStorage), dan laporkan hasilnya secara jujur.
```

---

## 3️⃣ Prompt Fix UI Cepat (`fix_ui`)
```text
Baca `AGENTS.md` dan ikuti `.agent/skills/fix_ui.md`.

Tolong fix UI / poles tampilan berikut:
- [TULIS POIN PERUBAHAN VISUAL DI SINI, contoh:
  1. Hero terlalu tinggi di 360px, tombol CTA kurang menonjol.
  2. Kartu acara buat lebih lega dengan garis hairline yang tegas.
  3. Ubah urutan/spacing section couple supaya lebih editorial.]

Jaga token CSS di `site/css/tokens.css`, jangan merusak ID DOM/plumbing JS, pastikan 360px bebas horizontal scroll, input >= 16px, GPU-only motion, dan total CSS+JS `site/` tetap < 50 KB.
```

---

## 4️⃣ Prompt Debug Error (`fix_ui` Mode RCA) — *Saat Ada Error*
```text
Baca `AGENTS.md`, `.agent/TECH-SPEC.md`, dan ikuti mode Debug di `.agent/skills/fix_ui.md`.
Jangan langsung tambal gejala—lakukan Root Cause Analysis pada file terkait terlebih dahulu.

Gejala / Error Log:
[PASTE ERROR CONSOLE, CORS/GAS, LAYOUT 360px PECAH, ATAU MASALAH OG WHATSAPP DI SINI]
```
