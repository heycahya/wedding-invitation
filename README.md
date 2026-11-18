# Wedding Invitation — Website Template

Template website undangan pernikahan digital siap pakai (*HTML5, CSS3 Custom Properties, Vanilla JS ES6+ — zero framework, zero build step*).  
Repo ini **100% fokus untuk website statis yang langsung live** di `site/` (Cloudflare Pages). Jika memakai RSVP & Ucapan online, `site/config.json` cukup diisi URL Web App Google Apps Script eksternal (`api.endpointUrl`).

---

## Cara Pakai (3 Langkah)

1. **Isi `BRIEF.md`:** Tulis konsep desain yang diinginkan (tema, warna, font, gaya layout) dan tempel data acaranya.
2. **Copy Prompt dari `PROMPTS.md`:**
   - Kirim **Prompt 1 (Buat Issue)** lalu **Prompt 2 (Kerjakan Desain)** — atau pakai **Prompt One-Shot** jika ingin sekali jalan.
   - Setelah dicek di browser HP, pakai **Prompt 3 (Fix UI)** bila ada tampilan yang ingin dipoles.
3. **Preview & Live:**
   - Preview lokal di Termux: `python3 -m http.server 8080 --directory site`
   - Simpan foto/audio terkompresi di `site/assets/`, lalu deploy folder `site/` ke Cloudflare Pages.

---

## Peta File

- [`BRIEF.md`](./BRIEF.md) — **Yang kamu edit tiap project** (desain & isi undangan).
- [`PROMPTS.md`](./PROMPTS.md) — **Prompt siap-copy** untuk AI.
- [`AGENTS.md`](./AGENTS.md) — Aturan otomatis untuk AI (*jangan diedit kecuali ubah aturan template*).
- [`.agent/TECH-SPEC.md`](./.agent/TECH-SPEC.md) — Kontrak teknis `config.json`, DOM IDs, endpoint GAS, dan `localStorage`.
- [`site/`](./site/) — Folder website yang siap di-hosting.
