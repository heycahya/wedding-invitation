# .agent — Template Pipeline Undangan Digital Web

Folder ini ikut ter-commit di **Template Repo `wedding-invitation`** di GitHub agar otomatis tersedia setiap kali kamu meng-clone template untuk project undangan baru.

---

## Alur Kerja Utama (3 Tahap Ringkas)

```text
[1. Customize]       Isi `DESIGN-BRIEF.md` (konsep desain, palet, tipografi, data klien)
      ↓
[2. Issue Detail]    Paste Prompt 1 (`PROMPTS.md`) → @arsitek tulis `.agent/artifacts/issues/01-build-invitation.md`
      ↓
[3. Implementasi]    Paste Prompt 2 (`PROMPTS.md`) → @engineer bangun `site/` + `gas/Code.gs` + self-audit (< 50 KB)
      ↓
[4. Fix UI & Live]   Preview di browser HP → poles via Prompt 3 (`polish_ui`) → deploy (`workflows/newproject.md`)
```

---

## Struktur `.agent/`

```text
.agent/
├── AGENTS.md                   # Aturan mutlak produk + definisi peran & mode cepat
├── DESIGN.md                   # Blueprint terkunci: tech stack, kontrak config/GAS, tokens, security
├── README.md                   # Panduan ini
├── artifacts/issues/           # Issue spec detail hasil @arsitek
├── bugs/                       # Bug ticket RCA hasil @debugger (jika ada error)
├── handoffs/                   # Ringkasan implementasi & hasil verifikasi
├── skills/
│   ├── write_specs.md          # @arsitek: DESIGN-BRIEF.md → Issue Detail 01
│   ├── generate_code.md        # @engineer: One-shot implementasi + verifikasi + self-audit
│   ├── polish_ui.md            # Jalur cepat Fix UI pasca-preview
│   ├── audit_code.md           # @reviewer: Checklist audit keamanan, OG, UX, < 50 KB
│   └── debug_issue.md          # @debugger: RCA error browser/CORS/GAS/OG
└── workflows/
    ├── newproject.md           # SOP end-to-end dari clone GH sampai deploy & handover klien
    └── fixui.md                # SOP iterasi cepat poles UI & uji responsivitas HP
```
