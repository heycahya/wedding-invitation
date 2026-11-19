# Wedding Invitation — Website Template

Template website undangan pernikahan digital (*HTML5, CSS3 Custom Properties, Vanilla JS ES6+ — zero framework, zero build step*).  
Repo ini menyediakan **kerangka HTML semantik** (`site/index.html`, `site/kirim/index.html`), skema `site/config.json`, dan `site/icons/`, sementara seluruh **CSS dan JS sengaja dikosongkan** agar AI membangun desain & fungsi dari nol sesuai arahanmu di `.agent/customize/`.

---

## Cara Pakai (3 Langkah)

1. **Isi `.agent/customize/`:**
   - [`.agent/customize/design.md`](./.agent/customize/design.md) — Tentukan arahan desain visual, palet warna, tipografi, dan gaya layout.
   - [`.agent/customize/data.md`](./.agent/customize/data.md) — Isi data acara, mempelai, fitur aktif, dan URL endpoint GAS eksternal (bila dipakai).
2. **Minta AI Mengerjakan:**
   - **Buat Issue dulu:** *"Buat issue detail dari `.agent/customize/` sesuai `AGENTS.md`"* → cek `.agent/issues/01-design.md` → lanjut *"Kerjakan issue 01-design.md"*.
   - **Atau langsung 1x jalan:** *"Buat issue detail dari `.agent/customize/` lalu langsung implementasikan ke `site/`"*.
   - **Poles tampilan:** *"Fix UI: [sebutkan bagian yang ingin diubah]"*.
3. **Preview & Live:**
   - Setelah Mode 2 selesai mengisi CSS & JS, preview di Termux: `python3 -m http.server 8080 --directory site`
   - Simpan foto di `site/img/` dan audio di `site/assets/`, lalu deploy folder `site/` ke Cloudflare Pages.

---

## Peta File

- [`AGENTS.md`](./AGENTS.md) — Aturan otomatis untuk AI (`NEVER` rules & 3 mode kerja).
- [`.agent/customize/design.md`](./.agent/customize/design.md) — **Yang kamu edit tiap project:** arahan desain visual.
- [`.agent/customize/data.md`](./.agent/customize/data.md) — **Yang kamu edit tiap project:** data undangan & fitur.
- [`.agent/skills/`](./.agent/skills/) — Panduan UI (`anti-ai-slop.md`, `ui-layout-patterns.md`, `mobile-webview-qa.md`).
- [`.agent/TECH-SPEC.md`](./.agent/TECH-SPEC.md) — Kontrak teknis `config.json`, DOM IDs, endpoint GAS, dan `localStorage`.
- [`site/`](./site/) — Kerangka HTML siap isi (`index.html`, `config.json`, `css/` kosong, `js/` kosong, `icons/`, `img/`, `assets/`, `kirim/`).
