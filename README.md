# Didas Junior Gasana — Portfolio

A responsive, dependency-free personal portfolio built with HTML, CSS, and vanilla JavaScript. The design uses existing portraits, locally rendered system fonts, and lightweight CSS/SVG project illustrations (conceptual visuals, not product screenshots).

## Run locally

Open `index.html` directly, or serve the repository:

```sh
cd /Users/lupin/Desktop/alu-resume
python3 -m http.server 8000
```

Then visit http://localhost:8000. No package installation or build step is required.

## Checks

```sh
node --check script.js
git diff --check
```

For browser verification, check desktop and narrow mobile layouts, expand each case study, use the mobile menu with keyboard and Escape, and enable reduced motion. Content and project disclosures remain usable with JavaScript disabled.

## Files

- `index.html`: content, semantic sections, SEO and social metadata, structured data.
- `style.css`: responsive design, project illustrations, accessibility and motion preferences.
- `script.js`: mobile navigation, one-shot reveals, bounded portrait parallax.
- `favicon.svg`: local favicon.
- Existing portrait files and `fonts/` are retained; the design does not request remote fonts.

Existing section anchors are preserved: `#hero`, `#projects`, `#about`, `#experience`, `#skills`, `#contact`.

## Content notes

Profile and project outcomes use the supplied facts. RBC timing refers specifically to live fingerprint duplicate checks at peak, not total survey time. Iwacu's figure is borrowers served across two branches. VLearn's 20-student evaluation is not presented as evidence of learning gains, and offline learning does not imply offline AI. Senga's figure is downloads, not active users.

Email, social profiles, app-store links, VLearn demo, and the GitHub Pages address were retained from the original repository. Review the canonical/social URLs if deploying elsewhere. No analytics or third-party scripts are included.

## Hosting

The site remains compatible with static hosting and the existing [GitHub Pages deployment](https://gasanadj.github.io/alu-resume/). Deploy the repository contents as before.
