# Skill: polish_ui
> Digunakan saat: Iterasi cepat `fix UI` pasca-preview (tanpa seremoni issue baru)

## Objective
Memoles visual, tipografi, spacing, proporsi foto/kartu, atau animasi pada `site/` sesuai feedback user dengan cepat dan aman — tanpa merusak struktur JS, kontrak `config.json`, responsivitas `360px`, atau budget `< 50 KB`.

---

## Steps

### 1. Baca Feedback & File Terkait
- Baca bagian spesifik yang diminta user (mis. Cover Gate, Hero, kartu Events, Gift, atau WA Sender).
- Baca `site/css/tokens.css`, `site/css/sections.css` / `base.css` / `motion.css`, `site/index.html`, dan `.agent/DESIGN.md`.

### 2. Terapkan Perubahan Visual Secara Presisi
- **Gunakan Token:** Sesuaikan nilai warna/spacing/radius/tipografi melalui CSS Custom Properties di `site/css/tokens.css` atau panggil token yang ada di `sections.css`. Hindari nilai hex liar atau `!important` berlebihan.
- **Pertahankan Kontrak DOM & JS:** Jangan ubah `id`, `name`, atau `data-*` attribute yang dibaca oleh `site/js/app.js`, `api.js`, `audio.js`, atau `wa-sender.js`.
- **Jaga Ergonomi Mobile & WebView:**
  - Pastikan tidak ada horizontal overflow di lebar `360px`.
  - Pastikan input form tetap `font-size >= 16px` (`1rem`) dan tombol/link interaktif tetap `min-height: 44px`.
  - Teks di atas foto wajib tetap terbaca dengan scrim (`--overlay-scrim`).
- **Jaga Performa Motion:** Hanya gunakan `transform` dan `opacity`, tetap pertahankan `@media (prefers-reduced-motion: reduce)`.

### 3. Verifikasi Ringan Setelah Edit
- Cek total ukuran seluruh CSS + JS di `site/` masih **< 50 KB** (`wc -c`).
- Pastikan tag statis `<meta property="og:*">` di `site/index.html` tetap utuh dengan URL absolut `https://...`.
- Jika `python3` tersedia, cek via `python3 -m http.server 8080 --directory site` agar tidak ada asset error atau overflow di layar HP.

---

## Output ke User
Laporkan singkat dan jujur:
1. File & bagian UI yang diperbaiki.
2. Total ukuran CSS + JS `site/` terbaru (memastikan `< 50 KB`).
3. Bagian mana yang perlu dicek ulang oleh user di browser HP (`360px` / WhatsApp In-App Browser).
