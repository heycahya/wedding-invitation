# TECH-SPEC.md — Kontrak Teknis Baku (Locked)

Referensi kontrak antara HTML, CSS, JS, `localStorage`, dan endpoint eksternal Google Apps Script agar desain visual bebas dirombak tanpa mematahkan fungsi.

---

## 1. Struktur & Path `site/`
- Root publikasi Cloudflare Pages: `site/` (Build command kosong).
- Pada template awal, `site/css/base.css` dan `site/js/{app,api,audio}.js` sengaja dikosongkan dan diisi penuh saat Fase 3 — Implementasi per Section mengikuti kontrak DOM ID & aturan di bawah.
- Seluruh konten teks, jadwal acara, mempelai, dan toggle section dirender **langsung secara statis di `site/index.html`** (tanpa file `config.json` terpisah); ikon antarmuka memakai inline `<svg>` ringan (`< 1 KB`).
- Gunakan path relatif (`./css/base.css`, `./js/...`, `./assets/img/...`, `./assets/audio/...`) agar berjalan di root domain maupun subpath.

---

## 2. DOM IDs, Atribut Data & Mekanisme Hide/Show (`site/index.html`)
Pertahankan seluruh ID, struktur 12 section, dan atribut `data-*` berikut saat mengkustomisasi visual `site/index.html`:
- **Konfigurasi Inline di HTML:**
  - `<main class="invitation-canvas" data-slug="..." data-api-url="..." data-max-pax="4" data-guestbook-page-size="10">`
  - `<section id="section-countdown" data-target-iso="YYYY-MM-DDTHH:mm:ss+07:00">`
  - `<div id="audio-control" data-audio-src="./assets/audio/bgm.mp3" hidden>`
- **Global & Gate:** `body.is-locked`, `#section-cover`, `#guest-name`, `#btn-open-invitation`, `#btn-audio-toggle`, `#toast`, `#gallery-lightbox` (`#lightbox-img`, `#lightbox-prev`, `#lightbox-next`, `#lightbox-counter`, `#lightbox-close`).
- **12 Section (5 CORE + 7 OPSIONAL):**
  - **CORE:** `#section-cover`, `#section-hero`, `#section-couple`, `#section-events`, `#section-closing`.
  - **OPSIONAL:** `#section-quote`, `#section-countdown`, `#section-story`, `#section-gallery`, `#section-rsvp` (`#form-rsvp`), `#section-guestbook` (`#form-guestbook`, `#guestbook-list`), `#section-gift`.
- **Mekanisme Hide/Show Section Opsional:** Jangan menghapus DOM ID atau fondasi markup di template dasar. Saat suatu section opsional (atau `#audio-control`) dinonaktifkan di suatu project/showcase via `.agent/customize/data.md`, tambahkan atribut HTML `hidden` pada elemen `<section>` terkait (dan pastikan CSS selalu menyertakan `[hidden] { display: none !important; }` agar tidak meninggalkan celah kosong).
- **Tombol Aksi Acara (`#section-events`):**
  - *Petunjuk Lokasi:* tautan `<a>` dengan protokol `https://` ke Google Maps (`target="_blank" rel="noopener noreferrer"`).
  - *Simpan ke Kalender:* tautan `<a>` **Google Calendar Web Intent** (`https://calendar.google.com/calendar/render?action=TEMPLATE&text=...&dates=YYYYMMDDTHHMMSSZ/YYYYMMDDTHHMMSSZ&location=...&details=...`) dengan `target="_blank" rel="noopener noreferrer"` (aman terhadap aturan protokol `https://` & kompatibel dengan Android/iOS WhatsApp WebView tanpa kendala blokir unduhan `.ics`).

---

## 3. Kontrak Endpoint Eksternal (GAS), `localStorage` & Mode Non-Backend
- **Jika `data-api-url` Aktif (`https://...`):**
  - **POST (`data-api-url`):** `Content-Type: text/plain;charset=utf-8`, `redirect: "follow"` (hindari preflight CORS `OPTIONS`).
    - RSVP: `{ slug, type: "rsvp", hp_field: "", payload: { name, attendance, pax, notes } }`
    - Guestbook: `{ slug, type: "guestbook", hp_field: "", payload: { name, message } }`
    - Response: `{ ok: true, code: "SUCCESS", message }` | `{ ok: false, code: "RATE_LIMITED" | "VALIDATION_ERROR", message }`
  - **GET (`data-api-url?slug=<slug>` atau `&cursor=<nextCursor>`):** Guestbook publik only → `{ ok: true, slug, items: [{ id, name, message, createdAt }], hasMore?: boolean, nextCursor?: string }`. Jika GAS sederhana mengembalikan seluruh `items` sekaligus tanpa `hasMore`/`nextCursor`, `api.js` otomatis melakukan *Load More* di sisi klien per `data-guestbook-page-size` dan menyembunyikan `#guestbook-load-more-wrap` saat seluruh item tampil.
  - **`localStorage`:** `rsvp_sent_<slug>`, `rsvp_cooldown_<slug>`, `gb_cooldown_<slug>`.
