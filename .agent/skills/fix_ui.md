# Skill: fix_ui

## Objective
1. **Mode Poles UI (`Fix UI`):** Memperbaiki CSS, tata letak, tipografi, spacing, animasi, atau microcopy secara langsung dan cepat pasca-preview di HP.
2. **Mode Debug (`RCA`):** Menemukan akar masalah terlebih dahulu saat terjadi error JS console, CORS/GAS gagal, layout `360px` pecah, atau OG preview WhatsApp tidak muncul.

---

## A. Mode Poles UI Cepat
1. Baca keluhan visual dari user dan periksa file terkait (`site/css/tokens.css`, `site/css/sections.css`, `site/css/base.css`, `site/css/motion.css`, `site/index.html`).
2. Terapkan perubahan secara presisi tanpa mengubah DOM ID wajib `.agent/TECH-SPEC.md` maupun plumbing di `api.js`, `audio.js`, `wa-sender.js`, `gas/Code.gs`.
3. Pastikan hasil edit tetap memenuhi:
   - Nilai warna/font/spacing konsisten lewat `tokens.css`.
   - Tidak ada horizontal overflow di lebar `360px` (`min-width: 0`, `overflow-wrap: break-word`).
   - Input form tetap `>= 16px`, tap target `>= 44px`, animasi GPU-only (`transform`, `opacity`) + `prefers-reduced-motion`.
   - Total CSS + JS di `site/` tetap **< 50 KB**.
4. Laporkan file yang diubah, ukuran terbaru CSS+JS, dan poin yang perlu dicek ulang saat refresh browser HP.

---

## B. Mode Debug Error (Root Cause Analysis)
1. **Stop menambal gejala.** Baca error log / gejala beserta file terkait (`site/js/*`, `site/css/*`, `site/index.html`, `site/config.json`, `gas/Code.gs`).
2. Bedakan **Symptom** vs **Root Cause** (mis. `Content-Type: application/json` memicu preflight `OPTIONS` di GAS; `og:image` relatif `./` atau `.webp` ditolak WhatsApp; `audio.play()` uncaught promise di WebView; key `config.json` mismatch).
3. Catat RCA & Fix Plan singkat ke `.agent/bugs/bug-01-[slug].md` (boleh dibuat jika ada bug non-sepele), terapkan perbaikan eksak, lalu verifikasi ulang dan cek budget `< 50 KB`.
