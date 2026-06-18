# Kolvren — Microsoft Copilot Adoption Partner Website

Premium B2B static website. 500designs-inspired aesthetic. Built for high-ticket ($10K+) Microsoft Copilot adoption engagements.

---

## 📁 File Structure

```
/
├── index.html              ← Homepage (conversion-focused, single CTA)
├── services.html           ← Full service detail page
├── about.html              ← Team, values, positioning
├── contact.html            ← Audit booking form
├── 404.html                ← Custom error page
├── robots.txt              ← SEO crawler config
├── sitemap.xml             ← Page index for search engines
├── README.md               ← This file
└── assets/
    ├── css/
    │   └── styles.css      ← Full design system (500designs aesthetic)
    ├── js/
    │   └── main.js         ← Nav, accordion, form, counters, reveal
    └── img/
        ├── favicon.png     ← Add your favicon here
        ├── og-image.jpg    ← Add 1200×630 OG image here
        └── hero.webp       ← Optional hero image
```

---

## 🎨 Design System

| Token | Value |
|---|---|
| Dark (bg) | `#111110` |
| Dark-2 (cards) | `#1a1917` |
| Cream (primary text) | `#EDEAE4` |
| Cream-2 (light sections) | `#F5F2EC` |
| Warm Grey (muted text) | `#7A7672` |
| Accent (tan/gold) | `#C9B99A` |
| Font Display | Barlow Condensed 700/800/900 |
| Font Body | Barlow 400/500/600 |
| Button Radius | `100px` (full pill) |
| Card Radius | `4px` (near-square) |

---

## ⚙️ Features

- **500designs aesthetic** — dark/light contrast sections, slash motifs, Barlow Condensed headlines
- **Single conversion path** — "Book a Free Copilot ROI Audit" CTA on every page
- **Copilot-focused copy** — outcome-driven, ROI-first, zero buzzwords
- **Accordion FAQ** — animated expand/collapse on services page
- **Contact form** — validation + success state (wire to Formspree/EmailJS)
- **Stat counter animation** — counts up on scroll into view
- **Scroll-reveal** — subtle fade-up on section entry
- **Mobile responsive** — hamburger menu, stacked layouts
- **Zero JS dependencies** — vanilla JS only
- **SEO ready** — meta tags, OG tags, robots.txt, sitemap.xml

---

## 🚀 Deployment

### Netlify (recommended — 2 minutes)
1. Drag the entire folder into [netlify.com/drop](https://netlify.com/drop)
2. Your site is live instantly on a Netlify subdomain
3. Add your custom domain in Netlify settings

### Vercel
```bash
npm i -g vercel
cd kolvren_v2
vercel --prod
```

### GitHub Pages
1. Push to a GitHub repo
2. Settings → Pages → Source: main branch, root folder
3. Live at `https://yourusername.github.io/kolvren`

### Azure Static Web Apps
1. Push to GitHub
2. Create Static Web App in Azure Portal → connect your repo
3. Auto-deploys on every push

---

## 📧 Connecting the Contact Form

The form at `contact.html` simulates submission by default. Wire it to a real backend:

**Option 1 — Formspree (easiest, free tier available)**
```html
<form id="contactForm" action="https://formspree.io/f/YOUR_ID" method="POST">
```
Remove the `e.preventDefault()` block in `main.js` or replace the `setTimeout` with a real `fetch()`.

**Option 2 — EmailJS**
```js
// In main.js, replace the setTimeout block:
emailjs.send('SERVICE_ID', 'TEMPLATE_ID', formData).then(() => {
  form.style.display = 'none';
  success.style.display = 'block';
});
```

**Option 3 — Custom API**
```js
fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
}).then(() => { /* show success */ });
```

---

## 🔧 Production Checklist

- [ ] Replace `https://www.kolvren.com` in `sitemap.xml` with your real domain
- [ ] Update `robots.txt` domain if using a different URL
- [ ] Add `assets/img/favicon.png` (32×32 or 64×64 PNG)
- [ ] Add `assets/img/og-image.jpg` (1200×630) for social sharing
- [ ] Wire contact form to Formspree / EmailJS / custom API
- [ ] Replace phone number `+1 (201) 555-0100` with real number
- [ ] Add real team photos or keep initials-based design
- [ ] Add Google Analytics / Plausible snippet before `</head>`
- [ ] Replace Tailwind CDN with PostCSS build for production performance
- [ ] Add `<link rel="icon" href="assets/img/favicon.png">` to all `<head>` sections

---

## 📐 Tailwind vs Custom CSS

This project uses **Tailwind CSS via CDN** for utility classes plus a custom `styles.css` for the full design system, component styles, and 500designs-specific patterns.

**For production:** Replace the CDN `<script src="https://cdn.tailwindcss.com">` with a Tailwind CLI build:
```bash
npm install -D tailwindcss
npx tailwindcss init
npx tailwindcss -i ./assets/css/input.css -o ./assets/css/styles.css --watch
```

---

Built by Microsoft Copilot for Kolvren · June 2026
Contact: ceo@anchorforhotels.com
