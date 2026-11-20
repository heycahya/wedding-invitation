# TECH-SPEC.md — Kontrak Teknis Baku (Locked)

Referensi kontrak antara HTML, CSS, JS, `localStorage`, dan endpoint eksternal Google Apps Script agar desain visual bebas dirombak tanpa mematahkan fungsi.

---

## 1. Struktur & Path `site/`
- Root publikasi Cloudflare Pages: `site/` (Build command kosong).
- Pada template awal, `site/css/base.css` dan `site/js/{app,api,audio}.js` sengaja dikosongkan dan diisi penuh saat Mode 2 mengikuti kontrak DOM ID & aturan di bawah.
- Seluruh konten teks, jadwal acara, mempelai, dan toggle section dirender **langsung secara statis di `site/index.html`** (tanpa file `config.json` terpisah); ikon antarmuka memakai inline `<svg>` ringan (`< 1 KB`).
- Gunakan path relatif (`./css/base.css`, `./js/...`, `./assets/img/...`, `./assets/audio/...`) agar berjalan di root domain maupun subpath.

---

## 2. DOM IDs & Atribut Data Wajib (`site/index.html`)
Pertahankan ID dan `data-*` attribute berikut saat merombak visual `site/index.html`:
- **Konfigurasi Inline di HTML:**
  - `<main class="invitation-canvas" data-slug="..." data-api-url="..." data-max-pax="4" data-guestbook-page-size="10">`
  - `<section id="section-countdown" data-target-iso="YYYY-MM-DDTHH:mm:ss+07:00">`
  - `<div id="audio-control" data-audio-src="./assets/audio/bgm.mp3" hidden>`
- **Global & Gate:** `body.is-locked`, `#section-cover`, `#guest-name`, `#btn-open-invitation`, `#btn-audio-toggle`, `#toast`, `#gallery-lightbox`
- **12 Section:** `#section-cover` (**CORE**), `#section-hero` (**CORE**), `#section-quote`, `#section-couple` (**CORE**), `#section-events` (**CORE**), `#section-countdown`, `#section-story`, `#section-gallery`, `#section-rsvp` (`#form-rsvp`), `#section-guestbook` (`#form-guestbook` + `#guestbook-list`), `#section-gift`, `#section-closing` (**CORE**). Section opsional yang dinonaktifkan dihapus atau diberi `hidden`.

---

## 3. Kontrak Endpoint Eksternal (Google Apps Script) & `localStorage`
- **POST (`data-api-url`):** `Content-Type: text/plain;charset=utf-8`, `redirect: "follow"` (hindari preflight CORS `OPTIONS`).
  - RSVP: `{ slug, type: "rsvp", hp_field: "", payload: { name, attendance, pax, notes } }`
  - Guestbook: `{ slug, type: "guestbook", hp_field: "", payload: { name, message } }`
  - Response: `{ ok: true, code: "SUCCESS", message }` | `{ ok: false, code: "RATE_LIMITED" | "VALIDATION_ERROR", message }`
- **GET (`data-api-url?slug=<slug>`):** Guestbook publik only → `{ ok: true, slug, items: [{ id, name, message, createdAt }] }`
- **`localStorage`:** `rsvp_sent_<slug>`, `rsvp_cooldown_<slug>`, `gb_cooldown_<slug>`.

---

## 4. Perilaku Wajib Modul JS (`site/js/*`)
- **`app.js`:**
  - Parse `?to=` (trim, maks 60 char via `textContent`; fallback label default pada `#guest-name`); pre-fill ke `#rsvp-name` dan `#guestbook-name` jika `?to=` ada.
  - Cover Gate: klik `#btn-open-invitation` membuka `body.is-locked`, panggil `play()` audio, transisi `.is-opening` lalu `hidden`.
  - Countdown 3 kondisi dari `data-target-iso` (sebelum acara, `< 24 jam` berlangsung, `>= 24 jam` selesai); Gallery Lightbox (`Esc`, Prev/Next, klik backdrop); Gift copy clipboard (`navigator.clipboard` + fallback `execCommand`); `IntersectionObserver` one-time reveal.
- **`audio.js`:** Baca `data-audio-src` dari `#audio-control` (jika kosong/nonaktif, tombol tidak dirender), `<audio preload="none" loop>`, tangkap `.play().catch()` secara senyap, dan event `visibilitychange` (auto-pause saat tab/app ditinggalkan, lanjutkan saat kembali hanya bila sebelumnya playing).
- **`api.js`:** Baca `data-slug`, `data-api-url`, `data-max-pax`, dan `data-guestbook-page-size` dari `.invitation-canvas`; sembunyikan `pax` (`0`) saat `tidak_hadir`, client cooldown 30 detik, non-blocking `GET` Guestbook dengan skeleton/empty/retry state, optimistic prepend, paginasi *Load More*, dan selalu render ucapan lewat `textContent`.

---

## 5. Aset, Performa & Audit Wajib
- Total CSS + JS di `site/` **< 50 KB** (uncompressed).
- `og-image.jpg` `.jpg` sRGB `1200×630` `< 250 KB`, WebP `< 150 KB` (`-strip` EXIF), MP3 `< 2 MB`.
- Kanvas `480px`, aman di `360px`, input `>= 16px`, tap `>= 44px`, animasi `transform`/`opacity` + `prefers-reduced-motion`.
- Audit sebelum selesai: zero `innerHTML` data user, static OG absolut `https://...`, zero `spreadsheet_id` atau daftar tamu pribadi di dalam repo.
