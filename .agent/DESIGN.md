# Design & Architecture Blueprint — Digital Wedding Invitation

> **Status:** Locked Architecture Reference untuk setiap project hasil clone.  
> **Prinsip Template:** Apa yang ada di dokumen ini adalah **fondasi tetap** (tech stack, struktur `site/` + `gas/`, kontrak `config.json`, kontrak GAS/Sheets, WA Sender, 12 section IDs, aturan motion, dan keamanan).  
> **Apa yang berubah per project** diisi di [`DESIGN-BRIEF.md`](../DESIGN-BRIEF.md) (tema/konsep visual, palet warna, font pairing, gaya bingkai, fitur aktif, dan data klien).

---

## 1. Tech Stack Mengikat (`APPROVED`)

| Layer | Teknologi Wajib | Aturan & Batasan |
| :--- | :--- | :--- |
| **Core Frontend** | HTML5, CSS3 (Custom Properties), Vanilla JS (ES6+) | Static-first, tanpa React/Vue/Next/Tailwind, tanpa build step wajib. Total CSS + JS di `site/` **< 50 KB**. |
| **Source Control** | Git & GitHub | Template repo di-clone per project undangan. |
| **Static Hosting** | Cloudflare Pages (Free Tier) | Build command: *(kosong)*, Build output directory: `site`. |
| **Backend API** | 1 Google Apps Script Web App (`gas/Code.gs`) | Akses `Anyone`, menangani `POST` (`Content-Type: text/plain`) & `GET` (Guestbook only). |
| **Database** | Google Sheets (tanpa Supabase/SQL/ORM) | 1 *Master Registry Sheet* privat Founder (`slug -> spreadsheet_id`) + 1 *Client Sheet* per undangan (`RSVP` & `Guestbook`). |
| **WA Sender Storage** | Browser `localStorage` perangkat pasangan | `wedding_wa_guests_<slug>` & `wedding_wa_templates_<slug>`. 100% lokal. |
| **Termux CLI** | `git` (wajib); opsional: `python`, `jq`, `libwebp`, `imagemagick`, `ffmpeg` | Preview lokal: `python3 -m http.server 8080 --directory site`. Validasi JSON: `jq empty site/config.json`. |

**Target Browser Utama:** WhatsApp In-App Browser (Android WebView & iOS WKWebView), Chrome Android, Safari iOS, dan browser desktop modern.

---

## 2. Arsitektur & Struktur Folder Project (`1 Clone = 1 Website`)

```text
<project-undangan>/
├── .gitignore                   # Ignore raw-assets/, .env, OS files (.agent/ tetap ter-track)
├── README.md                    # Cara pakai template
├── DESIGN-BRIEF.md              # [EDIT PER PROJECT] Konsep desain unik & data mempelai
├── PROMPTS.md                   # Template prompt siap-paste untuk AI
├── project-context.md           # Status checklist & ringkasan konteks
├── .agent/                      # Aturan, blueprint, skill & workflow agen
├── gas/
│   └── Code.gs                  # Google Apps Script Web App (di luar site/)
└── site/                        # Root publikasi Cloudflare Pages (Total CSS+JS < 50 KB)
    ├── index.html               # Halaman utama undangan (static hardcoded <meta property="og:*">)
    ├── config.json              # Data pasangan, slug, toggle fitur, override tema, template WA
    ├── css/
    │   ├── tokens.css           # Variabel warna, font, spacing, radius, shadow, z-index
    │   ├── base.css             # Reset, tipografi fluid, centered 480px canvas, input >= 16px, tap >= 44px
    │   ├── sections.css         # Styling 12 section + audio button + lightbox + toast
    │   ├── motion.css           # GPU transitions, .reveal, Cover Gate, prefers-reduced-motion
    │   └── wa-sender.css        # Styling halaman utilitas /kirim/ (max-width 720px)
    ├── js/
    │   ├── app.js               # Entry point: ?to=, fetch ./config.json, theme overrides, render 12 sections
    │   ├── api.js               # POST text/plain (RSVP/Guestbook), GET Guestbook, cooldown 30s
    │   ├── audio.js             # Play/pause, .catch() silent fallback, Page Visibility API
    │   └── wa-sender.js         # Parser paste/CSV, normalisasi 628..., localStorage, wa.me
    ├── icons/                   # SVG monokrom ringan (< 1 KB/ikon, currentColor)
    ├── kirim/
    │   └── index.html           # WA Sender (<meta name="robots" content="noindex, nofollow">)
    └── assets/                  # og-image.jpg (< 250 KB), *.webp (< 150 KB, strip EXIF), bgm.mp3 (< 2 MB)
```

