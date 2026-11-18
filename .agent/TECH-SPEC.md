# TECH-SPEC.md — Kontrak Teknis Baku (Locked)

Dokumen ini mengunci kontrak teknis antara HTML, CSS, JS, Google Apps Script, Google Sheets, dan `localStorage` agar desain visual boleh berubah bebas di setiap project **tanpa mematahkan fungsi plumbing**.

---

## 1. Struktur Folder & Konvensi Path

- `site/` adalah **root publikasi statis** (Cloudflare Pages *Build output directory*: `site`, *Build command*: kosong).
- Semua pemanggilan file di `site/index.html` memakai path relatif `./` (`./css/...`, `./js/...`, `./config.json`, `./assets/...`), dan di `site/kirim/index.html` memakai `../` (`../css/wa-sender.css`, `../js/wa-sender.js`, `../config.json`) agar bekerja di root domain maupun subpath.
- `gas/Code.gs` berada di luar `site/`.

---

## 2. Kontrak DOM IDs & Hooks Wajib (Untuk Plumbing JS)

Saat merombak HTML/CSS `site/index.html`, pertahankan ID/atribut berikut (atau sesuaikan serentak dengan `site/js/app.js`, `api.js`, `audio.js`):

- **Root & Gate:** `body.is-locked`, `.invitation-canvas`, `#section-cover`, `#guest-name`, `#btn-open-invitation`, `#audio-control`, `#btn-audio-toggle`, `#toast`, `#gallery-lightbox`
- **12 Section IDs:**
  1. `#section-cover` (**CORE**)
  2. `#section-hero` (**CORE**)
  3. `#section-quote` (`features.quote`)
  4. `#section-couple` (**CORE**)
  5. `#section-events` (**CORE**)
  6. `#section-countdown` (`features.countdown`)
  7. `#section-story` (`features.story`)
  8. `#section-gallery` (`features.gallery`)
  9. `#section-rsvp` (`features.rsvp`) — berisi `#form-rsvp`
  10. `#section-guestbook` (`features.guestbook`) — berisi `#form-guestbook` & `#guestbook-list`
  11. `#section-gift` (`features.gift`)
  12. `#section-closing` (**CORE**)

---

## 3. Kontrak Baku `site/config.json`

Jangan mengarang nama key di luar skema berikut:
- **Root:** `schemaVersion` (`"1.0"`), `slug` (`^[a-z0-9-]+$`), `baseUrl` (`https://.../`), `meta` (`title`, `description`, `ogImage`, `locale`)
- **`theme`:** `preset` (`string`), `overrides` (`accentPrimary`, `bgPrimary`)
- **`features`:** `quote`, `countdown`, `story`, `gallery`, `rsvp`, `guestbook`, `gift`, `audio` (`boolean`)
- **`api`:** `endpointUrl` (`string`), `maxPax` (`1..10`), `guestbookPageSize` (`5..50`)
- **`audio`:** `src`, `title`, `loop`
- **`cover`:** `subtitle`, `title`, `dateText`, `image`, `guestPrefix`, `defaultGuestLabel`, `buttonText`
- **`hero`:** `subtitle`, `title`, `dateDisplay`, `image`
- **`quote`:** `text`, `source`
- **`couple`:** `order` (`["bride","groom"]` atau `["groom","bride"]`), `greetingTitle`, `greetingBody`, `bride` (`shortName`, `fullName`, `parentInfo`, `photo`, `instagram`), `groom` (`...`)
- **`events`:** `sectionTitle`, `sectionSubtitle`, `items[]` (`id`, `title`, `dateDisplay`, `startDateTimeIso`, `endDateTimeIso`, `timeDisplay`, `venueName`, `address`, `mapUrl`)
- **`countdown`:** `title`, `targetDateTime` (ISO 8601 + offset zona waktu)
- **`story`:** `sectionTitle`, `items[]` (`period`, `title`, `description`, `image`)
- **`gallery`:** `sectionTitle`, `videoUrl`, `images[]` (`src`, `alt`)
- **`gift`:** `sectionTitle`, `description`, `qrisImage`, `accounts[]` (`bankName`, `accountNumber`, `accountHolder`), `physicalAddress` (`enabled`, `recipientName`, `phone`, `address`)
- **`closing`:** `notes` (`enabled`, `title`, `items[]`), `thankYouTitle`, `thankYouMessage`, `coupleSignature`, `familyNames`
- **`whatsappTemplates`:** `defaultCategory`, `categories` (`formal`, `rekan`, `sahabat`, `keluarga` → `{ label, template }` dengan placeholder `{{nama}}` dan `{{link}}`)

