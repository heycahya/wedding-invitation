# AGENTS.md — Aturan & Panduan AI

## Ringkasan

Repo ini adalah template website undangan pernikahan digital statis berbasis **HTML5, CSS3 Custom Properties, dan Vanilla JS ES6+** dengan seluruh file kerja berada di dalam direktori `site/`. Konten dan visual dikendalikan penuh oleh `.agent/customize/data.md` dan `.agent/customize/design.md`, sedangkan kontrak ID DOM dan endpoint mengikuti `.agent/TECH-SPEC.md`.

Alur kerja bersifat linear tanpa GitHub issue dan tanpa branch per-section:

`Clone (Fase 0) → Standby → Scaffold Assets (Fase 1) → Tunggu Assets (Fase 2) → Implementasi per Section (Fase 3) → Audit Akhir (Fase 4)`

---

## Larangan Teknis

1. **Stack Minimalis & Budget Ukuran:** Gunakan hanya HTML5, CSS3 Custom Properties, dan Vanilla JS ES6+. Dilarang memakai React, Vue, Next, Tailwind, bundler, atau library animasi eksternal. Jaga total ukuran seluruh file `.css` + `.js` di dalam `site/` tetap **< 50 KB** (uncompressed).
2. **Static Hosting & Endpoint GAS:** Sajikan website secara statis dari `site/` (Cloudflare Pages). Form RSVP dan Guestbook hanya boleh memanggil Google Apps Script melalui `data-api-url`. Dilarang menambahkan server backend, database SQL, atau layanan seperti Supabase ke repo ini. Jika `data-api-url=""`, tangani secara aman tanpa error `fetch()` sesuai `.agent/TECH-SPEC.md`.
3. **Anti-XSS & Isolasi Data:** Render parameter `?to=` (maksimal 60 karakter) serta seluruh data user/ucapan Guestbook hanya via `textContent` — **dilarang `innerHTML` untuk input atau data user**. Gunakan `?to=` hanya untuk sapaan di `#guest-name`; dilarang auto-fill ke `#rsvp-name` atau `#guestbook-name`. Baca Guestbook publik hanya via `GET ?slug=...` dan jangan pernah mengekspos data RSVP. Izinkan hanya protokol `https://` dan `http://` untuk tautan eksternal.
4. **Open Graph Statis & Kebersihan Repo:** Hardcode `<meta property="og:*">` di `<head>` `site/index.html` dengan URL absolut `https://...` (`og-image.jpg` `.jpg` sRGB `< 250 KB`). Dilarang menyimpan `spreadsheet_id`, daftar tamu pribadi, nomor WA, atau kredensial di dalam repo.
5. **Batas Ruang Kerja & Kontrak Teknis:** Patuhi seluruh ID DOM, atribut `data-*`, mekanisme `hidden` (`[hidden] { display: none !important; }`), serta kontrak endpoint di `.agent/TECH-SPEC.md`. Semua file kerja hanya boleh berada di dalam `site/`; dilarang membuat atau mengubah file di dalam `.agent/`.

---

## Alur Kerja (Fase 0–4)

### FASE 0 — Clone & Standby
- Clone repo. Jangan ubah file apa pun.
- Baca hanya: `AGENTS.md` (bagian Larangan Teknis), `.agent/TECH-SPEC.md`, `.agent/customize/data.md`, dan `.agent/customize/design.md`.
- Cek isi `data.md` dan `design.md`. Jika masih kosong atau berisi nilai template bawaan: **BERHENTI**, minta user melengkapi spec atau bilang `"spec siap"`.
- Laporkan kepada user: struktur folder repo, status `data.md`, dan status `design.md`.

### FASE 1 — Scaffold Assets *(setelah user bilang `"spec siap"`)*
- Baca `.agent/customize/data.md` dan `.agent/customize/design.md`.
- Susun daftar seluruh asset yang dibutuhkan, lalu buat file placeholder di dalam `site/assets/` pada subfolder: `img/` dan `audio/`.
- Placeholder boleh berupa file gambar `1x1 px` (`img/`) atau file kosong (`audio/`).
- Beri nama file dengan **nama final** yang akan dirujuk di HTML/CSS (dilarang menamai file `"placeholder"`).
- Buat `site/assets/README.md` berisi tabel: `Nama File` → `Dipakai di Section` → `Dimensi / Format Disarankan`.
- **Jangan sentuh** `site/index.html`, `site/css/base.css`, atau `site/js/` pada fase ini.