**Konvensi Path Relatif (Agar Jalan di Root Domain Maupun Subpath):**
- Dari `site/index.html`: panggil `./css/tokens.css`, `./js/app.js`, `./config.json`, `./assets/...`.
- Dari `site/kirim/index.html`: panggil `../css/wa-sender.css`, `../js/wa-sender.js`, `../config.json`.
- **Open Graph Statis (`APPROVED`):** Tag `<title>`, `<meta name="description">`, `og:type`, `og:title`, `og:description`, `og:url`, `og:image` (`1200×630`) wajib tertulis statis di `<head>` `site/index.html` dengan URL absolut `https://...` yang sinkron dengan `config.json -> meta`.

---

## 3. Sistem Desain, Tokens & Motion

### 3.1 Standar Kualitas Visual (Anti-Template Murahan)
- **Desain Unik per Project:** `tokens.css` dan `sections.css` disesuaikan dengan konsep visual di `DESIGN-BRIEF.md`, tetapi **tetap** mematuhi struktur token semantik di bawah agar komponen, aksesibilitas, dan override berjalan konsisten.
- **Mobile-First Centered Canvas:** Layar mobile 1 kolom bersih; pada `min-width: 481px`, `.invitation-canvas` dibatasi `max-width: var(--canvas-max-width)` (`480px`), terpusat (`margin: 0 auto`) dengan latar samping `--bg-outer` (halaman `/kirim/` memakai `--sender-max-width: 720px` dengan grid 2 kolom di `min-width: 768px`).
- **Tipografi & Aksesibilitas:** Maksimal **2 keluarga font** (`--font-display` & `--font-sans` dengan `display=swap`) + `--font-mono` untuk nomor rekening. Kontras teks utama $\ge 4.5:1$ (WCAG AA). Teks di atas foto wajib dilapisi `--overlay-scrim`. Input form wajib `font-size >= 16px` (`--text-base: 1rem`) agar iOS Safari tidak *auto-zoom*. Seluruh elemen interaktif wajib `min-height: 44px` (`--tap-target-min`).

### 3.2 CSS Custom Properties (`site/css/tokens.css`)
Setiap project wajib mendefinisikan token semantik berikut (nilai palet diambil dari `DESIGN-BRIEF.md` atau salah satu dari 3 preset referensi di bawah):

| Token Semantik | `editorial` (Default) | `botanical` | `heritage` |
| :--- | :--- | :--- | :--- |
| `--bg-outer` | `#EAE5DF` | `#E4E8E1` | `#161210` |
| `--bg-primary` | `#FAF8F5` | `#F7F8F4` | `#1F1916` |
| `--bg-surface` | `#F2ECE4` | `#EDF1EA` | `#2A221E` |
| `--bg-elevated` | `#FFFFFF` | `#FFFFFF` | `#352B26` |
| `--text-primary` | `#1E1B18` | `#1C241E` | `#F5EFE6` |
| `--text-secondary` | `#524B44` | `#465248` | `#D5C7B8` |
| `--text-muted` | `#7D746B` | `#6E7B70` | `#9E8F80` |
| `--accent-primary` | `#8C6D53` | `#4A6350` | `#C8A97E` |
| `--accent-hover` | `#735740` | `#394E3E` | `#B39264` |
| `--accent-contrast` | `#FFFFFF` | `#FFFFFF` | `#1F1916` |
| `--border-subtle` | `#DFD7CE` | `#D4DDD0` | `#463931` |
| `--overlay-scrim` | `rgba(24,20,17,0.52)` | `rgba(22,30,24,0.50)` | `rgba(15,11,9,0.65)` |

