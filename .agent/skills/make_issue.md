# Skill: make_issue

## Objective
Menerjemahkan `BRIEF.md` + `.agent/TECH-SPEC.md` menjadi **1 Issue Detail** (`.agent/issues/01-design.md`, atau nomor sequential berikutnya bila sudah ada) yang lengkap secara **visual art direction** maupun **teknis**, siap dieksekusi sekali jalan oleh `apply_design`.

---

## Steps

1. **Baca Konteks:**
   - Baca `AGENTS.md`, `BRIEF.md`, dan `.agent/TECH-SPEC.md`.
   - Cek struktur `site/` saat ini agar tahu elemen mana yang dipertahankan vs dirombak.

2. **Tentukan Nomor Issue:**
   - Cek `.agent/issues/`. Jika kosong (selain `.gitkeep`), gunakan `01-design.md`. Jika ada perubahan besar berikutnya, naikkan berurutan (`02-...`, `03-...`).

3. **Tulis Issue Detail ke `.agent/issues/[N]-[slug].md`:**
   Wajib mencakup bagian berikut:
   - **Konsep Visual & Art Direction:** Mood, karakter estetika, diferensiasi agar tidak terasa template generik, pasangan font Google Fonts (maks 2 keluarga), dan palet warna lengkap (termasuk verifikasi kontras teks $\ge 4.5:1$).
   - **Token CSS Target (`site/css/tokens.css`):** Nilai spesifik `--bg-outer`, `--bg-primary`, `--bg-surface`, `--bg-elevated`, `--text-primary`, `--text-secondary`, `--text-muted`, `--accent-primary`, `--accent-hover`, `--accent-contrast`, `--border-subtle`, `--overlay-scrim`, `--font-display`, `--font-sans`, serta gaya radius/frame.
   - **Blueprint Layout per Section (1–12):** Jelaskan komposisi tata letak setiap section aktif (proporsi Cover, Hero, framing Couple, gaya kartu Events, timeline Story, grid Gallery, form RSVP & Guestbook, kartu Gift, Closing), plus penyesuaian visual `/kirim/` bila diperlukan. Section dengan `features.*: false` di `BRIEF.md` dicatat statusnya nonaktif.
   - **Karakter Motion & Ornamen:** Jenis divider/SVG ringan (`< 1 KB`) dan karakter transisi GPU-only (`transform`, `opacity`).
   - **Pemetaan Data `site/config.json` & `<head>` OG Statis:** Konversi data mentah di `BRIEF.md` ke format JSON baku (`.agent/TECH-SPEC.md` Bab 3), termasuk waktu ISO lengkap dengan offset (`+07:00`/`+08:00`/`+09:00`) dan tag `<meta property="og:*">` absolut `https://...`.
   - **Checklist Plumbing & Keamanan:** Daftar pemeriksaan yang wajib tetap utuh (`textContent`, isolasi `RSVP`, WA `localStorage`, input `>= 16px`, tap `>= 44px`, `360px` no-overflow, total `site/` CSS+JS `< 50 KB`).

4. **Laporkan ke User:**
   Sampaikan lokasi file issue dan arahkan lanjut ke Prompt 2 (`PROMPTS.md`) untuk eksekusi.

---

## Larangan
- Tidak memodifikasi `site/` atau `gas/Code.gs` pada tahap ini.
- Tidak mengubah skema key `config.json`, kontrak GAS, atau DOM ID wajib di `.agent/TECH-SPEC.md`.
