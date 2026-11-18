# Skill: apply_design

## Objective
Menerapkan desain unik, tata letak, dan data undangan dari `.agent/issues/[N]-[slug].md` (atau langsung `BRIEF.md` pada mode one-shot) ke scaffold `site/` secara utuh, sambil menjaga plumbing dan keamanan tetap solid.

---

## Steps

1. **Baca Blueprint & Scaffold:**
   - Baca `AGENTS.md`, `BRIEF.md`, `.agent/TECH-SPEC.md`, dan `.agent/issues/[N]-[slug].md` (jika ada).
   - Periksa file existing di `site/` sebelum mengubahnya.

2. **Rombak Lapisan Desain & Konten:**
   - **`site/css/tokens.css`:** Terapkan palet warna, pasangan Google Fonts (`--font-display`, `--font-sans`), radius, dan skala visual sesuai brief.
   - **`site/css/sections.css` & `site/css/motion.css`:** Bangun ulang komposisi layout, bingkai foto, detail kartu, divider/ornamen SVG, dan transisi GPU-only (`transform`, `opacity`) agar benar-benar khas — pertahankan `@media (prefers-reduced-motion: reduce)`.
   - **`site/index.html`:** Perbarui link Google Fonts, hardcoded static `<title>`, `<meta name="description">`, `<meta property="og:*">` dengan URL absolut `https://...`, dan struktur visual 12 section di `<main class="invitation-canvas">` dengan tetap mempertahankan seluruh DOM IDs wajib di `.agent/TECH-SPEC.md` Bab 2.
   - **`site/js/app.js`:** Sesuaikan helper render layout jika struktur DOM berubah, sambil menjaga sanitasi `?to=` (`trim()`, maks 60 char, `textContent`), validasi URL `https://`, countdown 3 status, Google Calendar UTC link, Lightbox, Copy Rekening fallback, dan `IntersectionObserver`.
   - **`site/config.json`:** Isi seluruh data undangan, toggle `features.*`, dan template WhatsApp mengikuti persis key baku `.agent/TECH-SPEC.md`.

3. **Jaga Lapisan Plumbing Utuh:**
   - Jangan rusak `gas/Code.gs`, `site/js/api.js`, `site/js/audio.js`, `site/js/wa-sender.js`, `site/kirim/index.html`, atau aturan `base.css` (max-width `480px`, `input >= 16px`, tap target `>= 44px`, no horizontal scroll di `360px`).

4. **Verifikasi & Self-Audit (Wajib Sebelum Selesai):**
   - Hitung total ukuran semua `.css` + `.js` di `site/` — wajib **< 50 KB** (`< 51200` bytes).
   - Validasi sintaks `site/config.json` (dan cek JS syntax bila `node` tersedia).
   - Cek keamanan wajib:
     - Zero `innerHTML` untuk data `?to=` maupun Guestbook (`textContent` only).
     - `doGet` di `gas/Code.gs` hanya membaca `Guestbook`.
     - `site/kirim/index.html` punya `<meta name="robots" content="noindex, nofollow">` dan `wa-sender.js` nol request data tamu keluar.
     - `site/config.json` bebas `spreadsheet_id` atau data sensitif.
     - Tag OG di `site/index.html` statis & absolut `https://...`.

5. **Laporkan Secara Jujur:**
   - File yang diubah, total ukuran CSS+JS `site/`, hasil pemeriksaan yang dijalankan vs yang perlu dicek di browser/live GAS, daftar aset media yang perlu diisi di `site/assets/`, serta perintah preview `python3 -m http.server 8080 --directory site`.

---

## Larangan
- Tidak melebihi budget `< 50 KB` untuk seluruh CSS + JS di `site/`.
- Tidak menambahkan framework JS, library animasi eksternal, atau build step.
- Tidak mengarang key baru di `site/config.json` di luar `.agent/TECH-SPEC.md`.
