# Anubhav Sinha — Personal portfolio

Live at [anubhavsinha98.github.io](https://anubhavsinha98.github.io/).

A responsive, static portfolio covering backend engineering, production ML inference, LocalJot, and open-source work.

## Run locally

No build step or package installation is required:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Edit

- `index.html`: page content, project links, and search/social metadata.
- `styles/style.css`: responsive styles, reduced-motion support, and print layout.
- `app.js`: mobile navigation, active-section navigation, and footer year.
- `assets/favicon.svg`: browser icon.
- `assets/social-preview.svg` and `assets/social-preview.png`: social sharing artwork. Regenerate the PNG after changing the SVG.

The page uses system fonts, inline vector illustrations, semantic HTML, and native expandable experience details. The core content and links work without JavaScript. There are no analytics, tracking scripts, or third-party runtime dependencies.

The pre-existing résumé and legacy image assets remain in the repository. The new page links to the current LinkedIn profile rather than presenting the old résumé as current.

GitHub Pages serves this repository at its existing public address. Publish through the repository's configured Pages source.