- **Status Tokens:** Success (`#EBF5EE` / `#1F5E34` / `#A8D5B5`), Error (`#FDEEEE` / `#9E2A2B` / `#F3B6B7`), Warning (`#FEF7E6` / `#8A5A00` / `#F5D487`).
- **Skala Tipografi & Spacing:** `--text-xs: 0.75rem`, `--text-sm: 0.875rem`, `--text-base: 1rem`, `--text-lg: 1.125rem`, `--text-xl: clamp(1.25rem,4vw,1.5rem)`, `--text-2xl: clamp(1.625rem,5vw,2rem)`, `--text-display: clamp(2.25rem,8vw,3.25rem)`. Spacing basis `4px` (`--space-1: 0.25rem` s/d `--space-12: 3rem`), `--container-px: 1.5rem`, `--section-py: clamp(3.5rem,10vw,5rem)`.
- **Radius & Z-Index:** `--radius-sm: 6px`, `--radius-md: 10px`, `--radius-lg: 16px`, `--radius-arch: 200px 200px 16px 16px`, `--radius-full: 9999px`. Z-index: `--z-base: 1`, `--z-sticky: 20`, `--z-floating-audio: 40`, `--z-toast: 60`, `--z-lightbox: 80`, `--z-cover-gate: 100`.

### 3.3 Motion & Audio (`site/css/motion.css` & `site/js/audio.js`)
- **GPU-Only & Zero Library:** Hanya animasikan `transform` (`translate3d`, `scale`) dan `opacity` menggunakan CSS Transitions/Keyframes + `IntersectionObserver` native (`threshold: 0.15`, `rootMargin: "0px 0px -40px 0px"`, one-time reveal lalu `unobserve()`).
- **Token Durasi & Easing:** `--duration-instant: 150ms`, `--duration-fast: 300ms`, `--duration-normal: 650ms`, `--duration-slow: 1000ms`; `--ease-out-quart: cubic-bezier(0.25,1,0.5,1)`, `--ease-in-out-cubic: cubic-bezier(0.65,0,0.35,1)`, `--ease-spring-subtle: cubic-bezier(0.34,1.4,0.64,1)`.
- **Cover Gate Reveal:** Awal dimuat `body.is-locked` (`overflow: hidden; height: 100dvh`). Klik `#btn-open-invitation` → `window.scrollTo(0, 0)` → panggil `playAudio()` → tambah `.is-opening` (`translate3d(0,-100%,0)`, `opacity: 0`, `1000ms`) → hapus `.is-locked` → setelah `transitionend` (fallback `1050ms`) set `hidden`.
- **Audio Lifecycle (`audio.js`):** `<audio preload="none" loop>`. Jika `features.audio === false` atau `audio.src` kosong, `#btn-audio-toggle` tidak dirender. `audio.play().catch()` wajib ditangani senyap agar tidak memblokir pembukaan undangan. Event `visibilitychange` auto-pause saat tab/app ditinggalkan dan lanjutkan saat kembali hanya jika sebelumnya sedang playing.
- **Wajib `prefers-reduced-motion: reduce`:** Nonaktifkan animasi geser/putar dan tampilkan `.reveal` langsung.

---

## 4. Katalog 12 Section & Halaman WA Sender

