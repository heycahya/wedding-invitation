# DESIGN-BRIEF.md — Konsep Desain & Data Project

> **Cara Pakai:** Ini **satu-satunya file yang wajib kamu sesuaikan** setelah meng-clone template ini untuk project undangan baru.  
> Seluruh tech stack, arsitektur `site/` + `gas/Code.gs`, keamanan XSS/RSVP/WA Sender, dan batas ukuran `< 50 KB` sudah terkunci di `.agent/DESIGN.md`.  
> **Larangan Privasi (`NEVER`):** Jangan pernah menuliskan daftar nama/nomor WA tamu, `spreadsheet_id`, KTP, atau bukti transfer di file ini!

---

## A. Identitas Project & URL

- **Slug Project (`^[a-z0-9-]+$`):** `[ISI: contoh rani-dimas]`
- **Domain / URL Produksi (`https://.../`):** `[ISI: contoh https://rani-dimas.pages.dev/]`
- **Nama Pasangan:** `[ISI: contoh Rani & Dimas]`
- **Endpoint Google Apps Script (`api.endpointUrl`):** `[ISI setelah GAS di-deploy, atau kosongkan sementara saat build UI]`

---

## B. Konsep Desain & Arahan Visual *(Yang Berubah Tiap Project)*

Isi bagian ini untuk menentukan karakter visual unik project ini (AI akan menerjemahkannya ke `site/css/tokens.css`, layout HTML, dan gaya komponen di `site/css/sections.css`):

- **Base Archetype / Mood:** `[PILIH: editorial | botanical | heritage | custom — jelaskan nuansanya, misal: "Intimate Editorial Majalah dengan aksen terracotta hangat"]`
- **Referensi Suasana / Gaya:** `[ISI: misal "Minimalis bersih ala Kinfolk, banyak ruang putih hangat, foto dominan dengan tipografi serif kontras tinggi"]`
- **Palet Warna Project:**
  - Warna Latar Luar Desktop (`--bg-outer`): `[contoh: #EAE5DF]`
  - Warna Latar Utama (`--bg-primary`): `[contoh: #FAF8F5]`
  - Warna Kartu / Surface (`--bg-surface`): `[contoh: #F2ECE4]`
  - Warna Teks Utama (`--text-primary`): `[contoh: #1E1B18]`
  - Warna Aksen / Tombol (`--accent-primary`): `[contoh: #8C6D53]`
  - *(Catatan: pastikan kontras teks >= 4.5:1; jika pakai preset standar di `.agent/DESIGN.md`, tulis saja "Ikut preset [nama]")*
- **Tipografi (Maksimal 2 Keluarga Font Google Fonts):**
  - Font Display (Judul & Nama): `[contoh: Cormorant Garamond (400, 600, italic)]`
  - Font Body & UI: `[contoh: Plus Jakarta Sans (400, 500, 600)]`
- **Gaya Bingkai Foto & Detail Visual:**
  - Bentuk Frame Foto Hero/Profil: `[PILIH: persegi panjang tajam editorial | sudut rounded halus | lengkung arch kubah | hairline double border]`
  - Ornamentasi / Divider: `[contoh: garis tipis hairline + monogram inisial di footer, tanpa bunga tempelan]`
- **Karakter Animasi (Tetap GPU-Only):** `[contoh: tenang & lambat, fade naik halus saat scroll, Cover Gate geser atas 1000ms]`
- **Catatan Layout Khusus (Opsional):** `[contoh: Hero full-bleed dengan teks di bawah scrim, atau kartu acara 2 kolom di layar >400px]`

---

## C. Section Aktif (`config.json -> features`)

Centang / ubah `true` atau `false` sesuai paket atau permintaan pasangan:
- **Core (Selalu Aktif):** Cover Gate (`#section-cover`), Hero (`#section-hero`), Profil Mempelai (`#section-couple`), Acara & Lokasi (`#section-events`), Penutup & Footer (`#section-closing`).
- **Opsional (`true` / `false`):**
  - `quote`: `true`
  - `countdown`: `true`
  - `story`: `true`
  - `gallery`: `true`
  - `rsvp`: `true` *(maxPax: `4`)*
  - `guestbook`: `true` *(guestbookPageSize: `10`)*
  - `gift`: `true`
  - `audio`: `true`

---

## D. Data Konten Mempelai, Acara & Copywriting

### 1. Meta & Open Graph (`<head>` Statis & `config.json -> meta`)
- **Title (`<= 70 char`):** `[ISI: The Wedding of Rani & Dimas]`
- **Description (`<= 160 char`):** `[ISI: Sabtu, 12 Desember 2026 — Kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu.]`
- **OG Image URL:** `[ISI otomatis: <URL Produksi>/assets/og-image.jpg]`

