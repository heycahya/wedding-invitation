# Data Undangan & Konfigurasi (Customize per Project)

> Edit file ini untuk mengisi **data acara, URL, dan fitur aktif** project baru.  
> Kamu boleh menempel teks undangan mentah—AI yang akan memformat langsung ke `site/index.html`, atribut waktu ISO `+07:00`/`+08:00`/`+09:00`, dan tag Open Graph.  
> **Jangan simpan** nomor WA tamu maupun `spreadsheet_id` di file ini.

---

## 1. Info Dasar & URL
- **Slug (`a-z`, `0-9`, `-`):** `nama-pasangan`
- **URL Live Website (`https://.../`):** `https://example.pages.dev/`
- **URL Endpoint GAS RSVP/Guestbook (`data-api-url`):** *(opsional — kosongkan `""` bila belum memakai Google Apps Script; lihat aturan mode non-backend di `.agent/TECH-SPEC.md`)*

## 2. Konfigurasi Tampilan 12 Section & Audio (`Aktif` / `Sembunyikan [hidden]`)
> Section **CORE** (`Cover`, `Hero`, `Couple`, `Events`, `Closing`) selalu aktif. Section opsional di bawah dapat disembunyikan via atribut HTML `hidden` tanpa menghapus DOM ID maupun fondasinya:
- `quote`: `Aktif` | `countdown`: `Aktif` | `story`: `Aktif` | `gallery`: `Aktif`
- `rsvp`: `Aktif` *(atau `Sembunyikan [hidden]` / `Pratinjau` saat `data-api-url` kosong; maxPax: 4)*
- `guestbook`: `Aktif` *(atau `Sembunyikan [hidden]` / `Pratinjau` saat `data-api-url` kosong)*
- `gift`: `Aktif` *(atau `Sembunyikan [hidden]`)*
- `audio`: `Nonaktif` *(isi `data-audio-src="./assets/audio/bgm.mp3"` di `#audio-control` bila diaktifkan; `audio.js` menampilkan tombol otomatis saat `src` terisi)*

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
- **Galeri (Jika aktif):** `[Daftar foto di site/assets/img/ & videoUrl opsional]`
- **Wedding Gift (Jika aktif):** `[Bank/e-wallet, nomor rekening, atas nama; alamat kado fisik & QRIS opsional]`
- **Penutup & Catatan Tamu:** `[Dresscode / informasi tambahan / nama keluarga besar]`
- **Teks Share WhatsApp (OG):** `[Judul <= 70 karakter, Deskripsi <= 160 karakter]`

## 6. Aset Media (`site/assets/`)
- [ ] `site/assets/img/og-image.jpg` (WAJIB `.jpg` sRGB, `1200×630`, `< 250 KB`)
- [ ] `site/assets/img/cover.webp`, `site/assets/img/hero.webp` (`< 150 KB`)
- [ ] `site/assets/img/bride.webp`, `site/assets/img/groom.webp` (`< 80 KB`, opsional)
- [ ] `site/assets/img/gallery-01.webp`.. (`< 120 KB`/foto, opsional)
- [ ] `site/assets/audio/bgm.mp3` (`< 2 MB`, opsional)
