# DESIGN.md — Modern Architectural Editorial *(Default Template Style)*

> File ini menggunakan format modern `DESIGN.md` (terstruktur untuk AI coding agent) dengan **signature style modern khusus undangan digital**.  
> **Cara Pakai:** Langsung pakai sebagai standar default yang modern & elegan, atau ubah bagian *Mood*, *Color Palette*, dan *Typography* di bawah untuk menciptakan karakter baru di setiap project (`site/css/base.css`).

---

## 1. Visual Theme & Atmosphere

- **Archetype:** *Modern Architectural Editorial* — bersih, tenang, kontemporer, dan intim (terinspirasi galeri seni, *editorial fashion lookbook*, dan desain antarmuka modern berpresisi tinggi).
- **Kesan Utama:** Mengutamakan kekuatan **tipografi kontras tinggi, ruang napas (*whitespace*) lega, garis pembatas tipis *hairline* (`1px`), dan framing foto yang bersih** — jauh dari gaya undangan generik penuh stiker bunga atau efek berkilau murahan.
- **Variasi Cepat (Opsional — harus mengganti seluruh pasangan token kontrasnya):**
  - *Ingin versi Dark / Modern Noir?* Ganti lengkap: `--bg-outer: #0B0B0A`, `--bg-primary: #121211`, `--bg-surface: #1C1B19`, `--bg-elevated: #252421`, `--text-primary: #F4F1EA` (`13.76–16.62:1`), `--text-secondary: #C7C3BA` (`8.83–10.66:1`), `--text-muted: #A39F96` (`5.88–7.10:1`), `--accent-primary: #D6C3A5`, `--accent-hover: #E3D4BC`, `--accent-contrast: #161615` (`10.53–12.43:1`), `--border-subtle: #32302B`, `--border-control: #7D7970` (`3.58–4.32:1`).
  - *Ingin versi Organic Modern?* Ganti `--bg-primary: #F5F6F2`, `--bg-surface: #ECEFE8`, `--accent-primary: #3E5243`, `--accent-hover: #2E3E32`, `--accent-contrast: #FFFFFF` (`8.42–11.34:1`).

---

## 2. Color Palette & Semantic Roles (`site/css/base.css` `:root`)

Seluruh kombinasi teks & latar terverifikasi WCAG 2.1 AA ($\ge 4.5:1$), sedangkan border kontrol interaktif memenuhi WCAG 1.4.11 ($\ge 3.0:1$):

| Token CSS | Nilai Hex / RGBA | Peran Semantik & Verifikasi Kontras |
| :--- | :--- | :--- |
| `--bg-outer` | `#E5E2DA` | Latar samping luar kanvas pada tablet & desktop |
| `--bg-primary` | `#F7F6F2` | Latar utama kanvas undangan (*Warm Alabaster*) |
| `--bg-surface` | `#EFECE5` | Latar section selang-seling (*Soft Stone*) |
| `--bg-elevated` | `#FFFFFF` | Latar kartu acara, input form & modal |
| `--text-primary` | `#161615` | Judul utama & teks primer (`13.99–18.11:1` di semua latar) |
| `--text-secondary` | `#52504A` | Narasi, alamat & teks pendukung (`6.23–8.06:1` di semua latar) |
| `--text-muted` | `#636059` | Label kapsul *eyebrow*, waktu & metadata (`4.85:1` outer, `5.32:1` surface, `5.80:1` primary, `6.27:1` elevated) |
| `--accent-primary` | `#22201E` | Tombol utama (CTA) & titik sorotan aktif (*Charcoal Ink*) |
| `--accent-hover` | `#3A3632` | State hover/active tombol utama |
| `--accent-contrast` | `#FFFFFF` | Teks di atas `--accent-primary` (`16.24:1`) & `--accent-hover` (`11.98:1`) |
| `--border-subtle` | `#DDD9CF` | Garis *hairline* `1px` **khusus pembatas/kartu dekoratif** (`1.19–1.41:1`) |
| `--border-control` | `#88857D` | Border input, select, textarea & tombol `.btn-outline` (`3.12:1` surface, `3.41:1` primary, `3.69:1` elevated) |
| `--overlay-scrim` | `rgba(18, 17, 15, 0.64)` | Scrim dasar di atas foto (`5.67:1` pada area `#FFFFFF`); untuk Cover/Hero gunakan gradien directional hingga `rgba(16, 15, 14, 0.78)` (`9.72:1`) pada zona teks |

---

## 3. Typography & Hierarchy (Maksimal 2 Keluarga Google Fonts)

- **Display Font (`--font-display`):** `'Instrument Serif'` atau `'Cormorant Garamond'` (`400`, `600`, `italic`) — tegas untuk nama mempelai, judul section, dan angka countdown.
- **UI & Body Font (`--font-sans`):** `'Plus Jakarta Sans'` (`400`, `500`, `600`) — bersih dan modern untuk detail waktu, alamat, tombol, serta form.
- **Monospace (`--font-mono`):** `ui-monospace, SFMono-Regular, Menlo, monospace` — khusus nomor rekening.
- **Aturan Skala:**
  - *Eyebrow label:* uppercase `0.75rem`, `letter-spacing: 0.16em`, warna `--text-muted`.
  - *Display headline:* `clamp(2.25rem, 8vw, 3.25rem)`, `line-height: 1.06`, `letter-spacing: -0.02em`.
  - *Form input/select/textarea:* wajib `>= 16px` (`1rem`) agar iOS Safari tidak *auto-zoom*.

