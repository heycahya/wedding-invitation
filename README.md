# Wedding Invitation — Website Template

Template website undangan pernikahan digital siap pakai (*HTML5, CSS3 Custom Properties, Vanilla JS ES6+ — zero framework, zero build step*).  
Repo ini **100% fokus untuk website statis yang langsung live** di `site/` (Cloudflare Pages). Jika memakai RSVP & Ucapan online, `site/config.json` cukup diisi URL Web App Google Apps Script eksternal (`api.endpointUrl`).

---

## Cara Pakai (3 Langkah)

1. **Isi `.agent/customize/`:**
   - [`.agent/customize/design.md`](./.agent/customize/design.md) — Tulis konsep desain, palet warna, tipografi, dan gaya layout.
   - [`.agent/customize/data.md`](./.agent/customize/data.md) — Isi atau tempel data acara, mempelai, fitur aktif, dan aset media.
2. **Minta AI Mengerjakan:**
   - **Buat Issue dulu:** *"Buat issue detail dari `.agent/customize/` sesuai `AGENTS.md`"* → cek `.agent/issues/01-design.md` → lanjut *"Kerjakan issue 01-design.md"*.
   - **Atau langsung 1x jalan:** *"Buat issue detail dari `.agent/customize/` lalu langsung kerjakan desainnya ke `site/`"*.
   - **Poles tampilan:** *"Fix UI: [sebutkan bagian yang ingin diubah]"*.
3. **Preview & Live:**
   - Preview lokal di Termux: `python3 -m http.server 8080 --directory site`
   - Simpan foto/audio terkompresi di `site/assets/`, lalu deploy folder `site/` ke Cloudflare Pages.

---

## Peta File

- [`AGENTS.md`](./AGENTS.md) — Aturan otomatis untuk AI (`NEVER` rules & 3 mode kerja).
- [`.agent/customize/design.md`](./.agent/customize/design.md) — **Yang kamu edit tiap project:** arahan desain visual.
- [`.agent/customize/data.md`](./.agent/customize/data.md) — **Yang kamu edit tiap project:** data undangan & fitur.
- [`.agent/TECH-SPEC.md`](./.agent/TECH-SPEC.md) — Kontrak teknis `config.json`, DOM IDs, endpoint GAS, dan `localStorage`.
- [`site/`](./site/) — Folder website siap hosting (`index.html`, `config.json`, `css/`, `js/`, `icons/`, `kirim/`, `assets/`).
