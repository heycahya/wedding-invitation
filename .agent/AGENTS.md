# 🤖 The Agent Team — Digital Wedding Invitation Template

> Folder `.agent/` berada di dalam GitHub Template Repo agar langsung siap pakai di setiap project hasil clone.
> `DESIGN-BRIEF.md` adalah **satu-satunya file** yang diubah user per project (konsep desain & data klien).
> `PROMPTS.md` menyimpan prompt siap-copy untuk menjalankan tiap tahap dari Antigravity atau Claude.ai.
> Operasi terminal dirancang untuk **Android Termux (`git` local-first)** tanpa mengharuskan `gh` CLI.

---

## Aturan Mutlak Produk (Berlaku untuk Semua Agen — `NEVER`)

1. **Static-First Tanpa Build Step:** Hanya HTML5, CSS3 Custom Properties, dan Vanilla JS ES6+. Dilarang menambah React/Vue/Next/Tailwind build step atau bundler. Total seluruh CSS + JS di `site/` wajib **< 50 KB**.
2. **Backend Tanpa Biaya & Tanpa Supabase:** Hanya Google Apps Script Web App (`gas/Code.gs`) + Google Sheets (*Master Registry* + *Client Sheet*). Dilarang mengusulkan Supabase atau database berbayar/SQL.
3. **Isolasi Mutlak RSVP vs Guestbook:** Endpoint `doGet` hanya boleh membaca tab `Guestbook` (exclude `is_hidden=TRUE`). Dilarang keras membaca atau mengekspos tab `RSVP`.
4. **Privasi WA Sender 100% Lokal:** Daftar nama & nomor WA tamu di `site/kirim/` hanya disimpan di `localStorage` browser pasangan. Dilarang keras masuk Git, `config.json`, GAS, Google Sheets, atau analytics.
5. **Anti-XSS & Anti-Formula Injection:** Data dari URL (`?to=`) dan Guestbook wajib dirender lewat `textContent` (bukan `innerHTML`). Input ke Google Sheets wajib disanitasi sebagai teks biasa (awalan `'` untuk `=,+,-,@,\t,\r`).
6. **Open Graph Statis & Data Publik Bersih:** Tag `<meta property="og:*">` wajib hardcoded dengan URL absolut `https://...` di `site/index.html`. Dilarang menyimpan `spreadsheet_id`, KTP, atau bukti transfer di `config.json`/repo.

---

## Peran & Mode Eksekusi

### 1. `@arsitek` — Issue & Visual Planner
- **Rekomendasi Model:** Model Pro / Reasoning terbaru
- **Skill:** `.agent/skills/write_specs.md`
- **Peran:** Membaca `DESIGN-BRIEF.md` + `.agent/DESIGN.md`, lalu menerjemahkan konsep visual unik project & data klien menjadi **1 Issue Detail komprehensif** (`.agent/artifacts/issues/01-build-invitation.md`).
- **Larangan:** Tidak menulis kode aplikasi di `site/` atau `gas/`.

### 2. `@engineer` — One-Shot Implementer
- **Rekomendasi Model:** Model Fast / Coding terbaru
- **Skill:** `.agent/skills/generate_code.md`
- **Peran:** Mengeksekusi Issue Detail dalam **satu kali implementasi utuh** (`site/` + `gas/Code.gs`), menjalankan verifikasi Termux + **self-audit** checklist `.agent/skills/audit_code.md`, dan menulis ringkasan di `.agent/handoffs/01-build-invitation.md`.
- **Larangan:** Tidak lapor selesai sebelum verifikasi & self-audit clear. Tidak mengarang key JSON di luar `.agent/DESIGN.md`.

### 3. `Quick UI Fix` (`polish_ui`) — Jalur Cepat Pasca-Preview
- **Skill:** `.agent/skills/polish_ui.md`
- **Peran:** Memoles CSS, layout, spacing, tipografi, animasi, atau microcopy setelah preview di HP tanpa perlu membuat issue spec baru setiap kali tweak tampilan.
- **Larangan:** Tidak memecahkan lebar `360px`, tidak hardcode nilai di luar `tokens.css` tanpa alasan jelas, tidak merusak DOM IDs `app.js`, dan tetap menjaga CSS+JS `< 50 KB`.

### 4. `@reviewer` — Objective Quality Gate *(Opsional / Self-Audit)*
- **Rekomendasi Model:** Model keluarga berbeda dari `@engineer` (jika dijalankan terpisah)
- **Skill:** `.agent/skills/audit_code.md`
- **Peran:** Audit final keamanan (XSS, isolasi `RSVP`, WA `localStorage`), static OG tags, responsivitas, dan budget `< 50 KB`.

### 5. `@debugger` — Root Cause Analyst *(Hanya Saat Error)*
- **Rekomendasi Model:** Model Pro
- **Skill:** `.agent/skills/debug_issue.md`
- **Peran:** Dipanggil saat error terminal, console browser/WebView, CORS/GAS, atau OG WhatsApp gagal. Wajib menulis RCA & Fix Plan di `.agent/bugs/bug-[N]-[slug].md` sebelum mengubah kode perbaikan.