### FASE 2 — Tunggu Assets
- Berhenti. Tunggu user menimpa file placeholder di `site/assets/` dengan file asli (nama file sama persis).
- Lanjut ke Fase 3 hanya setelah user bilang `"assets siap"`.
- Jika user mengubah nama file asset, catat perubahannya untuk memperbarui referensi pada Fase 3.

### FASE 3 — Implementasi per Section *(setelah user bilang `"assets siap"`)*
- Urutan utama section: `hero → mempelai → acara → countdown → galeri → RSVP → guestbook → musik → footer`.
  *(Kerjakan `#section-cover` di awal dan sisipkan section opsional aktif dari `data.md` seperti `quote`, `story`, atau `gift` sesuai urutan HTML di `.agent/TECH-SPEC.md`; section opsional nonaktif tetap dipertahankan ID DOM-nya dengan atribut `hidden`).*
- Kerjakan **satu section per turn**. Pada setiap turn:
  1. Patch `site/index.html` (isi konten dari `data.md` dan pertahankan ID DOM `.agent/TECH-SPEC.md`).
  2. Patch `site/css/base.css` (ikuti `design.md`: warna `:root`, font, spacing, kanvas max `480px`, `input >= 16px`, tap target `>= 44px`, animasi GPU-only + `prefers-reduced-motion`).
  3. Patch `site/js/main.js` (atau modul `site/js/{app,api,audio}.js` jika memakai skrip bawaan `site/index.html` & `.agent/TECH-SPEC.md`) hanya jika section butuh logika; pastikan tag `<script defer>` di `site/index.html` sinkron.
  4. Rujuk asset menggunakan path final dari Fase 1 (atau nama baru dari Fase 2 bila diubah user).
  5. Laporkan: section yang selesai, ukuran total `.css` + `.js` di `site/` saat ini, dan ID DOM yang dipakai.
- **Jangan lanjut** ke section berikutnya tanpa aba-aba `"lanjut"` dari user.

### FASE 4 — Audit Akhir
- Periksa seluruh item berikut tanpa mengubah file apa pun kecuali diminta user:
  1. Total ukuran seluruh file `.css` + `.js` di `site/` `< 50 KB` uncompressed (laporkan angka pastinya).
  2. Tidak ada `innerHTML` untuk data user; seluruhnya dirender via `textContent`.
  3. Parameter `?to=` dibatasi `<= 60` karakter dan tidak auto-fill ke form RSVP/Guestbook.
  4. Form RSVP dan Guestbook hanya memanggil `data-api-url` (Google Apps Script), atau aman tanpa `fetch()` error jika `data-api-url=""`.
  5. Semua asset yang dirujuk di HTML/CSS tersedia di `site/assets/`.
  6. Seluruh ID DOM dan atribut data cocok dengan `.agent/TECH-SPEC.md`.
- Laporkan checklist **LULUS / GAGAL**. Jangan ubah apa pun kecuali diminta.

---

## Aturan Standby

- Jangan mulai Fase 1 sebelum user bilang `"spec siap"`.
- Jangan mulai Fase 3 sebelum user bilang `"assets siap"`.
- Jangan lanjut ke section berikutnya tanpa aba-aba `"lanjut"`.
- Jika `data.md` atau `design.md` ambigu: **TANYA**, jangan asumsi.
- Jangan buat atau ubah file di dalam `.agent/`.
- Jangan pakai GitHub issue; branch per-section tidak diperlukan.
- Jangan bikin desain atau konten sendiri; semua wajib bersumber dari `design.md` dan `data.md`.

---

## Referensi

- [`.agent/TECH-SPEC.md`](./.agent/TECH-SPEC.md) — Kontrak baku ID DOM, struktur 12 section, `localStorage`, dan endpoint GAS.
- [`.agent/customize/design.md`](./.agent/customize/design.md) — Token warna `:root`, tipografi, spacing, dan arah visual.
- [`.agent/customize/data.md`](./.agent/customize/data.md) — Konten undangan, toggle section `aktif`/`hidden`, tautan, dan endpoint.
- `.agent/skills/*` *(opsional, bukan gate)* — Referensi tambahan anti-slop, pola layout, dan QA mobile WebView bila dibutuhkan.
