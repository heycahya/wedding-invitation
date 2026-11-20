# Skill: Anti-Slop untuk Undangan Digital
*(Diadaptasi dari konsep framework `anti-slop` oleh Miqdad Badjuber — disesuaikan khusus untuk website undangan pernikahan digital statis)*

> **Prinsip Utama: Filter, Bukan Style Guide.**  
> File ini **tidak** menentukan warna, font, atau tema (itu tugas `.agent/customize/design.md`).  
> Tugas file ini adalah **menyaring keluar pola klise AI ("slop")** dan memastikan setiap pilihan desain punya alasan yang jelas sebelum dikirim.

---

## 1. Design Read & Liveliness Dials *(Sebelum Ngoding)*

Sebelum menulis CSS/HTML, baca `.agent/customize/design.md` lalu terjemahkan menjadi 3 setelan desain agar hasilnya terasa hidup dan buatan manusia (bukan template kaku):

- **Energy:** Tentukan tingkat ekspresi visualnya (misal: *tenang & intim* vs *editorial kontras tinggi*). Jangan setengah-setengah.
- **Rhythm:** Atur pergantian tempo antar-section (foto full-bleed → ruang kosong tipografi → kartu informasi terstruktur → daftar ucapan rapi) agar tamu tidak bosan saat scroll.
- **Motion:** Tentukan karakter gerak yang konsisten (tenang, lambat, sekali jalan via `transform` & `opacity`).

---

## 2. Tier 1 — Hard Gate *(Wajib Lulus, Langgar = Gagal)*

1. **Anti-Default Klise AI (UI & Dekorasi):**
   - Dilarang memakai warna/gradien default AI (ungu-biru neon, pink generik, atau kuning emas mentah `#FFD700` di atas putih polos).
   - Dilarang menaruh pill badge mengambang, stiker bunga PNG di sudut layar, atau ikon dekoratif (hati/bintang) di setiap judul section.
   - Dilarang memakai animasi memantul (*bounce/wobble/flip*) atau memicu banyak elemen masuk dari kiri-kanan sekaligus.
2. **Aksesibilitas & Mobile Ergonomi (`antislop-human` & `antislop-layoutmobile`):**
   - Kontras teks terhadap latar wajib $\ge 4.5:1$ (WCAG AA) dan border kontrol interaktif (input/select/textarea/outline button) wajib $\ge 3.0:1$ (`var(--border-control)`, WCAG 1.4.11). Teks di atas foto wajib pakai directional gradient scrim agar tetap tajam terbaca.
   - Zero horizontal overflow di lebar `360px` (`min-width: 0`, `overflow-wrap: break-word`).
   - Semua `<input>`, `<select>`, `<textarea>` wajib `font-size >= 16px` (`1rem`), semua tombol/link tap target `min-height: 44px`, dan `focus-visible` jelas.
   - Wajib ada `@media (prefers-reduced-motion: reduce)` dan tetap patuhi budget total CSS+JS `site/` **< 50 KB**.
3. **Copywriting Wajar & Manusiawi (`antislop-copywriting`):**
   - Gunakan bahasa Indonesia yang santun, hangat, dan biasa/natural — hindari kalimat hiperbola lebay buatan AI (*"simfoni cinta abadi yang melampaui ruang dan waktu"*), istilah marketing kosong, atau penggunaan tanda `—` (*em-dash*) berlebihan di kalimat biasa.
4. **Kebersihan Kode (`antislop-code`):**
   - Jangan menulis komentar kode yang berulang-ulang menjelaskan hal yang sudah jelas di baris kode.

---

## 3. Tier 2 — Purpose-Gate *(Hanya Boleh Dipakai Jika Ada Alasan Jelas)*

Teknik berikut **ditolak** jika sekadar hiasan tanpa alasan di `.agent/issues/01-design.md` atau `.agent/customize/design.md`:

- **Card-itis (Kotak Kartu Berulang):** Jangan bungkus seluruh 12 section ke dalam kotak kartu identik. Section seremonial (*Quote*, *Couple intro*, *Closing*) lebih bersih bernapas langsung di atas permukaan canvas. Kartu cukup untuk elemen yang memang butuh batas jelas (*Kartu Acara*, *Form RSVP/Guestbook*, *Rekening Gift*).
- **Glassmorphism (`backdrop-filter: blur`):** Hanya boleh di area teks di atas foto Cover jika kontrasnya tetap terbaca; dilarang di atas latar warna solid karena boros performa di WebView Android.
- **Shadow & Glow:** Maksimal dipakai pada 1–2 elemen fokus (misal tombol buka undangan atau kanvas desktop); selebihnya utamakan batas garis *hairline* `1px solid var(--border-subtle)`.
- **Rata Tengah Semua Teks:** Rata tengah hanya untuk judul/seremonial (*Cover*, *Hero*, *Quote*, *Closing*). Detail alamat acara, *Love Story*, form, dan daftar *Guestbook* wajib rata kiri agar mudah dipindai di layar HP.

---

## 4. Tier 3 — Quality Locks *(Konsistensi Antar-Section)*

- **Hierarki Tipografi Tegas:** `h1` nama pasangan minimal `2.5x` ukuran teks body; font *script* keriting tidak boleh dipakai untuk paragraf panjang atau nama lengkap bergelar; angka Countdown, jam, dan rekening pakai `tabular-nums`.
- **Framing Foto Aman:** Foto wajah/potret memakai `object-fit: cover` dan `object-position: center 25%` agar dahi/kepala tidak terpotong.
- **Konsistensi Visual:** Ketebalan garis (`1px` `--border-subtle` untuk divider dekoratif, `--border-control` untuk input & tombol outline), gaya radius sudut, dan spacing antar-section memakai CSS custom properties (`:root`) di `site/css/base.css`, serta seluruh tombol punya state `hover`, `active`, dan `disabled` yang jelas.

---

## 5. Delivery Gate (`PASS / FAIL` Sebelum Lapor Selesai)

Sebelum selesai di Mode 1, Mode 2, atau Mode 3, cek jujur:
- [ ] **Hard Gate:** Bebas warna/stiker/copy lebay klise AI, lolos `360px`, kontras $\ge 4.5:1$, `>= 16px` input, `>= 44px` tap target, `< 50 KB` CSS+JS?
- [ ] **Purpose-Gate:** Tidak ada kartu identik di semua section (*card-itis*), glassmorphism/shadow hanya di tempat yang memang perlu?
- [ ] **Quality Locks:** Hierarki font terbaca dalam 1 detik, foto aman di posisi wajah, token konsisten, dan `Design Read` sesuai `.agent/customize/design.md`?
