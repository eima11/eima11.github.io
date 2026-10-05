# Flex Academy landing page: handoff

Design-assignment landing page for **The Flex Academy** (sibling of The Flex and Base360). Two versions exist; **V2 is the current one**. Everything here was built in a Claude Code session; this pack lets you carry on without the original session.

## Quick start

```bash
cd Flex-Academy-Handoff/site
node server.js          # needs Node 18+
# open http://localhost:8642/v2/   (V1: http://localhost:8642/v1/)
```

Or just double-click `share/The-Flex-Academy.html`: a single self-contained file with every image embedded (2.3 MB).

## What's in the folder

| Path | What it is |
|---|---|
| `site/v2/` | **Current version.** Full HTML page + `assets/` (photos, logos). Edit `site/v2/index.html`. |
| `site/v1/` | First approved version (Flex green + Base360 blue palette). Frozen; kept for comparison. |
| `share/The-Flex-Academy.html` | Single-file build of V2 for sending around. Rebuild with `source/tools/build-single-file.js`. |
| `source/v2-artifact-body.html` | Same as V2 but without the `<html>/<head>` wrapper (the form the claude.ai artifact uses). |
| `source/parts/` | The snippets the later V2 features were built from (calculators, room story, preview player, map, myths, quiz, dark theme). |
| `source/tools/` | Single-file builder, dot-map generator (Natural Earth data), Puppeteer test scripts used for QA. |
| `source/the-flex-academy-logo.svg` | Official logo (white SVG; the page recolours it via `currentColor`). |
| `session/claude-code-session.jsonl` | Raw transcript of the original session (45 MB, includes screenshots). Reference only, see below. |
| `BRIEF.md` | The assignment brief. |
| `CONTINUE-PROMPT.md` | Paste this into a new Claude Code session to pick up where we stopped. |

## V2 at a glance

**Audience split:** Launch path (9-to-5 leaver, bigger market, leads by default) vs Scale path (early operator). One path switch drives the whole page: hero toggle, units stepper, section tabs, quiz result.

**Page order:** Hero (path bar) → Partner logos → What you get (Today → After + 4 result tiles) → Your numbers (salary calculator / week audit) → Programmes (2 photo cards) → Room story (scroll, 4 stages) → Inside (auto-playing app demo) → Preview player (webinar / call outline) → City map (dot map, 9 pins) → Founders → Compare → Myth vs fact → Quiz → FAQ (animated accordion) → Final CTA + checklist → Footer.

**Conversions built end to end:** webinar sign-up (session → name/email/country pills → confirmation + Google/Outlook calendar + copy link) and strategy call (units/target/city/budget pills → day/time picker in visitor's time zone → details → confirmation). Checklist + Scale waitlist as secondary capture. Nothing is actually sent.

**Design system (V2):**
- Brand **Deep Juniper `#2B4642`** (deep `#1F3431`, tint `#E3E9E7`); Launch accent **sun yellow `#F4B740`** with dark text; Scale uses juniper.
- Neutrals: page `#F7F6F1`, sand `#EDEBE3`, ink `#15201E`, muted `#66726F`, lines `#E1DED3`.
- Dark mode (toggle in nav, follows system by default, remembered): page `#0E1413`, cards `#17211F`, brand text `#A9CBC3`.
- Type: Inter (semibold headings), Roboto Mono for eyebrow labels. Hero 66px, section headings 38px, body 15px.
- Apple-style **Liquid Glass** on floating UI: nav (full-width bar in the hero, morphs to a floating capsule after it), hero path bar, mobile bottom bar, tabs, badges, player controls, pop-ups, toast.
- Motion: section fade-up on scroll, nav morph, FAQ accordion, Inside autoplay (4.5 s per step, pauses on hover), room story, theme switch circle reveal. All respect reduced motion.

All tokens are CSS custom properties at the top of `<style>` (light) plus the "Dark theme" block near the end.

## Open items / things to check

- **Placeholders:** prices X and Y; founder photos (initials shown); founders quote is a draft.
- **Assumptions to confirm with the team:** Launch "90 days", calculator figures, hours-saved %s (all labelled as examples on the page); city lessons (London 90-night and Paris 120-night rules are real; Algeria / coming-soon lines are framing).
- **Credits:** apartment photos from Unsplash; city photos + partner logos from theflex.global; map from Natural Earth (public domain). Footer says so.
- **Page length:** long now. For the 1440/390 Figma frames, consider keeping the strongest 3–4 interactive sections.

## About continuing the Claude session

Claude Code can't transfer a live session to another person or account. Options:
1. **Recommended:** start a fresh session inside this folder and paste `CONTINUE-PROMPT.md`. Claude reads the files and carries on.
2. `claude --resume /full/path/to/session/claude-code-session.jsonl` may load the old history for reading, but it references the original author's machine paths (`/Users/alaa/...`, a temporary scratchpad), so tools won't find those files. Treat it as reference.
3. The claude.ai artifact links from the session are private to the original author; ask them to share or give edit access if you need them.
