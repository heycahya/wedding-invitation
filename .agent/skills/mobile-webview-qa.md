# Skill: Mobile & WhatsApp WebView QA

> Checklist teknis UI khusus untuk memastikan tampilan tidak pecah di **layar HP sempit (`360px`)** maupun **WhatsApp In-App Browser (Android WebView & iOS WKWebView)**.

---

## 1. Viewport Tinggi & Cover Gate Anti-Terpotong
- Toolbar bawah browser HP / WA WebView sering memotong `100vh`.
- Gunakan `height: 100dvh; min-height: 100svh;` pada `#section-cover`, sertakan `overflow-y: auto` dan `padding-bottom: max(var(--space-6), env(safe-area-inset-bottom))` agar pada layar pendek (`360×640`) tombol `#btn-open-invitation` tetap terlihat dan dapat diakses.

## 2. Anti-Overflow di Lebar `360px`
- Wajib terapkan `min-width: 0` pada item di dalam CSS Grid/Flexbox (seperti kotak Countdown, grid Galeri, header Guestbook).
- Nama lengkap bergelar panjang, URL/teks tanpa spasi di Guestbook, dan nomor rekening wajib memakai `overflow-wrap: break-word` (atau `overflow-wrap: anywhere` pada nomor rekening/kode).
- Pastikan `.invitation-canvas` menggunakan `overflow-x: clip` (bukan `overflow-x: hidden` di `html` saja yang kadang gagal mencegah geseran menyamping di Safari).

## 3. Ergonomi Sentuh & iOS Safari Input Guard
- Seluruh `<input>`, `<select>`, dan `<textarea>` wajib `font-size >= 16px` (`1rem`) agar iOS Safari/WKWebView tidak melakukan *auto-zoom* saat mengetik form RSVP/Guestbook.
- Seluruh elemen interaktif (`button`, `.btn`, link CTA, tombol close lightbox) wajib `min-height: 44px` dengan jarak minimal `8px` antar-tombol sejajar.
- **Fokus Modal Lightbox (`#gallery-lightbox`):** Saat dibuka, sembunyikan latar dari fokus (`inert` / trap fokus modal) dan arahkan fokus ke `#lightbox-close`; saat ditutup (`Esc`, klik backdrop, atau `#lightbox-close`), kembalikan fokus ke thumbnail asal.
- **Area Aman Floating Audio:** Beri `padding-bottom: 84px` (atau lebih) pada `#section-closing` agar tombol `#btn-audio-toggle` (`bottom: 20px; right: 20px`) saat aktif tidak menutupi teks penutup atau tombol bawah.

## 4. Performa & Fallback di WebView Android
- Foto potret wajah wajib pakai `object-fit: cover` dan `object-position: center 25%` agar kepala tidak terpotong.
- Jangan menumpuk `backdrop-filter: blur()` di banyak kartu (cukup maksimal di Cover Gate jika perlu, karena berat saat di-scroll di HP entry-level).
- Pastikan setiap `<img>` punya fallback rapi (`onerror` menyembunyikan `<img>` rusak / menampilkan monogram inisial) agar tidak muncul ikon gambar pecah.
- Pastikan fitur salin rekening (`navigator.clipboard`) tetap punya fallback `<textarea>` + `document.execCommand('copy')` untuk WebView Android lama.
