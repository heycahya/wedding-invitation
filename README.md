# Digital Wedding Invitation — Project Template

Template repository siap-clone untuk membangun website undangan pernikahan digital (*low-framework, static-first, biaya infra Rp0*).  
Setiap kali membuat project undangan baru, clone template ini, sesuaikan **konsep desain & data klien** di `DESIGN-BRIEF.md`, lalu eksekusi lewat template prompt di `PROMPTS.md`.

---

## Cara Pakai Setelah Clone dari GitHub

1. **Siapkan Konsep Desain & Data Klien:**
   Buka [`DESIGN-BRIEF.md`](./DESIGN-BRIEF.md) dan isi bagian yang bertanda `[ISI PER PROJECT]` (konsep visual, palet warna, tipografi, nama mempelai, acara, fitur aktif, dan template WA).
2. **Generate Issue Detail:**
   Buka [`PROMPTS.md`](./PROMPTS.md), salin **Prompt 1 (Buat Issue Detail)**, lalu paste ke AI Planner / `@arsitek`. Hasilnya tersimpan di `.agent/artifacts/issues/01-build-invitation.md`.
3. **Implementasi oleh AI Coder:**
   Salin **Prompt 2 (Implementasi Full)** dari [`PROMPTS.md`](./PROMPTS.md) ke AI Coder Implementer / `@engineer` untuk membangun `site/` + `gas/Code.gs` dalam satu kali eksekusi lengkap dengan self-audit.
4. **Fix UI & Deploy:**
   Preview hasilnya di browser HP, poles tampilan pakai **Prompt 3 (Fix UI Cepat)** bila perlu, optimasi aset, hubungkan Google Sheet & Cloudflare Pages sesuai [`.agent/workflows/newproject.md`](./.agent/workflows/newproject.md).

---

## Peta File Penting

- [`DESIGN-BRIEF.md`](./DESIGN-BRIEF.md) — **File yang diedit tiap project** (konsep desain & brief klien).
- [`PROMPTS.md`](./PROMPTS.md) — **Template prompt siap-paste** untuk AI (`Issue Detail → Implementasi → Fix UI`).
- [`project-context.md`](./project-context.md) — Konteks ringkas & status progress project ini.
- [`.agent/DESIGN.md`](./.agent/DESIGN.md) — Arsitektur & tech stack terkunci (*HTML5/CSS3/Vanilla JS, GAS, Sheets, WA Sender `localStorage`, Security & `< 50 KB` budget*).
- [`.agent/AGENTS.md`](./.agent/AGENTS.md) — Aturan mutlak produk & perilaku agen.
- [`.agent/skills/`](./.agent/skills/) & [`.agent/workflows/`](./.agent/workflows/) — Instruksi detail agen & SOP produksi.