---

## 4. Kontrak Google Apps Script (`gas/Code.gs`) & Google Sheets

- **`POST` (`Content-Type: text/plain;charset=utf-8`, `redirect: "follow"`):**
  - RSVP: `{ slug, type: "rsvp", hp_field: "", payload: { name, attendance, pax, notes } }`
  - Guestbook: `{ slug, type: "guestbook", hp_field: "", payload: { name, message } }`
  - Response JSON: `{ ok: true, code: "SUCCESS", message }` | `{ ok: false, code: "RATE_LIMITED", message }` | `{ ok: false, code: "VALIDATION_ERROR", message }`.
  - `hp_field` tidak kosong → *silent drop* `{ ok: true, code: "SUCCESS", message }`.
- **`GET ?slug=<slug>`:**
  - **HANYA** membaca tab `Guestbook`, filter `is_hidden !== true` / `'TRUE'`, return newest-first maks 100 item: `{ ok: true, slug, items: [{ id, name, message, createdAt }] }`.
- **Resolusi Spreadsheet (`gas/Code.gs`):**
  - Mendukung `MASTER_REGISTRY_ID` di Script Properties (tab `Registry`: `slug`, `spreadsheet_id`, `status`, `title`, `created_at`) dengan `CacheService` 900s (`'sheet_' + slug`, status harus `ACTIVE`), serta fallback opsional `CLIENT_SHEET_ID` untuk deployment single-sheet.
  - `CacheService` rate-limit `rate_${slug}_${normalizedName}` TTL 30s; `LockService.getScriptLock().waitLock(10000)` sebelum `appendRow()`.
- **Header Tab Google Sheet:**
  - Tab `RSVP`: `timestamp_iso` | `guest_name` | `attendance` | `pax` | `notes`
  - Tab `Guestbook`: `timestamp_iso` | `guest_name` | `message` | `is_hidden`

---

## 5. Kontrak `localStorage` WA Sender (`site/kirim/`)

- `wedding_wa_guests_<slug>`: array `{ id, name, phone, category, sent, sentAt }`
- `wedding_wa_templates_<slug>`: `{ selectedCategory, customTemplates: { formal, rekan, sahabat, keluarga } }`
- Normalisasi nomor Indonesia: `08...` → `628...`, `+628...` → `628...`.
- Perakitan link personal: `baseUrl + "?to=" + encodeURIComponent(name.trim()).replace(/%20/g, "+")`.
- Catatan RSVP user: `rsvp_sent_<slug>` di halaman utama.

---

## 6. Standar UI, Performa, Aset & Checklist Audit

- **Budget:** Total seluruh `.css` + `.js` di `site/` **< 50 KB** (uncompressed).
- **Layout & A11y:** Kanvas utama max-width `480px` (WA Sender `720px`), aman di lebar `360px` (zero horizontal scroll), `input/textarea/select` `font-size >= 16px`, tap target `min-height: 44px`, kontras WCAG AA $\ge 4.5:1$, teks di atas foto wajib memakai scrim, `prefers-reduced-motion` aktif, animasi hanya `transform` dan `opacity`.
- **Aset `site/assets/`:**
  - `og-image.jpg`: **WAJIB `.jpg` sRGB**, `1200×630` (area wajah di tengah), **< 250 KB** (batas WhatsApp 300 KB).
  - Foto WebP (`-strip` EXIF, `-auto-orient`, kebab-case): `cover.webp` & `hero.webp` `< 150 KB`, `bride/groom.webp` `< 80 KB`, `story-*.webp` `< 90 KB`, `gallery-*.webp` `< 120 KB`, `qris.webp` `< 100 KB`.
  - Audio `bgm.mp3`: 64–96 kbps, **< 2 MB**.
- **Audit Keamanan Wajib Sebelum Selesai:**
  - Zero `innerHTML` untuk data `?to=` atau Guestbook (`textContent` only).
  - `doGet` hanya akses tab `Guestbook`.
  - `wa-sender.js` memiliki 0 request keluar membawa daftar tamu.
  - `<meta property="og:*">` statis absolut `https://...` dan `<meta name="robots" content="noindex, nofollow">` di `site/kirim/index.html`.
  - `site/config.json` bebas `spreadsheet_id`, nomor WA tamu, atau data sensitif.
