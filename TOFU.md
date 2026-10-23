# Klecks on Tofu

Klecks is bitbof's open-source browser painting app, with layers, pressure-sensitive brushes, selection and editing tools, local image import/export, and browser storage. It is the open-source release developed alongside Kleki, but this copy keeps the upstream **Klecks** name, logo, and favicon.

## Running a copy

- **Tofu framework preset:** `static`.
- **Root folder:** `site/`, which is committed on the `tofu` branch. It holds `index.html` and no `package.json`, so Tofu serves it as a prebuilt site. Copy/import this subfolder as the app root. The repository root contains the Parcel source build and is not a prebuilt static site.
- **Install and build commands:** none. **Output directory:** the root folder itself.
- **Rebuild from source:** Node.js 22 and npm; run `npm ci --no-audit --no-fund`, then `node scripts/tofu-build.mjs` from the repository root. The script runs the upstream icon and language generators, then `npm run build -- --no-source-maps` (Parcel writes `dist/`), moves the result to `site/`, and copies the license and this document into it. `PARCEL_WORKERS` defaults to 2 to limit build concurrency.
- **Build output:** `site/`. Relative URLs support mounting the complete folder at a site root or subpath.
- **Environment variables:** none required. No API keys or Tofu accounts are embedded.
- **Database/server:** none. Drawings and recovery data stay in this browser's IndexedDB; exported files are downloaded locally. Browser data is not a cloud backup or cross-device sync.
- **Local check:** `python3 -I -m http.server 46387 --bind 127.0.0.1 --directory site`, then `curl --fail --silent --show-error -o /dev/null -w '%{http_code}\n' http://127.0.0.1:46387/`.

Use HTTPS for the upstream offline service worker, which caches same-origin assets after the first visit. Bundled fonts are served from this copy, not from a font CDN. Help and credit links still point to their upstream authors; they are ordinary links, not tracking or advertising scripts. Advanced filters depend on the browser's WebGL support.

## Adaptations and their reasons

1. Gate the File panel's Imgur upload button on an app-provided Imgur key. Upstream standalone mode supplied no key but still displayed the button, causing an error when clicked. This standalone copy has no Imgur account, so the button is hidden; local export and browser storage remain available. An embedding application may still provide its own key through the upstream API.
2. Add `scripts/tofu-build.mjs` to generate the icon/language inputs, clean and rebuild the static output, omit source maps, and carry the MIT license into every published copy. Parcel still writes its default `dist/`, and the script then moves that folder to `site/`. Pointing Parcel at `site/` with `--dist-dir` would change its internal bundle ids, and with them the names of two bundles, so the shipped files would no longer match the build that was checked. The upstream package manifest, lockfile, source entry page, and build command remain intact.
3. Commit the generated site in `site/` only on `tofu`, so a gallery copy can serve the complete app without a build service. The folder is `site/` and not `dist/` because Tofu's GitHub import drops every path that contains a folder named `dist` (also `build`, `node_modules`, `target`, `.cache` and a few more), so a site committed in `dist/` imports as an empty app. `pin/2026-10-23` committed it in `dist/` and is superseded by `pin/2026-10-23.1`. Regenerate and replace the `site/` folder whenever the source changes.

Upstream's language generator reports untranslated strings and falls back to English; those warnings do not stop the build. This copy preserves the upstream translations rather than claiming complete localization.

## Upstream and license

- Upstream: https://github.com/bitbof/klecks
- Upstream branch: `main`
- Base commit: `cfd66e88743351816b29822f5c12a0363c309554`
- Gallery fork: https://github.com/tofu-gallery/klecks
- Adaptation branch: `tofu`; `main` is an untouched upstream mirror.
- Gallery pin: `pin/2026-10-23.1`, created only after the checks listed under Verification. It replaces `pin/2026-10-23`, whose site was committed in `dist/` and would import empty.
- App license: MIT, copyright (c) 2026 bitbof (bitbof.com). The upstream `LICENSE` and copyright notices are unchanged. Bundled library and font notices remain in the app's license dialog and generated assets.

The upstream README explicitly excludes the **Kleki** name and brand from the Klecks license. Offer this application as **Klecks**, not as a service branded Kleki, unless a separate license from bitbof is obtained. The Klecks and bitbof logos are not covered by the README's public-domain statement for icons; their existing upstream use is preserved.

## Verification

Checked on 2026-10-23 (UTC) with Node.js 22.22.3 and npm 10.9.8 on macOS, from a fresh clone of this branch:

- `npm ci --no-audit --no-fund` installed 226 packages.
- `node scripts/tofu-build.mjs` exited 0 and produced the 56 files in `site/`. They are byte for byte the files `pin/2026-10-23` carried in `dist/` (`diff -r` reported no difference; only `TOFU.md`, which describes the new location, was rewritten afterwards), so moving the folder changed no shipped file.
- Import filter: a copy of `site/` made with `rsync -a` and the importer's dropped names excluded (`node_modules`, `dist`, `build`, `target`, `.cache`, `.parcel-cache`, `.git`, `.DS_Store`, `._*`, `.npmrc`) kept all 56 files, and `diff -r` against `site/` was clean. `site/` has no `package.json`, no folder with a dropped name, and no page or script that names one.
- `python3 -I -m http.server 60372 --bind 127.0.0.1 --directory <that copy>` served it: `/` answered HTTP 200 (974 bytes, `text/html`), and so did `help.html`, `klecks-service-worker.js`, `LICENSE` and `TOFU.md`.
- Browser check on 127.0.0.1 only, in its own tab: the editor opened (the "Loading Klecks" screen gave way to the 1169 x 900 canvas and the tool panel). A wavy stroke with the default brush, drawn with real mouse events, painted 3,400 non-white pixels onto the blank canvas (0 before the stroke) and shows in the screenshot. All 8 same-origin requests answered 200, the console held no errors and no warnings, and the service worker activated and cached 38 files.
- Not repeated for this move: PNG export. The shipped files are the ones whose export was checked for `pin/2026-10-23`.