### 4.1 12 Section Undangan (`#section-*` di `.invitation-canvas`)
1. `#section-cover` (**CORE**): Latar foto/solid + scrim, nama pasangan, tanggal, sapaan `?to=` (trim, maks 60 char via `textContent`; fallback `cover.defaultGuestLabel`), `#btn-open-invitation`.
2. `#section-hero` (**CORE**): Foto `hero.webp` (fallback `cover.webp` atau monogram inisial), `h1` nama pasangan, tanggal, indikator scroll.
3. `#section-quote` (**OPSIONAL**, `features.quote`): Kutipan/ayat + sumber; sembunyikan utuh jika `false`/kosong.
4. `#section-couple` (**CORE**): Salam pembuka + kartu mempelai sesuai `couple.order` (`["bride","groom"]` / `["groom","bride"]`), foto (fallback monogram inisial), gelar, info ortu, IG opsional (`rel="noopener noreferrer"`).
5. `#section-events` (**CORE**): Minimal 1 acara (`events.items`), tombol Google Maps (`mapUrl`) & *Simpan ke Kalender* (Google Calendar URL dari `startDateTimeIso`/`endDateTimeIso`).
6. `#section-countdown` (**OPSIONAL**, `features.countdown`): 4 kotak Hari/Jam/Menit/Detik menuju `countdown.targetDateTime` (fallback `events.items[0].startDateTimeIso`). 3 status: sebelum acara (detik aktif), Hari-H `< 24 jam` (`00:00:00:00` + pesan berlangsung), lewat `>= 24 jam` (pesan terlaksana).
7. `#section-story` (**OPSIONAL**, `features.story`): Timeline vertikal (`story.items`, tetap rapi jika tanpa foto).
8. `#section-gallery` (**OPSIONAL**, `features.gallery`): Grid responsif (`loading="lazy"`, `decoding="async"`), lightbox `#gallery-lightbox` (`Esc`/klik luar/tutup), video opsional.
9. `#section-rsvp` (**OPSIONAL default aktif**, `features.rsvp`): `#form-rsvp` terpisah dari Guestbook! Field: `name` (pre-filled `?to=`, maks 80), `attendance` (`hadir`/`tidak_hadir`), `pax` (`1..api.maxPax`, sembunyi & `0` saat `tidak_hadir`), `notes` (maks 200), `hp_field`. Simpan state di `localStorage` (`rsvp_sent_<slug>`).
10. `#section-guestbook` (**OPSIONAL default aktif**, `features.guestbook`): `#form-guestbook` (`name` pre-filled `?to=`, `message` 3–500 char + counter `0/500`, `hp_field`) + `#guestbook-list` (non-blocking async GET, skeleton loading, empty state, optimistic prepend saat submit sukses, tombol *Load More* per `api.guestbookPageSize`).
11. `#section-gift` (**OPSIONAL**, `features.gift`): Pengantar sopan + kartu rekening (`--font-mono`, tombol *Salin Nomor Rekening* feedback `"Berhasil Disalin ✓"` 2 detik via `navigator.clipboard.writeText()` + fallback `execCommand`) + QRIS opsional + alamat kado fisik opsional.
12. `#section-closing` (**CORE**): Catatan tamu/dresscode opsional (`closing.notes`), terima kasih, nama keluarga besar, footer brand.
*(Komponen mengambang: `#audio-control` / `#btn-audio-toggle` sesuai `features.audio`)*

### 4.2 Halaman WA Sender (`site/kirim/index.html`)
- Kontainer `720px`, `<meta name="robots" content="noindex, nofollow">`.
- **4 Panel:** (1) Header + link ke `../` + ringkasan real-time (Total, Sudah Dikirim, Belum Dikirim) + notice privasi lokal; (2) Textarea input massal (paste `Nama, Nomor` / `;` / Tab, dukung tanpa nomor) + impor `.csv/.txt` + tombol *Pilih dari Kontak HP* (`'contacts' in navigator && 'ContactsManager' in window` only); (3) Pemilih & editor 4 kategori template (`formal`, `rekan`, `sahabat`, `keluarga`) dengan placeholder `{{nama}}` & `{{link}}` + tombol *Reset ke Template Bawaan*; (4) Search, filter (`Semua`, `Belum`, `Sudah`), *Ekspor Cadangan CSV*, *Hapus Semua* (double confirm), normalisasi nomor (`08...` / `+628...` → `628...`), tombol `Kirim WA` (`wa.me`), `Salin Pesan`, toggle status manual, dan hapus baris.
- **Perakitan URL Personal:** `baseUrl + "?to=" + encodeURIComponent(name.trim()).replace(/%20/g, "+")`.

---

## 5. Kontrak Data, API & Skema Storage

### 5.1 Kunci Baku `site/config.json` (Jangan Mengarang Key di Luar Ini)
- Root: `schemaVersion` (`"1.0"`), `slug` (`^[a-z0-9-]+$`), `baseUrl` (`https://.../`), `meta` (`title`, `description`, `ogImage`, `locale`)
- `theme`: `preset` (`"editorial"|"botanical"|"heritage"|"custom"`), `overrides` (`accentPrimary`, `bgPrimary`)
- `features`: `quote`, `countdown`, `story`, `gallery`, `rsvp`, `guestbook`, `gift`, `audio` (`boolean`)
- `api`: `endpointUrl`, `maxPax` (`1–10`, default `4`), `guestbookPageSize` (`5–50`, default `10`)
- `audio`: `src`, `title`, `loop`
- `cover`: `subtitle`, `title`, `dateText`, `image`, `guestPrefix`, `defaultGuestLabel`, `buttonText`
- `hero`: `subtitle`, `title`, `dateDisplay`, `image`
- `quote`: `text`, `source`
- `couple`: `order`, `greetingTitle`, `greetingBody`, `bride` (`shortName`, `fullName`, `parentInfo`, `photo`, `instagram`), `groom` (`...`)
- `events`: `sectionTitle`, `sectionSubtitle`, `items[]` (`id`, `title`, `dateDisplay`, `startDateTimeIso`, `endDateTimeIso`, `timeDisplay`, `venueName`, `address`, `mapUrl`)
- `countdown`: `title`, `targetDateTime`
- `story`: `sectionTitle`, `items[]` (`period`, `title`, `description`, `image`)
- `gallery`: `sectionTitle`, `videoUrl`, `images[]` (`src`, `alt`)
- `gift`: `sectionTitle`, `description`, `qrisImage`, `accounts[]` (`bankName`, `accountNumber`, `accountHolder`), `physicalAddress` (`enabled`, `recipientName`, `phone`, `address`)
- `closing`: `notes` (`enabled`, `title`, `items[]`), `thankYouTitle`, `thankYouMessage`, `coupleSignature`, `familyNames`
- `whatsappTemplates`: `defaultCategory`, `categories` (`formal`, `rekan`, `sahabat`, `keluarga` → `{ label, template }`)