- **Jika `data-api-url` Kosong / Belum Dikonfigurasi (`data-api-url=""`):**
  - `api.js` **tidak** memanggil `fetch()` dan **tidak** memunculkan pesan error gagal memuat.
  - Jika `#section-rsvp` / `#section-guestbook` diberi `hidden` melalui konfigurasi, biarkan tetap tersembunyi diam.
  - Jika tetap ditampilkan untuk tujuan *showcase* / pratinjau UI saat `data-api-url=""`: saat form disubmit, jalankan validasi input klien lalu tampilkan status informatif netral di `#rsvp-feedback` / `#guestbook-feedback` (*mis. "Mode pratinjau — konfirmasi online aktif setelah endpoint dikonfigurasi"*), tanpa menulis `localStorage` permanen yang mengunci form; sedangkan `#guestbook-list` menampilkan contoh ucapan statis dari HTML atau empty state rapi tanpa tombol *Retry* error.

---

## 4. Perilaku Wajib Modul JS (`site/js/*`)
- **`app.js`:**
  - Parse `?to=` (trim, maks 60 char, render ke `#guest-name` via `textContent`; fallback `"Tamu Undangan"`). **`?to=` hanya untuk sapaan personal** — **dilarang** mengisi otomatis field `#rsvp-name` atau `#guestbook-name`.
  - Cover Gate: klik `#btn-open-invitation` membuka `body.is-locked`, panggil `play()` audio (bila modul & `data-audio-src` aktif), jalankan transisi `.is-opening` lalu set `hidden`.
  - Countdown 3 kondisi dari `data-target-iso` (sebelum acara, `< 24 jam` berlangsung, `>= 24 jam` selesai); bila `#section-countdown[hidden]`, timer tidak perlu dijalankan.
  - **Gallery Lightbox (`#gallery-lightbox`):** sebelum membuka, simpan `lastFocusedEl = document.activeElement`; saat terbuka kunci scroll latar, terapkan `inert` pada kontainer latar (`.invitation-canvas`, `#section-cover`) agar tab & screen-reader tetap di dalam dialog, dan pindahkan fokus ke `#lightbox-close`; dukung `Esc`, Prev/Next, dan klik backdrop; saat ditutup lepas `inert`, buka scroll latar, dan kembalikan `.focus()` ke `lastFocusedEl`.
  - Gift copy clipboard (`navigator.clipboard` + fallback `execCommand`) & `IntersectionObserver` one-time reveal.
- **`audio.js`:** Baca `data-audio-src` dari `#audio-control` (bila kosong, tetap `hidden` dan tidak merender/menampilkan FAB), `<audio preload="none" loop>`, tangkap `.play().catch()` secara senyap, dan event `visibilitychange` (auto-pause saat tab/app ditinggalkan, lanjutkan saat kembali hanya bila sebelumnya sedang memutar).
- **`api.js`:** Baca `data-slug`, `data-api-url`, `data-max-pax`, dan `data-guestbook-page-size` dari `.invitation-canvas`; hormati mode non-backend (`data-api-url=""`); sembunyikan `pax` (`0`) saat `tidak_hadir`; client cooldown 30 detik (saat endpoint aktif); non-blocking `GET` Guestbook dengan skeleton/empty/retry state & paginasi *Load More*; saat submit Guestbook (`POST`), kunci tombol dengan loading state (`disabled`) lalu prepend ucapan baru ke atas `#guestbook-list` segera setelah respons `{ ok: true }` diterima tanpa `GET` ulang *(jika memakai optimistic prepend sebelum respons, wajib hapus node sementara dan pertahankan teks textarea + tampilkan error di `#guestbook-feedback` bila gagal)*; selalu render ucapan via `textContent`.

---

## 5. Aset, Kontras, Performa & Audit Wajib
- Total CSS + JS di `site/` **< 50 KB** (uncompressed).
- `og-image.jpg` `.jpg` sRGB `1200×630` `< 250 KB`, WebP `< 150 KB` (`-strip` EXIF), MP3 `< 2 MB`.
- Kanvas `480px`, aman di `360px`, `[hidden] { display: none !important; }`, input `>= 16px`, tap `>= 44px`, kontras teks WCAG AA ($\ge 4.5:1$), border kontrol interaktif WCAG 1.4.11 ($\ge 3.0:1$), animasi `transform`/`opacity` + `prefers-reduced-motion`.
- Audit sebelum selesai: zero `innerHTML` data user, `?to=` tidak autofill ke form, Lightbox focus return berfungsi, static OG absolut `https://...`, zero `spreadsheet_id` atau daftar tamu pribadi di dalam repo.
