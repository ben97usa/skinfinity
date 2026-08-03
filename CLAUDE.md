# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing single-page website for Skinfinity Lounge, a Korean skincare studio in San Jose. Zero-dependency, zero-build static site: one `index.html` plus `assets/styles.css` and `assets/app.js`. No framework, no package.json, no bundler.

## Commands

There is no build, lint, or test tooling in this repo — none is configured.

- **Run locally**: serve the folder with any static server, e.g. `python3 -m http.server 8000` then open `http://localhost:8000`, or just open `index.html` directly in a browser.
- **Deploy**: `render.yaml` defines a Render static-site Blueprint (`staticPublishPath: .`, no build command) — this is the configured deploy target. The README also documents Netlify/Vercel/GitHub Pages/Cloudflare Pages as manual drag-and-drop alternatives, but Render is what's wired up in-repo.
- No environment variables are required anywhere in this project.

## Architecture

**Single-file page, three-file project.** All markup lives in `index.html` as one long sequence of `<section>` blocks (hero → philosophy → concerns → menu → signature spotlight → visit steps → reviews → FAQ → location → book CTA → footer), each with a stable `id` used both for nav anchors and for JS/IntersectionObserver hooks. When editing content, find the relevant `<section id="...">` directly rather than searching by class.

**Styling is token-driven.** `assets/styles.css` opens with a `:root` block of CSS custom properties (`--clay`, `--sage`, `--bg`, `--ink`, `--espresso`, spacing/radius/easing tokens) — this is the entire design system. Change a token once here rather than hunting for hardcoded colors elsewhere in the stylesheet.

**All behavior is declarative, driven by `data-*` attributes read by `assets/app.js`** (a single IIFE, no modules/classes):
- `data-reveal` (+ `data-reveal-delay`) → scroll-triggered fade/slide-in via one shared `IntersectionObserver`.
- `data-stagger` → auto-adds `reveal` to each child with an incrementing transition delay (used for the treatment-menu rows and FAQ list).
- `data-count` (+ `data-suffix`) → animated count-up stat, triggered by its own observer.
- `data-magnetic` → buttons/links that track the cursor and translate toward it (desktop, pointer-fine only).
- `data-word` → hero headline words that animate in once `.hero` gets `.is-inview` after the preloader finishes.

**The "Your Skin" concern matcher is config-driven.** The `DATA` object in `assets/app.js` (keyed `acne`/`aging`/`dehydration`/`dullness`/`sensitivity`) is the single source of truth for that section's copy, gradient, and recommended-treatment links; `renderPanel()` templates it into `#matcherPanel` on chip click. To add or edit a skin concern, edit this object — the chip buttons in `index.html` (`data-concern="..."`) must have matching keys.

**Treatment menu rows are plain markup, not data-driven.** Each `.row` in the `#menu` section (grouped under `.menu__cat` category headers: Signature Facials, Chemical Peels, Advanced Corrections) is hand-written HTML with its own accordion toggle wired generically via `.row__head` click listeners in `app.js`. There's no shared data source between the menu rows and the concern-matcher `recos` — treatment names must be kept in sync manually between `DATA` and the `.row__name` elements if renamed.

**No photography yet, by design.** The site currently ships photo-free (pure CSS/SVG — gradients, orbs, an SVG botanical illustration, an SVG "map"). `PHOTOGRAPHY.md` documents the prepared image slots (`assets/img/*.jpg`), exact AI-generation prompts, and models (Higgsfield `soul_2` / `nano_banana_pro`) for when real photography is added — read it before adding images so drop-in paths and aspect ratios match what the CSS expects.

## Content notes worth knowing before editing

- Pricing is intentionally omitted sitewide ("shared at booking and during your consultation") — don't add prices unless asked.
- Two of the four testimonials in `#reviews` (Jasmine L., Daniel K.) are placeholders, not real reviews; the review track duplicates all four a second time (marked `aria-hidden="true"`) purely for the seamless CSS marquee loop — edit both copies if changing review content.
- Booking CTAs point to phone (`tel:+16692604627`) and Instagram (`@skinfinitylounge`), not a booking system — there is no booking integration yet.

## Git Safety and Change Safety

- Never modify application code directly on `main`.
- Never commit or push unless explicitly requested.
- Never force push.
- Never use `git reset --hard`.
- Preserve all existing working functionality.
- Do not rewrite unrelated files.
- Make the smallest safe change.
- Reuse the existing HTML, CSS, and JavaScript architecture.
- Do not introduce a framework unless explicitly approved.
- Always list every modified file after completing a task.
- Never expose or commit passwords, tokens, API keys, or secret values.
