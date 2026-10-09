# Oluwadoyinsola Aguda — Portfolio

Personal portfolio site for Oluwadoyinsola (Doyin) Aguda, Operations Manager.

A single static page: plain HTML, CSS and JavaScript, with no build step and no dependencies.

## Project structure

```
.
├── index.html              # The whole page: content and component styling
├── css/
│   └── styles.css          # Shared rules, breakpoints, animations, states
├── js/
│   └── main.js             # Rotating hero word, slideshow, project and skills toggles
└── assets/
    ├── favicon.svg
    ├── cv/
    │   └── Oluwadoyinsola_Aguda_CV.pdf
    └── img/
        ├── portrait.jpg
        ├── chukwuka-dele-oyeleru.jpg
        ├── collins-donye.jpg
        ├── philips-durojaiye.jpg
        └── og-image.png    # 1200 × 630 social share image
```

## Run it locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

Any static host works. Upload the whole folder as it is.

- **Netlify:** drag the folder onto app.netlify.com/drop, or connect the repo (no build command, publish directory `.`).
- **Vercel:** import the repo, framework preset "Other", no build command.
- **GitHub Pages:** push to GitHub, then Settings → Pages → deploy from the `main` branch, root folder.

## Before you go live

1. **Set your domain.** In `index.html`, replace every `https://YOUR-DOMAIN.com` with your live URL. Link previews on LinkedIn, WhatsApp and X need the absolute address of `og-image.png`.
2. **Test the preview.** Paste your URL into the LinkedIn Post Inspector (linkedin.com/post-inspector) to check the title, description and image.
3. **Click every CTA.** Email, LinkedIn, phone, and all three "Download CV" buttons.

## Updating content

- **Text:** edit it directly in `index.html`. Every section is marked by an `id` (`top`, `about`, `offer`, `projects`, `experience`, `tools`, `kind-words`, `contact`).
- **CV:** replace `assets/cv/Oluwadoyinsola_Aguda_CV.pdf`, keeping the same file name.
- **Photos:** replace the files in `assets/img/`, keeping the same names and similar proportions (portrait 4:5, avatars square).
- **Rotating hero words:** edit the `words` list at the top of `initRotatingWord` in `js/main.js`.

## Design tokens

| Token | Value |
|---|---|
| Ink | `#111111` |
| Page | `#F4F4F2` |
| Tint | `#EDE5E4` |
| Clay | `#C9825B` (decorative, labels on dark) |
| Clay deep | `#A35C3A` (buttons, text on light) |
| Muted text | `#4A4644` |
| Line | `#D3CCCA` |
| Headings | Fraunces 600 |
| Body | Inter 400 / 600 / 700 |

## Accessibility

- Text contrast meets WCAG 2.2 AA throughout.
- Skip link, visible 3px focus ring, and 24px minimum tap targets.
- The slideshow can be paused and pauses on hover and focus; the hero word stops after two cycles.
- `prefers-reduced-motion` disables autoplay, word rotation and transitions.
