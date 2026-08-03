# Skinfinity Lounge — Website

A next-gen redesign for **Skinfinity Lounge**, a Korean skincare studio in San Jose.
Built as a fast, fully-responsive, single-page experience with zero build step and no
framework — just clean HTML, CSS, and vanilla JavaScript.

> *"Where healthy skin becomes signature."*

---

## ✨ What's inside

| Section | Highlights |
|---|---|
| **Hero** | Animated aurora-glow background, kinetic serif headline, floating glass stat cards |
| **Philosophy** | Editorial layout, self-drawing botanical line art, count-up stats |
| **Your Skin** | Interactive concern matcher — tap a concern, get recommended treatments + a color shift |
| **Treatment Menu** | All facials, peels, corrections & add-ons as expanding accordion rows with duration tags |
| **The Signature** | Dramatic dark "lounge" spotlight with a glowing dewdrop animation |
| **The Visit** | 4-step process with animated progress bars |
| **Reviews** | Auto-scrolling testimonial marquee (pauses on hover) |
| **Before & After** | Pre/post-care guidelines as a sticky FAQ accordion |
| **Visit Us** | Address, hours, contact + a stylized map card |
| **Book** | High-contrast closing call-to-action |

### Next-gen touches
- Custom glow cursor + magnetic buttons (desktop, pointer-fine only)
- Scroll-reveal animations via `IntersectionObserver`
- Adaptive nav (blurs on scroll, hides on scroll-down, shows on scroll-up)
- Full-screen animated mobile menu
- Fully responsive (mobile / tablet / desktop)
- Respects `prefers-reduced-motion` and uses semantic, accessible markup

---

## 🗂 Files

```
index.html          # all page markup
assets/styles.css   # design system + components
assets/app.js       # all interactions (vanilla JS, no dependencies)
.claude/launch.json # local preview server config
```

The only external dependency is **Google Fonts** (Fraunces + Manrope). Everything else —
icons, textures, the "map", the orbs — is pure CSS/SVG, so the site works offline and
loads instantly.

---

## ▶️ View it locally

From this folder, run any static server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Or just double-click `index.html`.

---

## 🚀 Deploy (free options)

- **Netlify** — drag the whole folder onto <https://app.netlify.com/drop>
- **Vercel** — `vercel` in this folder, or import from Git
- **GitHub Pages** — push to a repo, enable Pages on the `main` branch
- **Cloudflare Pages** — connect the repo, no build command needed

No build step or environment variables required.

---

## ✏️ Customize

Everything is centralized and easy to edit:

- **Colors** — the `:root` block at the top of `assets/styles.css` (`--clay`, `--sage`, `--bg`, …)
- **Fonts** — the `<link>` in `index.html` + `--font-disp` / `--font-body` variables
- **Treatments** — the `.row` blocks in `index.html` (name, duration, description, tags)
- **Concern matcher** — the `DATA` object near the top of `assets/app.js`
- **Contact / hours** — search `index.html` for the phone number or address

### Notes before you go live
1. **Reviews** — *Emily T.* and *Aimee R.* are from your current site; *Jasmine L.* and
   *Daniel K.* are tasteful placeholders. Swap in real Google/Instagram reviews.
2. **Pricing** — intentionally omitted (matching your current site); prices are presented
   "at booking & consultation." Add per-treatment prices anytime if you'd like.
3. **Booking** — CTAs currently point to phone + Instagram. Easy to wire to a real booking
   system (Square, Vagaro, Acuity, Fresha, etc.) — just change the `href`s.
4. **Photography** — the design is intentionally photo-free so it loads instantly and never
   breaks. Custom on-brand photos can be dropped into the hero, matcher, and map slots.

---

Crafted with care in San Jose.