---

## 4. Layout & Section Composition (12 Sections + Audio Opsional)

Pertahankan seluruh 12 DOM ID wajib di `.agent/TECH-SPEC.md` (section opsional yang dinonaktifkan disembunyikan lewat atribut HTML `hidden`, tidak dihapus fondasinya):

1. **Kanvas Utama:** Mobile-first `100%` lebar; pada `min-width: 481px` terpusat `max-width: 480px` dengan tepi tegas atau shadow halus di atas `--bg-outer`. Wajib pastikan `[hidden] { display: none !important; }` agar section nonaktif tidak menyisakan ruang kosong.
2. **`#section-cover` (Cover Gate):** Full `100dvh` (`min-height: 100svh`), foto latar *full-bleed* + scrim gradien directional (`>= 0.78` di area teks), tipografi judul minimalis, kartu sapaan tamu `?to=` tipis (`#guest-name` khusus sapaan personal), dan CTA `#btn-open-invitation` minimal `44px`.
3. **`#section-hero` (Hero):** Potret vertikal (`3:4` atau `4:5`) dengan sudut modern halus (`4px–8px`) atau *arch* minimalis, ditempatkan dengan whitespace atas-bawah lega; tanggal menggunakan pemisah titik/angka bersih.
4. **`#section-quote` (Opsional):** Tipografi *italic display* rata tengah maksimal lebar `34ch` dengan garis hairline tipis di atas/bawah.
5. **`#section-couple`:** Layout kartu mempelai bersih tanpa stiker dekoratif; foto dengan `object-position: center 25%` dan *fallback* monogram inisial tipografis jika foto kosong; tombol IG bergaya outline minimalis (`--border-control`).
6. **`#section-events`:** Kartu acara berlatar `--bg-elevated`, border `1px solid var(--border-subtle)`, hierarki waktu & venue sangat jelas, tombol *Petunjuk Lokasi* + *Simpan ke Kalender* (tautan Google Calendar `https://`) sejajar rapi `flex-wrap`.
7. **`#section-countdown` (Opsional):** Grid 4 kolom presisi (`repeat(4, minmax(0, 1fr))`) dengan angka besar `--font-display` (`tabular-nums`) dan batas garis tipis.
8. **`#section-story` (Opsional):** Garis waktu vertikal (*hairline* kiri `1px`) dengan penanda titik solid minimalis dan foto opsional `4:3`.
9. **`#section-gallery` & `#gallery-lightbox` (Opsional):** Grid editorial 2 kolom (foto pertama `span 2` rasio `4:3`, berikutnya `1:1`), klik membuka `#gallery-lightbox` dengan tombol tutup `>= 44px`, navigasi Prev/Next, tombol `Esc`, serta pengembalian fokus ke thumbnail asal saat ditutup.
10. **`#section-rsvp` & `#section-guestbook` (Opsional — bergantung `data-api-url`):** Terpisah jelas; form memakai `border: 1px solid var(--border-control)` (`font-size >= 16px`, gap `16px`, tombol `>= 44px`). Jika `data-api-url=""`, section boleh di-`hidden` lewat konfigurasi atau menampilkan state pratinjau netral tanpa error jaringan palsu. Daftar ucapan rata kiri agar mudah dipindai.
11. **`#section-gift` (Opsional):** Kartu rekening dengan `--font-mono`, `tabular-nums`, dan tombol *Salin Nomor Rekening* (`Berhasil Disalin ✓`) berumpan balik instan.
12. **`#section-closing` & `#audio-control` (Audio Opsional):** Blok catatan tamu/dresscode rapi + tanda tangan kedua mempelai, serta `padding-bottom: 84px` agar `#btn-audio-toggle` (`bottom: 20px; right: 20px`) saat aktif (`data-audio-src` terisi) tidak menutupi teks penutup.

---

## 5. Framing, Ornamentasi & Motion Rules

- **Border & Elevation:** Garis pembatas kartu/divider memakai `1px solid var(--border-subtle)`; kontrol interaktif (input/select/textarea/outline button) memakai `1px solid var(--border-control)` dan state `:focus-visible` yang tegas. Radius komponen bersih (`--radius-sm: 4px`, `--radius-md: 8px`, `--radius-lg: 12px`).
- **Ornamentasi SVG (`< 1 KB`):** Gunakan garis geometris tipis, pemisah titik/garis *hairline*, atau monogram inisial — hindari ilustrasi berat.
- **Motion (GPU-Only):** Hanya animasikan `transform` (`translate3d`, `scale`) dan `opacity` (`150ms` tap feedback, `650ms` scroll reveal `.reveal` sekali jalan via `IntersectionObserver`, `1000ms` geser Cover Gate). Wajib dukung `@media (prefers-reduced-motion: reduce)`.

---

## 6. Do's & Don'ts

- **DO:** Pastikan `360px` zero horizontal overflow, kontras teks $\ge 4.5:1$ dan border kontrol $\ge 3.0:1$, teks di atas foto terlindungi scrim directional, dan total CSS + JS di `site/` tetap `< 50 KB`.
- **DON'T:** Jangan pakai font *script* keriting yang sulit dibaca untuk teks panjang; jangan pakai bunga PNG bergerak, efek neon/glow SaaS, animasi memantul (*bounce*), atau popup mengganggu saat membaca undangan.
