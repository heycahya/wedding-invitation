# Skill: debug_issue
> Digunakan oleh: `@debugger`

## Objective
Temukan akar masalah (*Root Cause*) terlebih dahulu sebelum mengubah kode perbaikan saat terjadi error nyata.

---

## Trigger
Hanya dipanggil saat ada error nyata:
- Error terminal Termux / validasi `config.json`
- Console error JavaScript di Chrome Android / WhatsApp In-App Browser / iOS Safari
- Request CORS / GAS `doPost` / `doGet` gagal atau data tidak masuk Google Sheet
- Layout pecah (`360px` horizontal scroll) atau preview Open Graph WhatsApp gagal muncul

---

## Steps

### 1. Stop Modifikasi Kode
Jangan ubah kode sebelum Root Cause Analysis (RCA) terverifikasi di file sumber.

### 2. Pisahkan Symptom vs Root Cause
Periksa file terkait di `site/`, `gas/Code.gs`, dan `.agent/DESIGN.md`:
- Contoh penyebab umum: `Content-Type: application/json` memicu preflight `OPTIONS` di GAS; `audio.play()` uncaught promise di WebView; path relatif `./` pada `og:image`; ukuran `og-image.jpg > 300 KB` atau format `.webp`; key `config.json` beda dari `app.js`; missing `min-width: 0` di flex/grid menyebabkan overflow `360px`.

### 3. Tulis Bug Ticket
Simpan ke `.agent/bugs/bug-[N]-[slug].md`:

```markdown
# Bug [N]: [Judul Singkat]
**Ditemukan di Fase:** [implementasi | polish | preview HP | live WA/GAS]
**Status:** Open

## Symptom
```text
[pesan error / gejala nyata]
```

## Root Cause
[Penjelasan teknis mengapa error ini terjadi beserta file & baris persisnya]

## Fix Plan
1. File `site/...` (atau `gas/Code.gs`): [perubahan eksak yang diperlukan]

## Verifikasi Fix
- [ ] [test case reproduksi bug]
- [ ] [cek regresi & budget CSS+JS < 50 KB]
```

### 4. Terapkan atau Serahkan Fix Plan
Setelah bug ticket tertulis, terapkan Fix Plan (atau serahkan ke `@engineer`), jalankan verifikasi ulang, lalu ubah `Status: Resolved` pada bug ticket tersebut.

---

## Larangan
- Jangan hapus bug ticket setelah selesai (history permanen).
- Jangan menebak penyebab tanpa membaca file terkait.
