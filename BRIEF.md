# BRIEF.md — Konsep Desain & Data Undangan

> Edit file ini setelah meng-clone template untuk menentukan **arahan desain** dan **isi undangan** project baru.  
> Kamu cukup menulis dengan bahasa natural atau menempelkan teks mentah — AI akan menerjemahkannya ke token CSS, layout HTML/JS, format waktu ISO, dan `site/config.json`.  
> **Jangan simpan** daftar nomor WA tamu maupun `spreadsheet_id` di file ini.

---

## 1. Identitas URL & Fitur Aktif

- **Slug (`a-z`, `0-9`, `-`):** `nama-pasangan`
- **URL Produksi (`https://.../`):** `https://example.pages.dev/`
- **Endpoint Google Apps Script (`api.endpointUrl`):** *(isi jika sudah deploy `gas/Code.gs`, atau biarkan kosong sementara)*
- **Fitur Opsional (`true` / `false`):**
  - `quote`: `true` | `countdown`: `true` | `story`: `true` | `gallery`: `true`
  - `rsvp`: `true` *(maxPax: 4)* | `guestbook`: `true` | `gift`: `true` | `audio`: `true`

---

## 2. Arahan Desain Visual *(Ganti Bebas Tiap Project)*

- **Konsep / Mood Utama:** `[contoh: Editorial Ivory Minimalis / Heritage Jawa Gelap & Emas / Botanical Sage Segar / Monokrom Tipografi Modern]`
- **Gaya Layout & Komposisi:** `[contoh: Hero split-screen dengan tipografi serif besar, kartu acara model timeline vertikal, galeri grid asimetris 2 kolom, bingkai foto arch kubah]`
- **Palet Warna yang Diinginkan:** `[contoh: Latar krem hangat #FAF8F5, surface #F2ECE4, teks charcoal #1E1B18, aksen bronze #8C6D53 — atau deskripsi warna bebas]`
- **Tipografi (Maks 2 Font Google Fonts):** `[contoh: Display serif dramatis (Cormorant Garamond / Instrument Serif) + Sans bersih (Plus Jakarta Sans / Inter)]`
- **Nuansa Animasi & Ornamen:** `[contoh: Transisi tenang & khidmat, garis tipis hairline, monogram inisial, tanpa ornamen bunga tempelan]`
- **Catatan Khusus UI (Opsional):** `[tulis preferensi tambahan apa pun di sini]`

---

## 3. Data Undangan *(Boleh Paste Teks Mentah)*

- **Nama Panggilan Pasangan & Urutan Tampil:** `[Mempelai 1 & Mempelai 2 — mis. Nama Wanita & Nama Pria]`
- **Salam Pembuka & Kutipan (Jika aktif):**
  - Tradisi/Nuansa: `[Islami / Kristiani / Nasional / Adat]`
  - Kutipan & Sumber: `[isi atau tulis: pakai kutipan standar]`
- **Mempelai 1:**
  - Nama Lengkap & Gelar: `[...]`
  - Keterangan & Nama Orang Tua: `[Putri/Putra ke-... dari Bapak ... & Ibu ...]`
  - Instagram (opsional): `[...]`
- **Mempelai 2:**
  - Nama Lengkap & Gelar: `[...]`
  - Keterangan & Nama Orang Tua: `[Putra/Putri ke-... dari Bapak ... & Ibu ...]`
  - Instagram (opsional): `[...]`
- **Rangkaian Acara (Minimal 1):**
  - Acara 1: `[Nama acara, hari & tanggal, jam mulai-selesai + WIB/WITA/WIT, nama venue, alamat lengkap, link Google Maps]`
  - Acara 2 (opsional): `[...]`
- **Love Story (Jika aktif):** `[2–4 momen singkat: periode, judul, cerita 1–2 kalimat]`
- **Galeri (Jika aktif):** `[Jumlah foto & keterangan singkat, videoUrl opsional]`
- **Wedding Gift (Jika aktif):** `[Nama bank/e-wallet, no rekening, atas nama; alamat kado fisik & QRIS jika ada]`
- **Penutup & Catatan Tambahan:** `[Dresscode/catatan tamu, nama keluarga besar]`
- **Judul & Deskripsi Share WhatsApp (OG):** `[judul <= 70 char, deskripsi <= 160 char]`

---

## 4. Aset di `site/assets/`
- `og-image.jpg` (WAJIB `.jpg` sRGB, `1200×630`, `< 250 KB`)
- `cover.webp`, `hero.webp` (`< 150 KB`), `bride.webp`, `groom.webp` (`< 80 KB`), `gallery-01.webp`.. (`< 120 KB`), `bgm.mp3` (`< 2 MB`)
