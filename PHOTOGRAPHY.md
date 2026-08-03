# Photography — ready when you are

The site currently ships **photo-free** (pure CSS/SVG art) on purpose: instant load, no broken
images, zero dependencies. If/when you want custom on-brand photography, everything below is
prepped so it's a ~2-minute job.

## How to enable it
The AI image generation runs on the connected Higgsfield workspace, which was on the **free plan
($0 credits)**. Upgrade the workspace (PLUS = 1,000 credits/mo is plenty), then just say
*"generate the photography"* — the full 6-image set costs only **~5 credits** total.

Models used: `soul_2` (portraits/treatment scenes, ~0.12 credits each, 2k) and
`nano_banana_pro` (interiors, 2 credits each, 2k).

## The 6 images + where each one drops in

| # | File slot | Model | Aspect | Goes in |
|---|-----------|-------|--------|---------|
| 1 | `assets/img/hero-portrait.jpg` | soul_2 | 3:4 | Hero — right side, glass cards float over it |
| 2 | `assets/img/treatment-facial.jpg` | soul_2 | 3:4 | Philosophy section (replaces/pairs with botanical art) |
| 3 | `assets/img/skin-detail.jpg` | soul_2 | 3:4 | Signature spotlight (dark section) visual |
| 4 | `assets/img/interior-wide.jpg` | nano_banana_pro | 16:9 | New "The Space" gallery — hero tile |
| 5 | `assets/img/interior-vignette.jpg` | nano_banana_pro | 3:4 | "The Space" gallery — product shelf tile |
| 6 | `assets/img/ritual-hands.jpg` | soul_2 | 4:3 | "The Space" gallery — massage/ritual tile |

## The exact prompts

**1. Hero portrait (soul_2, 3:4, 2k)**
> Editorial beauty close-up portrait of a young East Asian woman with luminous dewy 'glass skin', flawless hydrated complexion, soft dewy natural makeup, serene calm expression with a gentle gaze, fresh and radiant. Warm soft diffused studio light, smooth warm ivory and cream background with subtle terracotta tones. Shot on 85mm lens, shallow depth of field, high-end skincare campaign aesthetic, visible natural healthy skin texture, photorealistic, professional photography, no text, no watermark.

**2. Treatment scene (soul_2, 3:4, 2k)**
> A serene facial treatment in a calm minimal spa studio. A relaxed young woman lies on a treatment bed with her eyes closed, an esthetician's gentle hands applying a glowing hydrating serum to her cheek. Soft warm natural window light, cream linens, terracotta and sage-green accents, softly blurred plants in the background. Premium Korean skincare studio, editorial wellness photography, warm calming tones, photorealistic, no text, no watermark.

**3. Skin detail / spotlight (soul_2, 3:4, 2k)** — dark/moody to match the espresso section
> Extreme macro close-up of dewy luminous glass skin across a cheek and jawline, a few glistening droplets of clear serum, a hand in soft focus gently gliding a jade gua sha tool along the skin. Dramatic warm low-key lighting, deep espresso-brown background with a soft golden rim light, glowing hydrated skin texture, luxury skincare, cinematic, photorealistic, no text, no watermark.

**4. Interior wide (nano_banana_pro, 16:9, 2k)**
> Interior of a minimal luxury Korean skincare studio. A single treatment bed dressed in cream linens, warm oak wood and soft terracotta accents, a few sage-green potted plants, a large frosted window letting in soft diffused daylight, amber glass skincare bottles neatly arranged on a floating shelf, calm clean uncluttered space, warm ivory walls. Architectural interior photography, warm natural light, editorial, photorealistic, no people, no text, no watermark.

**5. Interior vignette (nano_banana_pro, 3:4, 2k)**
> A styled vignette in a warm minimal skincare studio: an oak shelf holding amber glass serum bottles with droppers, small ceramic dishes, neatly folded cream towels, and a small trailing green plant, lit by soft morning light with gentle shadows on an ivory wall, terracotta and cream palette. Cozy premium interior detail shot, editorial photography, photorealistic, no text, no watermark.

**6. Ritual hands (soul_2, 4:3, 2k)**
> Close-up of an esthetician's hands performing a gentle facial massage on a relaxed client's face, fingertips glistening with facial oil, eyes closed in calm, soothing spa atmosphere, soft warm light, cream tones with subtle terracotta accents. Tactile and serene premium skincare ritual, editorial wellness photography, photorealistic, no text, no watermark.

> Tip: these also work as prompts for a human photographer's shot list, or as direction for your
> own iPhone photos — the palette and mood notes are the important part.
