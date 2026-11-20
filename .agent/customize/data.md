# Data Undangan (`data.md`)

> Isi nilai di dalam tanda kutip `""` sesuai data project. Jangan simpan nomor WA tamu atau `spreadsheet_id`.  
> **Konvensi otomatis:** Nama gabungan pasangan, tanggal Cover/Hero, target Countdown, format ISO Google Calendar, teks UI standar `site/index.html`, dan aset default (`./assets/img/{cover,hero,groom,bride,gallery-01..0N,og-image.jpg}`) diturunkan otomatis kecuali diisi di **Bagian 10**.

---

## 1. Info Dasar, Endpoint & Audio
- **Slug (`a-z`, `0-9`, `-`):** `"nama-pasangan"`
- **URL Website (`https://.../`):** `"https://example.pages.dev/"`
- **Endpoint GAS (`data-api-url`):** `""`
- **Audio Latar (`data-audio-src`, `""` = nonaktif):** `""`

## 2. Section Opsional (`"aktif"` / `"hidden"`)
*(Section inti — Cover, Hero, Couple, Events, Closing — selalu aktif; Audio Control aktif otomatis bila Audio Latar diisi.)*
- **Quote:** `"aktif"`
- **Countdown:** `"aktif"`
- **Love Story:** `"aktif"`
- **Gallery:** `"aktif"`
- **RSVP:** `"aktif"`
- **Guestbook:** `"aktif"`
- **Wedding Gift:** `"aktif"`

## 3. Data Mempelai
- **Urutan Nama Tampil (`"pria-wanita"` / `"wanita-pria"`):** `"pria-wanita"`
- **Salam Pembuka:** `"Assalamu'alaikum Wr. Wb."`
- **Kalimat Pembuka:** `"Dengan memohon rahmat dan ridho Tuhan Yang Maha Esa, kami bermaksud menyelenggarakan pernikahan putra-putri kami:"`
- **Nama Panggilan Pria:** `"nama-pria"`
- **Nama Lengkap & Gelar Pria:** `"nama-lengkap-pria"`
- **Anak Ke (Pria):** `"Putra pertama dari"`
- **Nama Orang Tua Pria:** `"Bapak nama-ayah-pria & Ibu nama-ibu-pria"`
- **Instagram Pria (`https://...`):** `""`
- **Nama Panggilan Wanita:** `"nama-wanita"`
- **Nama Lengkap & Gelar Wanita:** `"nama-lengkap-wanita"`
- **Anak Ke (Wanita):** `"Putri kedua dari"`
- **Nama Orang Tua Wanita:** `"Bapak nama-ayah-wanita & Ibu nama-ibu-wanita"`
- **Instagram Wanita (`https://...`):** `""`

## 4. Rangkaian Acara
*(Tanggal & jam mulai Acara 1 otomatis dipakai untuk Cover, Hero, dan Countdown; format ISO Google Calendar diturunkan dari tanggal + waktu + zona waktu.)*
- **Nama Acara 1:** `"Akad Nikah"`
- **Tanggal Acara 1:** `"Sabtu, 12 Desember 2026"`
- **Waktu Acara 1:** `"08:00 - 10:00 WIB"`
- **Nama Tempat 1:** `"nama-tempat-1"`
- **Alamat Lengkap 1:** `"alamat-lengkap-acara-1"`
- **Link Google Maps 1:** `"https://maps.google.com/?q=lokasi-1"`
- **Nama Acara 2 (`""` jika hanya 1 acara):** `"Resepsi Pernikahan"`
- **Tanggal Acara 2 (`""` jika sama dengan Acara 1):** `""`
- **Waktu Acara 2:** `"11:00 - 14:00 WIB"`
- **Nama Tempat 2:** `"nama-tempat-2"`
- **Alamat Lengkap 2:** `"alamat-lengkap-acara-2"`
- **Link Google Maps 2:** `"https://maps.google.com/?q=lokasi-2"`

## 5. Quote
- **Teks Kutipan:** `"Teks kutipan pembuka undangan."`
- **Sumber Kutipan:** `"Sumber Kutipan"`

## 6. Love Story
- **Periode 1:** `"2022"`
- **Judul Momen 1:** `"judul-momen-1"`
- **Cerita 1:** `"cerita-singkat-momen-1"`
- **Foto Story 1 (opsional):** `""`
- **Periode 2:** `"2024"`
- **Judul Momen 2:** `"judul-momen-2"`
- **Cerita 2:** `"cerita-singkat-momen-2"`
- **Foto Story 2 (opsional):** `""`
- **Periode 3:** `"2026"`
- **Judul Momen 3:** `"judul-momen-3"`
- **Cerita 3:** `"cerita-singkat-momen-3"`
- **Foto Story 3 (opsional):** `""`

## 7. Gallery & Konfigurasi RSVP/Guestbook
- **Jumlah Foto Galeri (`./assets/img/gallery-01.webp` dst.):** `"4"`
- **Link Video (`https://...`):** `""`
- **Maksimal Tamu (`maxPax`):** `"4"`
- **Ucapan per Halaman (`guestbookPageSize`):** `"10"`

## 8. Wedding Gift
- **Deskripsi Gift:** `"Doa restu Anda merupakan karunia terindah bagi kami. Namun jika ingin memberi tanda kasih, dapat melalui rekening berikut:"`
- **Bank / E-Wallet 1:** `"nama-bank-1"`
- **Nomor Rekening 1:** `"0000000000"`
- **Atas Nama 1:** `"atas-nama-rekening-1"`
- **Bank / E-Wallet 2:** `""`
- **Nomor Rekening 2:** `""`
- **Atas Nama 2:** `""`
- **Gambar QRIS (opsional):** `""`
- **Nama Penerima Kado:** `""`
- **Alamat Kirim Kado:** `""`

## 9. Closing
- **Catatan Tamu 1 (opsional):** `""`
- **Catatan Tamu 2 (opsional):** `""`
- **Pesan Penutup:** `"Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu."`
- **Nama Keluarga Besar:** `"Keluarga Besar Mempelai Pria & Keluarga Besar Mempelai Wanita"`

## 10. Override Opsional *(Kosongkan untuk nilai otomatis & default HTML)*
- **Target Countdown ISO (override Acara 1):** `""`
- **Nama Gabungan Pasangan (override Cover, Hero, Closing, OG Title):** `""`
- **Tanggal Cover & Hero (override Tanggal Acara 1):** `""`
- **OG Title (maks 70 char) / OG Description (maks 160 char):** `""` / `""`
- **OG Image URL (`1200x630` `.jpg`, default `<URL Website>assets/img/og-image.jpg`):** `""`
- **Custom Label UI atau Path/Tanpa-Foto (`cover`, `hero`, `groom`, `bride`):** `""`
