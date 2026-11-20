# Skill: UI Layout Patterns & Lightweight Ornaments

> Pendamping `.agent/skills/anti-ai-slop.md`.  
> Gunakan pola di bawah agar setiap project punya **komposisi layout modern yang khas** sesuai `.agent/customize/design.md`, tetap aman di `360px`, dan total CSS+JS `site/` tetap `< 50 KB`.

---

## 1. Pilihan Pola Cover Gate (`#section-cover`)

Pilih salah satu sesuai konsep di `design.md`:
1. **Full-Bleed Directional Scrim:** Foto penuh `100dvh`, scrim gradien hanya pekat di sepertiga bawah (`linear-gradient(to top, rgba(16,15,14,.78) 0%, rgba(16,15,14,.28) 55%, transparent 100%)`), nama tamu & `#btn-open-invitation` rapat rapi di bawah.
2. **Framed Editorial Gate:** Latar warna solid `--bg-primary`, foto terbingkai di tengah (`aspect-ratio: 3/4`, max-width `260px`) dengan garis *hairline* `1px`, tipografi & nama tamu di bawah bingkai tanpa menimpa foto.
3. **Typographic Poster Gate:** Tanpa foto wajib; fokus pada monogram inisial besar `--font-display`, garis pemisah tipis, tanggal berformat bersih, dan tombol kapsul/kotak tegas.

---

## 2. Pilihan Pola Hero & Profil Mempelai

- **Hero (`#section-hero`):**
  - *Vertical Portrait:* Foto `4:5` sudut tajam (`4px`) atau `arch` di tengah dengan margin atas lega (`clamp(2.5rem, 8vw, 4rem)`).
  - *Editorial Split Header:* Eyebrow & `h1` nama pasangan rata kiri di atas foto rasio `16:10` / `4:3`, memberi kesan majalah modern.
- **Couple (`#section-couple`):**
  - *Stacked Editorial:* Foto potret `3:4` dengan `object-position: center 25%`, nama lengkap + orang tua rata tengah atau rata kiri bersih dengan pemisah huruf `&` berukuran besar (`--font-display italic`).
  - *Monogram Fallback Mode:* Jika tidak menampilkan foto masing-masing, pakai lingkaran atau bingkai kotak `1px` berisi inisial tipografis berukuran besar.

---

## 3. Pola Events, Story, Gallery & Gift

- **Events (`#section-events`):**
  - Gunakan kartu dengan batas garis tipis `1px solid var(--border-subtle)`, header nama acara memakai `--font-display`, jam memakai `tabular-nums`, dan tombol aksi (*Petunjuk Lokasi* `https://` Maps + *Simpan ke Kalender* `https://calendar.google.com/...`) dalam flex wrap agar rapi di `360px`.
- **Story (`#section-story`):**
  - *Left Hairline Timeline:* Garis vertikal tipis `1px` di kiri dengan titik aksen `8px` dan kartu teks rata kiri (gambar opsional `4:3`).
  - *Numbered Chapters:* Tanpa garis timeline — cukup label angka `01`, `02` monospace kecil di atas tiap judul momen.
- **Gallery (`#section-gallery`):**
  - *Asymmetric 2-Col Grid:* Foto pertama `grid-column: span 2; aspect-ratio: 4/3` sebagai penarik perhatian, foto berikutnya `1:1` atau `4:5` (semua `loading="lazy"`, `decoding="async"`, membuka `#gallery-lightbox`).
- **Wedding Gift (`#section-gift`):**
  - Tampilkan nomor rekening dengan `--font-mono`, `font-variant-numeric: tabular-nums`, `overflow-wrap: anywhere`, dan tombol salin berumpan balik instan.

---

## 4. Resep Ornamen SVG Ringan (`< 1 KB`, `currentColor`)

Jika butuh aksen visual agar tidak terasa kosong, pakai SVG inline tipis berikut (hindari stiker PNG/ilustrasi berat):

```html
<!-- Hairline Diamond Divider -->
<svg width="120" height="12" viewBox="0 0 120 12" fill="none" aria-hidden="true">
  <line x1="0" y1="6" x2="52" y2="6" stroke="currentColor" stroke-opacity="0.35"/>
  <rect x="57" y="3" width="6" height="6" transform="rotate(45 60 6)" stroke="currentColor"/>
  <line x1="68" y1="6" x2="120" y2="6" stroke="currentColor" stroke-opacity="0.35"/>
</svg>
```
