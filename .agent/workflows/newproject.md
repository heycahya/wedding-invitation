---
description: SOP lengkap dari clone GitHub template hingga project undangan live & serah terima klien
---

# 💌 New Project Workflow — Clone Template sampai Live

Ikuti alur ini setiap kali membuat project website undangan digital baru dari Template Repo `wedding-invitation`.

---

## Step 1 — Clone Template Repo & Customize `DESIGN-BRIEF.md`
1. Clone template repo dari GitHub ke folder project baru:
   ```bash
   git clone <URL_TEMPLATE_REPO_GH> <nama-project-baru>
   cd <nama-project-baru>
   ```
2. Buka [`DESIGN-BRIEF.md`](../../DESIGN-BRIEF.md) dan isi seluruh bagian `[ISI PER PROJECT]` (konsep desain unik, palet, font, fitur aktif, dan data mempelai/acara).
   - **Ingat:** Jangan masukkan daftar nomor WA tamu, `spreadsheet_id`, KTP, atau bukti transfer.

---

## Step 2 — Generate Issue Detail & Implementasi AI Coder
1. Buka [`PROMPTS.md`](../../PROMPTS.md), salin **Prompt 1 (Buat Issue Detail)** → paste ke AI Planner (`@arsitek`).
   - Verifikasi file `.agent/artifacts/issues/01-build-invitation.md` (pastikan konsep visual, 12 section, dan kontrak data sudah sesuai keinginanmu).
2. Salin **Prompt 2 (Implementasi Full)** → paste ke AI Coder (`@engineer`).
   - AI membangun `site/` + `gas/Code.gs`, mengecek ukuran `< 50 KB`, dan menulis ringkasan di `.agent/handoffs/01-build-invitation.md`.

---

## Step 3 — Optimasi Aset Klien di Termux (`site/assets/`)
*(Jika paket belum ada di Termux: `pkg install -y python jq libwebp imagemagick ffmpeg`)*  
Taruh aset mentah di `raw-assets/` (sudah di-ignore Git), lalu kompres ke `site/assets/`:
- **`og-image.jpg` (WAJIB `.jpg` sRGB, `1200×630`, `< 250 KB`):**
  ```bash
  magick raw-assets/cover.jpg -auto-orient -strip -resize "1200x630^" -gravity center -extent 1200x630 -define jpeg:extent=220kb site/assets/og-image.jpg
  ```
- **Foto WebP (`cover.webp`, `hero.webp` `< 150 KB`; `bride/groom.webp` `< 80 KB`; `gallery-*.webp` `< 120 KB`):**
  ```bash
  cwebp -q 80 -resize 1080 0 raw-assets/hero.jpg -o site/assets/hero.webp
  magick raw-assets/gallery-01.jpg -auto-orient -strip -resize "1080x1080>" -quality 78 site/assets/gallery-01.webp
  ```
- **Audio `bgm.mp3` (`< 2 MB`, 90 detik + fade):**
  ```bash
  ffmpeg -i raw-assets/lagu.mp3 -t 90 -af "afade=t=in:st=0:d=1.5,afade=t=out:st=87:d=3" -b:a 80k -ac 2 site/assets/bgm.mp3
  ```

---

## Step 4 — Preview Lokal & Fix UI Cepat
1. Jalankan server lokal di Termux:
   ```bash
   python3 -m http.server 8080 --directory site
   ```
2. Uji di Chrome HP:
   - `http://localhost:8080/?to=Bpk.+H.+Ahmad+%26+Ibu`
   - `http://localhost:8080/kirim/`
3. Jika ada tampilan kurang pas, jalankan **Prompt 3 (Fix UI Cepat)** dari [`PROMPTS.md`](../../PROMPTS.md) (mengikuti `.agent/workflows/fixui.md`).

---

## Step 5 — Setup Google Sheet Klien, GAS & Cloudflare Pages
1. **Google Sheet Klien (via HP Android):**
   - Buat spreadsheet `Undangan - [Nama Pasangan]` dengan 2 tab persis: `RSVP` (`timestamp_iso`, `guest_name`, `attendance`, `pax`, `notes`) dan `Guestbook` (`timestamp_iso`, `guest_name`, `message`, `is_hidden`), format kolom teks sebagai Plain Text.
   - Share akses Viewer/Editor ke email pasangan.
   - Daftarkan 1 baris (`slug`, `spreadsheet_id`, `status: ACTIVE`, `client_name`, `created_at`) di **Master Registry Sheet** milik Founder.
   - Pastikan `api.endpointUrl` di `site/config.json` menunjuk URL Web App GAS produksi (`gas/Code.gs` sudah di-deploy dengan *Execute as: Me*, *Access: Anyone*).
2. **Cloudflare Pages Free:**
   - Push repo project baru ini ke GitHub, hubungkan ke Cloudflare Pages dengan **Build command:** *(kosong)*, **Build output directory:** `site`, **Production branch:** `main`.

---

## Step 6 — Verifikasi Live WA & Handover ke Pasangan
1. Tempel `https://<domain>/?to=Tamu+Undangan` di chat pribadi WhatsApp → pastikan thumbnail `og-image.jpg`, judul, dan deskripsi muncul tajam.
2. Buka link dari *WhatsApp In-App Browser*, tes kirim 1 ucapan & 1 RSVP (hapus baris tes di tab `RSVP` setelah sukses).
3. Kirim 3 link serah terima ke pasangan:
   - Link Utama Undangan (`https://<domain>/?to=Nama+Tamu`)
   - Link WA Sender (`https://<domain>/kirim/`) + catatan daftar tamu tersimpan lokal di browser HP mereka (gunakan Ekspor Cadangan CSV jika ganti HP)
   - Link Google Sheet Laporan RSVP pasangan.
