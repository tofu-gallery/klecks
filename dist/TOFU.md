# Klecks on Tofu

Klecks is bitbof's open-source browser painting app, with layers, pressure-sensitive brushes, selection and editing tools, local image import/export, and browser storage. It is the open-source release developed alongside Kleki, but this copy keeps the upstream **Klecks** name, logo, and favicon.

## Running a copy

- **Tofu framework preset:** `static`.
- **Site/import root:** `dist/`, which is committed on the `tofu` branch and contains `index.html`. Copy/import this subfolder as the app root. The repository root contains the Parcel source build and is not a prebuilt static site.
- **Hosting build command:** none when importing `dist/`.
- **Rebuild from source:** Node.js 22 and npm; run `npm ci --no-audit --no-fund`, then `node scripts/tofu-build.mjs` from the repository root. The script runs the upstream icon and language generators, then `npm run build -- --no-source-maps`, and copies the license and this document into `dist/`. `PARCEL_WORKERS` defaults to 2 to limit build concurrency.
- **Build output:** `dist/`. Relative URLs support mounting the complete folder at a site root or subpath.
- **Environment variables:** none required. No API keys or Tofu accounts are embedded.
- **Database/server:** none. Drawings and recovery data stay in this browser's IndexedDB; exported files are downloaded locally. Browser data is not a cloud backup or cross-device sync.
- **Local check:** `python3 -I -m http.server 46387 --bind 127.0.0.1 --directory dist`, then `curl --fail --silent --show-error -o /dev/null -w '%{http_code}\n' http://127.0.0.1:46387/`.

Use HTTPS for the upstream offline service worker, which caches same-origin assets after the first visit. Bundled fonts are served from this copy, not from a font CDN. Help and credit links still point to their upstream authors; they are ordinary links, not tracking or advertising scripts. Advanced filters depend on the browser's WebGL support.

## Adaptations and their reasons

1. Gate the File panel's Imgur upload button on an app-provided Imgur key. Upstream standalone mode supplied no key but still displayed the button, causing an error when clicked. This standalone copy has no Imgur account, so the button is hidden; local export and browser storage remain available. An embedding application may still provide its own key through the upstream API.
2. Add `scripts/tofu-build.mjs` to generate the icon/language inputs, clean and rebuild the static output, omit source maps, and carry the MIT license into every published copy. The upstream package manifest, lockfile, source entry page, and build command remain intact.
3. Commit the generated `dist/` only on `tofu`, so a gallery copy can serve the complete app without a build service. Regenerate and replace that folder whenever the source changes.

Upstream's language generator reports untranslated strings and falls back to English; those warnings do not stop the build. This copy preserves the upstream translations rather than claiming complete localization.

## Upstream and license

- Upstream: https://github.com/bitbof/klecks
- Upstream branch: `main`
- Base commit: `cfd66e88743351816b29822f5c12a0363c309554`
- Gallery fork: https://github.com/tofu-gallery/klecks
- Adaptation branch: `tofu`; `main` is an untouched upstream mirror.
- Gallery pin: `pin/2026-10-23`, created only after local build and serving verification.
- App license: MIT, copyright (c) 2026 bitbof (bitbof.com). The upstream `LICENSE` and copyright notices are unchanged. Bundled library and font notices remain in the app's license dialog and generated assets.

The upstream README explicitly excludes the **Kleki** name and brand from the Klecks license. Offer this application as **Klecks**, not as a service branded Kleki, unless a separate license from bitbof is obtained. The Klecks and bitbof logos are not covered by the README's public-domain statement for icons; their existing upstream use is preserved.
