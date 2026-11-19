# TECH-SPEC.md — Kontrak Teknis Baku (Locked)

Referensi kontrak antara HTML, CSS, JS, `config.json`, `localStorage`, dan endpoint eksternal Google Apps Script agar desain visual bebas dirombak tanpa mematahkan fungsi.

---

## 1. Struktur & Path `site/`
- Root publikasi Cloudflare Pages: `site/` (Build command kosong).
- Pada template awal, `site/css/*` dan `site/js/*` sengaja dikosongkan dan diisi penuh saat Mode 2 mengikuti kontrak DOM ID & skema di bawah.
- Gunakan path relatif (`./css/...`, `./js/...`, `./config.json`, `./assets/...` dari `site/index.html`; `../` dari `site/kirim/index.html`) agar berjalan di root domain maupun subpath.

---

## 2. DOM IDs Wajib (Hook Plumbing JS)
Pertahankan ID berikut saat merombak HTML/CSS `site/index.html` (atau sesuaikan serentak dengan JS terkait):
- **Global & Gate:** `body.is-locked`, `.invitation-canvas`, `#section-cover`, `#guest-name`, `#btn-open-invitation`, `#audio-control`, `#btn-audio-toggle`, `#toast`, `#gallery-lightbox`, `#load-error`, `#btn-retry-load`
- **12 Section:** `#section-cover` (**CORE**), `#section-hero` (**CORE**), `#section-quote` (`features.quote`), `#section-couple` (**CORE**), `#section-events` (**CORE**), `#section-countdown` (`features.countdown`), `#section-story` (`features.story`), `#section-gallery` (`features.gallery`), `#section-rsvp` (`features.rsvp` + `#form-rsvp`), `#section-guestbook` (`features.guestbook` + `#form-guestbook` + `#guestbook-list`), `#section-gift` (`features.gift`), `#section-closing` (**CORE**).

---

## 3. Skema Baku `site/config.json`
Gunakan persis nama key berikut:
- **Root:** `schemaVersion` (`"1.0"`), `slug` (`^[a-z0-9-]+$`), `baseUrl` (`https://.../`), `meta` (`title`, `description`, `ogImage`, `locale`)
- **`theme`:** `preset` (`string`), `overrides` (`accentPrimary`, `bgPrimary`)
- **`features`:** `quote`, `countdown`, `story`, `gallery`, `rsvp`, `guestbook`, `gift`, `audio` (`boolean`)
- **`api`:** `endpointUrl` (`string`), `maxPax` (`1..10`), `guestbookPageSize` (`5..50`)
- **`audio`:** `src`, `title`, `loop`
- **`cover`:** `subtitle`, `title`, `dateText`, `image`, `guestPrefix`, `defaultGuestLabel`, `buttonText`
- **`hero`:** `subtitle`, `title`, `dateDisplay`, `image`
- **`quote`:** `text`, `source`
- **`couple`:** `order` (`["bride","groom"]` / `["groom","bride"]`), `greetingTitle`, `greetingBody`, `bride` & `groom` (`shortName`, `fullName`, `parentInfo`, `photo`, `instagram`)
- **`events`:** `sectionTitle`, `sectionSubtitle`, `items[]` (`id`, `title`, `dateDisplay`, `startDateTimeIso`, `endDateTimeIso`, `timeDisplay`, `venueName`, `address`, `mapUrl`)
- **`countdown`:** `title`, `targetDateTime` (ISO 8601 + offset zona waktu)
- **`story`:** `sectionTitle`, `items[]` (`period`, `title`, `description`, `image`)
- **`gallery`:** `sectionTitle`, `videoUrl`, `images[]` (`src`, `alt`)
- **`gift`:** `sectionTitle`, `description`, `qrisImage`, `accounts[]` (`bankName`, `accountNumber`, `accountHolder`), `physicalAddress` (`enabled`, `recipientName`, `phone`, `address`)
- **`closing`:** `notes` (`enabled`, `title`, `items[]`), `thankYouTitle`, `thankYouMessage`, `coupleSignature`, `familyNames`
- **`whatsappTemplates`:** `defaultCategory`, `categories` (`formal`, `rekan`, `sahabat`, `keluarga` → `{ label, template }` dengan `{{nama}}` & `{{link}}`)

