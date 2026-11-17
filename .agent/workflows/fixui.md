---
description: Jalur cepat iterasi visual (Fix UI) pasca-implementasi di Android & Chrome
---

# 🎨 Fix UI Workflow — Iterasi Cepat Tanpa Ribet

Gunakan workflow ini setelah implementasi utama (`01-build-invitation`) jadi dan kamu ingin memoles visual di browser HP.

---

## Langkah Cepat
1. Buka preview lokal di HP (`python3 -m http.server 8080 --directory site` atau link preview Cloudflare).
2. Catat bagian yang perlu dipoles (mis. ukuran font, tinggi hero, spacing kartu acara, warna aksen, atau transisi Cover Gate).
3. Salin **Prompt 3 (Fix UI Cepat)** dari [`PROMPTS.md`](../../PROMPTS.md), isi poin keluhan visualnya, dan kirim ke AI.
4. AI mengeksekusi `.agent/skills/polish_ui.md`:
   - Mengedit CSS/HTML/copy secara langsung tanpa seremoni issue baru.
   - Tetap menjaga token `site/css/tokens.css`, lebar `360px` tanpa horizontal overflow, input `>= 16px`, tap target `>= 44px`, animasi GPU-only, dan total CSS+JS `< 50 KB`.
5. Refresh halaman di browser HP (hard reload / clear cache) untuk cek hasil, ulangi seperlunya sampai puas.
