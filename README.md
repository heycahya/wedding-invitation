# Wedding Invitation — Static Web Template

Template repository siap-clone untuk membuat website undangan pernikahan digital (*HTML5, CSS3 Custom Properties, Vanilla JS ES6+, Cloudflare Pages, Google Apps Script + Google Sheets*).  
Seluruh kerangka website (`site/`) dan backend (`gas/Code.gs`) sudah ter-scaffold utuh dan siap jalan — setiap project baru cukup mengganti **konsep desain & data acara**.

---

## Cara Pakai Setelah Clone

1. **Isi Brief Desain & Data:** Buka [`BRIEF.md`](./BRIEF.md) dan isi konsep visual serta data undangan.
2. **Generate Issue & Desain Baru:** Buka [`PROMPTS.md`](./PROMPTS.md), salin prompt yang sesuai (bisa bertahap **Issue Detail → Implementasi** atau langsung **One-Shot**) dan kirim ke AI agent.
3. **Preview & Fix UI di Termux:**
   ```bash
   python3 -m http.server 8080 --directory site
   ```
   Buka `http://localhost:8080/?to=Tamu+Undangan` dan `http://localhost:8080/kirim/` di browser HP. Gunakan **Prompt Fix UI** bila ada tampilan yang ingin dipoles.
4. **Optimasi Aset & Deploy:** Masukkan media terkompresi ke `site/assets/`, deploy `gas/Code.gs` ke Google Apps Script, dan hubungkan folder `site/` ke Cloudflare Pages.

---

## Struktur Utama

- [`AGENTS.md`](./AGENTS.md) — Aturan mutlak, arsitektur, dan mode eksekusi AI.
- [`BRIEF.md`](./BRIEF.md) — Tempat menyesuaikan desain visual & data tiap project.
- [`PROMPTS.md`](./PROMPTS.md) — Template prompt siap-paste.
- [`.agent/TECH-SPEC.md`](./.agent/TECH-SPEC.md) — Kontrak baku `config.json`, API GAS, Google Sheets, dan `localStorage`.
- [`site/`](./site/) — Website statis siap publikasi (`index.html`, `config.json`, `css/`, `js/`, `icons/`, `kirim/`, `assets/`).
- [`gas/Code.gs`](./gas/Code.gs) — Backend Google Apps Script (RSVP & Guestbook).