### 2. Cover & Hero
- **Cover Subtitle / Label:** `[The Wedding of]`
- **Tanggal Ringkas Cover:** `[Sabtu, 12 Desember 2026]`
- **Prefix Sapaan Tamu:** `[Kepada Yth. Bapak/Ibu/Saudara/i]`
- **Default Jika `?to=` Kosong:** `[Tamu Undangan]`
- **Hero Subtitle & Tanggal Display:** `[We Are Getting Married]` / `[12 . 12 . 2026]`

### 3. Salam Pembuka & Kutipan (Jika `quote: true`)
- **Nuansa / Tradisi:** `[Islami | Kristiani | Katolik | Umum Nasional | Adat]`
- **Teks Kutipan:** `[ISI kutipan atau ayat]`
- **Sumber Kutipan:** `[ISI sumber]`
- **Salam Pembuka (`greetingTitle` & `greetingBody`):** `[ISI salam & kalimat pengantar]`

### 4. Profil Kedua Mempelai (`couple`)
- **Urutan Tampil (`couple.order`):** `[["bride", "groom"] atau ["groom", "bride"]]`
- **Mempelai Wanita (`bride`):**
  - Panggilan: `[Rani]` | Nama Lengkap & Gelar: `[Maharani Putri, S.Ars.]`
  - Info Orang Tua: `[Putri pertama dari Bapak ... & Ibu ...]`
  - Instagram (opsional): `[https://instagram.com/... atau ""]`
- **Mempelai Pria (`groom`):**
  - Panggilan: `[Dimas]` | Nama Lengkap & Gelar: `[Dimas Pratama, S.T.]`
  - Info Orang Tua: `[Putra kedua dari Bapak ... & Ibu ...]`
  - Instagram (opsional): `[https://instagram.com/... atau ""]`

### 5. Rangkaian Acara (`events.items[]`) & Countdown
- **Acara 1:** `[Akad Nikah]` | `[Sabtu, 12 Desember 2026]` | `[08.00 – 10.00 WIB]` | ISO: `[2026-12-12T08:00:00+07:00]` s/d `[2026-12-12T10:00:00+07:00]` | Venue: `[Nama Tempat]` | Alamat: `[Alamat Lengkap]` | Maps: `[https://maps.app.goo.gl/...]`
- **Acara 2 (opsional):** `[Resepsi Pernikahan]` | `[...]`
- **Target Countdown (`countdown.targetDateTime`):** `[2026-12-12T08:00:00+07:00]`

### 6. Love Story, Galeri, Gift & Closing *(Kosongkan jika dinonaktifkan)*
- **Love Story (`story.items[]`):** `[1. Mei 2022 — Pertemuan Pertama: ...]`
- **Galeri (`gallery`):** `[Jumlah foto: contoh 6 foto (gallery-01.webp s/d gallery-06.webp), videoUrl: ""]`
- **Wedding Gift (`gift`):**
  - Rekening 1: `[BCA | 1234567890 | a.n. ...]`
  - Rekening 2 (opsional): `[...]`
  - QRIS: `[ada / tidak]` | Alamat Kado Fisik: `[nama penerima, no hp, alamat — atau nonaktif]`
- **Closing & Notes:**
  - Catatan Tamu / Dresscode (opsional): `[Dresscode: Earth Tone / Batik Formal]`
  - Pesan Penutup & Nama Keluarga Besar: `[Keluarga Besar Bpk. ... & Keluarga Besar Bpk. ...]`

### 7. Kategori Pesan WhatsApp (`/kirim/`)
- **Default Category:** `formal`
- **Kategori Aktif:** `formal`, `rekan`, `sahabat`, `keluarga` *(sesuaikan salam pembuka jika non-Islami / adat)*

---

## E. Checklist Aset di `site/assets/`
*(Siapkan setelah dioptimasi — lihat batas ukuran di `.agent/DESIGN.md` Bab 6)*
- [ ] `og-image.jpg` (WAJIB `.jpg` sRGB, `1200×630`, `< 250 KB`)
- [ ] `cover.webp` & `hero.webp` (`< 150 KB`)
- [ ] `bride.webp` & `groom.webp` (`< 80 KB`, opsional)
- [ ] `gallery-01.webp` .. (`< 120 KB`/foto, opsional)
- [ ] `story-01.webp` .. (`< 90 KB`/foto, opsional)
- [ ] `bgm.mp3` (`< 2 MB`, 64–96 kbps, opsional)
