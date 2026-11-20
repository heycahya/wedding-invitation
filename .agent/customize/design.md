# DESIGN.md — Modern Architectural Editorial *(Default Template Style)*

> File ini menggunakan format modern `DESIGN.md` (terstruktur untuk AI coding agent) dengan **signature style modern khusus undangan digital**.  
> **Cara Pakai:** Langsung pakai sebagai standar default yang modern & elegan, atau ubah bagian *Mood*, *Color Palette*, dan *Typography* di bawah untuk menciptakan karakter baru di setiap project (`site/css/base.css`).

---

## 1. Visual Theme & Atmosphere

- **Archetype:** *Modern Architectural Editorial* — bersih, tenang, kontemporer, dan intim (terinspirasi galeri seni, *editorial fashion lookbook*, dan desain antarmuka modern berpresisi tinggi).
- **Kesan Utama:** Mengutamakan kekuatan **tipografi kontras tinggi, ruang napas (*whitespace*) lega, garis pembatas tipis *hairline* (`1px`), dan framing foto yang bersih** — jauh dari gaya undangan generik penuh stiker bunga atau efek berkilau murahan.
- **Variasi Cepat (Opsional):**
  - *Ingin versi Dark / Modern Noir?* Ubah `--bg-primary` ke `#121211`, `--bg-surface` ke `#1C1B19`, `--text-primary` ke `#F4F1EA`, dan `--accent-primary` ke `#D6C3A5`.
  - *Ingin versi Organic Modern?* Ubah `--bg-primary` ke `#F5F6F2` dan `--accent-primary` ke `#3E5243`.

---

## 2. Color Palette & Semantic Roles (`site/css/base.css` `:root`)

Seluruh kombinasi warna menjaga kontras keterbacaan WCAG AA ($\ge 4.5:1$):

| Token CSS | Nilai Hex / RGBA | Peran Semantik |
| :--- | :--- | :--- |
| `--bg-outer` | `#E5E2DA` | Latar samping luar kanvas pada tablet & desktop |
| `--bg-primary` | `#F7F6F2` | Latar utama kanvas undangan (*Warm Alabaster*) |
| `--bg-surface` | `#EFECE5` | Latar section selang-seling (*Soft Stone*) |
| `--bg-elevated` | `#FFFFFF` | Latar kartu acara, input form & modal |
| `--text-primary` | `#161615` | Judul utama, nama mempelai & teks primer (*Deep Ink*) |
| `--text-secondary` | `#52504A` | Narasi, alamat & teks pendukung |
| `--text-muted` | `#75726B` | Label kapsul *eyebrow*, waktu & placeholder |
| `--accent-primary` | `#22201E` | Tombol utama (CTA) & titik sorotan aktif (*Charcoal Ink*) |
| `--accent-hover` | `#3A3632` | State hover/active tombol utama |
| `--accent-contrast` | `#FFFFFF` | Teks di atas tombol `--accent-primary` |
| `--border-subtle` | `#DDD9CF` | Garis *hairline* `1px` pemisah kartu & divider |
| `--overlay-scrim` | `rgba(18, 17, 15, 0.56)` | Scrim gelap di atas foto Cover/Hero agar teks tetap tajam |

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

## 4. Layout & Section Composition (12 Sections)

Pertahankan seluruh DOM IDs wajib di `.agent/TECH-SPEC.md`, namun rancang komposisinya berkarakter arsitektural modern:

1. **Kanvas Utama:** Mobile-first `100%` lebar; pada `min-width: 481px` terpusat `max-width: 480px` dengan tepi tegas atau shadow halus di atas `--bg-outer`.
2. **`#section-cover` (Cover Gate):** Full `100dvh`, foto latar *full-bleed* + `--overlay-scrim` gradien lembut dari bawah ke atas; tipografi judul minimalis, kartu sapaan tamu `?to=` tipis berbingkai garis halus transparan, CTA `#btn-open-invitation` berbentuk pill/kotak tegas.
3. **`#section-hero` (Hero):** Potret vertikal (`3:4` atau `4:5`) dengan sudut modern tajam/halus (`8px`) atau *arch* minimalis, ditempatkan dengan whitespace atas-bawah lega; tanggal menggunakan pemisah titik/angka bersih.
4. **`#section-quote`:** Tipografi *italic display* rata tengah maksimal lebar `34ch` dengan garis hairline tipis di atas/bawah.
5. **`#section-couple`:** Layout kartu mempelai bersih tanpa stiker dekoratif; foto dengan *fallback* monogram inisial tipografis jika foto kosong; tombol IG bergaya outline minimalis.
6. **`#section-events`:** Kartu acara berlatar `--bg-elevated`, border `1px solid var(--border-subtle)`, hierarki waktu & venue sangat jelas, tombol *Petunjuk Lokasi* + *Simpan ke Kalender* sejajar rapi.
7. **`#section-countdown`:** Grid 4 kolom presisi (`repeat(4, minmax(0, 1fr))`) dengan angka besar `--font-display` dan batas garis tipis.
8. **`#section-story`:** Garis waktu vertikal (*hairline* kiri `1px`) dengan penanda titik solid minimalis dan foto opsional `4:3`.
9. **`#section-gallery`:** Grid editorial 2 kolom (foto pertama `span 2` rasio `4:3`, berikutnya `1:1`, sudut `6px–8px`), klik membuka `#gallery-lightbox`.
10. **`#section-rsvp` & `#section-guestbook`:** Terpisah jelas; kartu form bersih dengan jarak antar-field lega (`16px`), tombol sentuh minimal `44px`, dan daftar ucapan rapi rata kiri.
11. **`#section-gift`:** Kartu rekening dengan nomor monospace mudah dipindai + tombol *Salin Nomor Rekening* (`Berhasil Disalin ✓`).
12. **`#section-closing`:** Blok catatan tamu/dresscode rapi (jika aktif) + tanda tangan tipografis kedua mempelai.

---

## 5. Framing, Ornamentasi & Motion Rules

- **Border & Elevation:** Andalkan garis `1px solid var(--border-subtle)` dan kontras warna permukaan (`--bg-primary` vs `--bg-surface` vs `--bg-elevated`) dibanding bayangan tebal. Radius komponen bersih (`--radius-sm: 4px`, `--radius-md: 8px`, `--radius-lg: 12px`).
- **Ornamentasi SVG (`< 1 KB`):** Gunakan garis geometris tipis, pemisah titik/garis *hairline*, atau monogram inisial — hindari ilustrasi berat.
- **Motion (GPU-Only):** Hanya animasikan `transform` (`translate3d`, `scale`) dan `opacity` (`150ms` tap feedback, `650ms` scroll reveal `.reveal` sekali jalan via `IntersectionObserver`, `1000ms` geser Cover Gate). Wajib dukung `@media (prefers-reduced-motion: reduce)`.

---

## 6. Do's & Don'ts

- **DO:** Pastikan `360px` zero horizontal overflow, kontras teks di atas foto selalu terlindungi scrim, dan total CSS + JS di `site/` tetap `< 50 KB`.
- **DON'T:** Jangan pakai font *script* keriting yang sulit dibaca untuk teks panjang; jangan pakai bunga PNG bergerak, efek neon/glow SaaS, animasi memantul (*bounce*), atau popup mengganggu saat membaca undangan.
