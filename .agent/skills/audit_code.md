# Skill: audit_code
> Digunakan oleh: `@reviewer` (atau self-audit oleh `@engineer`)

## Objective
Audit objektif dan menyeluruh atas implementasi `site/` dan `gas/Code.gs` terhadap `DESIGN-BRIEF.md`, `.agent/DESIGN.md`, dan issue spec.

---

## Checklist Audit

### ✅ Functional Correctness
- [ ] Seluruh `Acceptance Criteria` di `.agent/artifacts/issues/[N]-[slug].md` terpenuhi?
- [ ] Seluruh 12 section + `#audio-control` sesuai konfigurasi `features.*` (section nonaktif benar-benar `hidden` tanpa celah kosong)?
- [ ] Kondisi gagal/kosong aman (`?to=` kosong, `audio.play()` diblokir, fetch `./config.json` atau GAS gagal, gambar belum ada)?

### ✅ Security & Privacy (Zero-Tolerance)
- [ ] **Anti-XSS:** Tidak ada `innerHTML` / `insertAdjacentHTML` untuk `?to=` maupun ucapan Guestbook (`textContent` wajib)?
- [ ] **Isolasi RSVP:** `doGet` di `gas/Code.gs` **hanya** membaca tab `Guestbook` (exclude `is_hidden === true`); tab `RSVP` tidak pernah terekspos?
- [ ] **Protokol GAS & Anti-Spam:** `POST` pakai `Content-Type: text/plain;charset=utf-8` + `redirect: "follow"`, `hp_field` silent drop, `CacheService` 30s rate-limit, `LockService`, dan awalan `'` anti-formula injection (`=`, `+`, `-`, `@`, `\t`, `\r`)?
- [ ] **Privasi WA Sender:** `site/kirim/index.html` punya `<meta name="robots" content="noindex, nofollow">`, **0 request jaringan** membawa data tamu, 100% pakai `localStorage` (`wedding_wa_guests_<slug>`)?
- [ ] **Kebersihan Config:** Tidak ada `spreadsheet_id`, KTP, bukti transfer, atau nomor WA tamu di `site/config.json` maupun repo?

### ✅ Visual, UX & Performance (`DESIGN.md`)
- [ ] Zero JS framework, zero library animasi eksternal, zero build step?
- [ ] Total ukuran seluruh CSS + JS di `site/` **< 50 KB**?
- [ ] Warna/font/spacing memakai token CSS di `site/css/tokens.css` & selaras `DESIGN-BRIEF.md`?
- [ ] Input form `font-size >= 16px` (`1rem`), tap target `min-height: 44px`, centered canvas `480px` (`720px` untuk `/kirim/`), aman di lebar `360px`?
- [ ] Animasi hanya memakai `transform` & `opacity` + `@media (prefers-reduced-motion: reduce)`?
- [ ] Tag `<meta property="og:*">` hardcoded statis di `site/index.html` dengan URL absolut `https://...`?

### ✅ Consistency & Handoff
- [ ] Seluruh key di `site/config.json` cocok 100% dengan `.agent/DESIGN.md` Bab 5?
- [ ] `.agent/handoffs/[N]-[slug].md` sudah ditulis dengan hasil verifikasi jujur?

---

## Output

### Jika APPROVED
```text
✅ REVIEW APPROVED — Project Siap Polish / Deploy

Semua acceptance criteria & security checklist terpenuhi.
Total site/ CSS+JS: [Y] KB (< 50 KB).
```

### Jika REVISION NEEDED
```text
⚠️ REVISION NEEDED — [K] masalah ditemukan:

1. `[path/to/file]` baris [N]
   Masalah: [deskripsi eksak masalah]
   Solusi: [perbaikan spesifik]
```