### 5.2 Kontrak Google Apps Script (`gas/Code.gs`)
- **`POST` (`Content-Type: text/plain;charset=utf-8`, `redirect: "follow"`):**
  - RSVP: `{ slug, type: "rsvp", hp_field: "", payload: { name, attendance, pax, notes } }`
  - Guestbook: `{ slug, type: "guestbook", hp_field: "", payload: { name, message } }`
  - Response: `{ ok: true, code: "SUCCESS", message }` | `{ ok: false, code: "RATE_LIMITED", message }` | `{ ok: false, code: "VALIDATION_ERROR", message }`.
  - `hp_field` tidak kosong → *silent drop* `{ ok: true, code: "SUCCESS", message }`.
- **`GET <endpointUrl>?slug=<slug>` (Guestbook Only):**
  - Mengembalikan `{ ok: true, slug, items: [{ id, name, message, createdAt }] }` (terbaru dulu, maks 100 baris, exclude `is_hidden === true`).
- **Resolusi `slug`:** `CacheService.getScriptCache()` key `'sheet_' + slug` (TTL 900s) membaca **Master Registry Sheet** tab `Registry` (`slug`, `spreadsheet_id`, `status`, `client_name`, `created_at`). Tolak jika tidak ada atau `status === "ARCHIVED"`.
- **Rate Limit & Concurrency:** `CacheService` key `rate_${slug}_${normalizedName}` TTL 30s; `LockService.getScriptLock().waitLock(10000)` sebelum `appendRow()`.
- **Client Sheet Schema:**
  - Tab `RSVP`: `timestamp_iso` | `guest_name` | `attendance` (`hadir`/`tidak_hadir`) | `pax` | `notes`
  - Tab `Guestbook`: `timestamp_iso` | `guest_name` | `message` | `is_hidden` (`FALSE`/`TRUE`)

### 5.3 Skema `localStorage` WA Sender
- `wedding_wa_guests_<slug>`: array `{ id, name, phone, category, sent, sentAt }`
- `wedding_wa_templates_<slug>`: `{ selectedCategory, customTemplates: { formal, rekan, sahabat, keluarga } }`

---

## 6. Standar Aset, Performa & Keamanan Mutlak

- **Anggaran Ukuran:**
  - Total CSS + JS di `site/`: **< 50 KB** (uncompressed).
  - `og-image.jpg`: **WAJIB `.jpg` sRGB**, `1200×630` (wajah di safe zone tengah), **< 250 KB** (batas keras WA 300 KB).
  - Foto WebP (`-strip` EXIF & `-auto-orient`, lowercase kebab-case): `cover.webp` & `hero.webp` `< 150 KB`, `bride/groom.webp` `< 80 KB`, `story-*.webp` `< 90 KB`, `gallery-*.webp` `< 120 KB`, `qris.webp` `< 100 KB`.
  - Audio `bgm.mp3`: 64–96 kbps, **< 2 MB**.
- **Aturan Keamanan Mutlak:**
  - Zero `innerHTML` untuk data `?to=` atau Guestbook (`textContent` only).
  - Anti-formula injection di `gas/Code.gs`: awali `'` jika string diawali `=`, `+`, `-`, `@`, `\t`, `\r` dan simpan sebagai Plain Text.
  - Zero `spreadsheet_id`, data KTP, bukti transfer, atau daftar nomor tamu WA di `config.json` maupun repository.
