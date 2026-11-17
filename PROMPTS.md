# PROMPTS.md — Template Prompt Siap-Copy

Gunakan prompt di bawah ini secara berurutan setelah kamu menyesuaikan [`DESIGN-BRIEF.md`](./DESIGN-BRIEF.md).

---

## 1️⃣ Prompt Buat Issue Detail (`@arsitek` / Planning)
*Paste prompt ini terlebih dahulu agar AI menyusun spesifikasi lengkap (visual per section + teknis file) sebelum coding dimulai:*

```text
Baca `DESIGN-BRIEF.md`, `.agent/DESIGN.md`, `.agent/AGENTS.md`, dan ikuti skill `.agent/skills/write_specs.md`.

Tugasmu sebagai @arsitek:
1. Terjemahkan konsep desain, palet warna, tipografi, gaya visual, dan data klien di `DESIGN-BRIEF.md` menjadi 1 Issue Spec implementasi yang sangat detail dan siap dieksekusi sekali jalan oleh AI Coder Implementer.
2. Pastikan seluruh tech stack mengikat di `.agent/DESIGN.md` tetap terjaga (static-first HTML5/CSS3/Vanilla JS, zero framework/build step, total CSS+JS < 50 KB, struktur `site/` standalone + `gas/Code.gs`, static OG tags absolut, anti-XSS `textContent`, isolasi `RSVP` vs `Guestbook`, WA Sender `/kirim/` 100% `localStorage`).
3. Simpan hasilnya ke `.agent/artifacts/issues/01-build-invitation.md` dengan rincian:
   - Visual & layout blueprint per section (hierarki tipografi, proporsi kartu/foto, scrim, spacing, animasi GPU-only)
   - File tree & pemetaan lengkap `site/` + `gas/Code.gs`
   - Token CSS di `site/css/tokens.css` sesuai konsep di `DESIGN-BRIEF.md`
   - Kontrak DOM IDs, `site/config.json`, `gas/Code.gs`, dan `localStorage`
   - Verification checklist & acceptance criteria.
4. Jangan tulis kode aplikasi dulu di langkah ini.
```

---

## 2️⃣ Prompt Kerjakan Implementasi Full (`@engineer` / AI Coder Implementer)
*Setelah Issue Detail `01-build-invitation.md` selesai dan kamu setujui, paste prompt ini ke AI Coder:*

```text
Baca `.agent/artifacts/issues/01-build-invitation.md`, `DESIGN-BRIEF.md`, `.agent/DESIGN.md`, dan ikuti `.agent/skills/generate_code.md`.

Tugasmu sebagai @engineer (AI Coder Implementer):
1. Implementasikan seluruh file di `site/` (`index.html`, `config.json`, `css/*`, `js/*`, `icons/*`, `kirim/index.html`) dan `gas/Code.gs` secara utuh tanpa placeholder dalam satu kali jalan.
2. Jika aset media di `site/assets/` belum diisi foto asli klien, pastikan kode tidak error saat gambar belum ada atau gunakan fallback elegan sesuai spec (dan catat daftar file aset yang perlu ditaruh di `site/assets/`).
3. Jalankan verifikasi yang tersedia di Termux serta lakukan self-audit memakai checklist `.agent/skills/audit_code.md`:
   - Validasi JSON `site/config.json`
   - Hitung total ukuran seluruh file CSS + JS di `site/` (wajib < 50 KB)
   - Pastikan zero `innerHTML` untuk `?to=` & Guestbook (`textContent` wajib)
   - Pastikan `doGet` di `gas/Code.gs` hanya baca `Guestbook` (tidak pernah menyentuh `RSVP`)
   - Pastikan `/kirim/` memakai `noindex, nofollow` & 100% `localStorage` tanpa request jaringan keluar
   - Pastikan static `<meta property="og:*">` hardcoded dengan URL absolut `https://...` di `site/index.html`.
4. Tulis ringkasan hasil & cara preview di `.agent/handoffs/01-build-invitation.md` dan laporkan hasilnya dengan jujur.
```

---

## 3️⃣ Prompt Fix UI Cepat (`polish_ui`)
*Setelah preview di browser HP, pakai prompt ini untuk memoles tampilan berulang kali tanpa ribet:*

```text
Ikuti `.agent/skills/polish_ui.md` dan `.agent/DESIGN.md`.

Tolong fix UI / poles tampilan berikut:
- [TULIS PERUBAHAN VISUAL DI SINI, contoh:
  1. Hero terlalu tinggi di layar 360px, tombol CTA agak turun.
  2. Kartu acara kurang terasa editorial mewah — rapikan hierarki font & border-nya.
  3. Animasi Cover Gate buat terasa lebih halus.]

Aturan wajib saat edit:
- Tetap pakai CSS custom properties di `site/css/tokens.css` (jangan hardcode warna/font liar).
- Jangan pecahkan tampilan di lebar `360px` (tidak ada horizontal scroll) dan desktop tetap centered `480px`.
- Jaga animasi tetap GPU-only (`transform`, `opacity`) + `prefers-reduced-motion`.
- Jangan ubah DOM IDs/atribut data yang dipakai `site/js/app.js` / `api.js` / `audio.js`, dan pastikan total CSS+JS tetap < 50 KB.
```

---

## 4️⃣ Prompt Audit Independen (`@reviewer`) — *Opsional*
*Pakai jika ingin pengecekan ulang ekstra ketat dari sudut pandang reviewer sebelum deploy live:*

```text
Ikuti `.agent/skills/audit_code.md` dan `.agent/DESIGN.md`.
Review seluruh implementasi di `site/` dan `gas/Code.gs` terhadap `.agent/artifacts/issues/01-build-invitation.md` dan `.agent/handoffs/01-build-invitation.md`.
Periksa ulang keamanan (XSS, isolasi RSVP, formula injection, privasi WA Sender `localStorage`), OG tags statis, responsivitas 360px, dan total ukuran CSS+JS (< 50 KB).
Keluarkan status `APPROVED` atau `REVISION NEEDED` dengan lokasi file & baris eksak jika ada temuan.
```

---

## 5️⃣ Prompt Debug Error (`@debugger`) — *Hanya Saat Error Merah / Bug Live*
*Pakai hanya jika muncul error di console browser, CORS/GAS gagal, layout 360px pecah, atau OG WhatsApp tidak muncul:*

```text
Ikuti `.agent/skills/debug_issue.md` dan `.agent/DESIGN.md`.
Jangan langsung ubah kode sebelum Root Cause Analysis selesai.

Gejala / Error Log:
[PASTE PESAN ERROR, CONSOLE LOG, ATAU DESKRIPSI BUG DI SINI]

Lakukan RCA di file terkait, tulis bug ticket ke `.agent/bugs/bug-01-[slug].md` lengkap dengan Fix Plan eksak, lalu terapkan perbaikannya setelah RCA jelas.
```
