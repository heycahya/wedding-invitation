# Data Undangan & Konfigurasi (Customize per Project)

> Edit file ini untuk mengisi **data acara, URL, dan fitur aktif** project baru.  
> Kamu boleh menempel teks undangan mentah—AI yang akan memformat ke `site/config.json`, waktu ISO `+07:00`/`+08:00`/`+09:00`, dan tag Open Graph di `site/index.html`.  
> **Jangan simpan** nomor WA tamu maupun `spreadsheet_id` di file ini.

---

## 1. Info Dasar & URL
- **Slug (`a-z`, `0-9`, `-`):** `nama-pasangan`
- **URL Live Website (`https://.../`):** `https://example.pages.dev/`
- **URL Endpoint GAS RSVP/Guestbook (`api.endpointUrl`):** *(opsional — isi jika pakai Google Apps Script eksternal)*

## 2. Fitur Aktif (`true` / `false`)
- `quote`: `true` | `countdown`: `true` | `story`: `true` | `gallery`: `true`
- `rsvp`: `true` *(maxPax: 4)* | `guestbook`: `true` | `gift`: `true` | `audio`: `true`

## 3. Data Mempelai & Kutipan
- **Nama Panggilan & Urutan Tampil:** `[Mempelai 1 & Mempelai 2]`
- **Salam Pembuka & Kutipan:** `[Islami / Kristiani / Nasional / Adat — atau tulis teks kutipan & sumbernya]`
- **Mempelai 1:** `[Nama lengkap & gelar, anak ke-..., nama Bapak & Ibu, Instagram opsional]`
- **Mempelai 2:** `[Nama lengkap & gelar, anak ke-..., nama Bapak & Ibu, Instagram opsional]`

## 4. Rangkaian Acara (Minimal 1)
- **Acara 1:** `[Nama acara, hari/tanggal, jam mulai–selesai + WIB/WITA/WIT, nama tempat, alamat lengkap, link Google Maps]`
- **Acara 2 (Opsional):** `[...]`

## 5. Konten Opsional & Penutup
- **Love Story (Jika aktif):** `[2–4 momen singkat: periode, judul, cerita 1–2 kalimat]`
- **Galeri (Jika aktif):** `[Daftar foto di site/img/ & videoUrl opsional]`
- **Wedding Gift (Jika aktif):** `[Bank/e-wallet, nomor rekening, atas nama; alamat kado fisik & QRIS opsional]`
- **Penutup & Catatan Tamu:** `[Dresscode / informasi tambahan / nama keluarga besar]`
- **Teks Share WhatsApp (OG):** `[Judul <= 70 karakter, Deskripsi <= 160 karakter]`

## 6. Gambar (`site/img/`) & Audio (`site/assets/`)
- [ ] `site/img/og-image.jpg` (WAJIB `.jpg` sRGB, `1200×630`, `< 250 KB`)
- [ ] `site/img/cover.webp`, `site/img/hero.webp` (`< 150 KB`)
- [ ] `site/img/bride.webp`, `site/img/groom.webp` (`< 80 KB`, opsional)
- [ ] `site/img/gallery-01.webp`.. (`< 120 KB`/foto, opsional)
- [ ] `site/assets/bgm.mp3` (`< 2 MB`, opsional)
