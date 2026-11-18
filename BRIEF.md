# BRIEF.md — Konsep Desain & Data Undangan

> Edit file ini saja setelah meng-clone template.  
> Tulis pakai bahasa biasa (atau paste teks undangan mentah) — AI yang akan menyusun Issue Detail, token CSS, layout HTML/JS, format ISO, dan `site/config.json`.

---

## 1. Info Dasar & Fitur

- **Slug / Nama Project (`a-z`, `0-9`, `-`):** `nama-pasangan`
- **URL Live Website (`https://.../`):** `https://example.pages.dev/`
- **URL Endpoint GAS RSVP/Guestbook (`api.endpointUrl`):** *(opsional — isi jika pakai backend Google Sheets eksternal)*
- **Fitur Aktif (`true` / `false`):**
  - `quote`: `true` | `countdown`: `true` | `story`: `true` | `gallery`: `true`
  - `rsvp`: `true` *(maxPax: 4)* | `guestbook`: `true` | `gift`: `true` | `audio`: `true`

---

## 2. Arahan Desain Visual *(Yang Diubah Tiap Project)*

- **Mood / Konsep Utama:** `[misal: Editorial Ivory Minimalis / Adat Jawa Dark Gold / Botanical Sage / Modern Typographic]`
- **Gaya Layout & Komposisi:** `[misal: Hero full-bleed dengan scrim bawah, kartu acara model split editorial, foto bingkai arch]`
- **Palet Warna:** `[tulis kode hex atau deskripsi suasana warna yang diinginkan]`
- **Tipografi (Maks 2 Font Google Fonts):** `[misal: Cormorant Garamond + Plus Jakarta Sans]`
- **Animasi & Detail Ornamen:** `[misal: Tenang & halus, garis hairline minimalis, tanpa bunga tempelan]`
- **Catatan UI Tambahan (Opsional):** `[...]`

---

## 3. Isi Data Undangan *(Boleh Paste Teks Mentah)*

- **Nama Panggilan & Urutan Tampil:** `[Mempelai 1 & Mempelai 2]`
- **Salam Pembuka & Kutipan:** `[Islami / Kristiani / Nasional / Adat — atau tulis isi kutipan]`
- **Mempelai 1:** `[Nama lengkap & gelar, anak ke-..., nama Bapak & Ibu, IG opsional]`
- **Mempelai 2:** `[Nama lengkap & gelar, anak ke-..., nama Bapak & Ibu, IG opsional]`
- **Acara (Minimal 1):** `[Nama acara, hari/tanggal, jam + zona waktu WIB/WITA/WIT, nama tempat, alamat, link Google Maps]`
- **Love Story (Jika aktif):** `[2–4 momen singkat]`
- **Galeri (Jika aktif):** `[Daftar foto & videoUrl opsional]`
- **Wedding Gift (Jika aktif):** `[Bank/e-wallet, nomor rekening, atas nama; alamat kado fisik & QRIS opsional]`
- **Penutup & Catatan Tamu:** `[Dresscode / pesan penutup / nama keluarga besar]`
- **Teks Share WhatsApp (OG):** `[Judul <= 70 karakter, Deskripsi <= 160 karakter]`

---

## 4. Aset Media (`site/assets/`)
- `og-image.jpg` (WAJIB `.jpg` sRGB, `1200×630`, `< 250 KB`)
- `cover.webp`, `hero.webp` (`< 150 KB`), `bride/groom.webp` (`< 80 KB`), `gallery-*.webp` (`< 120 KB`), `bgm.mp3` (`< 2 MB`)
