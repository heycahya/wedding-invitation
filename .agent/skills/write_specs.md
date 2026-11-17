# Skill: write_specs
> Digunakan oleh: `@arsitek`

## Objective
Menerjemahkan konsep desain & data klien di `DESIGN-BRIEF.md` bersama blueprint terkunci `.agent/DESIGN.md` menjadi **1 Issue Detail komprehensif** (`.agent/artifacts/issues/01-build-invitation.md`) agar AI Coder Implementer dapat membangun seluruh undangan dalam satu kali eksekusi tanpa tanya balik atau hasil tampilan polos.

---

## Steps

### 1. Baca Input & Blueprint
- Baca `DESIGN-BRIEF.md` (konsep desain unik, palet, font, gaya bingkai, fitur aktif, dan data mempelai/acara).
- Baca `.agent/DESIGN.md` (tech stack, struktur `site/` + `gas/Code.gs`, kontrak `config.json`, kontrak API GAS, `localStorage`, aturan motion & keamanan).

### 2. Tentukan Nomor Issue
- Cek `.agent/artifacts/issues/`. Jika kosong, buat `01-build-invitation.md` (untuk build utama project). Jika sudah ada fitur lanjutan setelahnya, gunakan nomor sequential `02`, `03`, dst.

### 3. Tulis Issue Spec Lengkap
Simpan ke `.agent/artifacts/issues/[N]-[slug].md`:

```markdown
# Issue [N]: [Nama Project / Fitur — mis. Digital Wedding Invitation Rani & Dimas]

## Tujuan & Konsep Visual
- **Archetype / Mood:** [ringkasan arahan estetika dari `DESIGN-BRIEF.md`]
- **Diferensiasi Visual:** [karakter tipografi, komposisi foto/scrim, bingkai, ornamentasi non-norak]

## Scope & Tech Stack
- HTML5, CSS3 Custom Properties, Vanilla JS ES6+ (zero framework, zero build step)
- Output publikasi: `site/` (total CSS + JS wajib < 50 KB)
- Backend: `gas/Code.gs` + Google Sheets (`Master Registry` + `Client Sheet`)

## File Tree
- `site/index.html` — dibuat — halaman utama dengan static `<meta property="og:*">` & kerangka 12 section
- `site/config.json` — dibuat — konfigurasi penuh pasangan sesuai `DESIGN.md`
- `site/css/tokens.css` — dibuat — token warna, font, spacing, radius, z-index sesuai `DESIGN-BRIEF.md`
- `site/css/base.css` — dibuat — reset, tipografi fluid, centered 480px canvas, input >= 16px, tap >= 44px
- `site/css/sections.css` — dibuat — styling detail 12 section, lightbox, toast, audio button
- `site/css/motion.css` — dibuat — Cover Gate reveal, `.reveal`, GPU transitions, `prefers-reduced-motion`
- `site/css/wa-sender.css` — dibuat — layout `/kirim/` (720px max-width)
- `site/js/app.js` — dibuat — `?to=` sanitizer, config loader, token overrides, section renderer, countdown, calendar, clipboard
- `site/js/api.js` — dibuat — `POST text/plain` (RSVP & Guestbook), `GET` Guestbook, 30s cooldown, optimistic append
- `site/js/audio.js` — dibuat — `play().catch()`, floating toggle, `Page Visibility API`
- `site/js/wa-sender.js` — dibuat — paste/CSV parser, `628...` normalizer, template editor, `localStorage`, `wa.me`, CSV export
- `site/icons/*.svg` — dibuat — ikon monokrom ringan `< 1 KB`
- `site/kirim/index.html` — dibuat — WA Sender dengan `<meta name="robots" content="noindex, nofollow">`
- `gas/Code.gs` — dibuat — router `doPost`/`doGet`, `Master Registry`, `CacheService`, `LockService`, anti-formula injection

## Visual & Layout Blueprint per Section
*(Wajib dirinci agar implementer menghasilkan UI berkelas dalam 1x build, bukan polos)*
- **Tokens & Font Pairing:** [nilai eksak `--bg-*`, `--text-*`, `--accent-*`, URL Google Fonts]
- **1. `#section-cover`:** [komposisi full `100dvh`, scrim, posisi nama tamu & `#btn-open-invitation`]
- **2. `#section-hero`:** [gaya bingkai foto, proporsi judul `h1`, indikator scroll]
- **3–12. Section lain & State Nonaktif:** [layout kartu mempelai, grid/kartu acara, gaya timeline story, grid galeri + lightbox, pemisahan form RSVP vs Guestbook, kartu Gift + tombol salin, closing]
- **WA Sender (`site/kirim/`):** [tata letak 4 panel responsif mobile & 2 kolom desktop `>= 768px`]

## Kontrak Data, DOM & Keamanan
- **Config Keys:** Mengikuti 100% `.agent/DESIGN.md` Bab 5 (sebutkan section `features.*` yang `true` vs `false`).
- **Keamanan & Privasi:**
  - `?to=` (maks 60 char, fallback `defaultGuestLabel`) & Guestbook wajib render via `textContent`.
  - `doGet` hanya baca `Guestbook` (exclude `is_hidden === true`), tab `RSVP` terisolasi penuh.
  - `doPost` wajib `hp_field` silent drop, `CacheService` 30s (`slug + name`), `LockService`, dan awalan `'` anti-formula injection.
  - `/kirim/` 100% `localStorage` (`wedding_wa_guests_<slug>`, `wedding_wa_templates_<slug>`).
  - Fallback elegan jika file gambar di `site/assets/` belum tersedia (tidak mematahkan layout).

## Verification & Test Scenarios
- [ ] Happy path — seluruh section aktif terender dari `./config.json`, `?to=` terisi otomatis ke Cover, RSVP, Guestbook
- [ ] Empty / Fallback state — `?to=` kosong, `features.*: false` tersembunyi tanpa celah, `audio.play()` diblokir tidak menghentikan Cover Gate, foto belum ada tetap rapi
- [ ] Error / Cooldown state — fetch GAS gagal tidak hapus input user; double submit < 30 detik ditahan
- [ ] Responsivitas — `360px` tanpa horizontal scroll, `480px` centered canvas di desktop, input `>= 16px`, tap `>= 44px`
- [ ] Security & Budget — no `innerHTML` user data, static OG absolut `https://...`, total CSS+JS `< 50 KB`

## Acceptance Criteria
- [ ] Seluruh file di `File Tree` implementasi lengkap tanpa placeholder
- [ ] Visual selaras penuh dengan `DESIGN-BRIEF.md`
- [ ] Seluruh Verification Scenarios & Self-Audit Checklist (`.agent/skills/audit_code.md`) terpenuhi
- [ ] Ringkasan hasil ditulis di `.agent/handoffs/[N]-[slug].md`
```

### 4. Siapkan Branch (Opsional Sesuai Kondisi Git Repo)
Jika folder project sudah di-init dengan Git (`git status` sukses), buat branch `feat/[N]-[slug]` (atau bekerja di branch aktif sesuai preferensi user).

Sampaikan ke user:
```text
✅ Issue Detail siap: .agent/artifacts/issues/[N]-[slug].md

Lanjut ke tahap implementasi: salin **Prompt 2** dari `PROMPTS.md` untuk AI Coder Implementer.
```

---

## Larangan
- Tidak menulis kode aplikasi di `site/` atau `gas/`.
- Tidak melewatkan bagian `Visual & Layout Blueprint per Section` (ini kunci agar hasil 1x build langsung matang).
- Tidak mengubah aturan tech stack & keamanan dari `.agent/DESIGN.md`.