---

## 4. Kontrak Endpoint Eksternal (Google Apps Script) & `localStorage`
- **POST (`api.endpointUrl`):** `Content-Type: text/plain;charset=utf-8`, `redirect: "follow"` (hindari preflight CORS `OPTIONS`).
  - RSVP: `{ slug, type: "rsvp", hp_field: "", payload: { name, attendance, pax, notes } }`
  - Guestbook: `{ slug, type: "guestbook", hp_field: "", payload: { name, message } }`
  - Response: `{ ok: true, code: "SUCCESS", message }` | `{ ok: false, code: "RATE_LIMITED" | "VALIDATION_ERROR", message }`
- **GET (`api.endpointUrl?slug=<slug>`):** Guestbook publik only → `{ ok: true, slug, items: [{ id, name, message, createdAt }] }`
- **`localStorage`:** `wedding_wa_guests_<slug>`, `wedding_wa_templates_<slug>`, `rsvp_sent_<slug>`, `rsvp_cooldown_<slug>`, `gb_cooldown_<slug>`.

---

## 5. Perilaku Wajib Modul JS (`site/js/*`)
- **`app.js`:**
  - Parse `?to=` (trim, maks 60 char via `textContent`; fallback `cover.defaultGuestLabel`); pre-fill ke `#rsvp-name` dan `#guestbook-name` jika `?to=` ada.
  - Fetch `./config.json` dengan fallback `#load-error` + `#btn-retry-load`; terapkan `theme.overrides`; sembunyikan section `features.*: false` atau data kosong.
  - Cover Gate: klik `#btn-open-invitation` membuka `body.is-locked`, panggil `play()` audio, transisi `.is-opening` lalu `hidden`.
  - Couple sesuai `couple.order` + fallback monogram inisial; Events + Google Calendar UTC URL; Countdown 3 kondisi (sebelum, `< 24 jam` berlangsung, `>= 24 jam` selesai); Gallery Lightbox (`Esc`, Prev/Next, klik backdrop); Gift copy clipboard (`navigator.clipboard` + fallback `execCommand`); `IntersectionObserver` one-time reveal.
- **`audio.js`:** `<audio preload="none" loop>`, tangkap `.play().catch()` secara senyap, dan event `visibilitychange` (auto-pause saat tab/app ditinggalkan, lanjutkan saat kembali hanya bila sebelumnya playing).
- **`api.js`:** Sembunyikan `pax` (`0`) saat `tidak_hadir`, client cooldown 30 detik, non-blocking `GET` Guestbook dengan skeleton/empty/retry state, optimistic prepend, paginasi *Load More*, dan selalu render ucapan lewat `textContent`.
- **`wa-sender.js`:** Parser paste multi-baris & `.csv/.txt`, normalisasi nomor (`08...`/`+628...` → `628...`), template editor (`{{nama}}`, `{{link}}`) + reset, Contact Picker opsional (`'contacts' in navigator && 'ContactsManager' in window`), ekspor CSV aman formula-injection, dan 0 request jaringan daftar tamu.

---

## 6. Aset, Performa & Audit Wajib
- Total CSS + JS di `site/` **< 50 KB** (uncompressed).
- `og-image.jpg` `.jpg` sRGB `1200×630` `< 250 KB`, WebP `< 150 KB` (`-strip` EXIF), MP3 `< 2 MB`.
- Kanvas `480px` (`720px` untuk `/kirim/`), aman di `360px`, input `>= 16px`, tap `>= 44px`, animasi `transform`/`opacity` + `prefers-reduced-motion`.
- Audit sebelum selesai: zero `innerHTML` data user, static OG absolut `https://...`, `noindex, nofollow` di `site/kirim/index.html`, zero `spreadsheet_id` di `config.json`.
