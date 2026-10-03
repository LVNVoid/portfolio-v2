# DESIGN.md — The Specimen Cabinet

## Direction: The Specimen Cabinet (Raised)

A museum vitrine visual system where each software engineering project is a preserved specimen—classified, labeled, and exhibited under glass. Clinical precision meets architectural warmth.

---

## 1. Palette & Surface Tokens

### Light Mode (Linen Gallery)
- **Ground (Canvas):** `#F5F2ED` (Linen weave tone)
- **Surfaces (Vitrine Glass):** `#FAF8F5` / `#FFFFFF`
- **Specimen Ink (Text):** `#1A1A1A`
- **Secondary / Muted Text:** `#66635C`
- **Brass Accent (Primary Interactive):** `#9B7E4A`
- **Brass Tint (Field Surfaces):** `#EFE8DB`
- **Brass Hover:** `#846838`
- **Herbarium Green (Operating / Live):** `#3D6044` (Accessible on light grounds)
- **Herbarium Green Tint:** `#E2EDE4`
- **Vitrine Borders:** `rgba(26, 26, 26, 0.12)`

### Dark Mode (Velvet Cabinet Interior)
- **Ground (Canvas):** `#111110` (Museum felt interior)
- **Surfaces (Vitrine Glass):** `#181816`
- **Ivory Label (Text):** `#E8E2D4`
- **Secondary / Muted Text:** `#99958C`
- **Brass Accent (Primary Interactive):** `#B8995E`
- **Brass Tint:** `#28241B`
- **Brass Hover:** `#C9AD74`
- **Herbarium Green (Operating / Live):** `#5C8A66`
- **Herbarium Green Tint:** `#16241A`
- **Vitrine Borders:** `rgba(232, 226, 212, 0.12)`

### Browser Surface Theming
- `::selection`: `#9B7E4A` / `#FFFFFF` (Light), `#B8995E` / `#111110` (Dark)
- `caret-color`: `var(--primary)`
- Focus rings: `2px solid var(--primary)` with `2px offset`

---

## 2. Typography

- **Display & Headings:** `EB Garamond` (Serif, variable, true small caps)
- **Interface & Body:** `Geist` (Sans-serif, clean tracking)
- **Telemetry, Taxonomy & Code:** `Geist Mono` (Monospace for data readouts)

---

## 3. Component Taxonomy

- **Museum Nameplate:** Top left identity band featuring status pulse and small caps identifier.
- **Drawer Tabs:** Top right navigation styled as brass cabinet labels (`DR-01` to `DR-05`).
- **Vitrine Card:** 1px glass border, soft ambient drop shadow, brass accent bar.
- **Pin-Mounted Plate:** Display screenshot tilted by -1.5° with smooth 0° hover elevation.
- **System Topology:** Mini boxes-and-arrows architecture diagram showing Client -> Compute -> Database instances.
- **Telemetry Strip:** Inline SVG sparkline tracking activity cadence.
- **Data Ticker:** Persistent telemetry ticker tracking cataloged specimens, live endpoints, and commit timestamps.

---

## 4. Ergonomic & Accessibility Standards

- All interactive touch targets >= 44x44px.
- Mobile form input fonts >= 16px (`text-base sm:text-sm`) preventing iOS auto-zoom.
- Strict WCAG AA contrast ratio across both light and dark themes.
- Zero horizontal overflow (`overflow-x-hidden`).
- Zero anti-pattern detections verified by Impeccable CLI.
